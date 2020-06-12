export interface User {
    email?: string
    name: string
    googleId?: string
    token?: string
}

export interface Seen {
    user: string // ObjectId
    media: string // ObjectId
    score: number
}
