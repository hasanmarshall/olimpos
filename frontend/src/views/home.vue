<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue' //baştaki @'i src'u refer etmek için kullanıyorsun

export default {
  name: 'Home-page',
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
      time: new Date(),
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')
    this.users = usersRequest.data
  },
}
</script>

<template lang="pug">
.home
    h1 Olimpos
    p Here is the time: {{ time }}
    UserCard(v-for="user in users" :user="user")
</template>
