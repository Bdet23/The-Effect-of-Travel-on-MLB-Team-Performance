import * as Tabs from '@radix-ui/react-tabs';
import TeamRadarChart from "./TeamRadarChart";
import TeamLineChart from "./TeamLineChart";
import ScatterPlot from "./ScatterPlot";
import { SeasonData } from "../utils/data";


export default function Team(ps: { season: SeasonData, team: string }) {
    return (
        <Tabs.Root className="TabsRoot w-full" defaultValue="tab1">
            <div className="horizontal-container w-full">
                <Tabs.List className="TabsList" defaultValue={0}>
                    <Tabs.Trigger className="TabsTrigger" value="radar">Team Strengths</Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="games">Season Record</Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="scatter">Performance vs Travelling</Tabs.Trigger>
                </Tabs.List>
            </div>

            <Tabs.Content className="TabsContent" value="radar">
                <TeamRadarChart season={ps.season} team={ps.team} />
            </Tabs.Content>

            <Tabs.Content className="TabsContent" value="games">
                <TeamLineChart season={ps.season} team={ps.team} />
            </Tabs.Content>

            <Tabs.Content className="TabsContent" value="scatter">
                <ScatterPlot season={ps.season} team={ps.team} />
            </Tabs.Content>
        </Tabs.Root>
    );
}
