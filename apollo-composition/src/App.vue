<template>
  <h1>Coments</h1>

  <div v-if="loading">Loading...</div>


  <div v-else>
    <ul>
      <li v-for="(comment, index) in result.getCommentsFromUser" :key="index">
        <b>{{ comment.name }}</b
        >: {{ comment.text }}
      </li>
    </ul>
  </div>
  <div v-if="error">
    <h3 class="error">{{ error.message }}</h3>
  </div>

  <button @click="refetch()" >Refresh</button>
  <MutationsComp />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useLazyQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import MutationsComp from "./components/MutationsComp.vue";

export default defineComponent({
    setup() {
        const { result, loading, error, refetch, onResult, onError } = useQuery(gql `
      query ($name: String!) {
        getCommentsFromUser(name: $name) {
          name
          text
        }
      }
    `, () => ({
            //name: myReference.value
            name: "User 1"
        }), {
            // Options
            //fetchPolicy: "cache-first", // Si estan cacheados los datos se los trae directamente mejor rendimiento.
            //fetchPolicy: 'cache-and-network', // Va a retornar el resultado del cache-first si existe y depues va a hacer una comprobacion en la red si hay contenido disponible (mas versatil) 
            //fetchPolicy: 'cache-only' // O solo 'cache' solo va a devolver los datos de la cache y si no los hay va a fallar 
            //fetchPolicy: 'network-only' // Todo lo contrario a cache-only solo va a devolver los datos que hay en el servicio, nunca va a cachear
            //fetchPolicy: 'no-cache' // Nunca va a cachear ese dato
            fetchPolicy: "cache-and-network",
            pollInterval: 5000, // Por ejemplo cada 5 segundos voy a comprobar si los datos se han modificado en el servicio para traerme los datos actualizados y mostrarlos a mi usuario
        });
        onResult((queryResult) => {
            console.log(queryResult.data);
            console.log(queryResult.loading);
            console.log(queryResult.networkStatus);
        });
        onError((error) => {
            console.log(error.clientErrors);
            console.log(error.graphQLErrors);
            console.log(error.networkError);
        });
        return {
            result,
            loading,
            error,
            refetch,
        };
    },
    components: { MutationsComp }
});
</script>
<style>
.error {
  color: red;
}
</style>

/* querys query { getAllComments { name text } } query($name: String!){
getCommentsFromUser(name: $name) { name text } } */
