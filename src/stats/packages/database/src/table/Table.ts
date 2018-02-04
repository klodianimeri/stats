import { Column } from "./Column";
import { Row } from "./Row";
import { DataType, TypeUtilities } from "./DataType";

export class Table {
    private _name: string;
    private _columns: Array<Column>;
    //data        
    private _data: Array<Row>;

    constructor(name: string) {
        this._name = name;
        this._columns = new Array<Column>();
        this._data = new Array<Row>();
    }

    public Construct(columns: Array<Column>, data: Array<Row>): Table {
        this._columns = columns;
        this._data = data;
        return this;
    }

    public ConstructFromObject(object: Object): Table {
        let properties = Object.getOwnPropertyNames(object);
        properties.forEach((propertie, index) => {
            let newColumn = new Column(propertie, TypeUtilities.PrimitiveToDataType(object[propertie]));
            this._columns.push(newColumn);
        });
        return this;
    }

    get Columns(): Array<Column> {
        return this._columns;
    }

    Column(name: string): Column {
        return this._columns.filter((column) => { return column.Name == name })[0];
    }

    get Data(): Array<Row> {
        return this._data;
    }

    set Data(value: Array<Row>) {
        this._data = value;
    }

    get Name(): string {
        return this._name;
    }
}

