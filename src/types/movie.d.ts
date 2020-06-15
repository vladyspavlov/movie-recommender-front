export interface MovieTranslationData {
    title?: string
    overview?: string
    homepage?: string
}

export interface MovieTranslation {
    iso_3166_1?: string
    iso_639_1?: string
    name?: string
    data?: MovieTranslationData
}

export interface MovieTitle {
    iso_3166_1?: string
    title?: string
    type?: string
}

export interface Movie {
    adult?: boolean
    backdropPath?: string | null
    budget?: number
    genres?: string[]
    homepage?: string | null
    tmdbId?: number
    imdbId?: string | null
    originalLang?: string
    originalTitle?: string
    overview?: string | null
    popularity?: number
    posterPath?: string | null
    productionCompanies?: string[] // ObjectId[]
    productionCountries?: string[] // iso_3166_1
    releaseDate?: string
    revenue?: number
    runtime?: number | null
    spokenLangs?: string[]  // iso_639_1
    status?: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'
    tagline?: string | null
    title?: string
    voteAvg?: number
    voteCount?: number
    titles?: MovieTitle[]
    keywords?: string[]
    translations?: MovieTranslation[]
    _id?: string // ObjectId
    credits?: MovieCredits
}

export interface MovieCreditsCast {
    character: string
    order: number
}

export interface MovieCredits {
    _id?: string
    creditType?: string
    department?: string
    job?: string
    cast?: MovieCreditsCast
    name?: string
    profilePath?: string
    tmdbId?: number
    imdbId?: string
}
