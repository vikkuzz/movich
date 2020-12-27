import React, { Component } from 'react';

export default class Genre extends Component {
  state = {};

  render() {
    const { genres } = this.props;

    return (
      <>
        <div>{genres}</div>
      </>
    );
  }
}
