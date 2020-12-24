import React, { Component } from 'react';
import { Rate } from 'antd';
import Rating from '../rating';
import Genre from '../genre';
import './card.css';
import MovieService from '../../services';

class Card extends Component {
  cards = new MovieService();

  state = {
    stars: 0,
  };

  handleChange = (value) => {
    this.setState({
      stars: value,
    });

    this.props.sendRate(this.props.id, value, this.props.sessionId);
  };

  render() {
    const { id, title, release_date, overview, poster_path, vote_average, genre_ids, rating } = this.props;

    const { stars } = this.state;

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
            value={stars}
            count="10"
            allowHalf="true"
            defaultValue={rating}
          />
        </div>
      </div>
    );
  }
}
export default Card;
