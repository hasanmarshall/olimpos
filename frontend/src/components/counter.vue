<script>
import { mapActions, mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Counter',
  mounted() {
    this.incrementCount()
  },
  methods: {
    ...mapActions(['incrementCount']),
  },
  computed: {
    ...mapState(['count']),
  },
}
</script>

<template lang="pug">
  div
    p Pages I've visited: {{ count }}
</template>
