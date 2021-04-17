const unified = require('unified')
const createStream = require('unified-stream');
const parse = require('remark-parse')
const gfm = require('remark-gfm')
const stringifyRemark = require('remark-stringify')
const copyCodeMetaHashUp = require('remark-copy-code-meta-hash-up');

const processor = unified()
  .use(parse)
  .use(gfm)
  .use(copyCodeMetaHashUp)
  .use(stringifyRemark)

process.stdin.pipe(createStream(processor)).pipe(process.stdout);
