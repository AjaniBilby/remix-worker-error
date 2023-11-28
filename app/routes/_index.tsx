import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader() {
	return json({
		now: Date.now()
	});
}

export default function Index() {
	// Using now() from server to ensure the backend is actually live
	const { now } = useLoaderData<typeof loader>();

	return <>
		<h1>I'm a server :D</h1>
		<p>
			This is a mostly static page to ensure the validity of the server without interacting with any worker threads,
			please look at the status page <Link to="/status">here</Link> to see if the server implodes the moment you touch one.
		</p>
		<p>
			Look over here, a wild <Link to="/pdf" target="_blank">PDF</Link> rendered in a worker thread!!!
		</p>
		<p>{now}</p>
	</>
}
