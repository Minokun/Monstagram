import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Icon , Row , Col , Dropdown , message , Menu } from 'antd';

const onClick = function ({ key }) {
  message.info(`Click on item ${key}`);
};

var cookie = true;

const menu = (
    <Menu onClick={(onClick)}>
        {cookie ? <Menu.Item key="2"><Icon type="camera" /> 作品发布</Menu.Item> : <Menu.Item key="3"><Icon type="camera" /> 账号登录</Menu.Item>}
    </Menu>
);

class AppHeader extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Row>
          <Col span={8}></Col>
          <Col span={12}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">Monstagram</h2>
          </Col>
          <Col span={4}>
            <span className="App-user">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="user" style={{ fontSize: 24 }}/>
                </a>
              </Dropdown>
            </span>
          </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AppHeader;
