import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import IMovieList from "../model/IMovieList"
import { fetchMoviesList } from "../service/FetchData"
import MovieCard from "./MovieCard"

type Props = {
    searchValue: string
}

export default function Main({ searchValue }: Props) {
    const [moviesData, setMoviesData] = useState<IMovieList[]>([])
    const [filteredMovies, setFilteredMovies] = useState<IMovieList[]>([])
    const location = useLocation()

    let tabName: string | undefined = location.state?.tab || "movies-in-theaters"

    const fetchMovies = async () => {
        try {
            const movies = await fetchMoviesList(tabName)
            setMoviesData(movies)
        } catch (error: any) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [tabName])

    useEffect(() => {
        const filteredData = searchValue
            ? moviesData.filter((movie) =>
                movie.title.toLowerCase().includes(searchValue)
            )
            : moviesData
        setFilteredMovies(filteredData)
    }, [moviesData, searchValue])

    return (
        <>
            {filteredMovies.map((movie) => {
                return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        tabName={tabName}
                        fetchMovies={fetchMovies}
                    />
                )
            })}
        </>
    )
}