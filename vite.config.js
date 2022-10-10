import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
  define: {
    //Because of LDO. Might be able to raise an issue.
    process: {
      env: ''
    },
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
  ssr: {
    noExternal: ['@inrupt/solid-client']
  }
};

export default config;
