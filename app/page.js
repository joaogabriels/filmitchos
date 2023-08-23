'use client';

import useSWR from 'swr'
import { useState, useEffect } from 'react';

import httpClient from '@/clients/http-client';
import TmdbClient from '@/libs/tmbd';

import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const tmdbApi = new TmdbClient(httpClient);
  const { data, isLoading, mutate } = useSWR('movie/popular', () => tmdbApi.getPopularMovies({ url: `/movie/popular?page=${page}`, page }));

  const hanldePageChange = (value) => {
    setPage(value);
  }

  const handleLikeClick = (movieId) => {
    if(favorites.includes(movieId)) {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter((id) => id !== movieId)));

      return setFavorites(favorites.filter((id) => id !== movieId));
    }
  
    localStorage.setItem('favorites', JSON.stringify([...favorites, movieId]));

    return setFavorites([...favorites, movieId]);
  }

  const handleSearch = () => {
    searchMutate();
  }

  useEffect(() => {
    mutate(tmdbApi.getPopularMovies({ url: `/movie/popular?page=${page}`, page }));
  }, [page]);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');

    if(favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);

  const skeletons = Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} className="h-96 w-auto" />);

  if (isLoading || ! data ) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {skeletons}
      </div>
    )
  }

  const { data: { results: movies } } = data;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} setFavorite={(value) => handleLikeClick(value)} isFavorite={favorites.includes(movie.id)} />
          </div>
        ))}

        <div className="col-span-full flex items-center">
          <Button variant="outline" onClick={() => hanldePageChange(page - 1)} disabled={page === 1}>Anterior</Button>
          <span className="mx-4">{page}</span>
          <Button variant="outline" onClick={() => hanldePageChange(page + 1)}>Próximo</Button>
        </div>
      </div>
    </>
  )
}
