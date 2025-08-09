<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Navigation Header -->
		<nav class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<h1 class="text-xl font-bold text-gray-900">RR Chocolatte Careers</h1>
					</div>
					<div class="flex items-center space-x-4">
						<template v-if="user">
							<span class="text-gray-700">Welcome, {{ user.name }}!</span>
							<NuxtLink to="/applicant/applications"
								class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
								My Applications
							</NuxtLink>
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
								class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
								Sign Up
							</NuxtLink>
						</template>
					</div>
				</div>
			</div>
		</nav>

		<!-- Hero Section -->
		<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
			<div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<div class="text-center">
					<h1 class="text-4xl font-bold mb-4">Join Our Sweet Journey</h1>
					<p class="text-xl mb-8 opacity-90">
						Discover exciting career opportunities at RR Chocolatte
					</p>
					<div class="flex justify-center">
						<div class="bg-white text-gray-800 px-6 py-3 rounded-lg">
							<p class="text-sm font-medium">
								<Icon name="lucide:briefcase" class="h-4 w-4 inline mr-2" />
								{{ activeJobs.length }} Open Positions Available
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
			<div class="px-4 sm:px-0">
				<!-- Search and Filters -->
				<div class="bg-white p-6 rounded-lg shadow mb-8">
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div class="md:col-span-2">
							<label class="block text-sm font-medium text-gray-700 mb-1">Search Jobs</label>
							<div class="relative">
								<Icon name="lucide:search"
									class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input v-model="searchQuery" type="text" placeholder="Search by job title, keyword, or department..."
									class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
							</div>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
							<select v-model="filters.department"
								class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
								<option value="">All Departments</option>
								<option value="Engineering">Engineering</option>
								<option value="Marketing">Marketing</option>
								<option value="Design">Design</option>
								<option value="Sales">Sales</option>
								<option value="HR">HR</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
							<select v-model="filters.type"
								class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
								<option value="">All Types</option>
								<option value="Full-time">Full-time</option>
								<option value="Part-time">Part-time</option>
								<option value="Contract">Contract</option>
								<option value="Internship">Internship</option>
							</select>
						</div>
					</div>
				</div>

				<!-- Job Listings -->
				<div class="space-y-6">
					<div class="flex justify-between items-center">
						<h2 class="text-2xl font-bold text-gray-900">
							Available Positions ({{ filteredJobs.length }})
						</h2>
						<div class="text-sm text-gray-600">
							Showing {{ filteredJobs.length }} of {{ activeJobs.length }} jobs
						</div>
					</div>

					<div v-if="filteredJobs.length === 0" class="text-center py-12">
						<Icon name="lucide:search" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 class="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
						<p class="text-gray-600">
							Try adjusting your search criteria or check back later for new opportunities.
						</p>
					</div>

					<div v-else class="grid gap-6">
						<div v-for="job in filteredJobs" :key="job.id"
							class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
							<div class="p-6">
								<div class="flex justify-between items-start">
									<div class="flex-1">
										<div class="flex items-center space-x-3 mb-2">
											<h3 class="text-xl font-semibold text-gray-900">{{ job.title }}</h3>
											<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
												{{ job.type }}
											</span>
										</div>

										<div class="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-4">
											<span class="flex items-center">
												<Icon name="lucide:building" class="h-4 w-4 mr-1" />
												{{ job.department }}
											</span>
											<span class="flex items-center">
												<Icon name="lucide:map-pin" class="h-4 w-4 mr-1" />
												{{ job.location }}
											</span>
											<span v-if="job.experience" class="flex items-center">
												<Icon name="lucide:award" class="h-4 w-4 mr-1" />
												{{ job.experience }}
											</span>
											<span v-if="job.salary" class="flex items-center">
												<Icon name="lucide:dollar-sign" class="h-4 w-4 mr-1" />
												{{ job.salary }}
											</span>
										</div>

										<p class="text-gray-700 mb-4 line-clamp-3">
											{{ job.description }}
										</p>

										<div v-if="job.requirements && job.requirements.length > 0" class="mb-4">
											<h4 class="text-sm font-medium text-gray-900 mb-2">Key Requirements:</h4>
											<div class="flex flex-wrap gap-2">
												<span v-for="req in job.requirements.slice(0, 3)" :key="req"
													class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
													{{ req }}
												</span>
												<span v-if="job.requirements.length > 3" class="text-xs text-gray-500">
													+{{ job.requirements.length - 3 }} more
												</span>
											</div>
										</div>

										<div class="flex items-center text-xs text-gray-500">
											<Icon name="lucide:calendar" class="h-3 w-3 mr-1" />
											Posted {{ formatDate(job.postedAt) }}
											<span v-if="job.deadline" class="ml-4 flex items-center">
												<Icon name="lucide:clock" class="h-3 w-3 mr-1" />
												Apply by {{ formatDate(job.deadline) }}
											</span>
										</div>
									</div>

									<div class="ml-6 flex flex-col space-y-2">
										<NuxtLink :to="`/applicant/jobs/${job.id}`"
											class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center">
											View Details
										</NuxtLink>
										<button v-if="user" :disabled="hasApplied(job.id)" :class="hasApplied(job.id)
											? 'bg-gray-300 text-gray-500 cursor-not-allowed'
											: 'bg-green-600 hover:bg-green-700 text-white'"
											class="px-4 py-2 rounded-md text-sm font-medium" @click="quickApply(job)">
											{{ hasApplied(job.id) ? 'Applied' : 'Quick Apply' }}
										</button>
										<NuxtLink v-else to="/auth/sign-in"
											class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center">
											Sign In to Apply
										</NuxtLink>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Quick Apply Modal -->
		<div v-if="showQuickApplyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h3>
				<p class="text-gray-600 mb-4">
					Apply for {{ selectedJob?.title }} position?
				</p>
				<p class="text-sm text-gray-500 mb-6">
					You can provide more details and upload your CV later from your applications page.
				</p>
				<div class="flex space-x-3">
					<button class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
						@click="confirmQuickApply">
						Apply Now
					</button>
					<button class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
						@click="cancelQuickApply">
						Cancel
					</button>
				</div>
			</div>
		</div>
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
	description?: string
	requirements?: string[]
	benefits?: string[]
	salary?: string
	experience?: string
	deadline?: string
}

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
}

