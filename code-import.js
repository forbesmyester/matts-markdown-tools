const unified = require('unified');
const createStream = require('unified-stream');
const parse = require('remark-parse');
const gfm = require('remark-gfm');
const remarkCodeImport = require('remark-code-import');
const stringifyRemark = require('remark-stringify')
const readline = require('readline');
const vfile = require('vfile');
const path = require('path');

function constructVfile(contents) {
    return vfile({
        contents,
        path: path.join(process.cwd(), '._UNKNOWN_FILENAME.md'),
        dirname: process.cwd()
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const text = [];
rl.on('line',function (line) {
    text.push(line);
});

rl.on('close', function() {

    const processor = unified()
        .use(parse)
        .use(gfm)
        .use(remarkCodeImport)
        .use(stringifyRemark)
        .process(constructVfile(text.join('\n')), function(err, file) {
            if (err) {
                console.error("ERR: ", err.message);
                process.exit(1);
            }
            console.log(file.contents);
        }
    );

});

