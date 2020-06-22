<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="searchText"
                    label="Movie title"
                    hint="For example, Fight Club or The Avengers"
                    append-outer-icon="mdi-magnify"
                    type="text"
                    outlined
                    clearable
                    @click:append-outer="find"
                    @keydown.enter="find"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="loader">
            <v-col>
                <v-progress-circular indeterminate size="96" />
            </v-col>
        </v-row>
        <v-row v-else>
            <template v-if="searchSeen.length > 0">
                <v-col
                    cols="auto"
                    v-for="s of searchSeen"
                    :key="s._id"
                >
                    <search-item
                        :id="s._id"
                        :title="s.title"
                        :poster="s.posterPath ? s.posterPath : 'Null'"
                        :rated="s.rated"
                        :score="s.score"
                        :seenId="s.seenId"
                        @add="onAddMedia"
                        @edit="onEditMedia"
                        @delete="onDeleteMedia"
                    />
                </v-col>
            </template>
            <template v-else>
                <v-col>Nothing found. Try again.</v-col>
            </template>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SearchItem from '@/components/SearchItem.vue'

export default Vue.extend({
    components: {
        SearchItem,
    },
    data: () => ({
        searchText: null,
        loader: false,
    }),
    computed: {
        ...mapGetters([ 'searchSeen' ]),
    },
    methods: {
        clearSearchText() {
            this.searchText = null
        },
        async find() {
            if (!this.searchText) {
                return
            }

            if (typeof this.searchText !== 'string') {
                return
            }

            this.loader = true
            await this.$store.dispatch('search', this.searchText)
            this.loader = false
        },
        async onAddMedia(id: string, score: number) {
            await this.$store.dispatch('addSeen', { id, score })
        },
        async onEditMedia(id: string, score: number) {
            await this.$store.dispatch('editSeen', { id, score })
        },
        async onDeleteMedia(id: string) {
            await this.$store.dispatch('deleteSeen', id)
        }
    }
})
</script>