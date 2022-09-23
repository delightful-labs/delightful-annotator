import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
  define: {
    //global: {},
  },
  build: {
    target: [ 'es2020' ]
  },
  optimizeDeps: {
    include: ['@ldflex/comunica'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
};

export default config;
