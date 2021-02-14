import { readFileSync } from 'fs';
import { Table,Field } from 'apache-arrow';
import { strideForType } from 'apache-arrow/type';
import { stringify } from 'querystring';

function showTableMarkdown(t: Table): string {
  //const header = `${t.schema.fields.join(' | ')}\n`
  // const header = t.schema.fields.map(x => x.toString().split(': '))
  // const header2 = header.map(x => x[0]).join(' | ') + '\n' + header.map(x => x[1]).join(' | ')
  const fields = t.schema.fields
  // const header = fields.map(x => x.toString().split(': '))
  // const header2 = header.map(x => x['0']).join(' | ') + '\n' + header.map(x => x['1']).join(' | ')
  function getFieldValues<T>(fields: Field[], name: string,  type: T): T[] {
    return fields.map(x => (x[name] as T))
  }
  console.log(`${getFieldValues(fields, 'name', String)}`)
  const header2 = fields.map(x => `${x['name']} ${x['type']} nullable: ${x['nullable']}`)


  const spliter = fields.map(() => ' --- ').join('|')
  return `${header2}\n${spliter}\n`
}


const arrow1 = readFileSync('df.feather');
// const table1 = Table.from(arrow1);
// console.log(table1.schema.toString());

const arrow2 = readFileSync('df.arrow');
const table2 = Table.from(arrow2);
console.log(table2.getColumnAt(0).get(2) );
for (let i = 0; i < table2.length; i++) {
  console.log(table2.get(i).toString())
}

console.log(showTableMarkdown(table2))
