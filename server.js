const fs = require("fs");
const path = require("path");
const envsub = require("envsub");

module.exports = async (data = "gatsby-client-variables.json", options) => {
  const publicDir = options.publicDir || path.resolve("public/");

  if (typeof data === "string") {
    data = fs.readFileSync(data);
    data = JSON.parse(data);
  }

  const envs = Object.entries(process.env).map(([key, value]) => {
    return { name: key, value };
  });

  for (const page of data.pages) {
    const file = path.join(publicDir, page, "index.html");
    await envsub({ templateFile: file, outputFile: file, options: { envs } });
  }
};
