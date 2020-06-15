<template>
    <div>
        <v-row align="center">
            <v-col cols="auto">
                <h1>Seen</h1>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
                <div class="text-right">
                    <v-btn
                        icon
                        large
                        @click="onClickAddSeen"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="media of seen" :key="media._id" cols="auto">
                <seen-item
                    :id="media._id"
                    :media="media.media"
                    :title="media.title"
                    :poster="media.posterPath"
                    :score="media.score"
                    @edit="onEditSeen"
                    @delete="onDeleteSeen"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SeenItem from '@/components/SeenItem.vue'

export default Vue.extend({
    components: {
        SeenItem
    },
    async mounted() {
        await this.$store.dispatch('loadSeen')
    },
    computed: {
        ...mapGetters([ 'seen' ])
    },
    methods: {
        onClickAddSeen() {
            this.$router.push({ name: 'search' })
        },
        async onEditSeen(id: string, score: number) {
            await this.$store.dispatch('editSeen', { id, score })
        },
        async onDeleteSeen(id: string) {
            await this.$store.dispatch('deleteSeen', id)
        }
    }
})
</script>