<script>
import Counter from '@/components/counter.vue'
import UserCard from '@/components/user-card.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: { UserCard, Counter },
  data() {
    return {
      user: null,
    }
  },
  async created() {
    this.user = await this.fetchUser(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
.about
  h1 Olimpossss 
     UserCard(:user="user" v-if="user")
    
    
     Counter
     Counter
</template>
