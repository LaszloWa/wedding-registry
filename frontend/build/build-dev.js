import esbuildServe from "esbuild-serve";

esbuildServe(
	{
		entryPoints: ["./src/index.jsx"],
		bundle: true,
		minify: process.env.NODE_ENV === "production",
		outdir: "./public/dist",
		plugins: [],
		loader: { ".css": "file", ".js": "jsx" },
		target: ["chrome87", "firefox87", "safari12"],
		define: {
			"process.env.NODE_ENV": JSON.stringify(
				process.env.NODE_ENV || "development",
			),
		},
	},
	{ root: "." },
);
