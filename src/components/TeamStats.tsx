import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";
import * as regression from "regression";
import TeamRadarChart from "./TeamRadarChart";
import TeamLineChart from "./TeamLineChart";


export default function TeamStats(ps: { season: SeasonData, team: string }) {
    const gradient = regression.linear(ps.season[ps.team].games.map(g => [g.fatigue, g.opsp])).equation[0];

    return (
        <div>
            <Chart.ScatterChart width={GRAPH_W} height={GRAPH_H}>
                <Chart.CartesianGrid />
                <Chart.Legend />
                <Chart.XAxis type="number" dataKey="fatigue" name="fatigue" />
                <Chart.YAxis type="number" dataKey="opsp" name="OPSp" />
                <Chart.Scatter name="Some things" data={ps.season[ps.team].games} fill="#8884d8" />
            </Chart.ScatterChart>
            Gradient = {gradient}
            <TeamRadarChart season={ps.season} team={ps.team} />
            <TeamLineChart season={ps.season} team={ps.team} />
        </div>
    );
}
