import config from '@plutus/config/tailwind.config'

export default config({
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './registry/**/*.{js,ts,jsx,tsx}',
    // purge styles from grid library
    //
    './../../packages/ui/src/**/*.{tsx,ts,js}',
    './../../packages/ui-patterns/**/*.{tsx,ts,js}',
  ],
  theme: {
    extend: {
      maxWidth: {
        site: '128rem',
      },
    },
  },
})
