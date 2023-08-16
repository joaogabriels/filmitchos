import HttpClient from "@/clients/http-client";

export default class TmdbClient {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.bearerToken = process.env.NEXT_PUBLIC_TMDB_KEY;
    this.httpClient = new HttpClient(this.baseUrl, this.bearerToken);
    this.defaultParams = {
      language: "pt-BR",
    };
  }

  async getPopularMovies({ page = 1}) {
    const params = {
      ...this.defaultParams,
      page,
    };

    return new Promise((resolve, reject) => { 
      try {
        const { data } = this.httpClient.get("/movie/popular", params);
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
