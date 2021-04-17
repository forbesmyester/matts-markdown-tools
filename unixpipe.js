const unified = require('unified')
const createStream = require('unified-stream');
const parse = require('remark-parse')
const gfm = require('remark-gfm')
const stringifyRemark = require('remark-stringify')
const unixpipe = require('remark-unixpipe');

const processor = unified()
  .use(parse)
  .use(gfm)
  .use(unixpipe)
  .use(stringifyRemark)

process.stdin.pipe(createStream(processor)).pipe(process.stdout);
