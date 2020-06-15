<template>
    <v-row>
        <v-col>
            <v-divider class="mb-3"></v-divider>
            <v-btn color="primary darken-1" class="mr-3" @click="logout">Logout</v-btn>
            <v-btn color="error darken-1" class="mr-3" @click="openDeleteDialog">Delete account</v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import eventBus from '../eventBus'
import { mapGetters } from 'vuex'

export default Vue.extend({
    data: () => ({
        dialogId: ''
    }),
    mounted() {
        eventBus.$on(
            'ACCOUNT_DELETE_DIALOG_RESULT',
            (id: string, dialog: boolean) => {
                if (this.dialogId === id && dialog) {
                    this.deleteAccount()
                }
            }
        )
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        getAuthInstance() {
            if (window.gapi && window.gapi.auth2) {
                return window.gapi.auth2.getAuthInstance()

            }

            return null
        },
        async logout() {
            const auth2: gapi.auth2.GoogleAuth | null = this.getAuthInstance()
            if (auth2) {
                await auth2.signOut()
            }

            this.$store.commit('logout')
            this.$router.push({ name: 'home' })
        },
        async deleteAccount() {
            const auth2: gapi.auth2.GoogleAuth | null = this.getAuthInstance()
            if (auth2) {
                auth2.disconnect()
                await auth2.signOut()
            }

            await this.$store.dispatch('deleteAccount')
            this.$router.push({ name: 'home' })
        },
        openDeleteDialog() {
            this.dialogId = (new Date()).getTime().toString()
            eventBus.$emit(
                'DELETE_DIALOG_OPEN',
                {
                    id: this.dialogId,
                    caller: 'ACCOUNT',
                    description: 'Your account and all personal data will be deleted. Are you sure?'
                }
            )
        }
    }
})
</script>