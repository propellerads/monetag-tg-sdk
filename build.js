import esbuild from 'esbuild'
import fs from 'fs'

const version = process.env.VERSION || '1.0.0'
const domain = process.env.DOMAIN || 'yoszi.com'

console.log('Buidling version:', version)
console.log('Building with domain:', domain)

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

packageJson.version = version

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf-8')

esbuild.build({
  entryPoints: ['index.ts'],
  outfile: 'index.js',
  minify: true,
  define: {
    'process.env.DOMAIN': JSON.stringify(domain),
  }
}).catch(() => process.exit(1))

