## rctgen - CLI for generating react components

This cli allows you to generate react components from templates within one command.

## Instalation

****Instal it globally****
```
npm install -g rctgen
```

or

```
yarn global add rctgen
```



****You can install it locally and use it as well with yarn****

```
yarn add --dev rctgen
```

and use it

```
yarn rctgen --param value
```

## CLI options

| Option        | Value          | Description                                                  |
| ------------- |--------------- | -------------------------------------------------------------|
| --c           | Component name | Component name only CamelCase supported                      |
| --noCss       |                | Generates Component without styles                          |
| --fn          |                | Generates function component instead of class Component      |

### Config options

You can add to your `package.json` file

```
"rctgen": {
    "sourceDir": "./src",     // source directory of your components, default is,
    "jsExtension: "js",       // javascript file extension (js, jsx, tsx)
    "stylesExtension: 'scss'  // styles file extension (css, sass, scss etc.)
  }
```
