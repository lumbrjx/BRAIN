import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  return (
    <div className="py-6 px-8">
      <h2 className="font-bold text-blue-600 text-3xl mb-4">Workers</h2>

    <div className="flex w-full justify-between mb-6">
        <div className="flex gap-4 ">
        <div>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white  border rounded-[14px] px-4 py-3"
          >
            <option value="">All Roles</option>
            <option value="Maintainer">Maintainer</option>
            <option value="Operator">Operator</option>
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
      <Button className="bg-blue-600 hover:bg-blue-400 text-white rounded-[14px] px-4 py-6">Add worker</Button>
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
              <TableCell className="font-medium py-4">{worker.fullName}</TableCell>
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
        <Button  className="bg-blue-600 hover:bg-blue-400 rounded-[14px] text-white" onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-400 rounded-[14px] text-white" onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default WorkersTable;
