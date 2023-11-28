import {
	Link, Links, Outlet,
	useRouteError,
	Meta, Scripts, ScrollRestoration, LiveReload,
	isRouteErrorResponse,
} from "@remix-run/react";

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<html lang="en">
				<head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>{`Error ${error.status} | ${error.statusText}`}</title>
					<Links />
				</head>
				<body>
					<div className="wrapper toolbar">
						<Link to="/" className="blue-border" aria-labelledby="home"
							style={{
								width: "54px",
								aspectRatio: "1 / 1",
								order: 0,
								backgroundImage: 'url(/media/logo-large.png)',
								backgroundSize: 'contain',
								backgroundRepeat: "no-repeat",
								borderWidth: "1px"
						}}></Link>
					</div>

					<div className="wrapper content-box">
						<h1>
							{error.status} {error.statusText}
						</h1>
						<p style={{whiteSpace: "pre-wrap"}}>{error.data}</p>
					</div>
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</html>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p style={{whiteSpace: "pre-wrap"}}>{error.message}</p>
				<p>The stack trace is:</p>
				<pre style={{whiteSpace: "pre-wrap"}}>{error.stack}</pre>
			</div>
		);
	} else {
		return <div>
			<h1>Unknown Error</h1>
		</div>;
	}
}
