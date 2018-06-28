'use strict'

const padEnd = require('lodash.padend')

const pk = require('..')
const {name, description} = require('../package.json')

const UNPKG = 'https://unpkg.com'

console.log(
`# ${name}

> ${description}

\`\`\`
${pk.key}
\`\`\`

## metadata

${metadataTable()}

## api

### install

\`\`\`shell
npm i @mcous/publickey
\`\`\`

### use

\`\`\`js
const pk = require('@mcous/publickey')

const key = pk.key
${metadataJs()}
\`\`\`

## http

\`\`\`shell
${metadataHttp()}
\`\`\`
`)

function metadataTable () {
  const meta = getMeta()
  const keyLen = Math.max(...meta.map(([k]) => k.length))
  const valLen = Math.max(...meta.map(([_, v]) => v.length))
  const padded = meta.map(([k, v]) => [padEnd(k, keyLen), padEnd(v, valLen)])
  return (
`| ${padEnd('', keyLen)} | ${padEnd('value', valLen)} |
| ${padEnd('', keyLen, '-')} | ${padEnd('', valLen - 1, '-')}: |
${padded.map(([k, v]) => `| ${k} | ${v} |`).join('\n')}`
  )
}

function metadataJs () {
  const assignments = getMeta().map(([k, v]) => [`const ${k} = pk.${k}`, v])
  const maxLen = Math.max(...assignments.map(([a]) => a.length))

  return (
`${assignments.map(([a, v]) => `${padEnd(a, maxLen)}  // ${v}`).join('\n')}`
  )
}

function metadataHttp () {
  return `curl ${UNPKG}/${name}`
}

function getMeta () {
  return Object.keys(pk).filter(k => k !== 'key').map(k => [k, pk[k]])
}
