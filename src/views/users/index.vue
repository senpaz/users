<template>
  <div :class="$style.users">
    <div class="container" >
      <h1>Список пользователей</h1>
      <div :class="$style['users__pages']">Страница номер: <b>{{paginate.page + 1}}</b></div>
      <ul :class="$style.users__list">
        <li v-for="user of getUsers" :key="user.id" @click="$router.push(`/users/${user.id}`)">
          <span><b>id:</b>  {{user && user.id}}</span> <b>  name: </b>  {{user && user.name}}
        </li>
      </ul>
      <div :class="$style.paginate">
        <button :class="$style['paginate__prev']" @click="paginate.page -= 1" :disabled="paginate.page === 0"> Prev</button>
        <button :class="$style['paginate__next']" @click="paginate.page += 1" :disabled="paginate.page === 3"> Next</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  name: "home-page",
  data() {
    return{
      paginate: {
        page: 0,
        limit: 5
      },
      page: 0
    }
  },
  computed: {
    ...mapGetters(['getRoles', 'getUsers', 'getUser'])
  },
  async mounted() {
    if (this.$store.state.roles === null || this.$store.state.roles.length === 0){
      await this.$store.dispatch('getRoles')
    }
  },
  watch: {
    paginate: {
      async handler (paginate) {
        await this.$store.dispatch('getUsers', paginate)
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style module>
.users{
  padding: 30px 0;
}
.users h1{
  margin-bottom: 30px;
}
.users__pages{
  margin-bottom: 20px;
}
.users__list li{
  display: flex;
  align-items: center;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid black;
  transition: .3s;
}
.users__list li:hover{
  cursor: pointer;
  background-color: #dcdcdc;
}
.users__list li span{
  margin-right: 20px;
}
.paginate{
  display: flex;
  column-gap: 50px;
  justify-content: flex-end;
}
.paginate button{
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  font-weight: 500;
  transition: .3s;
  background-color: #fff;
  font-size: 16px;
}
.paginate button:hover,
.paginate button:hover{
  cursor: pointer;
  background-color: #dcdcdc;
}
.paginate button:disabled{
  border: 1px solid #dcdcdc;
}
.paginate button:disabled:hover{
  background-color: #fff;
  cursor: not-allowed;
}
</style>
