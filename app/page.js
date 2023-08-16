'use client';

import useSwr from 'swr';

import HttpClient from '@/clients/http-client';

export default function Home() {
  const manager = new HttpClient(process.env.NEXT_PUBLIC_TMDB_KEY);

  const { data, error } = useSwr('/movie/popular', manager.fetcher);
  
  console.log(data, error);
  
  return (
    <div>
      teste
    </div>
  )
}
