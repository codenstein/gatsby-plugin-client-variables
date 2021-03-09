const React = require("react");

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const script = []
  const env = []
  Object.entries(pluginOptions.variables || {}).forEach(([key, value]) => {
    script.push(`const ${key} = "${value}";`)
    env.push(`"${key}": ${["`${", key, "}`"].join("")}`)
  })

  script.push(`window["$$client-variables"] = { ${env.join(",")} };`)

  setHeadComponents([
    React.createElement("script", {
      id: "gatsby-plugin-client-variables",
      type: "text/javascript",
      dangerouslySetInnerHTML: {
        __html: script.join(""),
      },
    }),
  ])
}
