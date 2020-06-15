import { User, Seen, Recommendation } from '@/types/user'
import { Movie } from '@/types/movie'

export interface State {
    user: User,
    seen: Seen[],
    dark: boolean,
    token: string,
    search: Movie[],
    movie: Movie,
    recommendations: Recommendation[]
}

const initState: State = {
    user: {},
    seen: [],
    dark: false,
    token: '',
    search: [],
    movie: {},
    recommendations: []
}

export default initState