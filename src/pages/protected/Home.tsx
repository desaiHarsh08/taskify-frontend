// import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  ComposedChart,
//   Area,
} from "recharts";
import { Container, Row, Col, Card } from "react-bootstrap";
import TaskStatsComponent from "@/components/home/TaskStatsComponent";

export default function Home() {
  const monthlyTasks = [
    { month: "Jan", tasks: 40, highPriority: 10, completed: 20, pending: 20 },
    { month: "Feb", tasks: 30, highPriority: 5, completed: 15, pending: 15 },
    { month: "Mar", tasks: 50, highPriority: 20, completed: 30, pending: 20 },
    { month: "Apr", tasks: 70, highPriority: 25, completed: 40, pending: 30 },
  ];

  const taskTypes = [
    { name: "Bug", value: 40 },
    { name: "Feature", value: 30 },
    { name: "Improvement", value: 20 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const highPriorityJobTasks = [
    { month: "Jan", job1: 10, job2: 5 },
    { month: "Feb", job1: 15, job2: 10 },
    { month: "Mar", job1: 20, job2: 15 },
    { month: "Apr", job1: 25, job2: 20 },
  ];

  return (
    <Container fluid className="bg-light py-4">
      <TaskStatsComponent />
      {/* <h1 className="text-center mb-5">Dashboard Statistics</h1> */}
      <Row className="g-4">
        {/* Tasks Created Each Month */}
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Tasks Created Each Month</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyTasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* High Priority Tasks */}
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>High Priority Tasks</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={monthlyTasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="highPriority" fill="#FF8042" />
                  <Line
                    type="monotone"
                    dataKey="highPriority"
                    stroke="#FF8042"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Types of Tasks */}
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Types of Tasks</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={taskTypes}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    label
                  >
                    {taskTypes.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* High Priority Tasks by Job */}
        <Col md={6} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>High Priority Tasks by Job</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={highPriorityJobTasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="job1" stroke="#8884d8" />
                  <Line type="monotone" dataKey="job2" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Completed Tasks */}
        <Col md={6} lg={3}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Completed Tasks</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyTasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Pending Tasks */}
        <Col md={6} lg={3}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Pending Tasks</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyTasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pending" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