// Reactive data
const user = ref<User | null>(null)
const searchQuery = ref('')
const filters = ref({
	department: '',
	type: ''
})

const showQuickApplyModal = ref(false)
const selectedJob = ref<JobVacancy | null>(null)

// Dummy job data
const activeJobs = ref<JobVacancy[]>([
	{
		id: 1,
		title: "Senior Software Engineer",
		department: "Engineering",
		location: "Jakarta",
		type: "Full-time",
		status: "Active",
		postedAt: "2025-08-01",
		applications: 15,
		description: "We are looking for a senior software engineer to join our growing team. You will be responsible for developing and maintaining our web applications, working with modern technologies like Vue.js, Node.js, and cloud services.",
		requirements: ["5+ years experience", "JavaScript/TypeScript", "Vue.js/React", "Node.js", "Database design"],
		benefits: ["Health insurance", "Flexible working hours", "Remote work options", "Learning budget"],
		salary: "Rp 15,000,000 - Rp 20,000,000",
		experience: "Senior Level",
		deadline: "2025-08-30"
	},
	{
		id: 2,
		title: "Marketing Manager",
		department: "Marketing",
		location: "Bandung",
		type: "Full-time",
		status: "Active",
		postedAt: "2025-08-05",
		applications: 8,
		description: "Lead our marketing initiatives and drive brand growth. You will develop marketing strategies, manage campaigns, and work closely with the product team to increase market presence.",
		requirements: ["3+ years marketing experience", "Digital marketing", "Campaign management", "Analytics tools", "Team leadership"],
		benefits: ["Performance bonus", "Health insurance", "Training opportunities", "Team outings"],
		salary: "Rp 10,000,000 - Rp 15,000,000",
		experience: "Mid Level",
		deadline: "2025-08-25"
	},
	{
		id: 3,
		title: "UI/UX Designer",
		department: "Design",
		location: "Remote",
		type: "Contract",
		status: "Active",
		postedAt: "2025-08-07",
		applications: 12,
		description: "Create beautiful and user-friendly designs for our products. You will work on web and mobile applications, conduct user research, and collaborate with development teams.",
		requirements: ["3+ years design experience", "Figma/Sketch", "User research", "Prototyping", "Design systems"],
		benefits: ["Flexible schedule", "Design tool subscriptions", "Conference attendance", "Portfolio development"],
		salary: "Rp 8,000,000 - Rp 12,000,000",
		experience: "Mid Level",
		deadline: "2025-09-01"
	},
	{
		id: 4,
		title: "Junior Data Analyst",
		department: "Engineering",
		location: "Jakarta",
		type: "Full-time",
		status: "Active",
		postedAt: "2025-08-08",
		applications: 6,
		description: "Join our data team to analyze business metrics and provide insights. You will work with large datasets, create reports, and help drive data-driven decisions across the company.",
		requirements: ["1+ years experience", "SQL", "Python/R", "Data visualization", "Statistical analysis"],
		benefits: ["Mentorship program", "Learning resources", "Health insurance", "Career growth"],
		salary: "Rp 6,000,000 - Rp 9,000,000",
		experience: "Junior Level",
		deadline: "2025-08-28"
	}
])

