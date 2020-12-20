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
    sessionId: null,
    query: 'return',
    load: true,
    error: false,
    total: 0,
    current: 1,
    search: true,
    rated: false,
  };

  componentDidMount() {
    this.startSession();

    this.getMovies(this.state.query);
    this.getTotal();
  }

  getRated = () => {
    this.movies.getRatedMovies().then((result) => {
      console.log(result.results);
      this.setState({
        movieList: result.results,
        search: false,
        rated: true,
      });
    });
  };

  getMovies = (query = this.state.query, page = 1) => {
    this.movies.getResource(query, page).then((result) => {
      this.setState({
        movieList: result,
        load: false,
        search: true,
        rated: false,
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

  startSession = () => {
    this.movies.getToken().then((result) => {
      this.setState({
        sessionId: result.request_token,
      });
    });
  };

  onError = () => {
    this.setState({
      error: true,
      load: true,
    });
  };

  onInput = (evt) => {
    const newQuery = evt.target.value;
    if (newQuery.length !== 0) {
      this.setState({
        query: newQuery,
      });
    }
    this.getMovies(this.state.query);
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

    const { movieList, load, error, total, current, sessionId, search, rated } = this.state;

    console.log(this.state);

    const errorMessage = error ? <Alert message="Что-то нае...кхм...пошло не по плану!" type="success" /> : null;
    const spinner = load ? <Spin /> : null;

    let view = 'block';
    if (search) {
      view = 'block';
    }
    if (rated) {
      view = 'none';
    }

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
          <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ height: 54, display: 'flex', maxWidth: 1200 }}>
            <Menu.Item key="1" onClick={this.getMovies}>
              Поиск
            </Menu.Item>
            <Menu.Item key="2" onClick={this.getRated}>
              Рейтинг
            </Menu.Item>
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
          <Input placeholder="Что искать?" onChange={debounce(this.onInput, 500)} style={{ display: view }} />

          {spinner}
          {sessionId}
          {errorMessage}
          {elem}
          <Pagination defaultCurrent={1} current={current} total={total} onChange={this.onChange} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
