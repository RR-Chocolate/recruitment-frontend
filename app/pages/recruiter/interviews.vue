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
						<span class="text-gray-700">Interview Management</span>
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
				<div class="flex justify-between items-center mb-8">
					<div>
						<h2 class="text-3xl font-bold text-gray-900">Interview Management</h2>
						<p class="mt-2 text-gray-600">Schedule and manage candidate interviews</p>
					</div>
					<button
						class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
						@click="openCreateModal">
						<Icon name="lucide:plus" class="h-4 w-4 mr-2" />
						Schedule Interview
					</button>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:calendar" class="h-8 w-8 text-blue-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Total Interviews</p>
								<p class="text-2xl font-bold text-gray-900">{{ interviews.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:clock" class="h-8 w-8 text-yellow-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Today</p>
								<p class="text-2xl font-bold text-gray-900">{{ todayInterviews.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:calendar-days" class="h-8 w-8 text-purple-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">This Week</p>
								<p class="text-2xl font-bold text-gray-900">{{ weekInterviews.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:check-circle" class="h-8 w-8 text-green-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Completed</p>
								<p class="text-2xl font-bold text-gray-900">{{ completedInterviews.length }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Filters -->
				<div class="bg-white p-4 rounded-lg shadow mb-6">
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
							<select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Status</option>
								<option value="Scheduled">Scheduled</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
								<option value="Cancelled">Cancelled</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
							<select v-model="filters.type" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Types</option>
								<option value="HR Interview">HR Interview</option>
								<option value="Technical">Technical</option>
								<option value="Final Interview">Final Interview</option>
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

				<!-- Interview List -->
				<div class="bg-white shadow rounded-lg">
					<div class="px-6 py-4 border-b">
						<h3 class="text-lg font-semibold text-gray-900">
							Interviews ({{ filteredInterviews.length }})
						</h3>
					</div>

					<div v-if="filteredInterviews.length === 0" class="p-8 text-center">
						<Icon name="lucide:calendar-x" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<p class="text-gray-500">No interviews found</p>
					</div>

					<div v-else class="divide-y divide-gray-200">
						<div v-for="interview in filteredInterviews" :key="interview.id"
							class="p-6 hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-3 mb-2">
										<h4 class="text-lg font-semibold text-gray-900">{{ interview.candidateName }}</h4>
										<span :class="getStatusClass(interview.status)" class="px-2 py-1 rounded-full text-xs font-medium">
											{{ interview.status }}
										</span>
										<span class="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
											{{ interview.interviewType }}
										</span>
									</div>

									<div class="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-2">
										<span class="flex items-center">
											<Icon name="lucide:briefcase" class="h-4 w-4 mr-1" />
											{{ interview.jobTitle }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:calendar" class="h-4 w-4 mr-1" />
											{{ formatDateTime(interview.scheduledAt) }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:map-pin" class="h-4 w-4 mr-1" />
											{{ interview.location }}
										</span>
										<span v-if="interview.interviewer" class="flex items-center">
											<Icon name="lucide:user" class="h-4 w-4 mr-1" />
											{{ interview.interviewer }}
										</span>
									</div>

									<div v-if="interview.notes" class="text-sm text-gray-700 mb-2">
										<strong>Notes:</strong> {{ interview.notes }}
									</div>

									<div v-if="interview.feedback" class="text-sm text-gray-700">
										<strong>Feedback:</strong> {{ interview.feedback }}
									</div>
								</div>

								<div class="flex items-center space-x-2">
									<button v-if="interview.status === 'Scheduled'"
										class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium"
										@click="startInterview(interview)">
										Start
									</button>

									<button v-if="interview.status === 'In Progress'"
										class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium"
										@click="completeInterview(interview)">
										Complete
									</button>

									<button class="text-purple-600 hover:text-purple-900 p-2 rounded-md hover:bg-purple-50"
										title="Edit Interview" @click="editInterview(interview)">
										<Icon name="lucide:edit" class="h-4 w-4" />
									</button>

									<button v-if="interview.status === 'Scheduled'"
										class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Cancel Interview"
										@click="cancelInterview(interview)">
										<Icon name="lucide:x" class="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Create/Edit Interview Modal -->
		<div v-if="showInterviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">
					{{ isEditing ? 'Edit Interview' : 'Schedule Interview' }}
				</h3>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
						<input v-model="interviewForm.candidateName" type="text"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Enter candidate name" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
						<select v-model="interviewForm.jobTitle" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
							<option value="">Select Position</option>
							<option value="Senior Software Engineer">Senior Software Engineer</option>
							<option value="Marketing Manager">Marketing Manager</option>
							<option value="UI/UX Designer">UI/UX Designer</option>
							<option value="Junior Data Analyst">Junior Data Analyst</option>
						</select>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Interview Date & Time</label>
						<input v-model="interviewForm.scheduledAt" type="datetime-local"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
						<select v-model="interviewForm.interviewType"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
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
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
						<input v-model="interviewForm.interviewer" type="text" placeholder="Enter interviewer name"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
						<textarea v-model="interviewForm.notes" rows="3" placeholder="Additional notes or preparation instructions"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
					</div>
				</div>
				<div class="flex space-x-3 mt-6">
					<button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
						@click="saveInterview">
						{{ isEditing ? 'Update' : 'Schedule' }}
					</button>
					<button class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
						@click="closeModal">
						Cancel
					</button>
				</div>
			</div>
		</div>

		<!-- Feedback Modal -->
		<div v-if="showFeedbackModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Interview Feedback</h3>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Overall Rating</label>
						<select v-model="feedbackForm.rating" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
							<option value="">Select Rating</option>
							<option value="Excellent">Excellent</option>
							<option value="Good">Good</option>
							<option value="Average">Average</option>
							<option value="Poor">Poor</option>
						</select>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
						<textarea v-model="feedbackForm.feedback" rows="4"
							placeholder="Enter your interview feedback and observations"
							class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Next Steps</label>
						<select v-model="feedbackForm.nextStep" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
							<option value="">Select Next Step</option>
							<option value="Proceed to next round">Proceed to next round</option>
							<option value="Make offer">Make offer</option>
							<option value="Reject">Reject</option>
							<option value="On hold">On hold</option>
						</select>
					</div>
				</div>
				<div class="flex space-x-3 mt-6">
					<button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
						@click="submitFeedback">
						Submit Feedback
					</button>
					<button class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
						@click="closeFeedbackModal">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Type definitions
interface Interview {
	id: number
	candidateName: string
	jobId: number
	jobTitle: string
	scheduledAt: string
	interviewType: string
	location: string
	status: string
	interviewer?: string
	notes?: string
	feedback?: string
	rating?: string
}

// Reactive data
const interviews = ref<Interview[]>([
	{
		id: 1,
		candidateName: "Jane Smith",
		jobId: 2,
		jobTitle: "Marketing Manager",
		scheduledAt: "2025-08-10T10:00:00Z",
		interviewType: "HR Interview",
		location: "Office Room A",
		status: "Scheduled",
		interviewer: "HR Manager",
		notes: "Initial screening interview"
	},
	{
		id: 2,
		candidateName: "Sarah Wilson",
		jobId: 1,
		jobTitle: "Senior Software Engineer",
		scheduledAt: "2025-08-10T14:00:00Z",
		interviewType: "Technical",
		location: "Video Call",
		status: "Scheduled",
		interviewer: "Lead Developer"
	},
	{
		id: 3,
		candidateName: "Mike Johnson",
		jobId: 3,
		jobTitle: "UI/UX Designer",
		scheduledAt: "2025-08-09T15:30:00Z",
		interviewType: "Technical",
		location: "Office Room B",
		status: "Completed",
		interviewer: "Design Lead",
		feedback: "Strong portfolio, good design thinking",
		rating: "Good"
	},
	{
		id: 4,
		candidateName: "Tom Brown",
		jobId: 4,
		jobTitle: "Junior Data Analyst",
		scheduledAt: "2025-08-11T11:00:00Z",
		interviewType: "HR Interview",
		location: "Video Call",
		status: "Scheduled",
		interviewer: "HR Specialist"
	}
])

const filters = ref({
	status: '',
	type: '',
	dateRange: ''
})

const showInterviewModal = ref(false)
const showFeedbackModal = ref(false)
const isEditing = ref(false)
const selectedInterview = ref<Interview | null>(null)

const interviewForm = ref({
	candidateName: '',
	jobTitle: '',
	scheduledAt: '',
	interviewType: 'HR Interview',
	location: '',
	interviewer: '',
	notes: ''
})

const feedbackForm = ref({
	rating: '',
	feedback: '',
	nextStep: ''
})

// Computed properties
const filteredInterviews = computed(() => {
	return interviews.value.filter(interview => {
		const matchesStatus = !filters.value.status || interview.status === filters.value.status
		const matchesType = !filters.value.type || interview.interviewType === filters.value.type
		const matchesDate = !filters.value.dateRange || checkDateRange(interview.scheduledAt, filters.value.dateRange)

		return matchesStatus && matchesType && matchesDate
	})
})

const todayInterviews = computed(() => {
	const today = new Date().toDateString()
	return interviews.value.filter(interview =>
		new Date(interview.scheduledAt).toDateString() === today
	)
})

const weekInterviews = computed(() => {
	const now = new Date()
	const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
	return interviews.value.filter(interview => {
		const interviewDate = new Date(interview.scheduledAt)
		return interviewDate >= now && interviewDate <= weekEnd
	})
})

const completedInterviews = computed(() => {
	return interviews.value.filter(interview => interview.status === 'Completed')
})

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	navigateTo('/auth/sign-in')
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
		'Scheduled': 'bg-blue-100 text-blue-800',
		'In Progress': 'bg-yellow-100 text-yellow-800',
		'Completed': 'bg-green-100 text-green-800',
		'Cancelled': 'bg-red-100 text-red-800'
	}
	return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
}

const checkDateRange = (dateString: string, range: string) => {
	const date = new Date(dateString)
	const now = new Date()

	switch (range) {
		case 'today': {
			return date.toDateString() === now.toDateString()
		}
		case 'week': {
			const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
			return date >= now && date <= weekEnd
		}
		case 'month': {
			const monthEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
			return date >= now && date <= monthEnd
		}
		default:
			return true
	}
}

const clearFilters = () => {
	filters.value = {
		status: '',
		type: '',
		dateRange: ''
	}
}

const openCreateModal = () => {
	isEditing.value = false
	showInterviewModal.value = true

	// Set default datetime to tomorrow
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	tomorrow.setHours(10, 0, 0, 0)
	interviewForm.value.scheduledAt = tomorrow.toISOString().slice(0, 16)
}

const editInterview = (interview: Interview) => {
	isEditing.value = true
	selectedInterview.value = interview
	showInterviewModal.value = true

	interviewForm.value = {
		candidateName: interview.candidateName,
		jobTitle: interview.jobTitle,
		scheduledAt: new Date(interview.scheduledAt).toISOString().slice(0, 16),
		interviewType: interview.interviewType,
		location: interview.location,
		interviewer: interview.interviewer || '',
		notes: interview.notes || ''
	}
}

const saveInterview = () => {
	if (isEditing.value && selectedInterview.value) {
		// Update existing interview
		Object.assign(selectedInterview.value, {
			candidateName: interviewForm.value.candidateName,
			jobTitle: interviewForm.value.jobTitle,
			scheduledAt: new Date(interviewForm.value.scheduledAt).toISOString(),
			interviewType: interviewForm.value.interviewType,
			location: interviewForm.value.location,
			interviewer: interviewForm.value.interviewer,
			notes: interviewForm.value.notes
		})
	} else {
		// Create new interview
		const newInterview: Interview = {
			id: Date.now(),
			candidateName: interviewForm.value.candidateName,
			jobId: 1, // This would be dynamic in a real app
			jobTitle: interviewForm.value.jobTitle,
			scheduledAt: new Date(interviewForm.value.scheduledAt).toISOString(),
			interviewType: interviewForm.value.interviewType,
			location: interviewForm.value.location,
			status: 'Scheduled',
			interviewer: interviewForm.value.interviewer,
			notes: interviewForm.value.notes
		}
		interviews.value.push(newInterview)
	}

	closeModal()
}

const closeModal = () => {
	showInterviewModal.value = false
	isEditing.value = false
	selectedInterview.value = null
	interviewForm.value = {
		candidateName: '',
		jobTitle: '',
		scheduledAt: '',
		interviewType: 'HR Interview',
		location: '',
		interviewer: '',
		notes: ''
	}
}

const startInterview = (interview: Interview) => {
	interview.status = 'In Progress'
}

const completeInterview = (interview: Interview) => {
	selectedInterview.value = interview
	showFeedbackModal.value = true
}

const submitFeedback = () => {
	if (selectedInterview.value) {
		selectedInterview.value.status = 'Completed'
		selectedInterview.value.feedback = feedbackForm.value.feedback
		selectedInterview.value.rating = feedbackForm.value.rating
	}
	closeFeedbackModal()
}

const closeFeedbackModal = () => {
	showFeedbackModal.value = false
	selectedInterview.value = null
	feedbackForm.value = {
		rating: '',
		feedback: '',
		nextStep: ''
	}
}

const cancelInterview = (interview: Interview) => {
	if (confirm(`Are you sure you want to cancel the interview with ${interview.candidateName}?`)) {
		interview.status = 'Cancelled'
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
	title: 'Interview Management - RR Chocolatte Recruitment'
})
</script>
