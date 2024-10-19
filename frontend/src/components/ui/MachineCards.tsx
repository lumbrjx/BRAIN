import React from 'react';
import Card from './Card'; 
import { WeldingRobot,StampingPress , PaintingRobot ,AGV,CNCMachine,LeakTestMachine } from '@/types/machines';

interface MachineCardProps {
  data: (WeldingRobot | StampingPress | PaintingRobot | AGV | CNCMachine | LeakTestMachine)[];
}

const MachineCard: React.FC<MachineCardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
     
    </div>
  );
};

export default MachineCard;
