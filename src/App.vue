<template>
    <v-app>
        <Navbar></Navbar>

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>

        <delete-dialog
            v-if="deleteDialogState"
            :state="deleteDialogState"
            :title="deleteDialogTitle"
            :description="deleteDialogDescription"
            @dialog="closeDeleteDialog"
        ></delete-dialog>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import eventBus from './eventBus'
import Navbar from '@/components/Navbar.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'

export default Vue.extend({
    name: "App",
    components: {
        Navbar,
        DeleteDialog
    },
    data: () => ({
        deleteDialogId: '',
        deleteDialogCaller: 'ROOT',
        deleteDialogState: false,
        deleteDialogTitle: 'Warning',
        deleteDialogDescription: 'Are you sure?',
    }),
    created() {
        this.$store.commit('loadState')
        this.setVuetifyDarkTheme(this.dark)
    },
    mounted() {
        eventBus.$on('DELETE_DIALOG_OPEN', this.openDeleteDialog)
        eventBus.$on('DELETE_DIALOG_CLOSE', this.closeDeleteDialog)
    },
    computed: {
        dark() {
            return this.$store.getters.dark
        }
    },
    watch: {
        dark(value: boolean) {
            this.setVuetifyDarkTheme(value)
        }
    },
    methods: {
        setVuetifyDarkTheme(dark: boolean) {
            this.$vuetify.theme.dark = dark
        },
        openDeleteDialog(options: {
            id: string,
            caller: string,
            title?: string,
            description?: string
        }) {
            const opts = options
            this.deleteDialogId = opts.id
            this.deleteDialogState = true
            this.deleteDialogCaller = opts.caller.toUpperCase()
            if (opts.title) this.deleteDialogTitle = opts.title
            if (opts.description) this.deleteDialogDescription = opts.description
        },
        closeDeleteDialog(dialog: boolean) {
            eventBus.$emit(
                `${this.deleteDialogCaller}_DELETE_DIALOG_RESULT`,
                this.deleteDialogId,
                dialog
            )

            this.deleteDialogId = ''
            this.deleteDialogCaller = 'ROOT'
            this.deleteDialogState = false
            this.deleteDialogTitle = 'Warning'
            this.deleteDialogDescription = 'Are you sure?'
        }
    }
})
</script>

<style lang="scss">
.w-100 {
    width: 100%;
}

.h-100 {
    height: 100%;
}

.no-card-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
}
</style>