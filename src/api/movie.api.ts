import httpClient from './httpClient'
import { Movie, MovieCredits } from '../types/movie'

const endpoint = '/movies'

export const getMovie = (id: string) => {
    return httpClient.get<{ movie: Movie }>(endpoint + '/movie/' + id)
}

export const getMovieCredits = (id: string) => {
    return httpClient.get<{ credits: MovieCredits }>(endpoint + '/movie/' + id + '/credits')
}

export const searchMovie = (text: string) => {
    return httpClient.get<{ movies: Movie[] }>(endpoint + '/search', {
        params: { s: text },
        timeout: 15000
    })
}

export const getPopularMovies = (limit?: number) => {
    return httpClient.get<{ movies: Movie[] }>(endpoint + '/popular', {
        params: { limit }
    })
}
