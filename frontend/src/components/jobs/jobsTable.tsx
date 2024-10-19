import axios from "axios";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/authWrapper";

interface Job {
	id: string;
	name: string;
	timesc: string;
	machine_id: string;
	created_at: string;
}

interface JobsResponse {
	ok: boolean;
	message: Job[];
}

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export function JobsTable() {
	const { token } = useAuth();

	const getJobs = async (): Promise<JobsResponse> => {
		if (!token) {
			throw new Error("No authentication token available");
		}

		try {
			const response = await axios.get(`${API_DOMAIN}/api/v1/jobs`, {
				headers: {
					"ngrok-skip-browser-warning": "69420",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			throw new Error(`Failed to fetch jobs`);
		}
	};

	const { data: jobs, isLoading, error } = useQuery({
		queryKey: ['jobs'],
		queryFn: getJobs,
		enabled: !!token,
	});

	if (!token) return <div>Please log in to view jobs</div>;
	if (isLoading) return <div>Loading jobs...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="bg-[#F5F5F5] py-12 px-14 m-6 rounded-[14px]">
			<h2 className="font-bold text-blue-600 text-3xl mb-4">Jobs</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Scheduled Time</TableHead>
						<TableHead>Machine ID</TableHead>
						<TableHead>Created At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{jobs?.message.map((job) => (
						<TableRow key={job.id} className="cursor-pointer">
							<TableCell className="font-medium py-4">
								{job.name}
							</TableCell>
							<TableCell>{new Date(job.timesc).toLocaleString()}</TableCell>
							<TableCell>{job.machine_id}</TableCell>
							<TableCell>{new Date(job.created_at).toLocaleString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default JobsTable;
