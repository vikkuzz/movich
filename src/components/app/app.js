import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';
import MovieService from '../../services';
import Card from '../card';
import { Provider } from '../context/context';

export default class App extends Component {
  movies = new MovieService();

  state = {
    movieList: [],
    sessionId: null,
    guestSessionId: null,
    query: 'return',
    load: true,
    error: false,
    total: 0,
    current: 1,
    search: true,
    rated: false,
  };

  componentDidMount() {
    if (!localStorage.movich) {
      this.getGuestSession();
    } else {
      this.setState({
        guestSessionId: JSON.parse(localStorage.movich),
      });
    }

    this.getMovies(this.state.query);
  }

  componentDidUpdate(prevState) {
    if (this.state.movieList !== prevState.movieList) {
      this.render();
    }
  }

  sendRate = (idFilm, stars, sessionId = this.state.guestSessionId) => {
    this.movies.sendRate(idFilm, stars, sessionId);
  };

  getRated = (sessionId = this.state.guestSessionId) => {
    this.movies.getRatedMovies(sessionId).then((result) => {
      this.setState({
        movieList: result.results,
        total: result.total_results,
        load: false,
        search: false,
        rated: true,
      });
    });
  };

  getMovies = (query = this.state.query, page = this.state.current) => {
    this.movies.getResource(query, page).then((result) => {
      this.setState({
        movieList: result.results,
        total: result.total_results,
        load: false,
        search: true,
        rated: false,
      });
    });
  };

  getGuestSession = async () => {
    await this.movies.getSessionId().then((result) => {
      this.setState({
        guestSessionId: result,
      });
    });

    localStorage.movich = JSON.stringify(this.state.guestSessionId);
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
  };

  onChange = async (page) => {
    await this.setState({
      current: page,
    });
    this.getMovies(this.state.query, page);
  };

  render() {
    const { Header, Content, Footer } = Layout;

    const { movieList, load, error, total, current, sessionId, search, rated } = this.state;

    const errorMessage = error ? <Alert message="Что-то нае...кхм...пошло не по плану!" type="success" /> : null;
    const spinner = load ? <Spin size="large" /> : null;
    let key = null;

    let view = 'block';
    if (search) {
      view = 'block';
    }
    if (rated) {
      view = 'none';
    }

    const elem = movieList.map((item) => {
      const { ...itemProps } = item;

      if (rated) {
        key = 999 + item.id;
      }
      if (search) {
        key = item.id;
      }

      return <Card key={key} {...itemProps} sessionId={this.state.guestSessionId} sendRate={this.sendRate} />;
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
            <Menu.Item key="1" onClick={() => this.getMovies()}>
              Поиск
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.getRated()}>
              Рейтинг
            </Menu.Item>
          </Menu>
        </Header>
        <Provider value={this.movies}>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Pagination
                defaultPageSize={20}
                showSizeChanger={false}
                defaultCurrent={1}
                current={current}
                total={total}
                onChange={this.onChange}
              />
            </div>
          </Content>
        </Provider>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
