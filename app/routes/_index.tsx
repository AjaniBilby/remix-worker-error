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
		<p>{now}</p>
		<p>
			Look over here, a wild <Link to="/pdf">PDF</Link>!!!
		</p>
	</>
}
