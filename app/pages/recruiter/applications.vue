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
						<span class="text-gray-700">Applications</span>
					</div>
					<div class="flex items-center space-x-4">
						<NuxtLink to="/recruiter/dashboard"
							class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
							Dashboard
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
					<h2 class="text-3xl font-bold text-gray-900">Application Management</h2>
					<p class="mt-2 text-gray-600">Review and manage job applications</p>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:file-text" class="h-8 w-8 text-blue-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Total Applications</p>
								<p class="text-2xl font-bold text-gray-900">{{ applications.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:clock" class="h-8 w-8 text-yellow-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Pending Review</p>
								<p class="text-2xl font-bold text-gray-900">{{ getApplicationsByStatus('Applied').length }}</p>
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
								<p class="text-sm font-medium text-gray-600">Offers Extended</p>
								<p class="text-2xl font-bold text-gray-900">{{ getApplicationsByStatus('Offer Extended').length }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Filters -->
				<div class="bg-white p-4 rounded-lg shadow mb-6">
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
							<select v-model="filters.jobId" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Positions</option>
								<option v-for="job in jobsList" :key="job.id" :value="job.id">
									{{ job.title }}
								</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
							<select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Status</option>
								<option value="Applied">Applied</option>
								<option value="Under Review">Under Review</option>
								<option value="Interview Scheduled">Interview Scheduled</option>
								<option value="Offer Extended">Offer Extended</option>
								<option value="Rejected">Rejected</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
							<select v-model="filters.dateRange" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Time</option>
								<option value="today">Today</option>
								<option value="week">This Week</option>
								<option value="month">This Month</option>
							</select>
						</div>
						<div class="flex items-end">
							<button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
								@click="clearFilters">
								Clear Filters
							</button>
						</div>
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
						<p class="text-gray-500">No applications found</p>
					</div>

					<div v-else class="divide-y divide-gray-200">
						<div v-for="application in filteredApplications" :key="application.id"
							class="p-6 hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-3 mb-2">
										<h4 class="text-lg font-semibold text-gray-900">{{ application.applicantName }}</h4>
										<span :class="getStatusClass(application.status)"
											class="px-2 py-1 rounded-full text-xs font-medium">
											{{ application.status }}
										</span>
									</div>

									<div class="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-2">
										<span class="flex items-center">
											<Icon name="lucide:briefcase" class="h-4 w-4 mr-1" />
											{{ getJobTitle(application.jobId) }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:mail" class="h-4 w-4 mr-1" />
											{{ application.applicantEmail }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:calendar" class="h-4 w-4 mr-1" />
											Applied {{ formatDate(application.appliedAt) }}
										</span>
									</div>

									<div v-if="application.cv" class="text-sm text-blue-600 mb-2">
										<Icon name="lucide:paperclip" class="h-4 w-4 inline mr-1" />
										CV: {{ application.cv }}
									</div>

									<div v-if="application.notes" class="text-sm text-gray-700">
										<strong>Notes:</strong> {{ application.notes }}
									</div>
								</div>

								<div class="flex items-center space-x-2">
									<div class="relative">
										<button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium"
											@click="toggleStatusMenu(application.id)">
											Update Status
										</button>

										<!-- Status Update Menu -->
										<div v-if="showStatusMenu === application.id"
											class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
											<div class="py-1">
												<button v-for="status in statusOptions" :key="status"
													class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
													@click="updateApplicationStatus(application.id, status)">
													{{ status }}
												</button>
											</div>
										</div>
									</div>

									<button class="text-purple-600 hover:text-purple-900 p-2 rounded-md hover:bg-purple-50"
										title="Schedule Interview" @click="scheduleInterview(application)">
										<Icon name="lucide:calendar-plus" class="h-4 w-4" />
									</button>

									<button class="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
										title="View Details" @click="viewApplicationDetails(application)">
										<Icon name="lucide:eye" class="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Schedule Interview Modal -->
		<div v-if="showInterviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Schedule Interview</h3>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Interview Date & Time</label>
						<input v-model="interviewForm.datetime" type="datetime-local"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
						<select v-model="interviewForm.type" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
							<option value="HR Interview">HR Interview</option>
							<option value="Technical">Technical</option>
							<option value="Final Interview">Final Interview</option>
						</select>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Location/Link</label>
						<input v-model="interviewForm.location" type="text" placeholder="Office room or video call link"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
					</div>
				</div>
				<div class="flex space-x-3 mt-6">
					<button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
						@click="confirmScheduleInterview">
						Schedule
					</button>
					<button class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
						@click="cancelScheduleInterview">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Type definitions
interface Application {
	id: number
	applicantName: string
	applicantEmail: string
	jobId: number
	status: string
	appliedAt: string
	cv?: string
	notes?: string
}

interface Job {
	id: number
	title: string
	department: string
}

// Reactive data
const applications = ref<Application[]>([
	{
		id: 1,
		applicantName: "John Doe",
		applicantEmail: "john@example.com",
		jobId: 1,
		status: "Applied",
		appliedAt: "2025-08-09T10:30:00Z",
		cv: "john_doe_cv.pdf"
	},
	{
		id: 2,
		applicantName: "Jane Smith",
		applicantEmail: "jane@example.com",
		jobId: 2,
		status: "Interview Scheduled",
		appliedAt: "2025-08-08T14:20:00Z",
		cv: "jane_smith_resume.pdf",
		notes: "Strong marketing background, scheduled for team interview"
	},
	{
		id: 3,
		applicantName: "Mike Johnson",
		applicantEmail: "mike@example.com",
		jobId: 3,
		status: "Under Review",
		appliedAt: "2025-08-08T09:15:00Z",
		cv: "mike_johnson_portfolio.pdf"
	},
	{
		id: 4,
		applicantName: "Sarah Wilson",
		applicantEmail: "sarah@example.com",
		jobId: 1,
		status: "Offer Extended",
		appliedAt: "2025-08-06T16:45:00Z",
		cv: "sarah_wilson_cv.pdf",
		notes: "Excellent technical skills, offer sent"
	},
	{
		id: 5,
		applicantName: "Tom Brown",
		applicantEmail: "tom@example.com",
		jobId: 4,
		status: "Applied",
		appliedAt: "2025-08-09T11:20:00Z",
		cv: "tom_brown_resume.pdf"
	}
])

const jobsList = ref<Job[]>([
	{ id: 1, title: "Senior Software Engineer", department: "Engineering" },
	{ id: 2, title: "Marketing Manager", department: "Marketing" },
	{ id: 3, title: "UI/UX Designer", department: "Design" },
	{ id: 4, title: "Junior Data Analyst", department: "Engineering" }
])

const filters = ref({
	jobId: '',
	status: '',
	dateRange: ''
})

const showStatusMenu = ref<number | null>(null)
const showInterviewModal = ref(false)
const selectedApplication = ref<Application | null>(null)

const interviewForm = ref({
	datetime: '',
	type: 'HR Interview',
	location: ''
})

const statusOptions = ['Applied', 'Under Review', 'Interview Scheduled', 'Offer Extended', 'Rejected']

// Computed properties
const filteredApplications = computed(() => {
	return applications.value.filter(app => {
		const matchesJob = !filters.value.jobId || app.jobId.toString() === filters.value.jobId
		const matchesStatus = !filters.value.status || app.status === filters.value.status
		const matchesDate = !filters.value.dateRange || checkDateRange(app.appliedAt, filters.value.dateRange)

		return matchesJob && matchesStatus && matchesDate
	})
})

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	navigateTo('/auth/sign-in')
}

const getApplicationsByStatus = (status: string) => {
	return applications.value.filter(app => app.status === status)
}

const getJobTitle = (jobId: number) => {
	const job = jobsList.value.find(j => j.id === jobId)
	return job?.title || 'Unknown Job'
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}

const getStatusClass = (status: string) => {
	const statusClasses = {
		'Applied': 'bg-blue-100 text-blue-800',
		'Under Review': 'bg-yellow-100 text-yellow-800',
		'Interview Scheduled': 'bg-purple-100 text-purple-800',
		'Offer Extended': 'bg-green-100 text-green-800',
		'Rejected': 'bg-red-100 text-red-800'
	}
	return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
}

const checkDateRange = (dateString: string, range: string) => {
	const date = new Date(dateString)
	const now = new Date()

	switch (range) {
		case 'today':
			return date.toDateString() === now.toDateString()
		case 'week':
			const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
			return date >= weekAgo
		case 'month':
			const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
			return date >= monthAgo
		default:
			return true
	}
}

const clearFilters = () => {
	filters.value = {
		jobId: '',
		status: '',
		dateRange: ''
	}
}

const toggleStatusMenu = (applicationId: number) => {
	showStatusMenu.value = showStatusMenu.value === applicationId ? null : applicationId
}

const updateApplicationStatus = (applicationId: number, status: string) => {
	const application = applications.value.find(app => app.id === applicationId)
	if (application) {
		application.status = status
	}
	showStatusMenu.value = null
}

const scheduleInterview = (application: Application) => {
	selectedApplication.value = application
	showInterviewModal.value = true

	// Set default datetime to tomorrow
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	tomorrow.setHours(10, 0, 0, 0)
	interviewForm.value.datetime = tomorrow.toISOString().slice(0, 16)
}

const confirmScheduleInterview = () => {
	if (selectedApplication.value) {
		selectedApplication.value.status = 'Interview Scheduled'
		// In a real app, you would save the interview details
	}
	cancelScheduleInterview()
}

const cancelScheduleInterview = () => {
	showInterviewModal.value = false
	selectedApplication.value = null
	interviewForm.value = {
		datetime: '',
		type: 'HR Interview',
		location: ''
	}
}

const viewApplicationDetails = (application: Application) => {
	// In a real app, this would open a detailed view
	alert(`Viewing details for ${application.applicantName}`)
}

// Close status menu when clicking outside
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

		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement
			if (!target.closest('.relative')) {
				showStatusMenu.value = null
			}
		})
	}
})

// Set page title
useHead({
	title: 'Application Management - RR Chocolatte Recruitment'
})
</script>
