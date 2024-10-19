import { Worker } from "worker_threads";


export function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./producer.ts');

    // Listen for messages from the worker
    worker.on('message', (result) => {
      console.log(`Received from worker: ${result}`);
      resolve(result); // Resolve the promise with the result
    });

    // Handle any errors from the worker
    worker.on('error', reject);

    // Handle worker exit
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    return worker;
  });
}
export async function sendMessageToWorker(worker: any, data:any) {
  worker.postMessage(data);
}
