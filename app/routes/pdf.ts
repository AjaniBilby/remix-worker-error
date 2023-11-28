import { RenderExample } from "~/pdf/interface.server";

export async function loader() {
	try {
		// and transform it to a Buffer to send in the Response
		const renderStream = await RenderExample();
		let headers = new Headers({
			"Content-Type": "application/pdf",
			// "Content-Disposition": `attachment; filename="export.pdf"`
		});
		return new Response(renderStream as any, { status: 200, headers });
	} catch (e: any) {
		console.error(e);
		throw new Response("Internal server error", {
			status: 500,
			statusText: e.toString() || "unknown error"
		});
	}
}

export const action = loader;
