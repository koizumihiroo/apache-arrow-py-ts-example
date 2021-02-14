import { readFileSync } from 'fs';
import { Table } from 'apache-arrow';

function main() {
  const arrow = readFileSync('simple.arrow');
  const table = Table.from([arrow]);

  console.log(table.data.childData);
};

main();

/*
 foo,  bar,  baz
   1,    1,   aa
null, null, null
   3, null, null
   4,    4,  bbb
   5,    5, cccc
*/