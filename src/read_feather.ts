import { readFileSync } from 'fs';
import { Table, Field } from 'apache-arrow';
import { RowLike, strideForType } from 'apache-arrow/type';
import { stringify } from 'querystring';

function showTableMarkdown(t: Table): string {
  // https://loaders.gl/arrowjs/docs/developer-guide/tables
  const fields = t.schema.fields

  const colName = fields.map(x => x.name).join(' | ')
  const type_ = fields.map(x => `${x.type}`).join(' | ')
  const nullable_ = fields.map(x => x.nullable === true ? 'nullable' : '').join(' | ')
  const spliter = fields.map(() => ' --- ').join('|')

  let values = '';
  const rowLength = table2.length;
  const colLength = table2.numCols;
  console.log(table2.data.childData);
  //console.log(table2.data);
  for (let i = 0; i < rowLength; i++) {
    let row = table2.get(i) as RowLike<any>;
    //values += Object.entries(row).map(x => x[0] + ' | ')
    console.log(row.toString())
    //console.log(row[i])
  }
  const array = table2.getColumn('col_Int64').toArray()
  console.log(array)
  const out = [colName, type_, nullable_, spliter, values].join('\n')
  return out
}


const arrow1 = readFileSync('df.feather');
// const table1 = Table.from(arrow1);
// console.log(table1.schema.toString());

const arrow2 = readFileSync('df.arrow');
const table2 = Table.from([arrow2]);

console.log(showTableMarkdown(table2))
