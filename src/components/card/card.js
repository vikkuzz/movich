import React, { Component } from 'react';

import { Rate } from 'antd';
import Rating from '../rating';
import Genre from '../genre';
import { Consumer } from '../context/context';
import './card.css';

class Card extends Component {
  state = {
    stars: 0,
  };

  componentDidMount() {
    this.handleChange(this.props.personRate);
  }

  handleChange = async (value) => {
    await this.setState({
      stars: value,
    });
    if (value > 0) {
      this.props.sendRate(this.props.id, this.state.stars, this.props.sessionId);
    }
  };

  render() {
    const { id, title, release_date, overview, poster_path, vote_average, genre_ids, personRate } = this.props;

    return (
      <Consumer>
        {({ getGenres }) => {
          const cardGenres = getGenres(genre_ids);

          return (
            <div className="card" key={id} style={{ width: 454, margin: 17, background: 'white' }}>
              <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} style={{ width: '100%' }} />
              </div>
              <div
                className="title"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h5 style={{ fontSize: 20, width: '80%' }}>{title}</h5>
                  <Rating rating={vote_average} style={{ width: '20%' }} />
                </div>
                <span style={{ fontSize: 12, color: '#827E7E' }}>{release_date}</span>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Genre cardGenres={cardGenres} />
                </div>
              </div>
              <div className="wrap-overview">
                <div className="overview">{overview}</div>
                <Rate
                  defaultValue={personRate}
                  className="stars"
                  onChange={this.handleChange}
                  count="10"
                  allowHalf="true"
                />
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Card;
