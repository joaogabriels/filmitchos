import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function MovieCard({ movie }) {
  return (
    <Card className="min-h-[26rem] max-h-[26rem]:">
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="truncate">{movie.overview}</CardDescription>
      </CardContent>

      <CardFooter>
        <span>{movie.vote_average}</span>
      </CardFooter>
    </Card>
  )
}
