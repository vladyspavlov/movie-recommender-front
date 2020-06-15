<template>
    <v-dialog v-model="state" width="500">
        <v-card>
            <v-card-title class="headline error darken-1 mb-6" primary-title>{{ title }}</v-card-title>
            <v-card-text>{{ description }}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="onCancel">Cancel</v-btn>
                <v-btn color="error darken-1" text @click="onDelete">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import eventBus from '../eventBus'

export default Vue.extend({
    props: [ 'state', 'title', 'description' ],
    methods: {
        onCancel() {
            eventBus.$emit('DELETE_DIALOG_CLOSE', false) // false if canceled
        },
        onDelete() {
            eventBus.$emit('DELETE_DIALOG_CLOSE', true) // true if confirmed
        }
    }
})
</script>