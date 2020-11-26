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

  async gettitle() {
    const title = await this.getResource('return').then((res) => {
      const arrMov = [...res.results];
      return arrMov[0].title;
    });

    return title;
  }
}
