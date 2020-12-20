import React, { Component } from 'react';

export default class Rating extends Component {
  state = {};

  render() {
    const { rating } = this.props;
    let color = `#E90000`;

    if (rating <= 3) {
      color = `#E90000`;
    }
    if (rating > 3 && rating <= 5) {
      color = `#E97E00`;
    }
    if (rating > 5 && rating <= 7) {
      color = `#E9D100`;
    }
    if (rating > 7) {
      color = `#66E900`;
    }

    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `2px solid ${color}`,
            borderRadius: 50,
            width: 30,
            height: 30,
            minWidth: 30,
            minHeight: 30,
          }}
        >
          {rating}
        </div>
      </>
    );
  }
}
