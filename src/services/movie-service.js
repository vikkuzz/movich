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
