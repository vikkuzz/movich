export default class MovieService {
  apiKey = 'a7e5001cd9584cae4607d9bc812bcbd1';

  address = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}`;

  async getResource(req, page) {
    const res = await fetch(`${this.address}&query=${req}&page=${page}`);

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }

  address = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}`;

  async sendRate(id, stars, sessionId) {
    const body = {
      value: stars,
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      }
    );

    const result = await res.json();

    return result;
  }

  async getGenres(array = []) {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a7e5001cd9584cae4607d9bc812bcbd1&language=en-US`
    );

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();

    const genr = result.genres;

    const names = [];

    for (let i = 0; i < genr.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[j] === genr[i].id) {
          names.push(genr[i].name);
        }
      }
    }

    return names;
  }

  async getRatedMovies(sessionId) {
    const ratedMovies = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );

    const result = await ratedMovies.json();

    return result;
  }

  async getRate(id, sessionId) {
    let rate = null;
    await this.getRatedMovies(sessionId).then((result) => {
      rate = result.results.filter((item) => {
        if (item.id === id) {
          return item;
        }
        return null;
      });
    });

    return rate;
  }

  async getSessionId() {
    const guestSession = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`
    ).then((res) => res.json());

    return guestSession.guest_session_id;
  }

  async getPage(req, page) {
    const res = await fetch(`${this.address}&query=${req}&page=${page}`);

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();
    return result.results;
  }
}
