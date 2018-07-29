#!/usr/bin/env node
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const findup = require('findup-sync')
const pjson = require(findup('package.json', {cwd: process.cwd()}))
const {templateJsClass, templateJSFunctional, templateStyle} = require('./templates')

let config = {
  sourceDir: './src',
  jsExtension: 'js',
  stylesExtension: 'scss',
  suffix: 'Component'
}

if (pjson.rctgen) {
  config = {...pjson.rctgen}
}

const generateComponent = (
  {
    COMPONENT_NAME,
    SUFFIX = 'Component',
    FUNCTIONAL = false,
    JS_EXT = 'js',
    WITH_CSS = true,
    STYLE_EXT = 'scss',
    DIR = false
  }
) => {
  const name = `${COMPONENT_NAME}${SUFFIX ? SUFFIX : ''}`
  const path = `${config.sourceDir}${DIR ? '/' + DIR : ''}`

  // generate JS
  const generateJsClass = () => fs.writeFile(`${path}/${name}/${name}.${JS_EXT}`, templateJsClass({name, styleExt: STYLE_EXT, withCss: WITH_CSS}), (err) => {
    if (err) throw err;
    console.log(`${name}.${JS_EXT} has been generated`);
  });

  const generateJSFunctional = () => fs.writeFile(`${path}/${name}/${name}.${JS_EXT}`, templateJSFunctional({name, styleExt: STYLE_EXT, withCss: WITH_CSS}), (err) => {
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

if (argv.hasOwnProperty('c')) {
  if (typeof argv.c !== 'string') {
    throw 'Component name is missing'
  } else {
    let args = { COMPONENT_NAME: argv.c }

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
}