// Get user applications from localStorage
const userApplications = ref<Application[]>([])

// Computed properties
const filteredJobs = computed(() => {
	return activeJobs.value.filter(job => {
		const matchesSearch = !searchQuery.value ||
			job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			job.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			job.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

		const matchesDepartment = !filters.value.department || job.department === filters.value.department
		const matchesType = !filters.value.type || job.type === filters.value.type

		return matchesSearch && matchesDepartment && matchesType && job.status === 'Active'
	})
})

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	user.value = null
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}

const hasApplied = (jobId: number) => {
	if (!user.value) return false
	return userApplications.value.some(app => app.jobId === jobId && app.applicantEmail === user.value!.email)
}

const quickApply = (job: JobVacancy) => {
	selectedJob.value = job
	showQuickApplyModal.value = true
}

const confirmQuickApply = () => {
	if (!user.value || !selectedJob.value) return

	const newApplication: Application = {
		id: Date.now(),
		jobId: selectedJob.value.id,
		applicantEmail: user.value.email,
		status: 'Applied',
		appliedAt: new Date().toISOString()
	}

	userApplications.value.push(newApplication)

	// Store in localStorage
	if (import.meta.client) {
		const allApplications = JSON.parse(localStorage.getItem('applications') || '[]')
		allApplications.push(newApplication)
		localStorage.setItem('applications', JSON.stringify(allApplications))
	}

	cancelQuickApply()
}

const cancelQuickApply = () => {
	showQuickApplyModal.value = false
	selectedJob.value = null
}

// Load data on mount
onMounted(() => {
	if (import.meta.client) {
		// Load user
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			try {
				const userData = JSON.parse(storedUser)
				if (userData.isAuthenticated) {
					user.value = userData
				}
			} catch {
				localStorage.removeItem('user')
			}
		}

		// Load user applications
		const applications = JSON.parse(localStorage.getItem('applications') || '[]')
		if (user.value) {
			userApplications.value = applications.filter((app: Application) =>
				app.applicantEmail === user.value!.email
			)
		}
	}
})

// Set page title
useHead({
	title: 'Job Portal - RR Chocolatte Careers'
})
</script>

<style scoped>
.line-clamp-3 {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
