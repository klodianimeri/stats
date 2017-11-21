import { Relationship, Table } from './../index';
import { DatabaseError } from './../../../core/index';

export class Database {
  private _name: string;
  private _tables: { [id: string]: Table; } = {};
  private _relationships: Array<Relationship> = new Array<Relationship>();

  constructor(name: string, ...tables: Array<Table>) {
    tables.forEach((table) => {
      if (this._tables[table.Name]) {
        throw new DatabaseError(`DATABASE: Table with name ${table.Name} exists in database!`);
      }

      this._tables[table.Name] = table;
    });
  }

  get Tables(): { [id: string]: Table; } {
    return this._tables;
  }

  Table(tableName: string): Table {
    return this._tables[tableName];
  }
}
