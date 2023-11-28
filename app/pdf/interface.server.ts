import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { Worker } from 'node:worker_threads';
import { Remote, wrap } from "comlink";

import type { WorkerType } from "./worker";

declare global {
	var __pdfWorker__: Worker;
	var __pdfWorkerApi__: Remote<WorkerType>;
}


console.log('Running Worker Setup');
if (!global.__pdfWorker__) {
	global.__pdfWorker__ = new Worker("./build/worker.js");
	global.__pdfWorkerApi__ = wrap<WorkerType>(nodeEndpoint(global.__pdfWorker__));
}

const api = global.__pdfWorkerApi__;
export const RenderExample = api.RenderExample;

export function SafePing(): Promise<"OK"| "CORRUPT" | "TIMEOUT"> {
	return new Promise((res, rej) => {
		let returned = false;

		setTimeout(() => {
			if (returned) return;
			returned = true;
			res("TIMEOUT");
		}, 500);

		api.Ping().then((v) => {
			returned = true;
			res(v == "pong"
				? "OK"
				: "CORRUPT"
			);
		}).catch(rej);
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

setInterval(()=>{
	console.log('status check', global.__pdfWorker__);
}, 1000)