import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/auth/authWrapper";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface Worker {
  id: string;
  username: string;
  role: string;
  created_at: string;
}

interface WorkersResponse {
  message: Worker[];
}

export function WorkersTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const { token } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workers", token],
    queryFn: async () => {
      const response = await axios.get<WorkersResponse>(
        "https://38c1-105-235-139-169.ngrok-free.app/api/v1/users",
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    },
    enabled: !!token,
  });

  const workers = data?.message || [];

  const filteredResults = workers.filter(
    (worker: Worker) =>
      (roleFilter === "" || worker.role === roleFilter) &&
      (nameFilter === "" ||
        worker.username.toLowerCase().includes(nameFilter.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const currentItems = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = async () => {
    const newWorker = { username, password, role };

    try {
      const response = await axios.post(
        "https://38c1-105-235-139-169.ngrok-free.app/api/v1/auth/register",
        newWorker,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Worker created successfully:", response.data);
    } catch (error) {
      console.error("Error creating worker:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {(error as Error).message}</p>;

  return (
    <div className="py-6 px-8">
      <h2 className="font-bold text-blue-600 text-3xl mb-4">Workers</h2>

      <div className="flex w-full justify-between mb-6">
        <div className="flex gap-4">
          <div>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white border rounded-[14px] px-4 py-3"
            >
              <option value="">All Roles</option>
              <option value="SUPERUSER">Superuser</option>
              <option value="MAINTAINER">Maintainer</option>
              <option value="OPERATOR">Operator</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="border rounded-[14px] bg-white px-4 py-3"
            />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-foreground  text-white rounded-[14px] px-4 py-6">
              Add worker
            </Button>   
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-lg bg-[#F5F5F5]">
            <DialogHeader>
              <DialogTitle>Add worker</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="very secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select onValueChange={setRole}>
                  <SelectTrigger id="role" className="w-[180px]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SUPERUSER">Superuser</SelectItem>
                      <SelectItem value="MAINTAINER">Maintainer</SelectItem>
                      <SelectItem value="OPERATOR">Operator</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Create worker
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {filteredResults.length === 0 ? (
        <p>No workers found.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((worker) => (
                <TableRow key={worker.id} className="cursor-pointer">
                  <TableCell className="font-medium py-4">
                    {worker.username}
                  </TableCell>
                  <TableCell>{worker.role}</TableCell>
                  <TableCell>
                    {new Date(worker.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="ghost" className="p-2">
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" className="p-2 text-red-500">
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between mt-6">
            <Button
              className="bg-blue-600 hover:bg-blue-400 rounded-[14px] text-white"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-400 rounded-[14px] text-white"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkersTable;