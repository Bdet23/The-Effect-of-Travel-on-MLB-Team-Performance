import { useMemo, useState } from "react";
import "./App.css";
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import HomeAdvantage from "./components/HomeAdvantage";
import TravelAdvantage from "./components/TravelAdvantage";
import { generateSeasonData, getData, SeasonData } from "./utils/data";
import GapAdvantage from "./components/GapAdvantage";
import TeamStats from "./components/TeamStats";
import RegressionChart from "./components/RegressionChart";
import SeasonMeansAfterTravel from "./components/SeasonMeansAfterTravel";


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
            <div hidden={!selectedTeam} className="text-6xl cursor-pointer absolute left-0 w-0"
                 onClick={() => selectTeam(null)}
            >
                ←
            </div>
            <div className="w-full pb-10 horizontal-container">
                <div className="w-1/2">
                    <p className="text-8xl pb-4">{ year }</p>

                    <div className="horizontal-container">
                        <Slider.Root className="SliderRoot w-full" defaultValue={[year - 2000]} max={23} step={1}
                                     onValueChange={([val]: number[]) => {
                                         if (allYears) setAllYears(false);
                                         setYear(val + 2000);
                                     }}
                        >
                            <Slider.Track className="SliderTrack">
                                <Slider.Range className="SliderRange" />
                            </Slider.Track>
                            <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                        </Slider.Root>

                        <Checkbox.Root className="CheckboxRoot shrink-0 ml-8" id="c1" defaultChecked={allYears}
                                       onCheckedChange={(a) => setAllYears(!!a)}
                        >
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label shrink-0 ml-2" htmlFor="c1">All Seasons</label>
                    </div>
                </div>
            </div>

            <div hidden={!selectedTeam} className="horizontal-container">
                <div>
                    <p className="text-4xl pb-4">{ selectedTeam }</p>
                    { selectedTeam && <TeamStats season={currentSeason} team={selectedTeam} /> }
                </div>
            </div>

            <div style={{
                     position: "relative",
                     transition: "overflow 0.5s ease",
                     ...(selectedTeam ? { overflow: "hidden" } : {})
                 }}>
                <div className="horizontal-container">
                    <div>
                        <SeasonMeansAfterTravel seasons={seasons} selectTeam={selectTeam} />
                        <RegressionChart season={currentSeason} selectTeam={selectTeam} />
                        <HomeAdvantage season={currentSeason} selectTeam={selectTeam} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App
