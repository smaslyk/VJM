// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  security: {
    checkOrigin: true,
    allowedDomains: [
      {
        protocol: "https",
        hostname: "veteranjohn.com",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      HOSTINGER_MAIL_API_TOKEN: envField.string({context: 'server', access: 'secret'}),
      HOSTINGER_USER: envField.string({
        context: 'server',
        access: 'secret'
      }),
      HOSTINGER_RESOURCE_ID: envField.string({
        context: 'server',
        access: 'secret'
      }),
      HOSTINGER_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'secret'
      }),
      HOSTINGER_DISPLAY_NAME: envField.string({
        context: 'server',
        access: 'secret'
      }),

    }
  }
})