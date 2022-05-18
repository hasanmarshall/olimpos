<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {
      defaultBio: 'This user has no bios.'
    }
  }
}
</script>

<template lang="pug">
.box
  h1 {{ user.name }} ({{ user.age }})
  p Bio: {{ user.bio || defaultBio }}
  h2 Events ({{ user.events.length }})

  .event(v-for="event in user.events")
    h3 {{ event.filename }}
    p(v-if="!event.likedBy.length")
      | no likes yet!
    p(v-else)
      | {{ event.likedBy.map(user => user.name).join(', ') }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
