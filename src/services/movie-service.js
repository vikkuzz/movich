export default class MovieService {
  address = 'https://api.themoviedb.org/3/search/movie?api_key=a7e5001cd9584cae4607d9bc812bcbd1';

  async getResource(req, page) {
    const res = await fetch(`${this.address}&query=${req}&page=${page}`);

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();
    return result.results;
  }

  async getRatedMovies() {
    const session = await this.getSessionId();

    const ratedMovies = await fetch(
      `https://api.themoviedb.org/3/guest_session/${session}/rated/movies?api_key=a7e5001cd9584cae4607d9bc812bcbd1&language=en-US&sort_by=created_at.asc`
    );

    const result = await ratedMovies.json();

    return result;
  }

  async getToken() {
    const token = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=a7e5001cd9584cae4607d9bc812bcbd1`
    );
    const result = await token.json();

    return result.request_token;
  }

  async forwardUser() {
    const newUrl = await this.getToken();
    window.location.href = `https://www.themoviedb.org/authenticate/${newUrl}?redirect_to=http://localhost:3000/approved`;
  }

  async getSessionId() {
    const guestSession = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a7e5001cd9584cae4607d9bc812bcbd1`
    ).then((res) => res.json());

    return guestSession.guest_session_id;
  }

  async getTotal(req) {
    const res = await fetch(`${this.address}&query=${req}`);

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();
    return result.total_results;
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
