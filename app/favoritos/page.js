'use client';

import useSWR from 'swr'

import httpClient from '@/clients/http-client';
import TmdbClient from '@/libs/tmbd';

export default function Favoritos() {
  const tmdbApi = new TmdbClient(httpClient);

  const { data, error } = useSWR('/movie/popular', () => tmdbApi.getPopularMovies({ url: '/movie/popular', page: 1 }))

  console.log(data, error);

  return (
    <div>
      Favoritos
    </div>
  )
}
