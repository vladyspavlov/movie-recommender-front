<template>
    <div id="googleSignInButton" ref="googleSignInButton"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
    mounted() {
        if (!window.gapi) {
            throw new Error(
                '"https://apis.google.com/js/platform.js" needs to be included as a <script>.'
            )
        }

        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id: '894744743722-douqrc4h7juc50bra4ojatosal3tf1p4.apps.googleusercontent.com'
            })

            this.renderButton(this.dark ? 'dark' : 'light')
        })
    },
    computed: {
        ...mapGetters([ 'user', 'dark' ])
    },
    methods: {
        async onSuccess(googleUser: gapi.auth2.GoogleUser) {
            const idToken = googleUser.getAuthResponse().id_token
            await this.$store.dispatch('authGoogle', idToken)
            this.$router.push({ name: 'profile' })
        },
        onFailure(error: any) {
            console.error(error)
        },
        renderButton(theme: 'dark' | 'light' = 'light') {
            window.gapi.signin2.render('googleSignInButton', {
                scope: 'email profile',
                longtitle: false,
                theme,
                onsuccess: this.onSuccess,
                onfailure: this.onFailure
            })
        }
    }
})
</script>
