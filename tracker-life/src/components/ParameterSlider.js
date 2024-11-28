import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const ParameterSlider = ({ name, value, onChange }) => {
    // Обработка изменений значения
    const handleSliderChange = (newValue) => {
        onChange(name, newValue);
    };

    const handleInputChange = (newValue) => {
        onChange(name, newValue || 0); // Если значение null, ставим 0
    };

    return (
        <Row align="middle" gutter={[16, 16]} style={{ marginBottom: '20px' }}>
            {/* Название параметра */}
            <Col xs={24} sm={8} style={{ textAlign: 'left', fontWeight: 'bold' }}>
                {name}
            </Col>

            {/* Ползунок */}
            <Col xs={16} sm={12}>
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={value}
                    onChange={handleSliderChange}
                />
            </Col>

            {/* Числовой ввод */}
            <Col xs={8} sm={4}>
                <InputNumber
                    min={0}
                    max={100}
                    value={value}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                />
            </Col>
        </Row>
    );
};

export default ParameterSlider;
