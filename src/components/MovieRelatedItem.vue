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
                <v-card-title>{{ title }}</v-card-title>
            </v-img>

            <v-fade-transition>
                <v-overlay v-if="hover" absolute color="grey darken-4">
                    <v-row justify="center">
                        <v-col>
                            <div class="my-2 text-center">
                                <v-btn
                                    color="success darken-1"
                                    @click="openMedia"
                                >Open</v-btn>
                            </div>
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
            type: String,
        }
    },
    data: () => ({
        overlay: false
    }),
    methods: {
        openMedia() {
            this.$router.push({ name: 'movie', params: { id: this.id } })
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