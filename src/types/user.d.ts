export interface User {
    name?: string
    id?: string
    iat?: number
    exp?: number
}

export interface Seen {
    _id: string // ObjectId
    media: string // ObjectId
    score: number
    title: string
    posterPath: string
}
