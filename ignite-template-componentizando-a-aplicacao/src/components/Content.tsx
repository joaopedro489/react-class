import { useEffect, useState } from 'react'
import { MovieCard } from './MovieCard'
import { api } from '../services/api'
import { GenreResponse } from './SideBar'

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

interface ContainerProps {
  selectedGenreId: number
}

export function Content({ selectedGenreId }: ContainerProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>(
    {} as GenreResponse
  )

  useEffect(() => {
    api
      .get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data)
      })

    api.get<GenreResponse>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  return (
    <div className='container'>
      <header>
        <span className='category'>
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className='movies-list'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
