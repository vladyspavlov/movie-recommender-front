<template>
    <v-card
        outlined
        :width="width"
    >
        <v-img
            :src="
                profilePath !== 'Null' ?
                'https://image.tmdb.org/t/p/w138_and_h175_face' + profilePath :
                ''
            "
            :width="width"
        >
            <div
                v-if="profilePath === 'Null'"
                class="grey lighten-1 no-profile-img"
            >
                <v-icon x-large color="grey darken-1">
                    mdi-account
                </v-icon>
            </div>
        </v-img>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-subtitle class="pt-2">{{ character }}</v-card-subtitle>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        width: {
            type: Number,
            default: 138
        },
        name: {
            type: String,
            required: true
        },
        profilePath: {
            type: String,
            required: true
        },
        character: {
            type: String,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
.no-profile-img {
    width: 138px;
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-card {
    height: 100%;

    .v-card__title {
        font-size: 1rem;
        word-break: break-word;
    }
}
</style>