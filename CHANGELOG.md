# Releases

## @yearn-finance/web-lib@0.8.9 to @yearn-finance/web-lib@0.8.17
- [9df6ee9f191905ca60ca127da83af9fbd4b2d021](https://github.com/yearn/web-lib/commit/9df6ee9f191905ca60ca127da83af9fbd4b2d021): Feat: Deprecate `@yearn/web-lib` in favor of `@yearn-finance/web-lib` by disabling Github Actions.
- [9f9ac258c3b4af275330e7053089750ff33032ca](https://github.com/yearn/web-lib/commit/9f9ac258c3b4af275330e7053089750ff33032ca): Fix: Fix `TxHashWithActions` to use the correct URI
- [ab5b62db2691650fcd0d5627b0b4e9921cc09500](https://github.com/yearn/web-lib/commit/ab5b62db2691650fcd0d5627b0b4e9921cc09500): Fix: Removing auto-changeset actions.
- [3d4a83cfc7f5cad53e676fb193ff3227cfb3a2bf](https://github.com/yearn/web-lib/commit/3d4a83cfc7f5cad53e676fb193ff3227cfb3a2bf): Fix: Export the `style.css` file correctly (enable `postcss`)

## @yearn-finance/web-lib@0.8.8
- [eb0fe2f16e0fce4b79798c72b315ef764b446754](https://github.com/yearn/web-lib/commit/eb0fe2f16e0fce4b79798c72b315ef764b446754): Feat: Add the `partnerContractAddress` to the default Networks settings.
- [eb0fe2f16e0fce4b79798c72b315ef764b446754](https://github.com/yearn/web-lib/commit/eb0fe2f16e0fce4b79798c72b315ef764b446754): Fix: Set the default ChainID to the one sent as `options.defaultChainID` (default: 1)

## @yearn-finance/web-lib@0.8.7
- [eb0fe2f16e0fce4b79798c72b315ef764b446754](https://github.com/yearn/web-lib/commit/eb0fe2f16e0fce4b79798c72b315ef764b446754): Fix: Set the ENS listener to mainnet only instead of default network.

## @yearn-finance/web-lib@0.8.4 to @yearn-finance/web-lib@0.8.6
- [e09b40bdd2b99aacf1589e3c428076ab09961981](https://github.com/yearn/web-lib/commit/e09b40bdd2b99aacf1589e3c428076ab09961981): Feat: Add a new CSS variable `--default-rounded` to define the default border radius, available as a class via `rounded-default`
- [e09b40bdd2b99aacf1589e3c428076ab09961981](https://github.com/yearn/web-lib/commit/e09b40bdd2b99aacf1589e3c428076ab09961981): Fix: Remove extra font import and some color failure
- [e09b40bdd2b99aacf1589e3c428076ab09961981](https://github.com/yearn/web-lib/commit/e09b40bdd2b99aacf1589e3c428076ab09961981): Feat: Split the theming system in multiple CSS files to be able to only import the required ones:
	- `style.css` will import `style.light.css` and `style.dark.css`
	- `style.light.css` define the colors and specific styles for the light theme
	- `style.dark.css` define the colors and specific styles for the dark theme
	- `style.macarena.css` define the colors and specific styles for the macarena theme


## @yearn-finance/web-lib@0.8.0 to @yearn-finance/web-lib@0.8.3
- [15cc1e9901fb706d8e5a34733080c61352b4a32f](https://github.com/yearn/web-lib/commit/15cc1e9901fb706d8e5a34733080c61352b4a32f): Doc: Add an OG image to the Readme
- [fdb6cbd0d37df37abc3430b82dcaba3c2ee16e75](https://github.com/yearn/web-lib/commit/fdb6cbd0d37df37abc3430b82dcaba3c2ee16e75): Fix: Remove extra precision for nested CSS class to avoid conflicts.
- [75ce536e367e45f4c25008237e2b3990fb783865](https://github.com/yearn/web-lib/commit/75ce536e367e45f4c25008237e2b3990fb783865): Fix: Add more precision over the CSS classes to avoid conflicts.
- [e5c19f9c9a7185ce57f35f9508f0ccb65a639986](https://github.com/yearn/web-lib/commit/e5c19f9c9a7185ce57f35f9508f0ccb65a639986): Fix: Replace deprecated color for the modals from (`bg-dark` to `bg-black`).
- [0d4a52d257d17cb33f62cf47609ec419d1e62af7](https://github.com/yearn/web-lib/commit/0d4a52d257d17cb33f62cf47609ec419d1e62af7): Fix: Linting the code.

## @yearn-finance/web-lib@0.8.0
- [335891d732c35b04b516d4eb2762dc8eed3e4919](https://github.com/yearn/web-lib/commit/335891d732c35b04b516d4eb2762dc8eed3e4919): Update the color system  
> **Warning**  
> This bump is a breaking change about the color names.  
> Please, update at least the following declaration `color-(bg|text|border)-(all-previous-names)` to the current new HSL color names.  
> See bellow for mapping.  

Color system update, updating color system from RGB to HSL.  
HEX and RGB are the most common formats for representing color on the web, but they’re not the most useful.  
Using HEX or RGB, colors that have a lot in common visually look nothing alike in code.  
HSL fixes this by representing colors using attributes the human-eye intuitively perceives: hue, saturation, and lightness.  
Hue is a color’s position on the color wheel — it’s the attribute of a color that lets us identify two colors as “blue” even if they aren’t identical.  

<details>
  <summary>HSL vs RGB</summary>
  
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
</details>

<details>
  <summary>New color names</summary>

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
</details>

## @yearn-finance/web-lib@0.7.0
-  [d9ab314768db316b1ca6593256057123d5ebd1df](https://github.com/yearn/web-lib/commit/d9ab314768db316b1ca6593256057123d5ebd1df): Fix: Issue in the input example
-  [d3875cbb72bea8517902547589adf32336dfcebe](https://github.com/yearn/web-lib/commit/d3875cbb72bea8517902547589adf32336dfcebe): Fix: Issue with the network config in `useSettings` being undefined if no options is provided
-  [bba70013376d0ba54543e0f09ff4187cd7a93427](https://github.com/yearn/web-lib/commit/bba70013376d0ba54543e0f09ff4187cd7a93427): Feat: Update the way TxHashWithActions and AddressWithActions works, removing the default explorer argument value and using the combinaison of networks from useSettings and chainID from useWeb3 to determine the correct explorer address. If the explorer param is not empty, this will override the automatic assignation.
