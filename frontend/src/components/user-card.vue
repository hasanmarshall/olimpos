<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.box
  h2 {{user.name}} {{user.age}}
    p(v-if="!user.email.length")
      | Enter an email
    p(v-else)
      | {{ user.email}}


</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
