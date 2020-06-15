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
                                    >Add</v-btn>
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
                                        @click="addMedia"
                                        color="success darken-1"
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

export default Vue.extend({
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        poster: {
            type: String
        }
    },
    data: () => ({
        overlay: false,
        rating: false,
        score: 0,
    }),
    methods: {
        openMedia() {
            this.$router.push({ name: 'movie', params: { id: this.id } })
        },
        addMedia() {
            this.$emit(
                'add',
                this.id,
                this.score
            )

            this.rating = !this.rating
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