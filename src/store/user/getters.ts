import { State } from './state'

export const user = (state: State) => state.user
export const seen = (state: State) => state.seen
export const dark = (state: State) => state.dark
export const token = (state: State) => state.token
export const search = (state: State) => state.search
export const searchSeen = (state: State) => {
    return state.search.map(s => {
        const seen = state.seen.find(media => s._id === media.media)
        let seenId = ''
        let rated = false
        let score = 0

        if (seen) {
            seenId = seen._id
            rated = true
            score = seen.score
        }

        return { ...s, seenId, rated, score }
    })
}
export const movie = (state: State) => state.movie
export const recommendations = (state: State) => state.recommendations
