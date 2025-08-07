<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/auth/sign-up" class="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignIn">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" v-model="form.rememberMe" name="remember-me" type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {{ success }}
        </div>

        <div>
          <button type="submit" :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Icon name="lucide:loader-2" class="h-5 w-5 animate-spin" />
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dummy user data for testing
const dummyUsers = [
  { email: 'test@example.com', password: 'password123', name: 'Test User' },
  { email: 'admin@chocolatte.com', password: 'admin123', name: 'Admin User' },
  { email: 'user@demo.com', password: 'demo123', name: 'Demo User' }
]

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSignIn = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check against dummy data
    const user = dummyUsers.find(u =>
      u.email === form.value.email && u.password === form.value.password
    )

    if (user) {
      success.value = `Welcome back, ${user.name}!`

      // Store user data in localStorage (dummy session)
      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          name: user.name,
          isAuthenticated: true
        }))
      }

      // Redirect to dashboard or home after 2 seconds
      setTimeout(async () => {
        await navigateTo('/')
      }, 2000)
    } else {
      error.value = 'Invalid email or password. Try: test@example.com / password123'
    }
  } catch {
    error.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

// Set page title
useHead({
  title: 'Sign In - RR Chocolatte'
})
</script>

<style scoped>
/* Custom animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
