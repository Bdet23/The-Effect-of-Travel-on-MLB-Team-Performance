import { getDistance } from "geolib";
import MLB_CSV from "../assets/fixed_data.csv";
import { calculateTravelDistances, getCityData } from "./distance";

export type MlbDatapoint = {
    id: number,

    game_date: Date,
    home_team: string,
    away_team: string,
    home_score: number,
    away_score: number,
    city: string,
    game_tz: number,
    home_OPSp: number,
    away_OPSp: number,
};


export function getData(): MlbDatapoint[] {
    const csvData = MLB_CSV as MlbDatapoint[];
    csvData.sort((a, b) => a.id - b.id);

    for (let row of csvData) {
        // Convert special field types
        row.game_date = new Date(row.game_date);
        row.id = +row.id;
        row.home_score = +row.home_score;
        row.away_score = +row.away_score;
        row.game_tz = +row.game_tz;
        row.home_OPSp = +row.home_OPSp;
        row.away_OPSp = +row.away_OPSp;
    }

    return csvData;
}



export type TeamGame = {
    home: boolean,
    city: string,
    date: Date,
    id: number,
    distance: number | null,
    tz: number | null,
    fatigue: number,

    opsp: number,
    score: number,
    opponent_score: number,
    opponent: string,
    score_difference: number,
}

export type TeamData = {
    games: TeamGame[],
    name: string,
    avg_opsp: number,

    wins: number,
    wins_home: number,
    wins_away: number,
}

export type SeasonData = {[t: string]: TeamData};


function avg(nums: number[]): number {
    return nums.reduce((a, b) => a + b) / nums.length;
}

export function generateSeasonData(data: MlbDatapoint[]): SeasonData[] {
    const dists = calculateTravelDistances(data);
    const seasons: SeasonData[] = [];
    let currentSeason = 0;

    for (let game of data) {
        // Add a new season if necessary
        const gameSeason = game.game_date.getFullYear();
        if (gameSeason !== currentSeason) {
            currentSeason = gameSeason;
            seasons.push({});
        }

        const teams = seasons[seasons.length - 1];

        // Add the game to the home team's record
        if (!teams[game.home_team]) teams[game.home_team] = {games: []} as any;
        const homeTeamGames = teams[game.home_team];
        homeTeamGames.games.push({
            home: true,
            city: game.city,
            date: game.game_date,
            id: game.id,
            distance: dists[game.id].home_distance,
            tz: dists[game.id].home_tz,
            fatigue: 0,

            opsp: game.home_OPSp,
            score: game.home_score,
            opponent_score: game.away_score,
            opponent: game.away_team,
            score_difference: game.home_score - game.away_score,
        });

        // Add the game to the away team's record
        if (!teams[game.away_team]) teams[game.away_team] = {games: []} as any;
        const awayTeamGames = teams[game.away_team];
        awayTeamGames.games.push({
            home: false,
            city: game.city,
            date: game.game_date,
            id: game.id,
            distance: dists[game.id].away_distance,
            tz: dists[game.id].away_tz,
            fatigue: 0,

            opsp: game.away_OPSp,
            score: game.away_score,
            opponent_score: game.home_score,
            opponent: game.home_team,
            score_difference: game.away_score - game.home_score,
        });
    }

    // Calculate agregate values
    const cities = getCityData();
    for (let season of seasons) {
        for (let [teamName, team] of Object.entries(season)) {
            team.name = teamName;
            team.avg_opsp = avg(team.games.map(g => g.opsp));

            team.wins = team.games.filter(g => g.score > g.opponent_score).length;
            team.wins_home = team.games.filter(g => g.home && g.score > g.opponent_score).length;
            team.wins_away = team.wins - team.wins_home;

            for (let i = 0; i < team.games.length; i++) {
                // Calculate a weighted agregate travel fatigue over a week long period
                let currentCity = team.games[i].city;
                for (let j = i; j >= Math.max(0, i - 5); j--) {
                    const iterationNum = i - j + 1;
                    if (team.games[j].city !== currentCity) {
                        team.games[i].fatigue += getDistance(cities[currentCity], cities[team.games[j].city]) / (iterationNum * 100_000);
                        currentCity = team.games[j].city;
                    }
                }
            }
        }
    }

    return seasons;
}
