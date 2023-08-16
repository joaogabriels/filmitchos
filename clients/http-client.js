import axios from 'axios';

export default class HttpClient {
  constructor(bearerToken) {  
    this.axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    })
  }

  async fetcher(url) {
    return axios.get(url, { headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    }}).then((res) => res.data);
  }
}
