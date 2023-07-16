<template>
<button @click="createComment()">Generar comentario</button>
</template>

<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, useModel } from "vue";
import gql from "graphql-tag";

export default defineComponent({
  setup() {
   const { mutate: createComment } = useMutation(gql`
      mutation ($name: String!, $text: String!) {
        createComment(name: $name, text: $text)
      }
    `, () => ({
      variables: {
        name: 'Maximiliano',
        text: 'Hi from vue again'
      }
    }) );

    return {
      createComment
    }
  },
});
</script>
