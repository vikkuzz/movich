export default class MovieService {
  async getResource(req) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a7e5001cd9584cae4607d9bc812bcbd1&language=en-US&query=${req}&page=1&include_adult=false`
    );

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }

  getAllMovie(req) {
    return this.getResource(req);
  }

  getTitle(req, id) {
    const title = this.getAllMovie(req).then((body) => body.results[id].title);
    return title;
  }
}

const movie = new MovieService();
movie.getAllMovie('super').then((body) => body.results[0].overview);
movie.getTitle('super', 0);
