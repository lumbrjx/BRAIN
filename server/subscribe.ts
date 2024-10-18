import axios from "axios";
import { config } from "dotenv";
config()

const Machines = [
  'stamping_press_001',
  'painting_robot_002',
  'agv_003',
  'cnc_milling_004',
  'leak_test_005',
  'welding_robot_006'
];

const callbackUrl = process.env.CALLBACK_URL
const apiUrl = process.env.DEVFEST_URL

console.log(apiUrl)
Machines.forEach(async (machine) => {
  try {
    const response = await axios.post(apiUrl, {
      machine: machine,
      callback_url: callbackUrl
    });

    console.log(`Response for machine ${machine}:`, response.data);
  } catch (error : any) {
    console.error(`Error for machine ${machine}:`, error.message );
  }
});

