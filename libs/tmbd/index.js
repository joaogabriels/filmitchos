export default class TmdbClient {
  constructor(httpClient) {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.defaultParams = {  language: "pt-BR" };
    this.httpClient = httpClient;
  }

  async getPopularMovies({ url, page = 1 }) {
    const params = {
      ...this.defaultParams,
      page,
    };

    return new Promise((resolve, reject) => { 
      try {
        const data = this.httpClient.get(`${this.baseUrl}${url}`, params);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async searchMovie({ url, query }) {
    const params = {
      ...this.defaultParams,
      query,
    };

    return new Promise((resolve, reject) => { 
      try {
        const data = this.httpClient.get(`${this.baseUrl}${url}`, params);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
