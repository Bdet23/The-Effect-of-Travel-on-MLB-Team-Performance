import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";
import regression from "regression";



export default function RegressionChart(ps: { season: SeasonData, selectTeam: (s: string) => void }) {
    const teams = Object.values(ps.season);
    const regressions = teams.map(t => ({
        slope: regression.linear(t.games.map(g => [g.fatigue, g.opsp])).equation[0] as number,
        name: t.name,
        team: t,
    }));
    regressions.sort((a, b) => b.slope - a.slope);

    const meanSlope = regressions.map(r => r.slope).reduce((a, b) => a+b) / regressions.length;

    function CustomTooltip(ps: any) {
        const reg = regressions.find(r => r.name === ps.label);
        // const team = teamTravelRecords[ps.label];
        return !reg ? null : (
            <div className="text-left bg-gray-800/[.9] p-3 w-40 rounded">
                <div className="font-bold">{reg.name}</div>
                <div className="w-full bg-white h-px my-1" > </div>
                Slope: {reg.slope}
            </div>
        );
    }

    return (
        <div className="vertical-container">
            <div className="graph-title">Correlation between Time Since Travel and Performance by Team</div>
            <div className="graph-subtitle">(No consistent relationship)</div>
            <Chart.BarChart width={GRAPH_W} height={GRAPH_H} data={regressions}
                            onClick={(e: any) => ps.selectTeam(teams[e.activeTooltipIndex].name)}
            >
                <Chart.CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <Chart.XAxis interval={0} dataKey="name" tick={{ fontSize: "12px", fill: "gray" }} />
                <Chart.YAxis tick={false} />
                <Chart.Tooltip content={<CustomTooltip />} />
                <Chart.Legend />
                <Chart.Bar dataKey="slope" fill="#67ce8e" />
            </Chart.BarChart>
        </div>
    );
}
