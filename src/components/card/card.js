import React, { Component } from 'react';
import { Rate } from 'antd';
import Rating from '../rating';
import Genre from '../genre';
import './card.css';
import MovieService from '../../services';

class Card extends Component {
  state = {
    value: 0,
  };

  cards = new MovieService();

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { id, title, release_date, overview, poster_path, vote_average, genre_ids } = this.props;
    const { value } = this.state;

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

          <div>
            <Genre genres={genre_ids} />
          </div>
        </div>
        <div className="wrap-overview">
          <div className="overview">{overview}</div>
          <Rate
            className="stars"
            onChange={this.handleChange}
            value={value}
            count="10"
            allowHalf="true"
            defaultValue="0"
          />
        </div>
      </div>
    );
  }
}
export default Card;
