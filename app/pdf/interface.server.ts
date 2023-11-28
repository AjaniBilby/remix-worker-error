import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { Worker } from 'node:worker_threads';
import { wrap } from "comlink";

import { singleton } from "~/utils/singleton.server";
import type { WorkerType } from "./worker";


console.log('Running Worker Setup');


// hard-code a unique key so we can look up the client when this module gets re-imported
export const worker = singleton(
	"pdfWorker",
	() => new Worker("./build/worker.js")
);
export const api = singleton(
	"pdfWorkerApi",
	() => wrap<WorkerType>(nodeEndpoint(worker))
);

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