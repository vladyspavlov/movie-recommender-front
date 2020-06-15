<template>
    <v-row>
        <v-col>
            <google-sign-in />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import GoogleSignIn from '@/components/GoogleSignIn.vue'

export default Vue.extend({
    components: {
        GoogleSignIn
    }
})
</script>