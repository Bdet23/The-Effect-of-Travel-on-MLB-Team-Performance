import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";



export default function HomeAdvantage(ps: { season: SeasonData, selectTeam: (s: string) => void }) {
    const teams = Object.values(ps.season);
    teams.sort((a, b) => (b.wins_home / b.wins_away) - (a.wins_home / a.wins_away));

    function CustomTooltip(ps: any) {
        const team = teams.find(t => t.name === ps.label);
        // const team = teamTravelRecords[ps.label];
        return !team ? null : (
            <div className="text-left bg-gray-800/[.9] p-3 w-40 rounded">
                <div className="font-bold">{team.name}</div>
                <div className="w-full bg-white h-px my-1" > </div>
                Total Wins: {team.wins}
                <br/>
                Wins Home: {team.wins_home}
                <br/>
                Wins Away: {team.wins_away}
            </div>
        );
    }

    return (
        <Chart.BarChart width={GRAPH_W} height={GRAPH_H} data={teams}
                        onClick={(e: any) => ps.selectTeam(teams[e.activeTooltipIndex].name)}
        >
            <Chart.CartesianGrid strokeDasharray="3 3"  stroke="gray" />
            <Chart.XAxis dataKey="name" minTickGap={1} tick={{ fontSize: "12px" }}/>
            <Chart.YAxis tick={{ fill: 'lightgray' }} />
            <Chart.Tooltip content={<CustomTooltip />} />
            <Chart.Legend />
            <Chart.Bar dataKey="wins_home" fill="#67ce8e" />
            <Chart.Bar dataKey="wins_away" fill="#dd8c85" />
        </Chart.BarChart>
    );
}
