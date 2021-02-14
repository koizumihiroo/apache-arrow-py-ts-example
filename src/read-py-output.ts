import { readFileSync } from 'fs';
import { Table } from 'apache-arrow';

declare global {
  interface String {
      /** 文字列の最初と最後に任意の文字列を追加 */
      addStartEnd(str: string): string;
  }
}

String.prototype.addStartEnd = function(str: string): string {
  return str + this + str
}

function showTableMarkdown(t: Table): string {
  // https://arrow.apache.org/docs/js/
  // https://loaders.gl/arrowjs/docs/developer-guide/tables
  const fields = t.schema.fields
  const headers = fields.map(x => `${x.name}<br>${x.type}${x.nullable === true ? '<br>nullable' : ''}`).join(' | ').addStartEnd('|')
  const spliter = fields.map(() => ' --- ').join('|').addStartEnd('|')
  const values = Array.from(Array(t.length), (_, v) => v).map(i => t.get(i).toArray().join(' | ').addStartEnd('|')).join('\n')
  const out = [headers, spliter, values].join('\n') 
  return out
}


const arrow1 = readFileSync('df.feather');
const table1 = Table.from(arrow1);
console.log(showTableMarkdown(table1));

const arrow2 = readFileSync('df.arrow');
const table2 = Table.from([arrow2]);
console.log(showTableMarkdown(table2))
