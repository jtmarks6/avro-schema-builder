import * as types from './types';

export * from './types';

export type FieldBuilder =
  | PrimitiveField<types.PrimitiveType>
  | RecordField
  | ArrayField
  | EnumField
  | MapField
  | FixedField
  | UnionField
  | ReferenceField;

type SubField =
  | types.PrimitiveType
  | RecordField
  | ArrayField
  | EnumField
  | MapField
  | FixedField
  | UnionField
  | ReferenceField
  | NamedTypeField<types.PrimitiveType>;

export type AddNullablePrimitiveFieldInput<
  T extends types.PrimitiveType
> = types.BaseFieldParams & {
  defaultValue?: types.DefaultPrimitiveTypes[T] | null;
  type: T;
  nullable: true;
};

export type AddPrimitiveFieldInput<T extends types.PrimitiveType> = types.BaseFieldParams & {
  defaultValue?: types.DefaultPrimitiveTypes[T];
  type: T;
  nullable?: false;
};

export type RecordFieldInput = types.NamedFieldParams & {
  defaultValue?: any;
  namespace?: string;
  nullable?: boolean;
};

export type ReferenceFieldInput = Omit<types.BaseFieldParams, 'order'> & {
  type: string;
  nullable?: boolean;
};

export type ArrayFieldInput = types.BaseFieldParams & {
  type: SubField;
  nullable?: boolean;
};

export type UnionFieldInput = Pick<types.BaseFieldParams, 'name'> & {
  types: Array<SubField>;
  nullable?: boolean;
};

export type MapFieldInput = Omit<types.BaseFieldParams, 'order'> & {
  type: SubField;
  nullable?: boolean;
};

export type EnumFieldInput = Omit<types.NamedFieldParams, 'order'> & {
  type: string[];
  nullable?: boolean;
  namespace?: string;
  aliases?: string[];
  defaultValue?: string;
};

export type FixedFieldInput = Omit<types.NamedFieldParams, 'order' | 'doc'> & {
  size: number;
  nullable?: boolean;
  aliases?: string[];
};

export interface NamedFieldInput<T extends types.PrimitiveType> {
  type: T;
}

class BaseField {
  public readonly name: string;
  public readonly doc?: string;
  public readonly order?: types.FieldOrder;
  public readonly nullable?: boolean;
  public readonly keyName: string;

  constructor({params}: {params: types.NamedFieldParams & {nullable?: boolean}}) {
    this.name = params.name;
    this.doc = params.doc;
    this.order = params.order;
    this.nullable = params.nullable;
    this.keyName = params.keyNameOverride || params.name;
  }
}

export class ReferenceField extends BaseField {
  public readonly type: string;
  public readonly nullable?: boolean;

  constructor(params: ReferenceFieldInput) {
    super({params: {...params, nullable: params.nullable}});
    this.type = params.type;
    this.nullable = params.nullable;
  }

  public getType(): string {
    return this.type;
  }

  public compile(): types.RecordFieldSerialized {
    const field: types.RecordFieldSerialized = {
      name: this.keyName,
      type: this.nullable && this.type !== 'null' ? ['null', this.getType()] : this.getType(),
    };

    if (this.order) {
      field.order = this.order;
    }

    if (this.doc) {
      field.doc = this.doc;
    }

    return field;
  }
}

export class PrimitiveField<T extends types.PrimitiveType> extends BaseField {
  public readonly type: T;
  public readonly defaultValue?: types.DefaultPrimitiveTypes[T] | null;

  constructor(params: AddPrimitiveFieldInput<T> | AddNullablePrimitiveFieldInput<T>) {
    super({params: {...params, nullable: params.nullable}});
    this.type = params.type;
    this.defaultValue = params.defaultValue;
  }

  public getType(): types.PrimitiveType {
    return this.type;
  }

  public compile(): types.RecordFieldSerialized {
    const field: types.RecordFieldSerialized = {
      name: this.keyName,
      type: this.nullable && this.type !== 'null' ? ['null', this.getType()] : this.getType(),
    };

    if (this.order) {
      field.order = this.order;
    }

    if (this.doc) {
      field.doc = this.doc;
    }

    if (this.defaultValue !== undefined) {
      field.default = this.defaultValue;
    }

    return field;
  }
}

export class EnumField extends BaseField {
  public readonly nullable?: boolean;
  public readonly namespace: string | undefined = undefined;
  public readonly defaultValue: string | undefined = undefined;
  public readonly aliases: string[] | undefined = undefined;
  public readonly symbols: string[];

  constructor(params: EnumFieldInput) {
    super({params: {...params, nullable: params.nullable}});
    this.namespace = params.namespace;
    this.aliases = params.aliases;
    this.symbols = Object.values(params.type);
    this.defaultValue = params.defaultValue;
  }

  public getType(): types.EnumType {
    const baseType: types.EnumType = {
      symbols: this.symbols,
      type: 'enum',
      name: this.name,
    };

    if (this.aliases) {
      baseType.aliases = this.aliases;
    }

    if (this.defaultValue) {
      baseType.default = this.defaultValue;
    }

    if (this.doc) {
      baseType.doc = this.doc;
    }

    if (this.namespace) {
      baseType.namespace = this.namespace;
    }

    return baseType;
  }

