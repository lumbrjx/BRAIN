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

interface Machine {
    name : string,
    state : string,
    info : string,
    created_at : string
}
interface machinesResponse {
    ok :string,
    message : Machine[],
}

export function MachinesTable() {
    const {token} = useAuth();
    const getMachines = async (): Promise<machinesResponse> => {
      const posts = await (
        await axios.get('https://76fc-105-235-139-169.ngrok-free.app/api/v1/machines', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
      )?.data;
      
      return posts;
    }
    
    const { data:machines, isLoading, error } = useQuery({
        queryKey: ['machines'],
        queryFn: getMachines,
      })
      
    if (isLoading) return <div>Fetching posts...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
 
  return (
    <div className="bg-[#F5F5F5] py-12 px-14 m-6  rounded-[14px]">
      <h2 className="font-bold text-blue-600 text-3xl mb-4">Machines</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            
          {machines?.message.map((machine) => (
            <TableRow key={machine.name} className="cursor-pointer">
                  <TableCell className="font-medium py-4">
                {machine.name}
              </TableCell>
              <TableCell>
              <div className={`font-medium py-2 w-[50%]  rounded-[14px] text-center p-1 ${
                        machine.state === "WORKING"
                          ? "text-green-400 bg-[#DCFCE8]"
                          : "bg-[#FDE5E3] text-red-400"
                      }`}>
                {machine.state}
                </div>
              </TableCell>
              <TableCell>{machine.info}</TableCell>
              <TableCell>{machine.created_at}</TableCell>
        
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MachinesTable;
