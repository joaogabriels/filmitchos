'use client';

import { useUser } from "@clerk/nextjs";

export default function Favoritos() {
  const { isSignedIn, isLoading, user } = useUser()

  console.log(isSignedIn, isLoading, user);

  return (
    <div>
      Favoritos
    </div>
  )
}
