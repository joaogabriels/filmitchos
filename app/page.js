'use client';

import useSWR from 'swr'
import { useState, useEffect, useMemo } from 'react';

import httpClient from '@/clients/http-client';

import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';

import TmdbClient from '@/libs/tmbd';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [title, setTite] = useState('');
  const tmbdApi = useMemo(() => new TmdbClient(httpClient), []);
  const { data, isLoading, mutate } = useSWR('movie/popular', () => tmbdApi.getPopularMovies({ url: `/movie/popular?page=${page}`, page }));

  const hanldePageChange = (value) => {
    setPage(value);
  }

  const handleLikeClick = (movie) => {
    if(favorites.length === 0) {
      localStorage.setItem('favorites', JSON.stringify([movie]));

      return setFavorites([movie]);
    }

    favorites.map((favorite) => {
      if(favorite.id === movie.id) {
        const newFavorites = favorites.filter((favorite) => favorite.id !== movie.id);

        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        return setFavorites(newFavorites);
      }

      const newFavorites = [...favorites, movie];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return setFavorites(newFavorites);
    });
  }
  
  const isFavorite = (movie) => {
    return favorites.some((favorite) => favorite.id === movie.id);
  }

  useEffect(() => {
    mutate(tmbdApi.getPopularMovies({ url: `/movie/popular?page=${page}`, page }));
  }, [mutate, page, tmbdApi]);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');

    if(favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);

  useEffect(() => {
    if(data) {
      const { data: { results } } = data;

      setMovies(results);
    }
  }, [data]);

  const skeletons = Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} className="h-96 w-auto" />);

  if (isLoading || ! data || movies.length === 0 ) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {skeletons}
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-8 mb-6">
        <Input type="text" placeholder="Filtrar por título" onChange={(event) => setTite(event.target.value)} />

        <Button onClick={() => handleTitleFilter()}>Filtrar</Button>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} setFavorite={(value) => handleLikeClick(value)} isFavorite={isFavorite(movie)} />
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
