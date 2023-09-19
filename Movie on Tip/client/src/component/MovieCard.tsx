import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
    addMovieToFavourites,
    removeMovieFromFavourites,
    fetchFavouriteMovies,
} from "../service/FetchData"
import "../styles/MovieCard.css"
import { ImHeart, ImCross } from "react-icons/im"
import IMovieList from "../model/IMovieList"

type MovieCardProps = {
    movie: IMovieList
    tabName: string | undefined
    fetchMovies(): void
}

const MovieCard = ({ movie, tabName, fetchMovies }: MovieCardProps) => {
    const navigate = useNavigate()

    const addToFav = async (movie: IMovieList) => {
        let favorites = await fetchFavouriteMovies()

        let movieAlreadyexists = favorites.some(
            (favoriteMovie: IMovieList) => favoriteMovie.title === movie.title
        )

        if (movieAlreadyexists) {
            toast.error(`Error! ${movie.title} is already added to favourites!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            })
            return
        }

        const response = await addMovieToFavourites(movie)

        if (response === 201) {
            toast.success(`${movie.title} added to favourites successfully!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            })
        } else {
            console.log(response)
        }
    }

    const removeFromFav = async (movie: IMovieList) => {
        const movieDetails = await fetchFavouriteMovies(movie.title)
        const response = await removeMovieFromFavourites(movieDetails[0].id)

        if (response === 200) {
            toast.success(`${movie.title} removed from favourites!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            })
            /*The function received as prop from parent component is  
            being used to re-render the page.*/
            fetchMovies()
        }
    }

    const imageClick = async (movie: IMovieList) => {
        let url = `/${movie.title}`
        navigate(url, { state: { tab: tabName, id: movie.id } })
    }

    return (
        <div className="movie-card" key={movie.id}>
            <img
                src={movie.posterurl}
                alt={movie.title}
                className="movie-card__image"
                onClick={() => imageClick(movie)}
            />
            <div className="movie-card__details">
                <h2 className="movie-card__title">{movie.title}</h2>
                {tabName == "favourite" ? (
                    <>
                        <button className="Favourites" onClick={() => removeFromFav(movie)}>
                            Remove from Favourites <ImCross />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="Favourites" onClick={() => addToFav(movie)}>
                            Add to Favourites <ImHeart />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default MovieCard