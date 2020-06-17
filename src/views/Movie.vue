<template>
    <v-row>
        <v-col cols="12" v-if="loader">
            <div class="text-center">
                <v-progress-circular indeterminate size="64" />
            </div>
        </v-col>
        <template v-else>
            <v-col cols="12">
                <v-card>
                    <v-row no-gutters class="overflow-hidden">
                        <v-col cols="12" sm="4">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-img
                                        v-if="movie.posterPath"
                                        :src="'https://image.tmdb.org/t/p/w300' + movie.posterPath"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                                <v-progress-circular indeterminate />
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <div class="d-flex align-center justify-center">
                                        <v-btn
                                            v-if="rated"
                                            icon
                                            class="mr-2"
                                            @click="onDeleteSeen"
                                        >
                                            <v-icon>mdi-close-circle</v-icon>
                                        </v-btn>
                                        <v-rating
                                            v-model="ratedScore"
                                            color="amber"
                                            background-color="amber"
                                            half-increments
                                            hover
                                            large
                                            @input="onEditSeen"
                                        />
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-card-title>
                                <h1>{{ movie.title }}</h1>
                                <h2 v-if="movie.releaseDate" class="grey--text ml-3">({{ releaseYear }})</h2>
                            </v-card-title>
                            <v-card-subtitle>{{ movie.tagline }}</v-card-subtitle>
                            <v-card-text>
                                <ul class="facts mb-3">
                                    <li class="mr-3 d-inline-flex align-center">
                                        <v-icon small class="mr-1">mdi-calendar</v-icon>
                                        <span>{{ releaseDate }}</span>
                                    </li>
                                    <li class="mx-3 d-inline-flex align-center">
                                        <v-icon small class="mr-1">mdi-tag-multiple</v-icon>
                                        <span>{{ genres }}</span>
                                    </li>
                                    <li class="ml-3 d-inline-flex align-center">
                                        <v-icon small class="mr-1">mdi-clock-time-four-outline</v-icon>
                                        <span>{{ runtime }}</span>
                                    </li>
                                </ul>
                                <div class="my-3">
                                    <h2 class="mb-2">Overview</h2>
                                    <div>{{ movie.overview }}</div>
                                </div>
                                <div class="my-3">
                                    <h2 class="mb-2">Cast</h2>
                                    <ul class="scroller">
                                        <li v-for="person of cast" :key="person._id">
                                            <movie-cast-card
                                                :name="person.name"
                                                :character="person.cast.character"
                                                :profilePath="person.profilePath ? person.profilePath : 'Null'"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div class="my-3">
                                    <h2>Keywords</h2>
                                    <v-chip
                                        v-for="keyword in movie.keywords"
                                        :key="keyword"
                                        label
                                        class="ma-2"
                                    >{{ keyword }}</v-chip>
                                </div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-divider />
                        <h1 class="mt-2">Related</h1>
                    </v-col>
                    <v-col
                        v-for="movie of movie.related"
                        :key="movie._id"
                    >
                        <movie-related-item
                            :id="movie._id"
                            :title="movie.title"
                            :poster="movie.posterPath"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </template>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import MovieCastCard from '@/components/MovieCastCard.vue'
import MovieRelatedItem from '@/components/MovieRelatedItem.vue'
import { MovieCredits } from '../types/movie'
import { Seen } from '../types/user'

export default Vue.extend({
    components: {
        MovieCastCard,
        MovieRelatedItem
    },
    data: () => ({
        loader: false,
        ratedScore: 0,
        seenId: '',
    }),
    async mounted() {
        this.loader = true
        await this.$store.dispatch('loadMovie', this.$route.params.id)
        await this.$store.dispatch('loadMovieCredits', this.$route.params.id)
        await this.$store.dispatch('loadMovieRelated', this.$route.params.id)
        this.loader = false
    },
    computed: {
        ...mapGetters([ 'movie', 'seen' ]),
        releaseYear() {
            return (new Date(this.movie.releaseDate)).getFullYear()
        },
        releaseDate() {
            const date = new Date(this.movie.releaseDate)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        },
        genres() {
            return this.movie.genres.join(', ')
        },
        runtime() {
            const runtime = new Date(1000 * 60 * this.movie.runtime)
            return `${runtime.getUTCHours()}h ${runtime.getUTCMinutes()}m`
        },
        cast() {
            return this.movie.credits
                .filter((credit: MovieCredits) => credit.creditType === 'cast')
                .slice(0, 10)
        },
        crew() {
            return this.movie.credits
                .filter((credit: MovieCredits) => credit.creditType === 'crew')
                .slice(0, 10)
        },
        rated() {
            const seen = this.seen.find((s: Seen) => this.movie._id === s.media)

            if (seen) {
                this.seenId = seen._id
                this.ratedScore = seen.score
                return true
            }

            return false
        }
    },
    watch: {
        '$route.params.id': async function() {
            this.loader = true
            await this.$store.dispatch('loadMovie', this.$route.params.id)
            await this.$store.dispatch('loadMovieCredits', this.$route.params.id)
            await this.$store.dispatch('loadMovieRelated', this.$route.params.id)
            this.loader = false
        }
    },
    methods: {
        async onEditSeen() {
            if (!this.rated) {
                await this.$store.dispatch('addSeen', {
                    id: this.movie._id,
                    score: this.ratedScore
                })
            } else {
                await this.$store.dispatch('editSeen', {
                    id: this.seenId,
                    score: this.ratedScore
                })
            }
        },
        async onDeleteSeen() {
            if (!this.seenId) {
                return
            }

            await this.$store.dispatch('deleteSeen', this.seenId)
            this.seenId = ''
            this.ratedScore = 0
        }
    }
})
</script>

<style lang="scss" scoped>
.facts {
    list-style: none;
    padding-left: 0;
    display: flex;

    li {
        position: relative;

        &::before {
            content: "|";
            position: absolute;
            top: -1px;
            left: -14px;
        }

        &:first-child {
            &::before {
                content: "";
            }
        }
    }
}

.scroller {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    overflow-x: scroll;
    position: relative;
    width: 100%;

    li {
        margin: 0 8px 8px;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>