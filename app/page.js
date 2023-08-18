'use client';

import useSWR from 'swr'
import { useState, useEffect } from 'react';

import httpClient from '@/clients/http-client';
import TmdbClient from '@/libs/tmbd';

import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/MovieCard';

export default function Home() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const tmdbApi = new TmdbClient(httpClient);

  const { data, error, isLoading, mutate } = useSWR('/movie/popular', () => tmdbApi.getPopularMovies({ url: `/movie/popular?page=${page}`, page: 1 }));

  const skeletons = Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} className="h-96 w-auto" />);

  useEffect(() => {
    if(page > 1) {
      mutate(tmdbApi.getPopularMovies({ url: `/movie/popular?page=${page}`, page: 1 }));
    } 
  }, [page]);

  if (isLoading && ! data) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {skeletons}
      </div>
    )
  }

  const { data: {results: movies} } = data;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}

      <div className="col-span-full flex justify-center">
        <button onClick={() => setPage((prevPage) => prevPage + 1)} type='button'>Proxima página</button>
      </div>
    </div>
  )
}
