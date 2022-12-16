const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	daisyui: {
		themes: [
			{
				cnfsTheme: {
					primary: "#f41199",
					secondary: "#95bfed",
					accent: "#006ce8",
					neutral: "#1A1A2D",
					"base-100": "#222A4E",
					info: "#9ABCEF",
					success: "#1F8E85",
					warning: "#B58712",
					error: "#EC2258",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};

module.exports = config;
