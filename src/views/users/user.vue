<template>
  <div :class="$style.user">
    <div class="container">

      <div :class="$style.back"><router-link to="/"> &#8617; Back to Users List</router-link></div>
      <h1>Профиль пользователя с именем: {{getUser && getUser.name}}</h1>
      <h2>Список ролей у данного пользователя</h2>
      <ul :class="$style.users__list">
        <li v-for="(role, index) of getUser && getUser.roles" :key="index">
          <span>{{index + 1}} : {{getRoles[role - 1]}}</span>
          <button @click.prevent="deleteRole(role)">Delete</button>
        </li>
      </ul>
      <div>
        <h3>Добавте новую роль</h3>
        <Multiselect
            v-model="value"
            :options="rolesAll"
            valueProp="id"
            label="name"
            placeholder="Выберите роль"
        />
        <div :class="$style['users__addRole']">
          <button @click="addNewRole">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Multiselect from '@vueform/multiselect'
export default {
  name: "User",
  props: ['id'],
  data () {
    return {
      value: null,
      rolesAll: [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ]
    }
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapGetters(['getRoles', 'getUser'])
  },
  methods:{
    async deleteRole(role){
      const payload = {
        id: this.id,
        role
      }
      const valid = confirm('Вы уверены что хотите удалить роль?')
      if (valid) {
        await this.$store.dispatch('deleteRoleUser', payload)
        await this.$store.dispatch('getUser', this.id)
        this.$notify("Роль успешно удалена");
      }
    },
    async addNewRole(){
      const payload = {
        id: this.id,
        role: this.value
      }
      // const valid = confirm('Вы уверены что хотите добавить данную роль?')
      // if (!this.getUser.roles.indexOf(this.value)) {
      //   await this.$store.dispatch('addRoleUser', payload)
      const res = await this.axios.post(`/user/${payload.id}/role/${payload.role}`)
      console.log(res)
      if (res && res.data && res.data.status === 0){
        await this.$store.dispatch('getUser', this.id)
        this.$notify("Роль успешно добавлена");
      } else{
        this.$notify("Этому пользователю уже была назначена эта роль, выберите другую");
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('getRoles')
    await this.$store.dispatch('getUser', this.id)
    // this.value = this.getUser && this.getUser.roles
    this.rolesAll.forEach((el, i) => {
      el.name = this.getRoles[i]
    })
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style module>
.user{
  padding: 30px 0;
}
.user a{
  color: #000;
}
.user h1{
  margin-bottom: 30px;
}
.user h2{
  margin-bottom: 30px;
}
.user h3{
  margin-bottom: 10px;
}
.back{
  width: max-content;
  padding-bottom: 2px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.users__list {
  border: 1px solid black;
  padding: 20px;
  margin-bottom: 30px;
}
.users__list li{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
}
.users__list button{
  color: #fff;
  font-size: 16px;
  padding: 5px 20px;
  background-color: #e12d2d;
  outline: none;
  border: none;
  border-radius: 4px;
}
.users__list li:not(:last-child){
   margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.users__addRole{
  text-align: right;
}
.users__addRole button{
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  background-color: #0e7300;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
}

</style>
