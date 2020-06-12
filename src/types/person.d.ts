export interface PersonTranslationData {
    bio?: string
}

export interface PersonTranslation {
    iso_639_1?: string
    iso_3166_1?: string
    name?: string
    data?: PersonTranslationData
}

export interface Person {
    name?: string
    gender?: number
    tmdbId?: number
    imdbId?: string | null
    knownAs?: string[]
    birthday?: string | null
    birthplace?: string | null
    deathday?: string | null
    department?: string
    adult?: boolean
    profilePath?: string | null
    bio?: string
    homepage?: string | null
    popularity?: number
    translations?: PersonTranslation[]
}
