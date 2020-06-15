<template>
    <div>
        <v-row align="center">
            <v-col cols="auto">
                <h1>Recommendations</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-for="media of recommendations"
                :key="media.media"
                cols="auto"
            >
                <!-- <recommendations-item
                    :id="media.media"
                    :title="media.title"
                    :poster="media.posterPath"
                    @edit="onEditSeen"
                    @delete="onDeleteSeen"
                /> -->
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import RecommendationsItem from '@/components/RecommendationsItem.vue'

export default Vue.extend({
    components: {
        RecommendationsItem
    },
    async mounted() {
        //await this.$store.dispatch('loadRecommendations')
    },
    computed: {
        ...mapGetters([ 'recommendations' ])
    },
    methods: {
        async onAdd(id: string, score: number) {
            await this.$store.dispatch('addSeen', { id, score })
        }
    }
})
</script>