  public compile(): types.RecordFieldSerialized {
    return {
      name: this.keyName,
      type: this.nullable ? ['null', this.getType()] : this.getType(),
    };
  }
}

export class FixedField extends BaseField {
  public readonly nullable?: boolean;
  public readonly aliases: string[] | undefined = undefined;
  public readonly size: number;

  constructor(params: FixedFieldInput) {
    super({params: {...params, nullable: params.nullable}});
    this.aliases = params.aliases;
    this.size = params.size;
  }

  public getType(): types.FixedType {
    const baseType: types.FixedType = {
      type: 'fixed',
      name: this.name,
      size: this.size,
    };

    if (this.aliases) {
      baseType.aliases = this.aliases;
    }

    return baseType;
  }

  public compile(): types.RecordFieldSerialized {
    return {
      name: this.keyName,
      type: this.nullable ? ['null', this.getType()] : this.getType(),
    };
  }
}

export class MapField extends BaseField {
  private readonly _type: SubField;

  public readonly nullable?: boolean;

  constructor({type, nullable, ...params}: MapFieldInput) {
    super({params});
    this._type = type;
    this.nullable = nullable;
  }

  public getType(): types.MapType {
    const arrayType: types.MapType = {
      type: 'map',
      values: typeof this._type === 'string' ? this._type : this._type.getType(),
    };

    return arrayType;
  }

  public compile(): types.RecordFieldSerialized {
    return {
      name: this.keyName,
      type: this.nullable ? ['null', this.getType()] : this.getType(),
    };
  }
}

export class UnionField extends BaseField {
  private readonly _types: Array<SubField>;

  public readonly nullable?: boolean;

  constructor({types, nullable, ...params}: UnionFieldInput) {
    super({params});

    this._types = types;
    this.nullable = nullable;
  }

  public getType(): types.DefinedType[] | types.DefinedType {
    const type: types.DefinedType[] = this.nullable ? ['null'] : [];

    this._types.forEach((t) => {
      const generatedType = typeof t === 'string' ? t : t.getType();

      if (Array.isArray(generatedType)) {
        type.push(...generatedType.filter((gt) => gt !== 'null'));
      } else {
        type.push(generatedType);
      }
    });

    return type.length === 1 ? type[0] : type;
  }

  public compile(): types.RecordFieldSerialized {
    return {
      name: this.keyName,
      type: this.getType(),
    };
  }
}

export class ArrayField extends BaseField {
  private readonly _type: SubField;

  public readonly nullable?: boolean;

  constructor({type, nullable, ...params}: ArrayFieldInput) {
    super({params});
    this._type = type;
    this.nullable = nullable;
  }

  public getType(): types.ArrayType {
    const arrayType: types.ArrayType = {
      type: 'array',
      items: typeof this._type === 'string' ? this._type : this._type.getType(),
    };

    return arrayType;
  }

  public compile(): types.RecordFieldSerialized {
    return {
      name: this.keyName,
      type: this.nullable ? ['null', this.getType()] : this.getType(),
    };
  }
}

export class NamedTypeField<T extends types.PrimitiveType> {
  private readonly _type: T;

  constructor({type}: NamedFieldInput<T>) {
    this._type = type;
  }

  public getType(): types.NamedType {
    const namedType: types.NamedType = {
      type: this._type,
    };

    return namedType;
  }
}

class FieldsBuilder {
  private _fields: types.RecordFieldSerialized[] = [];

  public get length(): number {
    return this._fields.length;
  }

  add(fieldToAdd: FieldBuilder) {
    this._fields.push(fieldToAdd.compile());

    return this;
  }

  compile(): types.RecordFieldSerialized[] {
    return this._fields;
  }
}

export class RecordField extends BaseField {
  public namespace: string | undefined = undefined;
  public baseField?: boolean;
  public defaultValue?: any;
  public readonly nullable?: boolean;

  private _fields = new FieldsBuilder();

  constructor(params: RecordFieldInput) {
    super({params});
    this.namespace = params.namespace;
    this.nullable = params.nullable;
    this.defaultValue = params.defaultValue;
  }

  addField(field: FieldBuilder) {
    this._fields.add(field);

    return this;
  }

  private renderNamespaceErrorMessage() {
    if (!this.namespace) {
      return '';
    }

    return `with namespace "${this.namespace}" `;
  }

  public compile(): types.RecordFieldSerialized {
    if (!this._fields.length) {
      throw new Error(
        `Can't compile record "${
          this.name
        }" ${this.renderNamespaceErrorMessage()}without fields. Use 'addField' method to add fields.`,
      );
    }

    if (this.baseField) {
      return this.getType();
    }

    return {
      name: this.keyName,
      type: this.nullable ? ['null', this.getType()] : this.getType(),
    };
  }

  public getType(): types.RecordType {
    const baseType: types.RecordType = {
      type: 'record',
      name: this.name,
      fields: this._fields.compile(),
    };

    if (this.namespace) {
      baseType.namespace = this.namespace;
    }

    if (this.defaultValue !== undefined) {
      baseType.default = this.defaultValue;
    }

    return baseType;
  }
}

export class AvroSchemaBuilder {
  private readonly _record: RecordField;

  constructor(name: string) {
    this._record = new RecordField({name});
  }

  public record(namespace?: string): RecordField {
    if (namespace) {
      this._record.namespace = namespace;
      this._record.baseField = true;
    }

    return this._record;
  }
}
