import * as Chart from "recharts";
import { GRAPH_H, GRAPH_W } from "../App";
import { SeasonData } from "../utils/data";
import OFFENSE_RADAR_CSV from "../assets/off_radar.csv";


type OffenseRadarEntry = {
    team: string,
    season: string,
    "team_OPS+": string,
};

export default function TeamRadarChart(ps: { season: SeasonData, team: string }) {
    const radarEntries = OFFENSE_RADAR_CSV as OffenseRadarEntry[];
    const thisYear = ps.season[ps.team!].games[0].date.getFullYear();
    const thisEntry = radarEntries.find(e => e.team === ps.team && +e.season === thisYear)!;

    const radarCats = ["travel_OPS+","no_travel_OPS+","gap_OPS+","no_gap_OPS+","team_home_OPS+","team_away_OPS+"];
    const radarValues = radarCats.map(cat => ({
        stat: cat,
        average: +thisEntry["team_OPS+"],
        category: +(thisEntry as any)[cat],
        max: 200,
    }));

    return (
        <Chart.RadarChart width={GRAPH_W} height={GRAPH_H} data={radarValues}>
            <Chart.PolarGrid />
            <Chart.PolarAngleAxis dataKey="stat" />
            <Chart.PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Chart.Radar name="Average" dataKey="average" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Chart.Radar name="Category" dataKey="category" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.45} />
            <Chart.Legend />
        </Chart.RadarChart>
    );
}
