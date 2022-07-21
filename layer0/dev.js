const esbuild = require('esbuild')
const { createDevServer } = require('@layer0/core/dev')

const appDir = process.cwd()

module.exports = function () {
  esbuild.buildSync({
    entryPoints: [`${appDir}/sw/service-worker.js`],
    outfile: `${appDir}/dist/service-worker.js`,
    minify: true,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.LAYER0_PREFETCH_HEADER_VALUE': '"1"',
      'process.env.LAYER0_PREFETCH_CACHE_NAME': '"prefetch"',
    },
  })
  return createDevServer({
    label: 'Vue 3.0',
    command: (port) => `PORT=${port} npm run serve & npm run tailwindcss:watch`,
    ready: [/localhost:/i],
    filterOutput: (line) => !(line.includes('192.168') || line.includes('localhost')),
  })
}
