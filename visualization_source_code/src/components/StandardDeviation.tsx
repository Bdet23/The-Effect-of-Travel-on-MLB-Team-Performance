import * as Chart from "recharts";


export default function StandardDeviation(ps: {}) {
    return (
        <Chart.BarChart data={[{pv:2,uv:3},{pv:4,uv:5}]}>
            <Chart.CartesianGrid strokeDasharray="3 3" />
            <Chart.XAxis dataKey="name" />
            <Chart.YAxis />
            <Chart.Tooltip />
            <Chart.Legend />
            <Chart.Bar dataKey="pv" fill="#8884d8" >
                {/* <Chart.ErrorBar dataKey="errorY" width={4} strokeWidth={2} stroke="green" direction="y" /> */} 
            </Chart.Bar>
            <Chart.Bar dataKey="uv" fill="#82ca9d" />
        </Chart.BarChart>
    );

    // 48.99188415312146 49.08499201292349 49.8594257714108 9.902711832055944 3.6110429184932866 10.795933812902563

}
