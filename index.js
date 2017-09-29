const { json } = require('micro')
const cors = require('micro-cors')()
const svgson = require('svgson-next').default

const handler = async function(req, res) {
  const data = await json(req)
  const {
    svg,
    optimize,
    svgoConfig = {
      plugins: [
        { removeStyleElement: true },
        {
          removeAttrs: {
            attrs:
              '(stroke-width|stroke-linecap|stroke-linejoin|width|height|class|data.*)',
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

module.exports = cors(handler)
