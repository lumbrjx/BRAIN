import React from "react";
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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVydXNlciIsInJvbGUiOiJTVVBFUlVTRVIiLCJpZCI6IjY0N2Q2YWJlLTg2Y2QtNDc5MC1iOTQ4LWQxM2YwMmMxYmZiMSIsImNyZWF0ZWRfYXQiOiIyMDI0LTEwLTE4VDAwOjEzOjI3Ljk2OFoiLCJpYXQiOjE3MjkyODI0NDIsImV4cCI6MTczMDU3ODQ0Mn0.KyMKt59NEuSUzu_T0i3yEs6nsUGZ41-HjUGeVvJJNdA";

const getJobs = async (): Promise<JobsResponse> => {
  try {
    const response = await axios.get('https://38c1-105-235-139-169.ngrok-free.app/api/v1/jobs', {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch jobs`);
  }
};

export function JobsTable() {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  });

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