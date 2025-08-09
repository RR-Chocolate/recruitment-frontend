<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Navigation Header -->
		<nav class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center space-x-4">
						<NuxtLink to="/recruiter/dashboard" class="text-xl font-bold text-gray-900 hover:text-gray-700">
							RR Chocolatte Recruitment
						</NuxtLink>
						<span class="text-gray-500">/</span>
						<NuxtLink to="/recruiter/jobs" class="text-gray-700 hover:text-gray-900">
							Jobs
						</NuxtLink>
						<span class="text-gray-500">/</span>
						<span class="text-gray-700">Create</span>
					</div>
					<div class="flex items-center space-x-4">
						<NuxtLink to="/recruiter/jobs"
							class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
							Back to Jobs
						</NuxtLink>
						<button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
							@click="handleSignOut">
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<!-- Header -->
				<div class="mb-8">
					<h2 class="text-3xl font-bold text-gray-900">Create Job Vacancy</h2>
					<p class="mt-2 text-gray-600">Post a new job opening for candidates to apply</p>
				</div>

				<!-- Form -->
				<form class="space-y-6" @submit.prevent="handleSubmit">
					<div class="bg-white shadow rounded-lg p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="title" class="block text-sm font-medium text-gray-700 mb-1">
									Job Title *
								</label>
								<input id="title" v-model="form.title" type="text" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="e.g. Senior Software Engineer" />
							</div>

							<div>
								<label for="department" class="block text-sm font-medium text-gray-700 mb-1">
									Department *
								</label>
								<select id="department" v-model="form.department" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
									<option value="">Select Department</option>
									<option value="Engineering">Engineering</option>
									<option value="Marketing">Marketing</option>
									<option value="Design">Design</option>
									<option value="Sales">Sales</option>
									<option value="HR">HR</option>
									<option value="Finance">Finance</option>
									<option value="Operations">Operations</option>
								</select>
							</div>

							<div>
								<label for="location" class="block text-sm font-medium text-gray-700 mb-1">
									Location *
								</label>
								<input id="location" v-model="form.location" type="text" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="e.g. Jakarta, Remote" />
							</div>

							<div>
								<label for="type" class="block text-sm font-medium text-gray-700 mb-1">
									Job Type *
								</label>
								<select id="type" v-model="form.type" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
									<option value="">Select Job Type</option>
									<option value="Full-time">Full-time</option>
									<option value="Part-time">Part-time</option>
									<option value="Contract">Contract</option>
									<option value="Internship">Internship</option>
								</select>
							</div>

							<div>
								<label for="experience" class="block text-sm font-medium text-gray-700 mb-1">
									Experience Level
								</label>
								<select id="experience" v-model="form.experience"
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
									<option value="">Select Experience Level</option>
									<option value="Entry Level">Entry Level (0-1 years)</option>
									<option value="Junior">Junior (1-3 years)</option>
									<option value="Mid Level">Mid Level (3-5 years)</option>
									<option value="Senior">Senior (5+ years)</option>
									<option value="Lead">Lead (7+ years)</option>
								</select>
							</div>

							<div>
								<label for="salary" class="block text-sm font-medium text-gray-700 mb-1">
									Salary Range
								</label>
								<input id="salary" v-model="form.salary" type="text"
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="e.g. Rp 10,000,000 - Rp 15,000,000" />
							</div>
						</div>
					</div>

					<div class="bg-white shadow rounded-lg p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>

						<div class="space-y-6">
							<div>
								<label for="description" class="block text-sm font-medium text-gray-700 mb-1">
									Job Description *
								</label>
								<textarea id="description" v-model="form.description" rows="6" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Describe the role, responsibilities, and what the candidate will be doing..." />
							</div>

							<div>
								<label for="requirements" class="block text-sm font-medium text-gray-700 mb-1">
									Requirements *
								</label>
								<textarea id="requirements" v-model="requirementsText" rows="6" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="List the required skills, qualifications, and experience (one per line)..." />
								<p class="mt-1 text-xs text-gray-500">Enter each requirement on a new line</p>
							</div>

							<div>
								<label for="benefits" class="block text-sm font-medium text-gray-700 mb-1">
									Benefits & Perks
								</label>
								<textarea id="benefits" v-model="benefitsText" rows="4"
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="List the benefits and perks (one per line)..." />
								<p class="mt-1 text-xs text-gray-500">Enter each benefit on a new line</p>
							</div>
						</div>
					</div>

					<div class="bg-white shadow rounded-lg p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h3>

						<div class="space-y-4">
							<div>
								<label for="status" class="block text-sm font-medium text-gray-700 mb-1">
									Status *
								</label>
								<select id="status" v-model="form.status" required
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
									<option value="Draft">Draft (Not visible to applicants)</option>
									<option value="Active">Active (Visible to applicants)</option>
								</select>
							</div>

							<div>
								<label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">
									Application Deadline
								</label>
								<input id="deadline" v-model="form.deadline" type="date"
									class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
							</div>
						</div>
					</div>

					<!-- Error/Success Messages -->
					<div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{{ error }}
					</div>

					<div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
						{{ success }}
					</div>

					<!-- Submit Buttons -->
					<div class="flex justify-end space-x-3">
						<NuxtLink to="/recruiter/jobs"
							class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md text-sm font-medium">
							Cancel
						</NuxtLink>
						<button type="submit" :disabled="loading"
							class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
							{{ loading ? 'Creating...' : 'Create Job Vacancy' }}
						</button>
					</div>
				</form>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
