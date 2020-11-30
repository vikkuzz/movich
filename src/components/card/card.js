import React, { Component } from 'react';

class Card extends Component {
  state = {};

  render() {
    const { id, title, releas_date, overview, poster_path } = this.props;

    return (
      <div key={id} style={{ width: 454, display: 'flex', margin: 17, background: 'white' }}>
        <div style={{ width: '40%' }}>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} style={{ width: '100%' }} />
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
          <span>{title}</span>
          <span>{releas_date}</span>
          <div>
            <span>Action</span>
            <span>Drama</span>
          </div>
          <span style={{ maxHeight: '11rem', overflow: 'hidden' }}>{overview}</span>
        </div>
      </div>
    );
  }
}
export default Card;
