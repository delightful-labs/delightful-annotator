import adapter from 'sveltekit-adapter-browser-extension';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	}
};

export default config;