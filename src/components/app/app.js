import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';
import MovieService from '../../services';
import Card from '../card';

export default class App extends Component {
  movies = new MovieService();

  state = {
    movieList: [],
    query: 'return',
    load: true,
    error: false,
    total: 0,
    current: 1,
  };

  constructor() {
    super();
    this.getMovies(this.state.query);
    this.getTotal();
  }

  getMovies = (query, page = 1) => {
    this.movies.getResource(query, page).then((result) => {
      this.setState({
        movieList: result,
        load: false,
      });
    });
  };

  getTotal() {
    this.movies.getTotal(this.state.query).then((result) => {
      this.setState({
        total: result,
      });
    });
  }

  onError = () => {
    this.setState({
      error: true,
      load: true,
    });
  };

  onInput = (evt) => {
    const newQuery = evt.target.value;
    this.setState({
      query: newQuery,
    });
    this.getMovies();
    this.getTotal();
  };

  onChange = (page) => {
    this.getMovies(this.state.query, page);

    this.setState({
      current: page,
    });
  };

  render() {
    const { Header, Content, Footer } = Layout;

    const { movieList, load, error, total, current } = this.state;

    const errorMessage = error ? <Alert message="Что-то нае...кхм...пошло не по плану!" type="success" /> : null;
    const spinner = load ? <Spin /> : null;

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
          <Input placeholder="Что искать?" onChange={debounce(this.onInput, 500)} />

          {spinner}
          {errorMessage}
          {elem}
          <Pagination defaultCurrent={1} current={current} total={total} onChange={this.onChange} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
