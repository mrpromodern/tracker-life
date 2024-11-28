import React, { useState } from 'react';
import { Row, Col, Button, message, Typography } from 'antd';
import ParameterSlider from '../components/ParameterSlider';
import SummaryChart from '../components/SummaryChart';

const { Title } = Typography;

const initialParameters = {
  Work: 40,
  Family: 30,
  Health: 20,
  Leisure: 10,
};

const Dashboard = () => {
  const [parameters, setParameters] = useState(initialParameters);

  const maxTotal = 100; // Максимальная сумма параметров
  const currentTotal = Object.values(parameters).reduce((acc, val) => acc + val, 0);

  const handleChange = (name, value) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (currentTotal !== maxTotal) {
      message.error('The total must equal 100%.');
      return;
    }
    console.log('Saved:', parameters);
    message.success('Settings saved successfully!');
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: 'center', width: "100%" }}>
        <Title level={1} style={{ color: '#1890ff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          Качество жизни
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {Object.entries(parameters).map(([name, value]) => (
          <Col xs={24} sm={12} lg={8} key={name}>
            <ParameterSlider name={name} value={value} onChange={handleChange} />
          </Col>
        ))}
      </Row>
      <Button type="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
        Save Settings
      </Button>
      <div style={{ marginTop: '40px' }}>
        <SummaryChart parameters={parameters} />
      </div>
    </div>
  );
};

export default Dashboard;
