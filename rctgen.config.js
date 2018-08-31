const customClass = ({name, withCss = true, styleExt = 'scss'}) => `import * as React from 'react'
${withCss ? "import './"+ name + "." + styleExt + "'\n" : ''}
export default class ${name} extends React.Component {
  render () {
    return (
      <div>Here is your ${name}</div>
    )
  }
}`

const customClassContainer = ({name, withCss = true, styleExt = 'scss'}) => `import * as React from 'react'
import {connect} from 'react-redux'

${withCss ? "import './"+ name + "." + styleExt + "'\n" : ''}
class ${name} extends React.Component {
  render () {
    return (
      <div>Here is your ${name}</div>
    )
  }
}

export default connect(state => state)(${name})
`

module.exports =  {
    types: [
        {
            type: "component",
            suffix: "Component",
            dir: "components",
            classTemplate: customClass
        },
        {
            type: "container",
            suffix: "Page",
            dir: "containers",
            classTemplate: customClassContainer
        }
    ]
}