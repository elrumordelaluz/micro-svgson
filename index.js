const { json } = require('micro')
const svgson = require('svgson-next').default
console.log(svgson);

module.exports = async function(req, res) {
  const data = await json(req)
  const {
    svg,
    optimize,
    svgoConfig = {
      plugins: [
        { removeStyleElement: true },
        {
          removeAttrs: {
            attrs: '(stroke-width|stroke-linecap|stroke-linejoin|)',
          },
        },
      ],
      multipass: true,
    },
    pathsKey = '',
    customAttrs = null,
    compat = false,
    camelcase = false,
  } = data

  const output = await svgson(svg, {
    optimize,
    svgoConfig,
    pathsKey,
    customAttrs,
    compat,
    camelcase,
  })

  return output
}
