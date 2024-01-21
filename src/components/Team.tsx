import * as Tabs from '@radix-ui/react-tabs';
import TeamRadarChart from "./TeamRadarChart";
import TeamLineChart from "./TeamLineChart";
import ScatterPlot from "./ScatterPlot";
import { SeasonData } from "../utils/data";


export default function Team(ps: { season: SeasonData, team: string }) {
    const abbreviations = {
        "ARI": "Arizona Diamondbacks",
        "ATL": "Atlanta Braves",
        "BAL": "Baltimore Orioles",
        "BOS": "Boston Red Sox",
        "CHN": "Chicago Cubs",
        "CHC": "Chicago Cubs",
        "CHW": "Chicago White Sox",
        "CWS": "Chicago White Sox",
        "CIN": "Cincinnati Reds",
        "CLE": "Cleveland Indians",
        "COL": "Colorado Rockies",
        "CHA": "White Socks",
        "DET": "Detroit Tigers",
        "FLA": "Florida Marlins",
        "HOU": "Houston Astros",
        "KAN": "Kansas City Royals",
        "ANA": "Anaheim Angels",
        "LAD": "Los Angeles Dodgers",
        "MIL": "Milwaukee Brewers",
        "MIN": "Minnesota Twins",
        "NYM": "New York Mets",
        "NYY": "New York Yankees",
        "OAK": "Oakland Athletics",
        "PHI": "Philadelphia Phillies",
        "PIT": "Pittsburgh Pirates",
        "SD": "San Diego Padres",
        "SF": "San Francisco Giants",
        "SEA": "Seattle Mariners",
        "STL": "St. Louis Cardinals",
        "TB": "Tampa Bay Rays",
        "TEX": "Texas Rangers",
        "TOR": "Toronto Blue Jays",
        "WAS": "Washington Nationals ",
        "FLO": "Florida Marlins",
        "MON": "Montreal Expos",
    } as {[s: string]: string};
    const teamName = abbreviations[ps.team] ?? "";

    return (
        <>
            <div className="text-2xl pb-4">{teamName} ({ps.team})</div>
            <Tabs.Root className="TabsRoot w-full" defaultValue="games">
                <div className="horizontal-container w-full">
                    <Tabs.List className="TabsList" defaultValue="radar">
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
        </>
    );
}
