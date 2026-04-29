import { defineConfig } from "astro/config";

export default defineConfig({
	image: {
		// Sharp is the default; kept explicit for clarity and production parity.
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
	},
});
