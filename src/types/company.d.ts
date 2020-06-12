export interface Company {
    tmdbId?: number
    description?: string
    headquarters?: string
    homepage?: string
    logoPath?: string | null
    name?: string
    originCountry?: string | null
    parentCompany?: string | null // ObjectId (Ref)
}
