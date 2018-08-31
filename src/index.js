#!/usr/bin/env node
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const findup = require('findup-sync');

let pjson = {}

try {
  pjson = require(findup('rctgen.config.js', {cwd: process.cwd()}));
} catch (err) {
  console.log("Cannot find package.json file.\n")
}

const {templateJsClass, templateJSFunctional, templateStyle} = require('./templates')

const componentDefaults = {
    type: 'component',
    classTemplate: templateJsClass,
    functionalTemplate: templateJSFunctional,
    suffix: 'Component',
    dir: false
}

let config = {
  sourceDir: './src',
  jsExtension: 'js',
  stylesExtension: 'scss',
  suffix: 'Component',
  types: [
      {
          ...componentDefaults
      }
  ]
}

if (pjson) {
  // todo merge types arrays
  config = {...config, ...pjson}
}

console.log("config", JSON.stringify(config) +'\n\n')

const generateComponent = (
  {
    COMPONENT_NAME,
    FUNCTIONAL = false,
    JS_EXT = 'js',
    WITH_CSS = true,
    STYLE_EXT = 'scss',
    DIR = false,
    TYPE = 'component'
  }
) => {
  let component = config.types.find(el => el.type === TYPE)

  if (component === undefined) {
    console.log(`${TYPE} is undefined.`)
    return;
  } else {
    component = {...componentDefaults, ...component}
  }

  DIR = component.dir || DIR;

  const name = `${COMPONENT_NAME}${component.suffix ? component.suffix : ''}`
  const path = `${config.sourceDir}${DIR ? '/' + DIR : ''}`

  // generate JS
  const generateJsClass = () => fs.writeFile(`${path}/${name}/${name}.${JS_EXT}`, component.classTemplate({name, styleExt: STYLE_EXT, withCss: WITH_CSS}), (err) => {
    if (err) throw err;
    console.log(`${name}.${JS_EXT} has been generated`);
  });

  const generateJSFunctional = () => fs.writeFile(`${path}/${name}/${name}.${JS_EXT}`, component.functionalTemplate({name, styleExt: STYLE_EXT, withCss: WITH_CSS}), (err) => {
    if (err) throw err;
    console.log(`${name}.${JS_EXT} has been generated`);
  });


  //generate style
  const generateStyle = () => fs.writeFile(`${path}/${name}/${name}.${STYLE_EXT}`, templateStyle(name), (err) => {
    if (err) throw err;
    console.log(`${name}.scss has been generated`);
  });

  if (!fs.existsSync(config.sourceDir)){
    console.error('Source folder does not exist!')
    return
  }

  fs.mkdir(`${path}/${name}`, (err) => {
    if (err) throw err;
    console.log(`${name} directory has been generated`)

    if (!FUNCTIONAL) {
      generateJsClass();
    } else {
      generateJSFunctional();
    }

    if (WITH_CSS) {
      generateStyle();
    }
  });
}


if (typeof argv['n'] !== 'string') {
  throw 'Component name is missing'
} else {
  let args = { COMPONENT_NAME: argv['n'] }

  if(argv['t']) {
      args.TYPE = argv['t']
  }

  if(argv['noCss']) {
    args.WITH_CSS = false
  }

  if(argv['fn']) {
    args.FUNCTIONAL = true
  }

  if (argv['dir']) {
    args.DIR = argv.dir
  }

  generateComponent({...args, JS_EXT: config.jsExtension, STYLE_EXT: config.stylesExtension, SUFFIX: config.suffix})
}