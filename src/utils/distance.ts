import getDistance from 'geolib/es/getDistance';

import { MlbDatapoint } from "./data";
import CITIES_JSON from "../assets/cities.json";


type CityLocationData = {[city: string]: { latitude: number, longitude: number }};

export function getCityData(): CityLocationData {
    return CITIES_JSON as CityLocationData;
}


export type DistanceDatapoint = {
    data: MlbDatapoint,

    home_distance: number | null,
    home_longitude: number | null,
    home_tz: number | null,

    away_distance: number | null,
    away_longitude: number | null,
    away_tz: number | null,
}



export function calculateTravelDistances(data: MlbDatapoint[]): DistanceDatapoint[] {
    const cities = getCityData();

    console.log("Calculating distances");

    // Maps "day:team" to a given game
    let gameCities: Map<string, MlbDatapoint> = new Map();

    return data.map(game => {
        gameCities.set(`${game.game_date.toDateString()}:${game.home_team}`, game);
        gameCities.set(`${game.game_date.toDateString()}:${game.away_team}`, game);

        const dist: DistanceDatapoint = {
            data: game,
            home_distance: null,
            home_longitude: null,
            home_tz: null,
            away_distance: null,
            away_longitude: null,
            away_tz: null,
        };

        const prevDate = new Date(game.game_date);
        prevDate.setDate(prevDate.getDate() - 1);

        const home_prev_game = gameCities.get(`${prevDate.toDateString()}:${game.home_team}`);
        if (home_prev_game) {
            dist.home_distance = getDistance(cities[home_prev_game.city], cities[game.city]);
            dist.home_longitude = cities[game.city].longitude - cities[home_prev_game.city].longitude;
            dist.home_tz = game.game_tz - home_prev_game.game_tz;
        }

        const away_prev_game = gameCities.get(`${prevDate.toDateString()}:${game.away_team}`);
        if (away_prev_game) {
            dist.away_distance = getDistance(cities[away_prev_game.city], cities[game.city]);
            dist.away_longitude = cities[game.city].longitude - cities[away_prev_game.city].longitude;
            dist.away_tz = game.game_tz - away_prev_game.game_tz;
        }

        return dist;
    });
}
