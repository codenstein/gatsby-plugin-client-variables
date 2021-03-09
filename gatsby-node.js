const fs = require("fs")
const path = require("path")

const PREFIX = "GATSBY_"

exports.onPreInit = (_, pluginOptions) => {
  // extend the pluginOptions with any gatsby client-side environment variables
  Object.assign(pluginOptions, {
    variables: Object.assign(
      pluginOptions.variables || {},

      Object.entries(process.env).reduce((clientVariables, [key, value]) => {
        if (key.startsWith(PREFIX)) {
          clientVariables[key.substr(PREFIX.length).toUpperCase()] = value
        }
        return clientVariables
      }, {})
    ),
  })
}

exports.onPostBuild = ({ store }, pluginOptions) => {
  const { pages } = store.getState()
  const data = { pages: Array.from(pages.values()).map(page => page.path) }

  fs.writeFileSync(
    path.resolve(pluginOptions.output || "gatsby-client-variables.json"),
    JSON.stringify(data)
  )
}
