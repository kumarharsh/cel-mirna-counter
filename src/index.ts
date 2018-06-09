import { readFileSync, writeFileSync, mkdirSync } from "fs";
import * as mkdirp from 'mkdirp';

if (!process.argv[2]) {
  console.error("Please specify one of EV, NOL or X2");
  process.exit(1);
}
const type = process.argv[2].trim();
if (['EV', 'X2', 'NOL'].indexOf(type) === -1) {
  console.error("Please specify one of EV, NOL or X2");
  process.exit(1);
}

const celData: Array<string> = readFileSync("./data/cel_miRNA.fa")
  .toString()
  .split("\n").map(s => s.trim());
const srcData: Array<string> = readFileSync(`./converted/source_${type}.fasta`)
  .toString()
  .split("\n").map(s => s.trim());

const counter = {};
const matcher = /\(([\d]+)\)/;
celData.forEach((row, index) => {
  if (index % 2 === 0) {
    counter[row] = counter[row] || 0;
  } else {
    const rowIndex = celData[index - 1];
    for (let i = 0; i < srcData.length; i++) {
      if (srcData[i].indexOf(row) > -1) {
        const matches = srcData[i].match(matcher);
        counter[rowIndex] += matches ? parseInt(matches[1], 10) : 1;
      }
    }
    return;
  }
  console.log(index, row);
});
mkdirp.sync('./results');
writeFileSync(`./results/${type}.json`, JSON.stringify(counter, undefined, "  "), "utf8");
console.log("Done");
