import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/auth/authWrapper";
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
  fullName: string;
  role: string;
  createdAt: string;
}

const workerData = [
    {
      fullName: "John Doe",
      role: "Maintainer",
      createdAt: "2024-09-21 14:30",
    },
    {
      fullName: "Jane Smith",
      role: "Operator",
      createdAt: "2024-09-20 11:15",
    },
    {
      fullName: "Alice Johnson",
      role: "Maintainer",
      createdAt: "2024-09-19 16:45",
    },
    {
      fullName: "Michael Brown",
      role: "Operator",
      createdAt: "2024-09-18 10:30",
    },
    {
      fullName: "Emily Davis",
      role: "Maintainer",
      createdAt: "2024-09-17 08:20",
    },
    {
      fullName: "David Wilson",
      role: "Operator",
      createdAt: "2024-09-16 09:45",
    },
    {
      fullName: "Emma Clark",
      role: "Maintainer",
      createdAt: "2024-09-15 14:10",
    },
    {
      fullName: "Sophia Lewis",
      role: "Operator",
      createdAt: "2024-09-14 12:00",
    },
  ];
  

export function WorkersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [roleFilter, setRoleFilter] = useState(""); 
  const [nameFilter, setNameFilter] = useState("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const {token} = useAuth();
  const filteredResults = workerData.filter(
    (worker) =>
      (roleFilter === "" || worker.role === roleFilter) &&
      (nameFilter === "" || worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()))
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
        "https://brain-production-0450.up.railway.app/api/v1/auth/register",
         newWorker,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log("Worker created successfully:", response.data);
    } catch (error) {
      console.error("Error creating worker:", error);
    }
  };

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
            <Button className="bg-blue-600 hover:bg-blue-400 text-white rounded-[14px] px-4 py-6">
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
            <TableRow key={worker.fullName} className="cursor-pointer">
              <TableCell className="font-medium py-4">
                {worker.fullName}
              </TableCell>
              <TableCell>{worker.role}</TableCell>
              <TableCell>{worker.createdAt}</TableCell>
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
    </div>
  );
}

export default WorkersTable;
