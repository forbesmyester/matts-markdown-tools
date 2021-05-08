const unified = require('unified');
const createStream = require('unified-stream');
const parse = require('remark-parse');
const gfm = require('remark-gfm');
const behead = require('remark-behead');
const stringifyRemark = require('remark-stringify')
const readline = require('readline');
const vfile = require('vfile');

function constructVfile(contents) {
    return vfile({
        contents
    });
}

if (process.argv.length < 2) {
    console.log("Must pass depth to add / substract as first argument");
    process.exit(1);
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
        .use(behead, { depth: parseInt(process.argv[2]) })
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


