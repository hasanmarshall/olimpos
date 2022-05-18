<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue' //baştaki @'i src'u refer etmek için kullanıyorsun

export default {
  name: 'Home',
  components: {
    UserCard
  },
  data() {
    return {
      users: [],
      time: new Date()
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')
    this.users = usersRequest.data
  }
}
</script>

<template lang="pug">
#app
  .header
    h1(v-if="user") Welcome {{ user.name }}
    h1 Olimpos
  .container
    .row
      div(v-for="user in users" :user="user")
        UserCard(:user="user" v-if="user")
  .footer
    p Try your best baby

</template>
