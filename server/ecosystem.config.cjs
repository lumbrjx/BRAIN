module.exports = {
	apps: [
		{
			name: "worker",
			script: "./dist/src/worker/producer.js",
			watch: true,
		},
		{
			name: "main",
			script: "./dist/src/index.js",
			watch: true,
		},
	],
};


// get jobs, get logs, get users (pagination), delete user, metrics
