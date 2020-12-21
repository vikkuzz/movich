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

  async sendRate(id, stars) {
    const session = await this.getSessionId();
    const body = {
      value: stars,
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${session}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      }
    );

    const result = await res.json();
    console.log(result);
    return result;
  }

  async getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`);

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();

    return result.genres;
  }

  async getRatedMovies() {
    const session = await this.getSessionId();

    const ratedMovies = await fetch(
      `https://api.themoviedb.org/3/guest_session/${session}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );

    const result = await ratedMovies.json();
    console.log(result);
    return result;
  }

  async getToken() {
    const token = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`);
    const result = await token.json();

    return result.request_token;
  }

  async forwardUser() {
    const newUrl = await this.getToken();
    window.location.href = `https://www.themoviedb.org/authenticate/${newUrl}?redirect_to=http://localhost:3000/approved`;
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
