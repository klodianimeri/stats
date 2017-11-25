
/**
 * DataType
 */
export enum DataType {
  Boolean,
  Integer,
  Double,
  String,
  GeoPoint,
  Set,
  Complex,
  Date,
  Time,
  DateTime
}

/**
 * RepresentingType
 */
export enum RepresentingType {
  Boolean,
  Number,
  String,
  Date,
  Array,
  Object
}

export class TypeUtilities {

  static RepresentingToDataType(representingType: RepresentingType): DataType {
    switch (representingType) {
      case RepresentingType.String: return DataType.String;
      case RepresentingType.Number: return DataType.Integer;
      case RepresentingType.Array: return DataType.Set;
      case RepresentingType.Boolean: return DataType.Boolean;
      case RepresentingType.Date: return DataType.Date;
      case RepresentingType.Object: return DataType.Complex;
    }
  }

  static DataToRepresentingType(dataType: DataType): RepresentingType {
    switch (dataType) {
      case DataType.Boolean: return RepresentingType.Boolean;
      case DataType.Complex: return RepresentingType.Object;
      case DataType.Date: return RepresentingType.Date;
      case DataType.DateTime: return RepresentingType.Date;
      case DataType.Double: return RepresentingType.Number;
      case DataType.GeoPoint: return RepresentingType.Array;
      case DataType.Integer: return RepresentingType.Number;
      case DataType.Set: return RepresentingType.Array;
      case DataType.String: return RepresentingType.String;
      case DataType.Time: return RepresentingType.Date;
    }
  }

  static PrimitiveToRepresentingType(primitiveType: any): RepresentingType {
    switch (Object.prototype.toString.call(primitiveType)) {
      case '[object Boolean]': return RepresentingType.Boolean;
      case '[object Number]': return RepresentingType.Number;
      case '[object String]': return RepresentingType.String;
      case '[object Object]': return RepresentingType.Object;
      case '[object Date]': return RepresentingType.Date;
    }
  }

  static PrimitiveToDataType(primiveType: any): DataType {
    return TypeUtilities.RepresentingToDataType(TypeUtilities.PrimitiveToRepresentingType(primiveType));
  }

  constructor() { }

}
