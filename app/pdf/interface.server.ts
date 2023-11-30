import { Worker } from 'node:worker_threads';
import { singleton } from "~/utils/singleton.server";


console.log('Running Worker Setup');


// hard-code a unique key so we can look up the client when this module gets re-imported
export const worker = singleton(
	"pdfWorker",
	() => new Worker("./build/worker.js")
);

type status = "OK"| "CORRUPT" | "TIMEOUT";
const queue: Array<(v: status) => void> = [];

worker.addListener("message", () => {
	const res = queue.pop();
	if (!res) return;

	res("OK");
});

for (const event of ["error", "exit", "message", "messageerror", "online"]) {
	worker.on(event, (e) => {
		console.log(`\x1b[32m[worker-client]\x1b[0m \x1b[36m${event}\x1b[0m ${e}`)
	});
}

export function SafePing(): Promise<status> {
	return new Promise<status>(res => {
		worker.postMessage("ping");
		queue.push(res);

		setTimeout(() => {
			const i = queue.indexOf(res);
			if (i !== -1) {
				queue.splice(i, 1);
				res("TIMEOUT");
			}
		}, 500);
	});
}


async function VerifyStartUp() {
	const res = await SafePing();
	switch (res) {
		case "OK":      console.log('PDF Work successfully hand shook');      break;
		case "CORRUPT": console.error('Error: PDF Work is corrupt');          break;
		case "TIMEOUT": console.error('Error: PDF Work timed out handshake'); break;
	}
}
VerifyStartUp();

const keepAlive = setInterval(()=> {
	if (worker.threadId == -1) {
		console.log('worker has no thread, assumed dead');
		clearInterval(keepAlive);
	} else {
		console.log(`worker alive on thread:`, worker.threadId);
	}
}, 2000);