export interface User {
    name?: string
    id?: string
    iat?: number
    exp?: number
}

export interface Seen {
    user: string // ObjectId
    media: string // ObjectId
    score: number
}
