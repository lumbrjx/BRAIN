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
  name: string;
  state: string;
  info: string;
  created_at: string;
}

interface MachinesResponse {
  ok: string;
  message: Machine[];
}

const getMachines = async (apiDomain: string, token: string): Promise<MachinesResponse> => {
  try {
    const response = await axios.get(`${apiDomain}/api/v1/machines`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw new Error(`Failed to fetch machines: ${error}`);
  }
};

export function MachinesTable() {
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

  if (!API_DOMAIN) {
    throw new Error("API_DOMAIN environment variable is not defined.");
  }

  const { token } = useAuth(); 

  if (!token) {
    throw new Error("Token is not available."); 
  }

  const { data: machines, isLoading, error } = useQuery({
    queryKey: ['machines'],
    queryFn: () => getMachines(API_DOMAIN, token), 
    enabled: !!token
  });

  if (isLoading) return <div>Loading machines...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="bg-[#F5F5F5] py-12 px-14 m-6 rounded-[14px]">
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
                <div
                  className={`font-medium py-2 w-[50%] rounded-[14px] text-center p-1 ${
                    machine.state === "WORKING"
                      ? "text-green-400 bg-[#DCFCE8]"
                      : "bg-[#FDE5E3] text-red-400"
                  }`}
                >
                  {machine.state}
                </div>
              </TableCell>
              <TableCell>{machine.info}</TableCell>
              <TableCell>{new Date(machine.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MachinesTable;
