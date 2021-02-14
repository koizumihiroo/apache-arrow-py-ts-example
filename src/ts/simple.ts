import { readFileSync } from "fs";
import { Table } from "apache-arrow";

const arrow = readFileSync("./data/simple.arrow");
const table = Table.from([arrow]);

console.log(table.toString());
console.log(table.data.childData);

// README shows below output, but current version of `toString()` does not
// https://github.com/apache/arrow/tree/master/js

// console.log(table.toString());
/*
 foo,  bar,  baz
   1,    1,   aa
null, null, null
   3, null, null
   4,    4,  bbb
   5,    5, cccc
*/
