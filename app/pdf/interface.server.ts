import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { Worker } from 'node:worker_threads';
import { Remote, wrap } from "comlink";

import { DemolishSingleton, OptionalSingleton, singleton } from "~/utils/singleton.server";
import type { WorkerType } from "./worker";


console.log('Running Worker Setup');

let expiry: NodeJS.Timeout | null = null;
function GetAPI () {
	ResetExpiry();
	const worker = singleton("pdfWorker",
		() => {
			console.log("spawning worker");
			const w = new Worker("./build/worker.js");
			return w;
		}
	);
	return singleton("pdfWorkerApi",
		() => wrap<WorkerType>(nodeEndpoint(worker))
	);
}


function ResetExpiry() {
	if (expiry) clearTimeout(expiry);
	expiry = setTimeout(ExpireWorker, 5_000);
}

function ExpireWorker() {
	console.log("Worker expired");
	const worker = OptionalSingleton<Worker>("pdfWorker");

	DemolishSingleton("pdfWorker");
	DemolishSingleton("pdfWorkerApi");
	if (!worker) return;
	worker.terminate();
}


// function WorkerProxy<F extends keyof WorkerType>(methodName: F): (...args: Parameters<WorkerType[F]>) => Remote<WorkerType[F]> {
// 	return function () {
// 		return GetAPI()[methodName].prototype.apply(arguments);
// 	} as any;
// }


export function RenderExample() {
	const api = GetAPI();
	return api.RenderExample();
}


export function SafePing(): Promise<"OK"| "CORRUPT" | "TIMEOUT"> {
	return new Promise((res, rej) => {
		const api = GetAPI();
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
	switch (await SafePing()) {
		case "OK":      console.log('PDF Work successfully hand shook');      break;
		case "CORRUPT": console.error('Error: PDF Work is corrupt');          break;
		case "TIMEOUT": console.error('Error: PDF Work timed out handshake'); break;
	}
}
VerifyStartUp();