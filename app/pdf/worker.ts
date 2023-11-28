
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { parentPort } from "worker_threads";
import { expose } from 'comlink';

import { RenderExample } from './render/example';

if (!parentPort) throw new Error('InvalidWorker');

export type WorkerType = {
	RenderExample: typeof RenderExample,
	Ping: typeof Ping,
};

function Ping() {
	return "pong";
}

expose({
	RenderExample,
	Ping
}, nodeEndpoint(parentPort));

console.info('PDF Worker initialized');