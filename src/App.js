import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppLogin from './Login.js';
import AppPublic from './Public.js';
import AppLogout from './Logout.js';
import AppCreate from './CreateUser.js';
import { Icon , Row , Col , Dropdown , Menu } from 'antd';

var cookie = localStorage.getItem("user_id") || sessionStorage.getItem("user_id");
var username = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : sessionStorage.getItem("nickname");
const menu = (
    <Menu>
        {cookie ? <Menu.Item >你好！{username}</Menu.Item> : null}
        {cookie ? <Menu.Item key="1"><AppPublic /></Menu.Item> : <Menu.Item key="1"><AppLogin /></Menu.Item>}
        {cookie ? <Menu.Item key="2"><AppLogout /></Menu.Item> : <Menu.Item key="2"><AppCreate /></Menu.Item>}
    </Menu>
);

class AppHeader extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Row>
          <Col span={4}></Col>
          <Col span={14}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">Monstagram</h2>
          </Col>
            
          <Col span={4}>
            <span className="App-user">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
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
