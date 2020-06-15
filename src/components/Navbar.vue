<template>
    <v-app-bar app style="z-index: 999;">
        <v-btn
            text
            :to="{ name: 'home' }"
            active-class="main-active"
        >
            Movie Recommender
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="changeTheme">
            <v-icon>mdi-brightness-3</v-icon>
        </v-btn>
        <v-btn icon :to="{ name: 'search' }">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon :to="{ name: 'profile' }">
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    methods: {
        changeTheme() {
            this.$store.commit('changeTheme')
        }
    }
})
</script>

<style lang="scss" scoped>
.main-active {
    &::before {
        opacity: 0 !important;
    }
}
</style>