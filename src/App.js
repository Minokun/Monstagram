import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button , Icon , Row , Col} from 'antd';

class AppHeader extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">Monstagram</h2>
          </Col>
          <Col span={6}>
            <span className="App-user"><Icon type="user" /></span>
          </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AppHeader;
