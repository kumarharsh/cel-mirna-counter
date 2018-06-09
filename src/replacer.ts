import { readFileSync, writeFileSync } from "fs";

["EV", "NOL", "X2"].forEach(type => {
  const orig = readFileSync(`./raw/GT_SO_6678_N2_${type}_R1.fasta`)
    .toString()
    // replace 'T' with 'U' nucleotide
    .replace(/T/g, "U");
  writeFileSync(`./converted/source_${type}.fasta`, orig, "utf8");
  console.log(`File created: source_${type}.fasta`);
});
