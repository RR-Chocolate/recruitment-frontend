<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Navigation Header -->
		<nav class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center space-x-4">
						<NuxtLink to="/applicant/jobs" class="text-xl font-bold text-gray-900 hover:text-gray-700">
							RR Chocolatte Careers
						</NuxtLink>
						<span class="text-gray-500">/</span>
						<span class="text-gray-700">My Applications</span>
					</div>
					<div class="flex items-center space-x-4">
						<span class="text-gray-700">{{ user?.name }}</span>
						<NuxtLink to="/applicant/jobs"
							class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
							Browse Jobs
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
		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<!-- Header -->
				<div class="mb-8">
					<h2 class="text-3xl font-bold text-gray-900">My Job Applications</h2>
					<p class="mt-2 text-gray-600">Track the status of your job applications</p>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:file-text" class="h-8 w-8 text-blue-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Total Applications</p>
								<p class="text-2xl font-bold text-gray-900">{{ userApplications.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:clock" class="h-8 w-8 text-yellow-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Under Review</p>
								<p class="text-2xl font-bold text-gray-900">{{ getApplicationsByStatus('Under Review').length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:calendar" class="h-8 w-8 text-purple-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Interview Scheduled</p>
								<p class="text-2xl font-bold text-gray-900">{{ getApplicationsByStatus('Interview Scheduled').length }}
								</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:check-circle" class="h-8 w-8 text-green-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Offers</p>
								<p class="text-2xl font-bold text-gray-900">{{ getApplicationsByStatus('Offer Extended').length }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Filter -->
				<div class="bg-white p-4 rounded-lg shadow mb-6">
					<div class="flex items-center space-x-4">
						<label class="text-sm font-medium text-gray-700">Filter by Status:</label>
						<select v-model="statusFilter"
							class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">All Applications</option>
							<option value="Applied">Applied</option>
							<option value="Under Review">Under Review</option>
							<option value="Interview Scheduled">Interview Scheduled</option>
							<option value="Offer Extended">Offer Extended</option>
							<option value="Rejected">Rejected</option>
						</select>
					</div>
				</div>

				<!-- Applications List -->
				<div class="bg-white shadow rounded-lg">
					<div class="px-6 py-4 border-b">
						<h3 class="text-lg font-semibold text-gray-900">
							Applications ({{ filteredApplications.length }})
						</h3>
					</div>

					<div v-if="filteredApplications.length === 0" class="p-8 text-center">
						<Icon name="lucide:inbox" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<p class="text-gray-500 mb-4">
							{{ statusFilter ? 'No applications found with this status' : 'No applications yet' }}
						</p>
						<NuxtLink to="/applicant/jobs" class="inline-flex items-center text-blue-600 hover:text-blue-500">
							<Icon name="lucide:search" class="h-4 w-4 mr-1" />
							Browse available jobs
						</NuxtLink>
					</div>

					<div v-else class="divide-y divide-gray-200">
						<div v-for="application in filteredApplications" :key="application.id"
							class="p-6 hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-3 mb-2">
										<h4 class="text-lg font-semibold text-gray-900">{{ getJobTitle(application.jobId) }}</h4>
										<span :class="getStatusClass(application.status)"
											class="px-2 py-1 rounded-full text-xs font-medium">
											{{ application.status }}
										</span>
									</div>

									<div class="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-2">
										<span class="flex items-center">
											<Icon name="lucide:building" class="h-4 w-4 mr-1" />
											{{ getJobDepartment(application.jobId) }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:map-pin" class="h-4 w-4 mr-1" />
											{{ getJobLocation(application.jobId) }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:calendar" class="h-4 w-4 mr-1" />
											Applied {{ formatDate(application.appliedAt) }}
										</span>
									</div>

									<div v-if="application.interviewDate" class="text-sm text-purple-600 mb-2">
										<Icon name="lucide:video" class="h-4 w-4 inline mr-1" />
										Interview scheduled: {{ formatDateTime(application.interviewDate) }}
									</div>

									<div v-if="application.notes" class="text-sm text-gray-700">
										<strong>Notes:</strong> {{ application.notes }}
									</div>
								</div>

								<div class="flex items-center space-x-2">
									<NuxtLink :to="`/applicant/jobs/${application.jobId}`"
										class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50" title="View Job Details">
										<Icon name="lucide:eye" class="h-4 w-4" />
									</NuxtLink>
									<button v-if="canWithdraw(application.status)"
										class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Withdraw Application"
										@click="confirmWithdraw(application)">
										<Icon name="lucide:x" class="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Withdraw Confirmation Modal -->
		<div v-if="showWithdrawModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Withdraw Application</h3>
				<p class="text-gray-600 mb-6">
					Are you sure you want to withdraw your application for "{{ getJobTitle(applicationToWithdraw?.jobId) }}"?
					This action cannot be undone.
				</p>
				<div class="flex space-x-3">
					<button class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
						@click="withdrawApplication">
						Withdraw
					</button>
					<button class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
						@click="cancelWithdraw">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Type definitions
interface User {
	email: string
	name: string
	isAuthenticated: boolean
	role?: string
}

interface Application {
	id: number
	jobId: number
	applicantEmail: string
	status: string
	appliedAt: string
	interviewDate?: string
	notes?: string
}

interface JobVacancy {
	id: number
	title: string
	department: string
	location: string
	type: string
	status: string
	postedAt: string
}

// Reactive data
const user = ref<User | null>(null)
const userApplications = ref<Application[]>([])
const statusFilter = ref('')
const showWithdrawModal = ref(false)
const applicationToWithdraw = ref<Application | null>(null)

// Dummy job data for reference
const jobsData = [
	{ id: 1, title: "Senior Software Engineer", department: "Engineering", location: "Jakarta" },
	{ id: 2, title: "Marketing Manager", department: "Marketing", location: "Bandung" },
	{ id: 3, title: "UI/UX Designer", department: "Design", location: "Remote" },
	{ id: 4, title: "Junior Data Analyst", department: "Engineering", location: "Jakarta" }
]

// Dummy applications with various statuses
const generateDummyApplications = (userEmail: string): Application[] => {
	return [
		{
			id: 1,
			jobId: 1,
			applicantEmail: userEmail,
			status: 'Under Review',
			appliedAt: '2025-08-07T10:30:00Z',
			notes: 'Your application is being reviewed by our HR team.'
		},
		{
			id: 2,
			jobId: 2,
			applicantEmail: userEmail,
			status: 'Interview Scheduled',
			appliedAt: '2025-08-05T14:20:00Z',
			interviewDate: '2025-08-12T10:00:00Z',
			notes: 'Interview scheduled with the marketing team lead.'
		},
		{
			id: 3,
			jobId: 3,
			applicantEmail: userEmail,
			status: 'Applied',
			appliedAt: '2025-08-09T09:15:00Z'
		}
	]
}

// Computed properties
const filteredApplications = computed(() => {
	if (!statusFilter.value) return userApplications.value
	return userApplications.value.filter(app => app.status === statusFilter.value)
})

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	navigateTo('/auth/sign-in')
}

const getApplicationsByStatus = (status: string) => {
	return userApplications.value.filter(app => app.status === status)
}

const getJobTitle = (jobId: number) => {
	const job = jobsData.find(j => j.id === jobId)
	return job?.title || 'Unknown Job'
}

const getJobDepartment = (jobId: number) => {
	const job = jobsData.find(j => j.id === jobId)
	return job?.department || 'Unknown'
}

const getJobLocation = (jobId: number) => {
	const job = jobsData.find(j => j.id === jobId)
	return job?.location || 'Unknown'
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}

const formatDateTime = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
}

const getStatusClass = (status: string) => {
	const statusClasses = {
		'Applied': 'bg-blue-100 text-blue-800',
		'Under Review': 'bg-yellow-100 text-yellow-800',
		'Interview Scheduled': 'bg-purple-100 text-purple-800',
		'Offer Extended': 'bg-green-100 text-green-800',
		'Rejected': 'bg-red-100 text-red-800',
		'Withdrawn': 'bg-gray-100 text-gray-800'
	}
	return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
}

const canWithdraw = (status: string) => {
	return ['Applied', 'Under Review'].includes(status)
}

const confirmWithdraw = (application: Application) => {
	applicationToWithdraw.value = application
	showWithdrawModal.value = true
}

const withdrawApplication = () => {
	if (applicationToWithdraw.value) {
		const index = userApplications.value.findIndex(app => app.id === applicationToWithdraw.value!.id)
		if (index > -1) {
			userApplications.value[index].status = 'Withdrawn'

			// Update localStorage
			if (import.meta.client) {
				const allApplications = JSON.parse(localStorage.getItem('applications') || '[]')
				const appIndex = allApplications.findIndex((app: Application) => app.id === applicationToWithdraw.value!.id)
				if (appIndex > -1) {
					allApplications[appIndex].status = 'Withdrawn'
					localStorage.setItem('applications', JSON.stringify(allApplications))
				}
			}
		}
	}
	cancelWithdraw()
}

const cancelWithdraw = () => {
	showWithdrawModal.value = false
	applicationToWithdraw.value = null
}

// Check authentication and load data
onMounted(() => {
	if (import.meta.client) {
		const storedUser = localStorage.getItem('user')
		if (!storedUser) {
			navigateTo('/auth/sign-in')
			return
		}

		try {
			const userData = JSON.parse(storedUser)
			if (!userData.isAuthenticated || userData.role !== 'applicant') {
				navigateTo('/auth/sign-in')
				return
			}
			user.value = userData

			// Load applications
			let applications = JSON.parse(localStorage.getItem('applications') || '[]')

			// If no applications exist, create some dummy ones for demo
			if (applications.length === 0 && userData.email === 'applicant@example.com') {
				applications = generateDummyApplications(userData.email)
				localStorage.setItem('applications', JSON.stringify(applications))
			}

			userApplications.value = applications.filter((app: Application) =>
				app.applicantEmail === userData.email
			)
		} catch {
			localStorage.removeItem('user')
			navigateTo('/auth/sign-in')
		}
	}
})

// Set page title
useHead({
	title: 'My Applications - RR Chocolatte Careers'
})
</script>
