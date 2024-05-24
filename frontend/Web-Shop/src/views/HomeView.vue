<script setup>
import { ref } from 'vue'
import dbconnexion from '@/services/dbconnexion'

const users = ref(null)
const searchQuery = ref('')
const errorMessage = ref('')

const nickname = ref('')
const password = ref('')
const loginError = ref('')
const isAuthenticated = ref(!!localStorage.getItem('jwt')) // Estado de autenticación

const searchUsers = async () => {
  try {
    const response = await dbconnexion.getnickName(searchQuery.value)
    if (response.data.data.length === 0) {
      errorMessage.value = 'No users found'
      users.value = null
    } else {
      users.value = response.data.data
      errorMessage.value = ''
    }
  } catch (error) {
    console.log(error)
    errorMessage.value = 'An error occurred while searching for users'
  }
}

const getAllUsers = async () => {
  try {
    const response = await dbconnexion.getAll()
    users.value = response.data.data
    errorMessage.value = ''
  } catch (error) {
    console.log(error)
    errorMessage.value = 'An error occurred while fetching all users'
  }
}

const login = async () => {
  try {
    const response = await dbconnexion.login({
      nickName: nickname.value,
      password: password.value
    })
    if (response.data.token) {
      localStorage.setItem('jwt', response.data.token)
      loginError.value = ''
      isAuthenticated.value = true
      console.log('Login successful:', response.data)
    } else {
      loginError.value = 'Invalid nickname or password'
    }
  } catch (error) {
    console.log(error)
    loginError.value = 'An error occurred during login'
  }
}

const logout = () => {
  localStorage.removeItem('jwt')
  isAuthenticated.value = false
  nickname.value = ''
  password.value = ''
  users.value = null
  searchQuery.value = ''
  errorMessage.value = ''
  loginError.value = ''
}
</script>

<template>
  <div v-if="isAuthenticated">
    <button @click="logout">Logout</button>
  </div>

  <div v-else>
    <form @submit.prevent="login">
      <label for="nickname">Nickname:</label>
      <input
        type="text"
        v-model="nickname"
        name="nickname"
        id="nickname"
        placeholder="Enter nickname"
        required
      />
      <label for="password">Password:</label>
      <input
        type="password"
        v-model="password"
        name="password"
        id="password"
        placeholder="Enter password"
        required
      />
      <input type="submit" value="Login" />
    </form>

    <div v-if="loginError" class="error">{{ loginError }}</div>
  </div>

  <form @submit.prevent="searchUsers">
    <label for="search">Search Users:</label>
    <input
      type="search"
      v-model="searchQuery"
      name="search"
      id="search"
      placeholder="Enter nickname"
      title="Search Users"
    />
    <input type="submit" value="Submit" />
  </form>

  <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

  <button @click="getAllUsers">Get All Users</button>
  <div v-if="users">
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.usenickName }}</li>
    </ul>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
  margin-top: 1em;
}
</style>
