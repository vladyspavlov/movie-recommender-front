import httpClient from './httpClient'
import { Person } from '../types/person'

const endpoint = '/persons'

export const getPerson = (id: string) => {
    return httpClient.get<{ person: Person }>(endpoint + '/' + id)
}

export const getPopularPersons = (limit?: number) => {
    return httpClient.get<{ persons: Person[] }>(endpoint + '/popular', {
        params: { limit }
    })
}
