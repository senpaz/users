//В дальнейшем я бы сюда добавил лоадинг и вывод ошибок через какой нибудь плагин vue-notification, shared файл у меня готовый, просто не стал сейчас тратить на это время
import {createStore} from 'vuex'
export default createStore({
	state: () => ({
		roles: null,
		users: null,
		user: null,

	}),
	mutations: {
		SET_ROLES(state, payload){
			state.roles = payload
		},
		SET_USERS(state, payload){
			state.users = payload
		},
		SET_USER(state, payload){
			state.user = payload
		}
	},
	actions: {
		async getRoles({commit}){
			try {
				const res = await this.$axios.get('/roles')
				if (res.status === 200 || res.status === 201){
					console.log(res && res.data, 'getRoles')
					commit('SET_ROLES', res && res.data && res.data.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getUsers({commit}, payload){
			try {
				const res = await this.$axios.get(`/users?page=${payload.page}?count=${payload.limit}`, )
				if (res.status === 200 || res.status === 201){
					commit('SET_USERS', res && res.data && res.data.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getUser({commit}, id){
			try {
				const res = await this.$axios.get(`/user/${id}`)
				if (res.status === 200 || res.status === 201){
					commit('SET_USER', res && res.data && res.data.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async deleteRoleUser({commit}, payload){
			try {
				await this.$axios.delete(`/user/${payload.id}/role/${payload.role}`)
			} catch (err) {
				console.log(err)
			}
		},
		async addRoleUser({commit}, payload){
			try {
				await this.$axios.post(`/user/${payload.id}/role/${payload.role}`)
			} catch (err) {
				console.log(err)
			}
		}
	},
	getters: {
    getRoles: state => state.roles,
		getUsers: state => state.users,
		getUser: state => state.user
  },
	modules: {
	}
})
