import type { SitemapFunction } from "remix-sitemap";
import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { COMMIT, MODE } from "~/status.server";
import { SafePing } from "~/pdf/interface.server";

export const sitemap: SitemapFunction = async () => ({
	exclude: true
})

export const meta: MetaFunction = () => [
	{ title: "Status" }
];

export async function loader() {
	// console.log(SafePing);

	return json({
		commit: COMMIT,
		mode: MODE,
		pid: process.pid,
		node_ver: process.version,
		pdf_worker: await SafePing()
	})
}


export default function Render() {
	const data = useLoaderData<typeof loader>();

	return <div>
		<h1>Status</h1>

		<div style={{
			display: "grid",
			gridTemplateColumns: "auto 1fr",
			margin: "1em 0",
			gap: "2px 10px"
		}}>
			<div>Mode</div>
			<div>{data.mode}</div>

			<div>Commit</div>
			<div><a href={`https://github.com/AjaniBilby/remix-worker-error/commit/${data.commit}`}>{data.commit.slice(0, 7)}</a></div>

			<div>PID</div>
			<div>{data.pid}</div>

			<div>Node Version</div>
			<div>{data.node_ver}</div>

			<div>PDF Worker</div>
			<div>{data.pdf_worker}</div>
		</div>
	</div>
}