<template>
<ul>
  <li v-for="(comment, index) in comments" :key="index">
  <b>{{ comment.name }}:</b> {{ comment.text }}
  </li>
</ul>

</template>

<script lang="">
import { defineComponent, ref, watch } from "vue";
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default defineComponent({
  setup() {
    const comments = ref([])
    const { result } = useSubscription(gql`
      subscription {
        commentCreated {
          name
          text
        }
      }
    `);

    watch(
      result,
      data => {
        comments.value.push(data.commentCreated)
        console.log('Nuevo mensaje recibido: ' + data.commentCreated)
      }
    )

    return { result, comments }
  }
});
</script>

<style scoped></style>
