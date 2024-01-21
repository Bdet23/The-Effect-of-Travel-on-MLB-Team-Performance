import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";

export default function TeamLineChart(ps: { season: SeasonData, team: string }) {
    const team = Object.values(ps.season).find(t => t.name === ps.team)!;

    function CustomTooltip(ps: any) {
        console.log(">>", ps);
        const game = team.games[ps.label];
        if (!game) return null;

        return (
            <div className="text-left bg-gray-800/[.9] p-3 w-60 rounded">
                <div className="font-bold">
                    { new Date(game.date).toDateString() }
                </div>
                <div className="w-full bg-white h-px my-1"> </div>
                Score: {game.score}-{game.opponent_score}
                <br/>
                Opponent: {game.opponent}
                <br/>
                Location: {game.city}
            </div>
        );
    }

    return (
        <Chart.LineChart width={GRAPH_W} height={GRAPH_H} data={team.games}>
            <Chart.CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <Chart.XAxis min-interval={2} tick={{ fontSize: "0" }} />
            <Chart.YAxis min={0} />
            <Chart.Tooltip content={<CustomTooltip />} />
            <Chart.Legend />
            <Chart.Line dataKey="fatigue" stroke="#8884d8" dot={false} />
            <Chart.Line dataKey="opsp" stroke="#82ca9d" dot={false} />
        </Chart.LineChart>
    );

}
