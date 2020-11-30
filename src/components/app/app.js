import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Spin, Alert } from 'antd';
import MovieService from '../../services';
import Card from '../card';

export default class App extends Component {
  state = {
    movieList: [],
    load: true,
    error: false,
  };

  onError = () => {
    this.setState({
      error: true,
      load: true,
    });
  };

  render() {
    const { Header, Content, Footer } = Layout;
    const movies = new MovieService();
    const { movieList, load, error } = this.state;

    const errorMessage = error ? <Alert message="Что-то нае...кхм...пошло не по плану!" type="success" /> : null;
    const spinner = load ? <Spin /> : null;

    movies
      .getResource('return')
      .then((res) => {
        this.setState(() => {
          return {
            movieList: res.results,
            load: false,
          };
        });
      })
      .catch(this.onError);

    const elem = movieList.map((item) => {
      const { id, ...itemProps } = item;

      return <Card key={id} {...itemProps} />;
    });

    return (
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            maxWidth: 1200,
            background: 'white',
            height: 54,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ height: 54, display: 'flex', maxWidth: 1200 }}>
            <Menu.Item key="1">Поиск</Menu.Item>
            <Menu.Item key="2">Рейтинг</Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: '0 50px',
            marginTop: 80,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Input placeholder="Что искать?" />
          {spinner}
          {errorMessage}
          {elem}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
