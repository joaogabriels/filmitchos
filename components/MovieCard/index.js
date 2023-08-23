import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Star } from "lucide-react"

import Image from "next/image"
import { Button } from "../ui/button"

export default function MovieCard({ movie, isFavorite, setFavorite }) {
  const handleFavorite = () => {
    setFavorite(movie);
  }

  const handleFavoriteStyle = () => {
    return isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'
  }

  return (
    <Card className="min-h-[26rem] max-h-[26rem]:">
      <CardHeader>
        <CardTitle className="truncate" title={movie.title}>{movie.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={650}
          layout="responsive"
          className="rounded-md"
        />

        <CardDescription className="truncate mt-16">{movie.overview}</CardDescription>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Star className=" text-yellow-500" />

          <span>{movie.vote_average}</span>
        </div>

        <Button variant="outline" onClick={() => handleFavorite()}>
          <Heart className={handleFavoriteStyle()}/>
        </Button>
      </CardFooter>
    </Card>
  )
}
