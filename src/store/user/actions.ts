import { Commit } from 'vuex'
import { State } from './state'
import { verifyGoogleLogin } from '@/api/auth.api'
import { deleteUser, getSeenMedia, addSeenMedia, updateSeenMedia, deleteSeenMedia } from '@/api/user.api'
import { getMovie, searchMovie, getMovieCredits } from '@/api/movie.api'

export const authGoogle = async (
    ctx: { commit: Commit, state: State },
    idToken: string
) => {
    try {
        const res = await verifyGoogleLogin(idToken)
        ctx.commit('setToken', res.data.token)
    } catch (e) {
        
    }
}

export const deleteAccount = async (
    ctx: { commit: Commit, state: State }
) => {
    try {
        const res = await deleteUser()
        ctx.commit('logout')
    } catch (e) {
        console.error(e)
    }
}

export const loadSeen = async (
    ctx: { commit: Commit, state: State }
) => {
    try {
        const res = await getSeenMedia()
        ctx.commit('setSeenMedia', res.data.seen)
    } catch (e) {
        console.error(e)
    }
}

export const addSeen = async (
    ctx: { commit: Commit, state: State },
    payload: { id: string, score: number }
) => {
    try {
        const { id, score } = payload
        const res = await addSeenMedia({ media: id, score })
        ctx.commit('addSeenMedia', res.data.seen)
    } catch (e) {
        console.error(e)
    }
}

export const editSeen = async (
    ctx: { commit: Commit, state: State },
    payload: { id: string, score: number }
) => {
    try {
        const { id, ...body } = payload
        const res = await updateSeenMedia(id, body)
        ctx.commit('editSeenMedia', res.data.seen)
    } catch (e) {
        console.error(e)
    }
}

export const deleteSeen = async (
    ctx: { commit: Commit, state: State },
    id: string
) => {
    try {
        const res = await deleteSeenMedia(id)
        ctx.commit('deleteSeenMedia', id)
    } catch (e) {
        console.error(e)
    }
}

export const loadMovie = async (
    ctx: { commit: Commit, state: State },
    id: string
) => {
    try {
        const res = await getMovie(id)
        ctx.commit('setMovie', res.data.movie)
    } catch (e) {
        console.error(e)
    }
}

export const loadMovieCredits = async (
    ctx: { commit: Commit, state: State },
    id: string
) => {
    try {
        const res = await getMovieCredits(id)
        ctx.commit('setMovieCredits', res.data.credits)
    } catch (e) {
        console.error(e)
    }
}

export const search = async (
    ctx: { commit: Commit, state: State },
    text: string
) => {
    try {
        const res = await searchMovie(text)
        ctx.commit('setSearchResults', res.data.movies)
    } catch (e) {
        console.error(e)
    }
}
