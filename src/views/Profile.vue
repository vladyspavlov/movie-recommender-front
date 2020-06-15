<template>
    <div>
        <greeting />
        <recommendations />
        <v-divider />
        <seen />
        <account-actions />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import Greeting from '@/components/Greeting.vue'
import Recommendations from '@/components/Recommendations.vue'
import Seen from '@/components/Seen.vue'
import AccountActions from '@/components/AccountActions.vue'

export default Vue.extend({
    components: {
        Greeting,
        Recommendations,
        Seen,
        AccountActions
    }
})
</script>