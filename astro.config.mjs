import { defineConfig } from "astro/config";

export default defineConfig({
	// Netlify sets URL during build; used for canonical URLs, sitemaps, OG tags later.
	site: process.env.URL,
	// Inline CSS into HTML → no render-blocking stylesheet request (big FCP/LCP win on Slow 4G).
	build: {
		inlineStylesheets: "always",
	},
	image: {
		// Sharp is the default; kept explicit for clarity and production parity.
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
	},
});
