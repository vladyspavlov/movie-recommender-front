import httpClient from './httpClient'
import { Seen, Recommendations } from '../types/user'

const endpoint = '/user'

export const deleteUser = () => {
    return httpClient.delete(endpoint)
}

export const getSeenMedia = () => {
    return httpClient.get<{ seen: Seen[] }>(endpoint + '/seen')
}

export const addSeenMedia = (
    body: { media: string, score: number }
) => {
    return httpClient.post<{ seen: Seen }>(endpoint + '/seen', { ...body })
}

export const updateSeenMedia = (
    id: string,
    body: { score: number }
) => {
    return httpClient.post<{ seen: Seen }>(endpoint + '/seen/' + id, { ...body })
}

export const deleteSeenMedia = (id: string) => {
    return httpClient.delete(endpoint + '/seen/' + id)
}

export const getRecommendations = () => {
    return httpClient.get<{ recommendations: Recommendations }>(endpoint + '/recommendations')
}
