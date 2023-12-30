import cluster from "node:cluster";
import os from "node:os";

const cpu_count = os.availableParallelism();

console.log(`Total CPUs: ${cpu_count}.`);

cluster.setupPrimary({
  exec: `${__dirname}/app`,
});

for (let i = 0; i < cpu_count; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(
    `Worker ${worker.process.pid} has been exited with code ${code}.`
  );
  console.log(`Starting new worker...`);

  cluster.fork().on("listening", (address) => {
    console.log(`New worker is listening on ${address}.`);
  });
});
