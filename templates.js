const camelCaseIntoLisp = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const templateJsClass = ({name, withCss = true, styleExt = 'scss'}) => `import * as React from 'react'
${withCss ? "import './"+ name + "." + styleExt + "'\n" : ''}
export default ${name} extends React.Component {
  render () {
    return (
      <div>${name}</div>
    )
  }
}`

const templateJSFunctional = ({name, withCss = true, styleExt = 'scss'}) => `import * as React from 'react'
${withCss ? "import './"+ name + "." + styleExt + "'\n" : ''}
const ${name} = (props) => (<div>Hi ${name}</div>)

export default ${name}`

const templateStyle = (name) => `.${camelCaseIntoLisp(name)} {}`

module.exports = {templateJsClass, templateJSFunctional, templateStyle}