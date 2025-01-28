import { Card, Tooltip } from "react-bootstrap";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    high: 4000,
    medium: 2400,
    normal: 2400,
  },
  {
    name: "Feb",
    high: 3000,
    medium: 1398,
    normal: 2210,
  },
  {
    name: "Mar",
    high: 2000,
    medium: 9800,
    normal: 2290,
  },
  {
    name: "Apr",
    high: 2780,
    medium: 3908,
    normal: 2000,
  },
  {
    name: "May",
    high: 1890,
    medium: 4800,
    normal: 2181,
  },
  {
    name: "Jun",
    high: 2390,
    medium: 3800,
    normal: 2500,
  },
  {
    name: "July",
    high: 3490,
    medium: 4300,
    normal: 2100,
  },
];

export default function AreaChartComponent() {
  return (
    <Card style={{ height: "200px" }} className="border-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="high"
            stackId="1"
            stroke="#ff0000"
            fill="#ff0000"
          />
          <Area
            type="monotone"
            dataKey="medium"
            stackId="1"
            stroke="#3b3838"
            fill="#3b3838"
          />
          <Area
            type="monotone"
            dataKey="normal"
            stackId="1"
            stroke="#808080"
            fill="#808080"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
