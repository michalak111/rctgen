#!/usr/bin/env node
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const findup = require('findup-sync')
const pjson = require(findup('package.json', {cwd: process.cwd()}))

const config = {
  filesSourceDir: pjson.rctgen ? pjson.rctgen.sourceDir :'./src'
}

const camelCaseIntoLisp = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const generateComponent = (COMPONENT_NAME) => {

  const templateJS = `import * as React from 'react'

export default ${COMPONENT_NAME}Component extends React.Component {
  render () {
    return (
      <div>${COMPONENT_NAME}Component</div>
    )
  }
}`

const templateCSS = `.${camelCaseIntoLisp(COMPONENT_NAME)} {}`

  if (!fs.existsSync(config.filesSourceDir)){
    console.error('Source folder does not exist!')
    return
  }

  fs.mkdir(`${config.filesSourceDir}/${COMPONENT_NAME}Component`, (err) => {
    if (err) throw err;
    console.log(`${COMPONENT_NAME}Component directory has been generated`)
    fs.writeFile(`${config.filesSourceDir}/${COMPONENT_NAME}Component/${COMPONENT_NAME}Component.js`, templateJS, (err) => {
      if (err) throw err;
      console.log(`${COMPONENT_NAME}Component.js has been generated`);
    });
    fs.writeFile(`${config.filesSourceDir}/${COMPONENT_NAME}Component/${COMPONENT_NAME}Component.scss`, templateCSS, (err) => {
      if (err) throw err;
      console.log(`${COMPONENT_NAME}Component.scss has been generated`);
    });
  });
}

if (argv.hasOwnProperty('c')) {
  if (typeof argv.c !== 'string') {
    throw 'Component name is missing'
  } else {
    generateComponent(argv.c)
  }
}