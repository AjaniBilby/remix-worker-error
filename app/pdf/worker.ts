import { parentPort } from "worker_threads";

if (!parentPort) throw new Error('InvalidWorker');

parentPort.addListener("message", () => {
	parentPort?.postMessage("pong");
});

console.info('PDF Worker initialized');


process.on('SIGTERM', () => {
	console.log(`\x1b[32m[worker-client]\x1b[0m \x1b[36mSIGTERM\x1b[0m`);
});
process.on('SIGHUP', () => {
	console.log(`\x1b[32m[worker-client]\x1b[0m \x1b[36mSIGHUP\x1b[0m`);
});

// Uncomment this and the server explodes
// process.on('uncaughtException', (error) => {
// 	console.log(`\x1b[32m[worker-client]\x1b[0m \x1b[36mUncaught Exception\x1b[0m`, error);
// });

// process.on('unhandledRejection', (reason, promise) => {
// 	console.log(
// 		`\x1b[32m[worker-client]\x1b[0m \x1b[36mUnhandled Rejection\x1b[0m\n`
// 		+ promise
// 		+ '\nreason: ' + reason);
// });