import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input } from 'antd';
import MovieService from '../../services';

export default class App extends Component {
  state = {
    movieList: [],
  };

  render() {
    const { Header, Content, Footer } = Layout;
    const movies = new MovieService();
    const { movieList } = this.state;

    movies.getResource('return').then((res) => {
      this.setState(() => {
        return {
          movieList: res.results,
        };
      });
    });
    const elem = movieList.map((item) => {
      const { id } = item;
      return (
        <div key={id} style={{ width: 454, display: 'flex', margin: 17, background: 'white' }}>
          <div style={{ width: '40%' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              style={{ width: '100%' }}
            />
          </div>
          <div
            style={{
              width: '60%',
              paddingTop: 12,
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <span>{item.title}</span>
            <span>{item.release_date}</span>
            <div>
              <span>Action</span>
              <span>Drama</span>
            </div>
            <span style={{ maxHeight: '11rem', overflow: 'hidden' }}>{item.overview}</span>
          </div>
        </div>
      );
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

          {elem}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
