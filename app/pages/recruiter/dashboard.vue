<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Navigation Header -->
		<nav class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<h1 class="text-xl font-bold text-gray-900">RR Chocolatte Recruitment</h1>
					</div>
					<div class="flex items-center space-x-4">
						<span class="text-gray-700">Recruiter Dashboard</span>
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
				<!-- Dashboard Header -->
				<div class="mb-8">
					<h2 class="text-3xl font-bold text-gray-900">Recruitment Dashboard</h2>
					<p class="mt-2 text-gray-600">Manage job vacancies, applications, and interviews</p>
				</div>

				<!-- Quick Stats -->
				<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:briefcase" class="h-8 w-8 text-blue-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Active Jobs</p>
								<p class="text-2xl font-bold text-gray-900">{{ activeJobs.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:users" class="h-8 w-8 text-green-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Total Applications</p>
								<p class="text-2xl font-bold text-gray-900">{{ totalApplications }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:calendar" class="h-8 w-8 text-purple-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Interviews Today</p>
								<p class="text-2xl font-bold text-gray-900">{{ todayInterviews.length }}</p>
							</div>
						</div>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<div class="flex items-center">
							<Icon name="lucide:check-circle" class="h-8 w-8 text-yellow-600" />
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-600">Pending Reviews</p>
								<p class="text-2xl font-bold text-gray-900">{{ pendingApplications.length }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Quick Actions -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<NuxtLink to="/recruiter/jobs/create"
						class="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow text-center transition-colors">
						<Icon name="lucide:plus" class="h-8 w-8 mx-auto mb-2" />
						<h3 class="text-lg font-semibold">Create Job Vacancy</h3>
						<p class="text-sm opacity-90">Post a new job opening</p>
					</NuxtLink>

					<NuxtLink to="/recruiter/applications"
						class="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow text-center transition-colors">
						<Icon name="lucide:file-text" class="h-8 w-8 mx-auto mb-2" />
						<h3 class="text-lg font-semibold">View Applications</h3>
						<p class="text-sm opacity-90">Review submitted applications</p>
					</NuxtLink>

					<NuxtLink to="/recruiter/interviews"
						class="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow text-center transition-colors">
						<Icon name="lucide:calendar" class="h-8 w-8 mx-auto mb-2" />
						<h3 class="text-lg font-semibold">Manage Interviews</h3>
						<p class="text-sm opacity-90">Schedule and track interviews</p>
					</NuxtLink>
				</div>

				<!-- Recent Activities -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<!-- Recent Applications -->
					<div class="bg-white rounded-lg shadow">
						<div class="px-6 py-4 border-b">
							<h3 class="text-lg font-semibold text-gray-900">Recent Applications</h3>
						</div>
						<div class="p-6">
							<div v-if="recentApplications.length === 0" class="text-gray-500 text-center py-4">
								No recent applications
							</div>
							<div v-else class="space-y-4">
								<div v-for="application in recentApplications.slice(0, 5)" :key="application.id"
									class="flex items-center justify-between p-3 border rounded-lg">
									<div>
										<p class="font-medium text-gray-900">{{ application.applicantName }}</p>
										<p class="text-sm text-gray-600">{{ application.jobTitle }}</p>
										<p class="text-xs text-gray-500">{{ formatDate(application.appliedAt) }}</p>
									</div>
									<span :class="getStatusClass(application.status)" class="px-2 py-1 rounded-full text-xs font-medium">
										{{ application.status }}
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Upcoming Interviews -->
					<div class="bg-white rounded-lg shadow">
						<div class="px-6 py-4 border-b">
							<h3 class="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
						</div>
						<div class="p-6">
							<div v-if="upcomingInterviews.length === 0" class="text-gray-500 text-center py-4">
								No upcoming interviews
							</div>
							<div v-else class="space-y-4">
								<div v-for="interview in upcomingInterviews.slice(0, 5)" :key="interview.id"
									class="flex items-center justify-between p-3 border rounded-lg">
									<div>
										<p class="font-medium text-gray-900">{{ interview.candidateName }}</p>
										<p class="text-sm text-gray-600">{{ interview.jobTitle }}</p>
										<p class="text-xs text-gray-500">{{ formatDateTime(interview.scheduledAt) }}</p>
									</div>
									<div class="text-right">
										<p class="text-sm font-medium text-blue-600">{{ interview.interviewType }}</p>
										<p class="text-xs text-gray-500">{{ interview.location }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
// Type definitions
interface JobVacancy {
	id: number
	title: string
	department: string
	location: string
	type: string
	status: string
	postedAt: string
	applications: number
}

interface Application {
	id: number
	applicantName: string
	email: string
	jobId: number
	jobTitle: string
	status: string
	appliedAt: string
	cv?: string
}

interface Interview {
	id: number
	candidateName: string
	jobId: number
	jobTitle: string
	scheduledAt: string
	interviewType: string
	location: string
	status: string
}

// Dummy data
const activeJobs = ref<JobVacancy[]>([
	{
		id: 1,
		title: "Senior Software Engineer",
		department: "Engineering",
		location: "Jakarta",
		type: "Full-time",
		status: "Active",
		postedAt: "2025-08-01",
		applications: 15
	},
	{
		id: 2,
		title: "Marketing Manager",
		department: "Marketing",
		location: "Bandung",
		type: "Full-time",
		status: "Active",
		postedAt: "2025-08-05",
		applications: 8
	},
	{
		id: 3,
		title: "UI/UX Designer",
		department: "Design",
		location: "Remote",
		type: "Contract",
		status: "Active",
		postedAt: "2025-08-07",
		applications: 12
	}
])

const recentApplications = ref<Application[]>([
	{
		id: 1,
		applicantName: "John Doe",
		email: "john@example.com",
		jobId: 1,
		jobTitle: "Senior Software Engineer",
		status: "Under Review",
		appliedAt: "2025-08-09T10:30:00Z"
	},
	{
		id: 2,
		applicantName: "Jane Smith",
		email: "jane@example.com",
		jobId: 2,
		jobTitle: "Marketing Manager",
		status: "Interview Scheduled",
		appliedAt: "2025-08-08T14:20:00Z"
	},
	{
		id: 3,
		applicantName: "Mike Johnson",
		email: "mike@example.com",
		jobId: 3,
		jobTitle: "UI/UX Designer",
		status: "Applied",
		appliedAt: "2025-08-08T09:15:00Z"
	}
])

const upcomingInterviews = ref<Interview[]>([
	{
		id: 1,
		candidateName: "Jane Smith",
		jobId: 2,
		jobTitle: "Marketing Manager",
		scheduledAt: "2025-08-10T10:00:00Z",
		interviewType: "Technical",
		location: "Office Room A",
		status: "Scheduled"
	},
	{
		id: 2,
		candidateName: "Sarah Wilson",
		jobId: 1,
		jobTitle: "Senior Software Engineer",
		scheduledAt: "2025-08-10T14:00:00Z",
		interviewType: "HR Interview",
		location: "Video Call",
		status: "Scheduled"
	}
])

// Computed properties
const totalApplications = computed(() => {
	return activeJobs.value.reduce((total, job) => total + job.applications, 0)
})

const todayInterviews = computed(() => {
	const today = new Date().toDateString()
	return upcomingInterviews.value.filter(interview =>
		new Date(interview.scheduledAt).toDateString() === today
	)
})

const pendingApplications = computed(() => {
	return recentApplications.value.filter(app =>
		app.status === 'Applied' || app.status === 'Under Review'
	)
})

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	navigateTo('/auth/sign-in')
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
		'Rejected': 'bg-red-100 text-red-800',
		'Hired': 'bg-green-100 text-green-800'
	}
	return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
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
	title: 'Recruiter Dashboard - RR Chocolatte Recruitment'
})
</script>
