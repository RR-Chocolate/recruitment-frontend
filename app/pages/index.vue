<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">RR Chocolatte</h1>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="user">
              <span class="text-gray-700">Welcome, {{ user.name }}!</span>
              <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                @click="handleSignOut">
                Sign Out
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/sign-in"
                class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </NuxtLink>
              <NuxtLink to="/auth/sign-up"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <template v-if="user">
          <!-- Authenticated User Dashboard -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-lg font-medium text-blue-900">Profile</h3>
                  <p class="text-blue-700 mt-2">{{ user.name }}</p>
                  <p class="text-blue-600 text-sm">{{ user.email }}</p>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-lg font-medium text-green-900">Orders</h3>
                  <p class="text-green-700 mt-2">3 Active Orders</p>
                  <p class="text-green-600 text-sm">View order history</p>
                </div>

                <div class="bg-purple-50 p-6 rounded-lg">
                  <h3 class="text-lg font-medium text-purple-900">Favorites</h3>
                  <p class="text-purple-700 mt-2">5 Chocolate Items</p>
                  <p class="text-purple-600 text-sm">Manage your favorites</p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <!-- Public Landing Page -->
          <div class="text-center">
            <Icon name="lucide:heart" class="mx-auto h-12 w-12 text-indigo-600" />
            <h2 class="mt-2 text-3xl font-extrabold text-gray-900">Welcome to RR Chocolatte</h2>
            <p class="mt-4 text-lg text-gray-600">
              Discover the finest chocolates and create unforgettable moments.
            </p>
            <div class="mt-6 flex justify-center space-x-4">
              <NuxtLink to="/auth/sign-up"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium">
                Get Started
              </NuxtLink>
              <NuxtLink to="/auth/sign-in"
                class="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md text-sm font-medium">
                Sign In
              </NuxtLink>
            </div>

            <!-- Demo Credentials -->
            <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4 max-w-md mx-auto">
              <h3 class="text-sm font-medium text-yellow-800">Demo Credentials</h3>
              <p class="mt-1 text-sm text-yellow-700">
                Email: <code class="bg-yellow-100 px-1 rounded">test@example.com</code><br>
                Password: <code class="bg-yellow-100 px-1 rounded">password123</code>
              </p>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface User {
  email: string
  name: string
  isAuthenticated: boolean
}

const user = ref<User | null>(null)

// Check if user is authenticated on mount
onMounted(() => {
  if (import.meta.client) {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.isAuthenticated) {
          user.value = userData
        }
      } catch {
        // Invalid stored data, remove it
        localStorage.removeItem('user')
      }
    }
  }
})

const handleSignOut = () => {
  if (import.meta.client) {
    localStorage.removeItem('user')
  }
  user.value = null
}

// Set page title
useHead({
  title: 'RR Chocolatte - Premium Chocolate Experience'
})
</script>
