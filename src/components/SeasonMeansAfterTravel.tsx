import { useState } from "react";
import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";


// Calculate the percentage of values in a list grater than a number pivot
function percentAbove(pivot: number, nums: number[]): number {
    return 100 * nums.filter(a => a > pivot).length / nums.length;
}

// Calculate the average of a list of numbers
function average(nums: number[]): number {
    return nums.reduce((a, b) => a + b) / nums.length;
}

export default function SeasonMeansAfterTravel(ps: { seasons: SeasonData[], selectTeam: (t: string) => void }) {
    const [year, setYear] = useState(null as null | number);


    // For each season, calculate whether teams did better than average in travelling games, staying games, or gap games
    const seasonResults = ps.seasons.map((season, i) => {

        // Calculate the percent of each teams games which was above
        // their average performance both after travelling, and after
        // playing a game in the same location
        const teamPercents = Object.values(season).map(team => {
            const afterTravelOpsps = team.games.filter(g => g.distance).map(g => g.opsp);
            const afterStayOpsps = team.games.filter(g => g.distance === 0).map(g => g.opsp);
            const afterGapOpsps = team.games.filter(g => g.distance === null).map(g => g.opsp);

            return {
                travel: percentAbove(team.avg_opsp, afterTravelOpsps),
                stay: percentAbove(team.avg_opsp, afterStayOpsps),
                gap: percentAbove(team.avg_opsp, afterGapOpsps),
                name: team.name,
            };
        });

        return {
            season: 2000 + i,
            teams: teamPercents,
        };
    });



    // If year is specified, then show the teams from that year
    if (year !== null) {
        function CustomTooltipTeam(ps: any) {
            const team = seasonResults[year! - 2000].teams.find(t => t.name === ps.label);
            return !team ? null : (
                <div className="text-left bg-gray-800/[.9] p-3 w-80 rounded">
                    <div className="font-bold">{team.name}</div>
                    <div className="w-full bg-white h-px my-1" > </div>
                    Overperformance After Travel: {team.travel.toString().substring(0,6)}%
                    <br/>
                    Overperformance After Staying: {team.stay.toString().substring(0,6)}%
                    <br/>
                    Overperformance After Gap: {team.gap.toString().substring(0,6)}%
                </div>
            );
        }

        return (
            <div>
                <p className="text-3xl cursor-pointer text-left" onClick={() => setYear(null)}>← Performance Expectations for <b>{year}</b></p>
                <Chart.BarChart width={GRAPH_W} height={GRAPH_H} data={seasonResults[year - 2000].teams}
                                onClick={(e: any) => ps.selectTeam(seasonResults[year - 2000].teams[e.activeTooltipIndex].name)}
                >
                    <Chart.CartesianGrid strokeDasharray="3 3"  stroke="gray" />
                    <Chart.XAxis dataKey={"name"} minTickGap={1} tick={{ fontSize: "12px" }}/>
                    <Chart.YAxis tick={{ fill: 'lightgray' }} />
                    <Chart.Legend />
                    <Chart.Tooltip content={<CustomTooltipTeam />} />
                    <Chart.Bar dataKey="travel" fill="#67ce8e" />
                    <Chart.Bar dataKey="stay" fill="#dd8c85" />
                    <Chart.Bar dataKey="gap" fill="#349fd8" />
                </Chart.BarChart>
            </div>
        );
    }


    // Take the average of all of the teams over the course of the season
    const seasonAverages = seasonResults.map(({ season, teams }) => ({
        season,
        travel: average(teams.map(t => t.travel)),
        stay: average(teams.map(t => t.stay)),
        gap: average(teams.map(t => t.gap)),
    }));

    function CustomTooltip(ps: any) {
        // const team = teamTravelRecords[ps.label];
        console.log(ps.label)
        return !ps.label ? null : (
            <div className="text-left bg-gray-800/[.9] p-3 w-80 rounded">
                <div className="font-bold">{ps.label}</div>
                <div className="w-full bg-white h-px my-1" > </div>
                Overperformance After Travel: {seasonAverages[ps.label - 2000].travel.toString().substring(0,6)}%
                <br/>
                Overperformance After Staying: {seasonAverages[ps.label - 2000].stay.toString().substring(0,6)}%
                <br/>
                Overperformance After Gap: {seasonAverages[ps.label - 2000].gap.toString().substring(0,6)}%
            </div>
        );
    }

    return (
        <Chart.BarChart width={GRAPH_W} height={GRAPH_H} data={seasonAverages}
                        onClick={(e: any) => setYear(e.activeTooltipIndex + 2000)}
        >
            <Chart.CartesianGrid strokeDasharray="3 3"  stroke="gray" />
            <Chart.XAxis dataKey={"season"} minTickGap={1} tick={{ fontSize: "12px" }}/>
            <Chart.YAxis tick={{ fill: 'lightgray' }} />
            <Chart.Legend />
            <Chart.Tooltip content={<CustomTooltip />} />
            <Chart.Bar dataKey="travel" fill="#67ce8e" />
            <Chart.Bar dataKey="stay" fill="#dd8c85" />
            <Chart.Bar dataKey="gap" fill="#349fd8" />
        </Chart.BarChart>
    );
}
