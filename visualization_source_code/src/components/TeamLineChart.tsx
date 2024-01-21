import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useState } from "react";



export default function TeamLineChart(ps: { season: SeasonData, team: string }) {
    const team = Object.values(ps.season).find(t => t.name === ps.team)!;

    const [plots, setPlots] = useState({
        opsp: true,
        fatigue: true,
        score: false,
        opponent_score: false,
        distance: false,
        score_difference: false,
    });

    const lineColors = ["#67ce8e", "#dd8c85", "#349fd8", "#ab60f2", "#f2da60"];


    function LineCheckbox(ps: { line: string, plots: any, setPlots: (p: any) => void }) {
        return (
            <div className="flex flex-row">
                <Checkbox.Root className="CheckboxRoot shrink-0 ml-8" id={`line-${ps.line}`}
                               defaultChecked={ps.plots[ps.line]}
                               onCheckedChange={b => setPlots({ ...ps.plots, [ps.line]: Boolean(b) })}
                >
                    <Checkbox.Indicator className="CheckboxIndicator"><CheckIcon /></Checkbox.Indicator>
                </Checkbox.Root>
                <label className="graph-subheading shrink-0 ml-2" htmlFor={`line-${ps.line}`}>{ps.line}</label>
            </div>
        );
    }

    function CustomTooltip(ps: any) {
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
        <div className="horizontal-container">
            <Chart.LineChart width={GRAPH_W} height={GRAPH_H} data={team.games}>
                <Chart.CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <Chart.XAxis min-interval={2} tick={{ fontSize: "0" }} />
                <Chart.YAxis min={0} />
                <Chart.Tooltip content={<CustomTooltip />} />
                <Chart.Legend />
                {
                    Object.entries(plots)
                        .filter(([_k, v]) => v)
                        .map(([k, _v], i) => <Chart.Line dataKey={k} stroke={lineColors[i]} dot={false} />)
                }
            </Chart.LineChart>
            <div>
                <LineCheckbox plots={plots} setPlots={setPlots} line="opsp" />
                <LineCheckbox plots={plots} setPlots={setPlots} line="fatigue" />
                <LineCheckbox plots={plots} setPlots={setPlots} line="score" />
                <LineCheckbox plots={plots} setPlots={setPlots} line="opponent_score" />
                <LineCheckbox plots={plots} setPlots={setPlots} line="distance" />
                <LineCheckbox plots={plots} setPlots={setPlots} line="score_difference" />
            </div>
        </div>
    );

}
