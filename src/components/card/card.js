import React, { Component } from 'react';
import { Rate } from 'antd';
import Rating from '../rating';
// import Genre from '../genre';
import './card.css';

import { Consumer } from '../context/context';

class Card extends Component {
  state = {
    stars: 0,
    genres: [],
  };

  handleChange = (value) => {
    this.setState({
      stars: value,
    });

    this.props.sendRate(this.props.id, value, this.props.sessionId);
  };

  render() {
    const { id, title, release_date, overview, poster_path, vote_average, genre_ids, rating } = this.props;

    const { stars, genres } = this.state;

    return (
      <Consumer>
        {({ getGenres }) => {
          getGenres(genre_ids).then((result) => {
            this.setState({
              genres: result,
            });
          });

          let idx = 999;

          const elem = genres.map((item) => {
            idx += 1;

            return (
              <div
                key={idx}
                style={{
                  background: '#FAFAFA',
                  border: '1px solid #D9D9D9',
                  borderRadius: '2px',
                  margin: '4px',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
              >
                {item}
              </div>
            );
          });

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

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{elem}</div>
              </div>
              <div className="wrap-overview">
                <div className="overview">{overview}</div>
                <Rate
                  className="stars"
                  onChange={this.handleChange}
                  value={stars}
                  count="10"
                  allowHalf="true"
                  defaultValue={rating}
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
