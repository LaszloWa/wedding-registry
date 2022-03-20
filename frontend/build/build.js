import esbuild from "esbuild";
import { promises as fsp } from "fs";

const build = () =>
	esbuild.build({
		entryPoints: ["./src/index.jsx"],
		bundle: true,
		minify: true,
		outdir: "./public/dist",
		plugins: [],
		loader: { ".css": "file", ".js": "jsx" },
		target: ["chrome87", "firefox87", "safari12"],
	});

fsp
	.mkdir("./public/dist", { recursive: true })
	.then(() => Promise.all([build()]))
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	})
	.finally(() => {
		process.exit();
	});
