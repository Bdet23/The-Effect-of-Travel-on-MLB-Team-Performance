import * as Tabs from '@radix-ui/react-tabs';
import SeasonMeansAfterTravel from './SeasonMeansAfterTravel';
import HomeAdvantage from "./HomeAdvantage";
import { SeasonData } from "../utils/data";
import RegressionChart from './RegressionChart';


export default function League(ps: { seasons: SeasonData[], year: number, selectTeam: (t: string) => void }) {
    return (
        <Tabs.Root className="TabsRoot w-full" defaultValue="home-vs-away">
            <div className="horizontal-container w-full">
                <Tabs.List className="TabsList">
                    <Tabs.Trigger className="TabsTrigger" value="travel-vs-stay">Travel vs Stay</Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="home-vs-away">Home vs Away</Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="regressions">Regressions</Tabs.Trigger>
                </Tabs.List>
            </div>

            <Tabs.Content className="TabsContent" value="travel-vs-stay">
                <SeasonMeansAfterTravel seasons={ps.seasons} selectTeam={ps.selectTeam} />
            </Tabs.Content>

            <Tabs.Content className="TabsContent" value="home-vs-away">
                <HomeAdvantage season={ps.seasons[ps.year - 2000]} selectTeam={ps.selectTeam} />
            </Tabs.Content>

            <Tabs.Content className="TabsContent" value="regressions">
                <RegressionChart season={ps.seasons[ps.year - 2000]} selectTeam={ps.selectTeam} />
            </Tabs.Content>
        </Tabs.Root>
    );
}
