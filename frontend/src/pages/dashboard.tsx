import Sock from "../components/sock";
import { useAuth } from "@/auth/authWrapper";
import Chart from "@/components/charts/chart";
export default function Dashboard() {
  const { username} = useAuth();

  return (
    <div>
      <div className="bg-[#F5F5F5] p-6 m-6  rounded-[14px]">
      <Sock/>
      </div>
      <h1 className="text-3xl font-bold">Hello {username}</h1>
      <Chart/>
    </div>
  );
}
