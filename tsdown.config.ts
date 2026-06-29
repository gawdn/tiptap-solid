import { defineConfig } from 'tsdown'
import solid from 'unplugin-solid/rolldown'

const neverBundle = [
  '@tiptap/core',
  '@tiptap/pm',
  '@tiptap/extension-bubble-menu',
  '@tiptap/extension-floating-menu',
  'solid-js',
  '@floating-ui/dom',
]

export default defineConfig([
  {
    entry: ['src/index.tsx'],
    exports: true,
    platform: 'neutral',
    dts: true,
    plugins: [solid()],
    env: { NODE_ENV: 'production', PROD: true, DEV: false, SSR: false },
    deps: { neverBundle },
  },
  {
    entry: { dev: 'src/index.tsx' },
    platform: 'neutral',
    plugins: [solid()],
    env: { NODE_ENV: 'development', PROD: false, DEV: true, SSR: false },
    deps: { neverBundle },
  },
  {
    entry: { server: 'src/index.tsx' },
    platform: 'node',
    plugins: [solid({ solid: { generate: 'ssr' } })],
    env: { NODE_ENV: 'production', PROD: true, DEV: false, SSR: true },
    deps: { neverBundle },
  },
])