// Form data
const form = ref({
	title: '',
	department: '',
	location: '',
	type: '',
	experience: '',
	salary: '',
	description: '',
	status: 'Draft',
	deadline: ''
})

const requirementsText = ref('')
const benefitsText = ref('')

// Form state
const loading = ref(false)
const error = ref('')
const success = ref('')

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	navigateTo('/auth/sign-in')
}

const handleSubmit = async () => {
	loading.value = true
	error.value = ''
	success.value = ''

	try {
		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1500))

		// Process requirements and benefits
		const requirements = requirementsText.value
			.split('\n')
			.map(req => req.trim())
			.filter(req => req.length > 0)

		const benefits = benefitsText.value
			.split('\n')
			.map(benefit => benefit.trim())
			.filter(benefit => benefit.length > 0)

		// Create job object
		const newJob = {
			id: Date.now(), // In real app, this would be generated by backend
			...form.value,
			requirements,
			benefits,
			applications: 0,
			postedAt: new Date().toISOString().split('T')[0]
		}

		// In a real app, this would be an API call
		// For now, we'll store in localStorage
		if (import.meta.client) {
			const existingJobs = JSON.parse(localStorage.getItem('jobVacancies') || '[]')
			existingJobs.push(newJob)
			localStorage.setItem('jobVacancies', JSON.stringify(existingJobs))
		}

		success.value = `Job vacancy "${form.value.title}" has been created successfully!`

		// Reset form
		form.value = {
			title: '',
			department: '',
			location: '',
			type: '',
			experience: '',
			salary: '',
			description: '',
			status: 'Draft',
			deadline: ''
		}
		requirementsText.value = ''
		benefitsText.value = ''

		// Redirect after success
		setTimeout(() => {
			navigateTo('/recruiter/jobs')
		}, 2000)

	} catch {
		error.value = 'An error occurred while creating the job vacancy. Please try again.'
	} finally {
		loading.value = false
	}
}

// Check authentication
onMounted(() => {
	if (import.meta.client) {
		const storedUser = localStorage.getItem('user')
		if (!storedUser) {
			navigateTo('/auth/sign-in')
			return
		}

		try {
			const userData = JSON.parse(storedUser)
			if (!userData.isAuthenticated || userData.role !== 'recruiter') {
				navigateTo('/auth/sign-in')
			}
		} catch {
			localStorage.removeItem('user')
			navigateTo('/auth/sign-in')
		}
	}
})

// Set page title
useHead({
	title: 'Create Job Vacancy - RR Chocolatte Recruitment'
})
</script>
