const unified = require('unified')
const createStream = require('unified-stream');
const parse = require('remark-parse')
const gfm = require('remark-gfm')
const remark2rehype = require('remark-rehype')
const stringifyRehype = require('rehype-stringify')
const raw = require('rehype-raw')

const processor = unified()
  .use(parse)
  .use(gfm)
  .use(remark2rehype, {allowDangerousHtml: true})
  .use(raw)
  .use(stringifyRehype)

process.stdin.pipe(createStream(processor)).pipe(process.stdout);
