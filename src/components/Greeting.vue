<template>
    <v-row>
        <v-col>
            <h1>Hello, {{ user.name }}</h1>
            <v-divider></v-divider>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
    computed: {
        ...mapGetters(['user'])
    }
})
</script>