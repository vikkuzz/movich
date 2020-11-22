import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Card, Row } from 'antd';

export default class App extends Component {
  state = {};

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            maxWidth: 1010,
            background: 'white',
            height: 54,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ height: 54, display: 'flex', maxWidth: 1010 }}>
            <Menu.Item key="1">Поиск</Menu.Item>
            <Menu.Item key="2">Рейтинг</Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 80, display: 'flex', flexDirection: 'column' }}
        >
          <Row>
            <Input placeholder="Что искать?" />
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ marginTop: 10, width: 300 }} />
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
