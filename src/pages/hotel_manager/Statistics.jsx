import React, { useState } from 'react';
import { Card, Row, Col, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const { Option } = Select;

const barData = {
  week: [
    { name: 'Mon', value: 50 },
    { name: 'Tue', value: 70 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 80 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 100 },
    { name: 'Sun', value: 110 },
  ],
  month: [
    { name: 'Week 1', value: 300 },
    { name: 'Week 2', value: 400 },
    { name: 'Week 3', value: 350 },
    { name: 'Week 4', value: 450 },
  ],
  year: [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1100 },
    { name: 'Mar', value: 1300 },
    { name: 'Apr', value: 1400 },
    { name: 'May', value: 1500 },
    { name: 'Jun', value: 1600 },
    { name: 'Jul', value: 1700 },
    { name: 'Aug', value: 1800 },
    { name: 'Sep', value: 1900 },
    { name: 'Oct', value: 2000 },
    { name: 'Nov', value: 2100 },
    { name: 'Dec', value: 2200 },
  ],
};

const pieData = [
  { name: 'Income', value: 50000 },
  { name: 'Bookings', value: 300 },
  { name: 'Occupancy', value: 80 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const HotelStatistics = () => {
  const [timeFrame, setTimeFrame] = useState('week');

  const handleChange = (value) => {
    setTimeFrame(value);
  };

  return (
    <Row gutter={16} style={{ marginTop: '20px' }}>
      <Col span={12}>
        <Card title="Statistical Data">
          <ul>
            <li>Income: $50,000</li>
            <li>Bookings: 300</li>
            <li>Occupancy: 80%</li>
          </ul>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Pie Chart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Bar Chart">
          <Select defaultValue="week" style={{ width: 120, marginBottom: '20px' }} onChange={handleChange}>
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
            <Option value="year">Year</Option>
          </Select>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData[timeFrame]}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default HotelStatistics;