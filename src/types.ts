export type PrimitiveType =
  | 'null'
  | 'boolean'
  | 'int'
  | 'long'
  | 'float'
  | 'double'
  | 'bytes'
  | 'string';

export type AvroSchema = DefinedType | DefinedType[];
export type DefinedType = PrimitiveType | ComplexType | LogicalType | string;
export type ComplexType = NamedType | RecordType | EnumType | MapType | ArrayType | FixedType;
export type LogicalType = ComplexType;

export interface NamedType {
  type: PrimitiveType;
}

export enum FieldOrder {
  'ascending' = 'ascending',
  'descending' = 'descending',
  'ignore' = 'ignore',
}

export interface RecordFieldSerialized {
  name: string;
  doc?: string;
  type: AvroSchema;
  default?: unknown;
  order?: FieldOrder;
}

export interface RecordType {
  type: 'record';
  name: string;
  namespace?: string;
  doc?: string;
  aliases?: string[];
  fields: RecordFieldSerialized[];
}

export interface EnumType {
  type: 'enum';
  name: string;
  namespace?: string;
  aliases?: string[];
  doc?: string;
  symbols: string[];
  default?: string;
}

export interface ArrayType {
  type: 'array';
  items: AvroSchema;
}

export interface MapType {
  type: 'map';
  values: AvroSchema;
}

export interface FixedType {
  type: 'fixed';
  name: string;
  aliases?: string[];
  size: number;
}

export interface DefaultPrimitiveTypes {
  null: null;
  boolean: boolean;
  int: number;
  long: number;
  float: number;
  double: number;
  bytes: number;
  string: string;
}

export interface BaseFieldParams {
  name: string;
  doc?: string;
  order?: FieldOrder;
}
