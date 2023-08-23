"use client";

import { useState, useEffect } from "react";

import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const handleLikeClick = (movie) => {
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

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    
    if(favorites) {
      setFavorites(JSON.parse(favorites));
    }

    setHasFetched(true);
  }, []);
  
  
  const skeletons = Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} className="h-96 w-auto" />);

  if(! hasFetched) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {skeletons}
      </div>
    )
  }

  if(favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Você ainda não tem favoritos</h1>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
      {favorites.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} setFavorite={(value) => handleLikeClick(value)} isFavorite />
        </div>
      ))}
    </div>
  )
}
