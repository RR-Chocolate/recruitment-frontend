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
						<span class="text-gray-700">Job Vacancies</span>
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
						<h2 class="text-3xl font-bold text-gray-900">Job Vacancy Management</h2>
						<p class="mt-2 text-gray-600">Create, edit, and manage job postings</p>
					</div>
					<NuxtLink to="/recruiter/jobs/create"
						class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
						<Icon name="lucide:plus" class="h-4 w-4 mr-2" />
						Create New Job
					</NuxtLink>
				</div>

				<!-- Filters -->
				<div class="bg-white p-4 rounded-lg shadow mb-6">
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
							<select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Status</option>
								<option value="Active">Active</option>
								<option value="Draft">Draft</option>
								<option value="Closed">Closed</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
							<select v-model="filters.department" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
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
							<select v-model="filters.type" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
								<option value="">All Types</option>
								<option value="Full-time">Full-time</option>
								<option value="Part-time">Part-time</option>
								<option value="Contract">Contract</option>
								<option value="Internship">Internship</option>
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

				<!-- Job Listings -->
				<div class="bg-white shadow rounded-lg">
					<div class="px-6 py-4 border-b">
						<h3 class="text-lg font-semibold text-gray-900">
							Job Vacancies ({{ filteredJobs.length }})
						</h3>
					</div>

					<div v-if="filteredJobs.length === 0" class="p-8 text-center">
						<Icon name="lucide:briefcase" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<p class="text-gray-500">No job vacancies found</p>
						<NuxtLink to="/recruiter/jobs/create"
							class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
							<Icon name="lucide:plus" class="h-4 w-4 mr-1" />
							Create your first job posting
						</NuxtLink>
					</div>

					<div v-else class="divide-y divide-gray-200">
						<div v-for="job in filteredJobs" :key="job.id" class="p-6 hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-3">
										<h4 class="text-lg font-semibold text-gray-900">{{ job.title }}</h4>
										<span :class="getStatusClass(job.status)" class="px-2 py-1 rounded-full text-xs font-medium">
											{{ job.status }}
										</span>
									</div>

									<div class="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
										<span class="flex items-center">
											<Icon name="lucide:building" class="h-4 w-4 mr-1" />
											{{ job.department }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:map-pin" class="h-4 w-4 mr-1" />
											{{ job.location }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:clock" class="h-4 w-4 mr-1" />
											{{ job.type }}
										</span>
										<span class="flex items-center">
											<Icon name="lucide:users" class="h-4 w-4 mr-1" />
											{{ job.applications }} applications
										</span>
									</div>

									<div class="mt-2 text-sm text-gray-500">
										Posted on {{ formatDate(job.postedAt) }}
									</div>
								</div>

								<div class="flex items-center space-x-2">
									<NuxtLink :to="`/recruiter/jobs/${job.id}`"
										class="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100" title="View Details">
										<Icon name="lucide:eye" class="h-4 w-4" />
									</NuxtLink>
									<NuxtLink :to="`/recruiter/jobs/${job.id}/edit`"
										class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50" title="Edit Job">
										<Icon name="lucide:edit" class="h-4 w-4" />
									</NuxtLink>
									<button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete Job"
										@click="confirmDelete(job)">
										<Icon name="lucide:trash-2" class="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Delete Confirmation Modal -->
		<div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
				<p class="text-gray-600 mb-6">
					Are you sure you want to delete the job "{{ jobToDelete?.title }}"?
					This action cannot be undone.
				</p>
				<div class="flex space-x-3">
					<button class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
						@click="deleteJob">
						Delete
					</button>
					<button class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
						@click="cancelDelete">
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
	salary?: string
}

// Dummy data
const jobs = ref<JobVacancy[]>([
	{
		id: 1,
		title: "Senior Software Engineer",
		department: "Engineering",
		location: "Jakarta",
		type: "Full-time",
		status: "Active",
		postedAt: "2025-08-01",
		applications: 15,
		description: "We are looking for a senior software engineer to join our growing team.",
		requirements: ["5+ years experience", "JavaScript/TypeScript", "Vue.js/React"],
		salary: "Rp 15,000,000 - Rp 20,000,000"
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
		description: "Lead our marketing initiatives and drive brand growth.",
		requirements: ["3+ years marketing experience", "Digital marketing", "Campaign management"],
		salary: "Rp 10,000,000 - Rp 15,000,000"
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
		description: "Create beautiful and user-friendly designs for our products.",
		requirements: ["3+ years design experience", "Figma/Sketch", "User research"],
		salary: "Rp 8,000,000 - Rp 12,000,000"
	},
	{
		id: 4,
		title: "Sales Representative",
		department: "Sales",
		location: "Surabaya",
		type: "Full-time",
		status: "Draft",
		postedAt: "2025-08-08",
		applications: 0,
		description: "Drive sales growth and build relationships with clients.",
		requirements: ["2+ years sales experience", "Communication skills", "Target-oriented"],
		salary: "Rp 7,000,000 - Rp 10,000,000"
	},
	{
		id: 5,
		title: "Data Analyst",
		department: "Engineering",
		location: "Jakarta",
		type: "Full-time",
		status: "Closed",
		postedAt: "2025-07-15",
		applications: 25,
		description: "Analyze data to provide insights for business decisions.",
		requirements: ["SQL expertise", "Python/R", "Statistical analysis"],
		salary: "Rp 9,000,000 - Rp 13,000,000"
	}
])

// Filters
const filters = ref({
	status: '',
	department: '',
	type: ''
})

// Modal state
const showDeleteModal = ref(false)
const jobToDelete = ref<JobVacancy | null>(null)

// Computed properties
const filteredJobs = computed(() => {
	return jobs.value.filter(job => {
		return (
			(!filters.value.status || job.status === filters.value.status) &&
			(!filters.value.department || job.department === filters.value.department) &&
			(!filters.value.type || job.type === filters.value.type)
		)
	})
})

// Methods
const handleSignOut = () => {
	if (import.meta.client) {
		localStorage.removeItem('user')
	}
	navigateTo('/auth/sign-in')
}

const clearFilters = () => {
	filters.value = {
		status: '',
		department: '',
		type: ''
	}
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

const getStatusClass = (status: string) => {
	const statusClasses = {
		'Active': 'bg-green-100 text-green-800',
		'Draft': 'bg-yellow-100 text-yellow-800',
		'Closed': 'bg-red-100 text-red-800'
	}
	return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
}

const confirmDelete = (job: JobVacancy) => {
	jobToDelete.value = job
	showDeleteModal.value = true
}

const deleteJob = () => {
	if (jobToDelete.value) {
		const index = jobs.value.findIndex(job => job.id === jobToDelete.value!.id)
		if (index > -1) {
			jobs.value.splice(index, 1)
		}
	}
	cancelDelete()
}

const cancelDelete = () => {
	showDeleteModal.value = false
	jobToDelete.value = null
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
	title: 'Job Vacancy Management - RR Chocolatte Recruitment'
})
</script>
