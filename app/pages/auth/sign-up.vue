<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/auth/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your full name">
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your email address">
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" v-model="form.password" name="password" type="password" autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Choose a strong password">
            <p class="mt-1 text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input id="confirmPassword" v-model="form.confirmPassword" name="confirmPassword" type="password"
              autocomplete="new-password" required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm your password">
          </div>
        </div>

        <div class="flex items-center">
          <input id="agree-terms" v-model="form.agreeTerms" name="agree-terms" type="checkbox" required
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
            I agree to the
            <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
            and
            <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
          </label>
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
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RegisteredUser {
  id: number
  name: string
  email: string
  password: string
  createdAt: string
}

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const validateForm = () => {
  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return false
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return false
  }

  if (!form.value.agreeTerms) {
    error.value = 'You must agree to the Terms of Service'
    return false
  }

  // Check if email already exists (dummy validation)
  if (import.meta.client) {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]') as RegisteredUser[]
    if (existingUsers.some((user: RegisteredUser) => user.email === form.value.email)) {
      error.value = 'An account with this email already exists'
      return false
    }
  }

  return true
}

const handleSignUp = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  if (!validateForm()) {
    loading.value = false
    return
  }

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Store user data (dummy registration)
    if (import.meta.client) {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]') as RegisteredUser[]
      const newUser: RegisteredUser = {
        id: Date.now(),
        name: form.value.name,
        email: form.value.email,
        password: form.value.password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      }

      existingUsers.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
    }

    success.value = 'Account created successfully! Redirecting to sign in...'

    // Clear form
    form.value = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }

    // Redirect to sign in page after 2 seconds
    setTimeout(async () => {
      await navigateTo('/auth/sign-in')
    }, 2000)

  } catch {
    error.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

// Set page title
useHead({
  title: 'Sign Up - RR Chocolatte'
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
