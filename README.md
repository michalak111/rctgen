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

## CLI params

| Option        | Value          | Description                             |
| ------------- |--------------- | ----------------------------------------|
| --c           | Component name | Component name only CamelCase supported |


### Config params

Add to your `package.json` file

```json
"rctgen": {
    "sourceDir": "source directory of your components, default is ./src"
  }
```
