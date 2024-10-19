import Leak_test from "@/components/charts/leak_test";
import { useAuth } from "@/auth/authWrapper";
import Cnc_miling from "@/components/charts/cnc_milling";
import Painting_robot from "@/components/charts/painting_robot";
import Welding_robot from "@/components/charts/welding_robot";
import Agv from "@/components/charts/agv";
import Stamping_press from "@/components/charts/stamping_press";

export default function Chart() {
  const { token } = useAuth();

  return (
    <div className=" bg-[#F5F5F5] p-6 m-6  rounded-[14px]">
      <h2 className="text-primary text-4xl font-bold my-10">Graphs</h2>
      {token && (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-lg text-primary font-semibold mb-2">Stamping Press</h3>
            <Stamping_press token={token} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg text-primary font-semibold mb-2">AGV</h3>
            <Agv token={token} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg text-primary font-semibold mb-2">CNC Milling</h3>
            <Cnc_miling token={token} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg text-primary font-semibold mb-2">Painting Robot</h3>
            <Painting_robot token={token} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg text-primary font-semibold mb-2">Welding Robot</h3>
            <Welding_robot token={token} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg text-primary font-semibold mb-2">Leak Test</h3>
            <Leak_test token={token} />
          </div>
        </div>
      )}
    </div>
  );
}
