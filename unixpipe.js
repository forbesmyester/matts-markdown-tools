const unified = require('unified')
const createStream = require('unified-stream');
const parse = require('remark-parse')
const gfm = require('remark-gfm')
const stringifyRemark = require('remark-stringify')
const unixpipe = require('remark-unixpipe');

function reparse(markdownSource, next) {
    try {
        const v = unified().use(parse).use(gfm).parse('\n' + markdownSource + '\n').children;
        next(null, v);
    } catch (e) {
        next(e);
    }
}

const processor = unified()
  .use(parse)
  .use(gfm)
  .use(unixpipe, { reparse } )
  .use(stringifyRemark)

process.stdin.pipe(createStream(processor)).pipe(process.stdout);
