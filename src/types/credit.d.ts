export interface CreditCast {
    character?: string
    order?: number
}

export interface Credit {
    creditType?: string
    department?: string
    job?: string
    cast?: CreditCast | null
    media: string // ObjectId
    person: string // ObjectId
}
