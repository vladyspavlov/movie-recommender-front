<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="overflow-hidden" width="200" height="300">
            <v-img
                v-if="poster"
                :src="'https://image.tmdb.org/t/p/w200' + poster"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="200"
                height="300"
            >
                <v-card-title class="pb-0">{{ title }}</v-card-title>
                <v-row align="center" class="mx-0">
                    <v-rating
                        v-model="score"
                        color="amber"
                        background-color="amber"
                        half-increments
                        readonly
                        size="18"
                        class="pl-2"
                    ></v-rating>
                </v-row>
            </v-img>

            <v-fade-transition>
                <v-overlay v-if="hover" absolute color="grey darken-4">
                    <v-row justify="center">
                        <v-col>
                            <template v-if="!rating">
                                <div class="my-2 text-center">
                                    <v-btn
                                        color="success darken-1"
                                        @click="openMedia"
                                    >Open</v-btn>
                                </div>
                                <div class="my-2 text-center">
                                    <v-btn
                                        color="primary darken-1"
                                        @click="rating = !rating"
                                    >Edit</v-btn>
                                </div>
                                <div class="my-2 text-center">
                                    <v-btn
                                        color="error darken-1"
                                        @click="openDeleteDialog"
                                    >Delete</v-btn>
                                </div>
                            </template>
                            <template v-else>
                                <v-rating
                                    v-model="newScore"
                                    color="amber"
                                    background-color="amber"
                                    half-increments
                                    size="32"
                                    dense
                                    hover
                                ></v-rating>
                                <div class="my-2 text-center">
                                    <v-btn
                                        @click="editMedia"
                                        color="success darken-1"
                                        :disabled="newScore === score"
                                    >Save</v-btn>
                                </div>
                                <div class="my-2 text-center">
                                    <v-btn
                                        @click="rating = !rating"
                                    >Cancel</v-btn>
                                </div>
                            </template>
                        </v-col>
                    </v-row>
                </v-overlay>
            </v-fade-transition>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'
import eventBus from '../eventBus'

export default Vue.extend({
    props: {
        id: {
            type: String,
            required: true
        },
        media: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        poster: String,
        score: {
            type: Number,
            required: true,
            validator: (value) => {
                return value > 0 && value <= 5
            }
        }
    },
    data: () => ({
        overlay: false,
        rating: false,
        newScore: 0,
        dialog: false,
    }),
    mounted() {
        eventBus.$on(
            'SEEN_DELETE_DIALOG_RESULT',
            (id: string, dialog: boolean) => {
                if (this.id === id && dialog) {
                    this.deleteMedia()
                }
            }
        )

        this.newScore = this.score
    },
    methods: {
        openMedia() {
            this.$router.push({ name: 'movie', params: { id: this.media } })
        },
        editMedia() {
            if (this.score !== this.newScore) {
                this.$emit(
                    'edit',
                    this.id,
                    this.newScore
                )
            }

            this.rating = !this.rating
        },
        deleteMedia() {
            this.$emit(
                'delete',
                this.id
            )
        },
        openDeleteDialog() {
            eventBus.$emit(
                'DELETE_DIALOG_OPEN',
                {
                    id: this.id,
                    caller: 'SEEN',
                    description: 'This action will remove rating for selected movie. Are you sure?'
                }
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.v-card {
    .v-card__title {
        word-break: break-word;
    }
}
</style>