import { useMemo, useState } from "react";
import "./App.css";
import { motion } from "framer-motion";

import HomeAdvantage from "./components/HomeAdvantage";
import { generateSeasonData, getData, SeasonData } from "./utils/data";
import YearSelector from "./components/YearSelector";
import Team from "./components/Team";
import League from "./components/League";


export const GRAPH_W = 1000;
export const GRAPH_H = 500;


function App() {
    const data = useMemo(() => getData(), []);
    const seasons = useMemo(() => generateSeasonData(data), [data]);

    const [year, setYear] = useState(2023);
    const [allYears, setAllYears] = useState(false);
    const [selectedTeam, selectTeam] = useState(null as null | string);

    const combinedSeason: SeasonData = {};
    for (let team in seasons[seasons.length - 1]) {
        combinedSeason[team] = { ...seasons[seasons.length - 1][team] };
        combinedSeason[team].games = seasons.flatMap(s => s[team]?.games ?? []);
    }

    const currentSeason = useMemo(() => allYears ? combinedSeason : seasons[year - 2000], [allYears, year]);

    return (
        <div className="relative">
            <div hidden={!selectedTeam} className="text-6xl cursor-pointer absolute left-0 w-0" onClick={() => selectTeam(null)}>←</div>
            <YearSelector year={year} setYear={setYear} allYears={allYears} setAllYears={setAllYears} />

            {
                selectedTeam ? (
                    <Team season={currentSeason} team={selectedTeam!} />
                ) : (
                    <League seasons={seasons} selectTeam={selectTeam} year={year} />
                )
            }

        </div>
    );
}

export default App
