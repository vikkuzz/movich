import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Input, Card } from 'antd';

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout>
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: 'white',
        height: 54,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ height: 54, display: 'flex' }}>
        <Menu.Item key="1">Поиск</Menu.Item>
        <Menu.Item key="2">Рейтинг</Menu.Item>
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 80 }}>
      <Input placeholder="Что искать?" />
      <Card style={{ marginTop: 10 }} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>,
  document.getElementById('container')
);
