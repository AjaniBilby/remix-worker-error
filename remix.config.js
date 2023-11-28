/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	cacheDirectory: "./node_modules/.cache/remix",
	ignoredRouteFiles: ["**/.*", "**/*.test.{js,jsx,ts,tsx}"],
	serverModuleFormat: "cjs",
	serverBuildPath: "./build/index.js",
	browserNodeBuiltinsPolyfill: {
		modules: {
			buffer: true,
			crypto: true,
			events: true,
			util:   true,
		}
	}
};
