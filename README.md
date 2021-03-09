# Gatsby Client Variables Plugin

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin to allow server-side runtime environment variables to be made available to client-side scripts.

By default, Gatsby only makes system environment variables [prefixed with `GATSBY_`](https://www.gatsbyjs.org/docs/environment-variables/#accessing-environment-variables-in-javascript) available to client scripts. Using this plugin, you can make server-side runtime environment variables available within the browser i.e., env variables passed to docker container.

## Install

```
npm install gatsby-plugin-client-variables
```

## How to use

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-client-variables`,
      options: {
        output: "config/gatsby-client-variables.json",
      },
    },
  ],
};
```

Client-side:

```js
import variables from "gatsby-plugin-client-variables";
```

```js
import { API_URL } from "gatsby-plugin-client-variables";
```

Server-side:

```js
const initClientVariables = require("gatsby-plugin-client-variables/server");

async function main() {
  await initClientVariables("config/gatsby-client-variables.json", {
    publicDir: "public/",
  });

  app.listen(3000, function () {
    console.log("App started on port 3000");
  });
}

main();
```
