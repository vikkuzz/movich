import React, { Component } from 'react';

export default class Genre extends Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    this.getGenres();
  }

  getGenres = () => {
    this.props.cardGenres.then((result) =>
      this.setState({
        genres: result,
      })
    );
  };

  render() {
    const { genres } = this.state;
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

    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{elem}</div>;
  }
}
