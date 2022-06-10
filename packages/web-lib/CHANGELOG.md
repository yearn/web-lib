# @yearn/web-lib

## 0.9.0

### Minor Changes

- bba7001: Update the way TxHashWithActions and AddressWithActions works, removing the default explorer argument value and using the combinaison of networks from useSettings and chainID from useWeb3 to determine the correct explorer address. If the explorer param is not empty, this will override the automatic assignation.
- 1eacb58: > **Warning**

  > This bump is a breaking change about the color names. Please, update at least the following declaration `color-(bg|text|border)-(all-previous-names)` to the current new HSL color names. See bellow for mapping.

  1 - Color system update, updating color system from RGB to HSL
  HE and RGB are the most common formats for representing color on the web, but they’re not the most useful.
  Using HEX or RGB, colors that have a lot in common visually look nothing alike in code.

  ```css
  :root {
  	--color-background: rgb(244 247 251),
  	--color-background-variant: rgb(224 234 255),
  	--color-surface: rgb(255 255 255),
  	--color-surface-variant: rgb(249 251 253),
  	--color-primary: rgb(6 87 249),
  	--color-primary-variant: rgb(0 74 223),
  	--color-secondary: rgb(224 234 255),
  	--color-secondary-variant: rgb(198 215 249),
  	--color-disabled: rgb(206 213 227),
  	--color-dark: rgb(20 20 20)
  }
  ```

  HSL fixes this by representing colors using attributes the human-eye intuitively perceives: hue, saturation, and lightness.
  Hue is a color’s position on the color wheel — it’s the attribute of a color that lets us identify two colors as “blue” even if they aren’t identical.

  ```css
  :root {
  	--color-neutral-0: hsl(0 0% 100%),
  	--color-neutral-100: hsl(220 50% 98%),
  	--color-neutral-200: hsl(220 47% 97%),
  	--color-neutral-300: hsl(220 100% 94%),
  	--color-neutral-400: hsl(220 27% 85%),
  	--color-neutral-500: hsl(220 22% 36%),
  	--color-neutral-600: hsl(220 22% 25%),
  	--color-neutral-700: hsl(220 100% 14%),
  	--color-neutral-800: hsl(0 0% 8%),
  	--color-neutral-900: hsl(0 0% 0%),
  }
  ```

  2. Update the palette to use more generic names and stop loosing confusion when working with various themes:

  ```ts
  const lightTheme = {
    /* 🔵 - Yearn Finance ******************************************************
     **	These are the colors you will use the most and will make up the majority
     **	of your UI. Use them for most of your text, backgrounds, and borders,
     **	as well as for things like secondary buttons and links.
     **************************************************************************/
    "--color-neutral-0": "0 0% 100%",
    "--color-neutral-100": "220 50% 98%",
    "--color-neutral-200": "220 47% 97%",
    "--color-neutral-300": "220 100% 94%",
    "--color-neutral-400": "220 27% 85%",
    "--color-neutral-500": "220 22% 36%",
    "--color-neutral-600": "220 22% 25%",
    "--color-neutral-700": "220 100% 14%",
    "--color-neutral-800": "0 0% 8%",
    "--color-neutral-900": "0 0% 0%",

    /* 🔵 - Yearn Finance ******************************************************
     **	These are the splashes of color that should appear the most in your UI,
     **	and are the ones that determine the overall "look" of the site. Use
     **	these for things like primary actions, links, navigation items, icons,
     **	accent borders, or text you want to emphasize.
     **************************************************************************/
    "--color-primary-100": "220 100% 94%",
    "--color-primary-200": "220 81% 88%",
    "--color-primary-500": "220 95% 50%",
    "--color-primary-600": "220 100% 44%",
    "--color-accent-500": "220 95% 50%",
    "--color-accent-600": "220 100% 44%",

    /* 🔵 - Yearn Finance ******************************************************
     **	These colors should be used fairly conservatively throughout your UI to
     **	avoid overpowering your primary colors. Use them when you need an
     **	element to stand out, or to reinforce things like error states or
     **	positive trends with the appropriate semantic color.
     **************************************************************************/
    "--color-yellow-900": "32 100% 45%",
    "--color-yellow-300": "32 100% 95%",
    "--color-yellow-200": "32 100% 90%",
    "--color-pink-900": "328 100% 45%",
    "--color-pink-300": "328 100% 95%",
    "--color-pink-200": "328 100% 90%",
    "--color-red-900": "0 100% 45%",
    "--color-red-300": "0 100% 95%",
    "--color-red-200": "0 100% 90%"
  };
  const darkTheme = {
    /* 🔵 - Yearn Finance ******************************************************
     **	These are the colors you will use the most and will make up the majority
     **	of your UI. Use them for most of your text, backgrounds, and borders,
     **	as well as for things like secondary buttons and links.
     **************************************************************************/
    "--color-neutral-0": "0 0% 0%",
    "--color-neutral-100": "0 0% 10%",
    "--color-neutral-200": "0 0% 8%",
    "--color-neutral-300": "0 0% 15%",
    "--color-neutral-400": "0 0% 66%",
    "--color-neutral-500": "0 0% 100%",
    "--color-neutral-600": "0 0% 13%",
    "--color-neutral-700": "0 0% 100%",
    "--color-neutral-800": "0 0% 8%",
    "--color-neutral-900": "0 0% 100%",

    /* 🔵 - Yearn Finance ******************************************************
     **	These are the splashes of color that should appear the most in your UI,
     **	and are the ones that determine the overall "look" of the site. Use
     **	these for things like primary actions, links, navigation items, icons,
     **	accent borders, or text you want to emphasize.
     **************************************************************************/
    "--color-primary-100": "0 0% 15%",
    "--color-primary-200": "0 0% 13%",
    "--color-primary-500": "0 0% 100%",
    "--color-primary-600": "0 0% 90%",
    "--color-accent-500": "220 95% 50%",
    "--color-accent-600": "220 100% 44%",

    /* 🔵 - Yearn Finance ******************************************************
     **	These colors should be used fairly conservatively throughout your UI to
     **	avoid overpowering your primary colors. Use them when you need an
     **	element to stand out, or to reinforce things like error states or
     **	positive trends with the appropriate semantic color.
     **************************************************************************/
    "--color-yellow-900": "32 100% 45%",
    "--color-yellow-300": "32 100% 95%",
    "--color-yellow-200": "32 100% 90%",
    "--color-pink-900": "328 100% 45%",
    "--color-pink-300": "328 100% 95%",
    "--color-pink-200": "328 100% 90%",
    "--color-red-900": "0 100% 45%",
    "--color-red-300": "0 100% 95%",
    "--color-red-200": "0 100% 90%"
  };
  ```

  3. Mapping

  ```ts
  	'--color-neutral-0'    =>  '--color-surface' | '--color-button-filled-text' | '--color-button-outlined-primary'
  	'--color-neutral-100'  =>  '--color-surface-variant'
  	'--color-neutral-200'  =>  '--color-background' | '--color-button-disabled-primary'
  	'--color-neutral-300'  =>  '--color-background-variant'
  	'--color-neutral-400'  =>  '--color-disabled' | '--color-icons-primary' | '--color-typo-off' | '--color-disabled-text'
  	'--color-neutral-500'  =>  '--color-icons-variant' | '--color-typo-secondary'
  	'--color-neutral-600'  =>  '--color-typo-secondary-variant'
  	'--color-neutral-700'  =>  '--color-typo-primary'
  	'--color-neutral-800'  =>  '--color-dark'
  	'--color-neutral-900'  =>  '--color-black'
  	'--color-primary-100'  =>  '--color-secondary' | '--color-button-outlined-variant'
  	'--color-primary-200'  =>  '--color-secondary-variant'
  	'--color-primary-500'  =>  '--color-primary' | '--color-typo-primary-variant'
  	'--color-primary-600'  =>  '--color-primary-variant'
  	'--color-accent-500'   =>  '--color-button-filled-primary' | '--color-button-outlined-text'
  	'--color-accent-600'   =>  '--color-button-filled-variant'
  	'--color-yellow-900'   =>  '--color-alert-warning-primary'
  	'--color-yellow-300'   =>  '--color-alert-warning-secondary'
  	'--color-yellow-200'   =>  '--color-alert-warning-secondary-variant'
  	'--color-pink-900'     =>  '--color-alert-error-primary'
  	'--color-pink-300'     =>  '--color-alert-error-secondary'
  	'--color-pink-200'     =>  '--color-alert-error-secondary-variant'
  	'--color-red-900'      =>  '--color-alert-critical-primary'
  	'--color-red-300'      =>  '--color-alert-critical-secondary'
  	'--color-red-200'      =>  '--color-alert-critical-secondary-variant'
  ```
