// import {read} from 'to-vfile'
// const vfile = require('vfile');
// import {remark} from 'remark'
// 
// main()
// 
// async function main() {
//   const file = await remark()
//     .use(remarkToc)
//     .process(await read('example.md'))
// 
//   console.log(String(file))
// } 
// 


// const unified = require('unified');
// const createStream = require('unified-stream');
// const parse = require('remark-parse');
// const gfm = require('remark-gfm');
// // const remarkToc = import('remark-toc');
// // const { remark } = import('remark');
// const remarkCodeImport = require('remark-code-import');
// const stringifyRemark = require('remark-stringify')
import readline from 'readline';
import path from 'path';
// const vfile = require('vfile');
// const path = require('path');


import toVfile from 'to-vfile'
import {remark} from 'remark'
import vfile from 'vfile'
import remarkToc from 'remark-toc'


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

rl.on('close', async function() {

  const fileP = await remark()
    .use(remarkToc)
    .process(constructVfile(text.join('\n')))

  console.log((fileP.value));

});

