import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";
import * as regression from "regression";


export default function ScatterPlot(ps: { season: SeasonData, team: string }) {
    const gradient = regression.linear(ps.season[ps.team].games.map(g => [g.fatigue, g.opsp])).equation[0];

    return (
        <div>
            <Chart.ScatterChart width={GRAPH_W} height={GRAPH_H} margin={{ bottom: 10, left: 20 }}>
                <Chart.CartesianGrid />
                <Chart.XAxis ticks={false} type="number" dataKey="fatigue" name="fatigue">
                    <Chart.Label value="Travel Fatigue (Relative)" position="insideBottom" offset={-7} />
                </Chart.XAxis>
                <Chart.YAxis type="number" dataKey="opsp" name="OPSp">
                    <Chart.Label value="OPS+" position="insideLeft" offset={-20} />
                </Chart.YAxis>
                <Chart.Scatter name="Games" data={ps.season[ps.team].games} fill="#8884d8" />
            </Chart.ScatterChart>

            <div className="graph-title pt-4">Correlation Coefficient = <b>{gradient}</b></div>
        </div>
    );
}
