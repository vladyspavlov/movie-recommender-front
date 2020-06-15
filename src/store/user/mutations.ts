import { State } from './state'
import { decodeJWT } from '@/utils/decodeJWT'
import { User, Seen } from '@/types/user'
import { Movie, MovieCredits } from '@/types/movie'

export const loadState = (state: State) => {
    const vuex: State = JSON.parse(localStorage.getItem('vuex') || '{}')
    
    if (Object.keys(vuex).length > 0) {
        state = vuex
    }
}

export const setToken = (state: State, token: State['token']) => {
    state.token = token
    localStorage.setItem('token', token)
    const user: User = decodeJWT(token)
    state.user = user
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const changeTheme = (state: State) => {
    state.dark = !state.dark
}

export const logout = (state: State) => {
    state.user = {}
    state.token = ''
    state.seen = []
    localStorage.setItem('token', '')
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const setSeenMedia = (state: State, seen: Seen[]) => {
    state.seen = seen
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const addSeenMedia = (state: State, seen: Seen) => {
    state.seen.push(seen)
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const editSeenMedia = (
    state: State,
    payload: { _id: string, score: number }
) => {
    const { _id, score } = payload
    const idx = state.seen.findIndex(s => s._id === _id)

    if (idx < 0) {
        return
    }

    state.seen[idx].score = score
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const deleteSeenMedia = (state: State, id: string) => {
    const idx = state.seen.findIndex(s => s._id === id)

    if (idx < 0) {
        return
    }

    state.seen.splice(idx, 1)
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const setSearchResults = (state: State, movies: Movie[]) => {
    state.search = movies
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const setMovie = (state: State, movie: Movie) => {
    state.movie = movie
    localStorage.setItem('vuex', JSON.stringify(state))
}

export const setMovieCredits = (state: State, credits: MovieCredits) => {
    state.movie.credits = credits
    localStorage.setItem('vuex', JSON.stringify(state))
}
