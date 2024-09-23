import {
  ArrayField,
  AvroSchemaBuilder,
  EnumField,
  FieldOrder,
  FixedField,
  MapField,
  NamedTypeField,
  PrimitiveField,
  RecordField,
  ReferenceField,
} from '..';

test('should create primitive type arrays', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.array')
      .addField(
        new ArrayField({
          name: 'boolean_array',
          doc: 'boolean array',
          type: 'boolean',
          order: FieldOrder.descending,
        }),
      )
      .addField(
        new ArrayField({
          name: 'bytes_array',
          doc: 'bytes array',
          type: 'bytes',
          order: FieldOrder.ignore,
        }),
      )
      .addField(
        new ArrayField({
          name: 'double_array',
          doc: 'double array',
          type: 'double',
          order: FieldOrder.ignore,
        }),
      )
      .addField(
        new ArrayField({
          name: 'float_array',
          doc: 'float array',
          type: 'float',
          order: FieldOrder.ascending,
        }),
      )
      .addField(
        new ArrayField({
          name: 'int_array',
          doc: 'int array',
          type: 'int',
          order: FieldOrder.ascending,
        }),
      )
      .addField(
        new ArrayField({
          name: 'long_array',
          doc: 'long array',
          type: 'long',
          order: FieldOrder.ignore,
        }),
      )
      .addField(
        new ArrayField({
          name: 'string_array',
          doc: 'string array',
          type: 'string',
          order: FieldOrder.descending,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "boolean_array",
          "type": {
            "items": "boolean",
            "type": "array",
          },
        },
        {
          "name": "bytes_array",
          "type": {
            "items": "bytes",
            "type": "array",
          },
        },
        {
          "name": "double_array",
          "type": {
            "items": "double",
            "type": "array",
          },
        },
        {
          "name": "float_array",
          "type": {
            "items": "float",
            "type": "array",
          },
        },
        {
          "name": "int_array",
          "type": {
            "items": "int",
            "type": "array",
          },
        },
        {
          "name": "long_array",
          "type": {
            "items": "long",
            "type": "array",
          },
        },
        {
          "name": "string_array",
          "type": {
            "items": "string",
            "type": "array",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.array",
      "type": "record",
    }
  `);
});

test('should create type arrays with default', () => {
  expect(
    new AvroSchemaBuilder('default')
      .record('record.array')
      .addField(
        new ArrayField({
          defaultValue: [],
          name: 'empty_default',
          doc: 'empty default array',
          type: 'boolean',
          order: FieldOrder.descending,
        }),
      )
      .addField(
        new ArrayField({
          defaultValue: null,
          nullable: true,
          name: 'null_default',
          doc: 'null default array',
          type: 'boolean',
          order: FieldOrder.descending,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "default": [],
          "name": "empty_default",
          "type": {
            "items": "boolean",
            "type": "array",
          },
        },
        {
          "default": null,
          "name": "null_default",
          "type": [
            "null",
            {
              "items": "boolean",
              "type": "array",
            },
          ],
        },
      ],
      "name": "default",
      "namespace": "record.array",
      "type": "record",
    }
  `);
});

test('should create nullable type arrays', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.array')
      .addField(
        new ArrayField({
          name: 'boolean_array',
          doc: 'boolean array',
          type: 'boolean',
          order: FieldOrder.descending,
          nullable: true,
        }),
      )
      .addField(
        new ArrayField({
          name: 'bytes_array',
          doc: 'bytes array',
          type: 'bytes',
          order: FieldOrder.ignore,
        }),
      )
      .addField(
        new ArrayField({
          name: 'double_array',
          doc: 'double array',
          type: 'double',
          order: FieldOrder.ignore,
        }),
      )
      .addField(
        new ArrayField({
          name: 'float_array',
          doc: 'float array',
          type: 'float',
          order: FieldOrder.ascending,
        }),
      )
      .addField(
        new ArrayField({
          name: 'int_array',
          doc: 'int array',
          type: 'int',
          order: FieldOrder.ascending,
        }),
      )
      .addField(
        new ArrayField({
          name: 'long_array',
          doc: 'long array',
          type: 'long',
          order: FieldOrder.ignore,
        }),
      )
      .addField(
        new ArrayField({
          name: 'string_array',
          doc: 'string array',
          type: 'string',
          order: FieldOrder.descending,
        }),
      )
      .addField(
        new MapField({
          name: 'map_field',
          type: 'string',
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "boolean_array",
          "type": [
            "null",
            {
              "items": "boolean",
              "type": "array",
            },
          ],
        },
        {
          "name": "bytes_array",
          "type": {
            "items": "bytes",
            "type": "array",
          },
        },
        {
          "name": "double_array",
          "type": {
            "items": "double",
            "type": "array",
          },
        },
        {
          "name": "float_array",
          "type": {
            "items": "float",
            "type": "array",
          },
        },
        {
          "name": "int_array",
          "type": {
            "items": "int",
            "type": "array",
          },
        },
        {
          "name": "long_array",
          "type": {
            "items": "long",
            "type": "array",
          },
        },
        {
          "name": "string_array",
          "type": {
            "items": "string",
            "type": "array",
          },
        },
        {
          "name": "map_field",
          "type": {
            "type": "map",
            "values": "string",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.array",
      "type": "record",
    }
  `);
});

test('should create custom property arrays', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.array')
      .addField(
        new ArrayField({
          name: 'boolean_array',
          doc: 'boolean array',
          type: 'boolean',
          order: FieldOrder.descending,
          nullable: true,
        }).prop('customProp', 'val'),
      )
      .addField(
        new ArrayField({
          name: 'bytes_array',
          doc: 'bytes array',
          type: 'bytes',
          order: FieldOrder.ignore,
        }).prop('customProp', 'val'),
      )
      .addField(
        new ArrayField({
          name: 'double_array',
          doc: 'double array',
          type: 'double',
          order: FieldOrder.ignore,
        }).prop('customProp', 'val'),
      )
      .addField(
        new ArrayField({
          name: 'float_array',
          doc: 'float array',
          type: 'float',
          order: FieldOrder.ascending,
        }).prop('customProp', 'val'),
      )
      .addField(
        new ArrayField({
          name: 'int_array',
          doc: 'int array',
          type: 'int',
          order: FieldOrder.ascending,
        }).prop('customProp', 'val'),
      )
      .addField(
        new ArrayField({
          name: 'long_array',
          doc: 'long array',
          type: 'long',
          order: FieldOrder.ignore,
        }).prop('customProp', 'val'),
      )
      .addField(
        new ArrayField({
          name: 'string_array',
          doc: 'string array',
          type: 'string',
          order: FieldOrder.descending,
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'map_field',
          type: 'string',
        }).prop('customProp', 'val'),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "customProp": "val",
          "name": "boolean_array",
          "type": [
            "null",
            {
              "customProp": "val",
              "items": "boolean",
              "type": "array",
            },
          ],
        },
        {
          "customProp": "val",
          "name": "bytes_array",
          "type": {
            "customProp": "val",
            "items": "bytes",
            "type": "array",
          },
        },
        {
          "customProp": "val",
          "name": "double_array",
          "type": {
            "customProp": "val",
            "items": "double",
            "type": "array",
          },
        },
        {
          "customProp": "val",
          "name": "float_array",
          "type": {
            "customProp": "val",
            "items": "float",
            "type": "array",
          },
        },
        {
          "customProp": "val",
          "name": "int_array",
          "type": {
            "customProp": "val",
            "items": "int",
            "type": "array",
          },
        },
        {
          "customProp": "val",
          "name": "long_array",
          "type": {
            "customProp": "val",
            "items": "long",
            "type": "array",
          },
        },
        {
          "customProp": "val",
          "name": "string_array",
          "type": {
            "customProp": "val",
            "items": "string",
            "type": "array",
          },
        },
        {
          "customProp": "val",
          "name": "map_field",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "string",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.array",
      "type": "record",
    }
  `);
});

test('should create object type arrays', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.array')
      .addField(
        new ArrayField({
          name: 'boolean_array',
          doc: 'boolean array',
          order: FieldOrder.descending,
          type: new RecordField({
            namespace: 'record.array.obj',
            order: FieldOrder.ascending,
            name: 'non_null_obj',
            doc: 'non nullable object',
          }).addField(
            new PrimitiveField({
              name: 'integer_field',
              type: 'int',
              doc: 'integer field',
              order: FieldOrder.descending,
              defaultValue: 10,
            }),
          ),
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "boolean_array",
          "type": {
            "items": {
              "fields": [
                {
                  "default": 10,
                  "doc": "integer field",
                  "name": "integer_field",
                  "order": "descending",
                  "type": "int",
                },
              ],
              "name": "non_null_obj",
              "namespace": "record.array.obj",
              "type": "record",
            },
            "type": "array",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.array",
      "type": "record",
    }
  `);
});

test('should create enum type arrays', () => {
  expect(
    new AvroSchemaBuilder('enums')
      .record('enum.array')
      .addField(
        new ArrayField({
          name: 'enum_array',
          doc: 'enum array',
          order: FieldOrder.descending,
          type: new EnumField({
            name: 'enum_field_with_complete',
            type: ['v1', 'v2'],
            defaultValue: 'v2',
            aliases: ['enum_field_with_complete.previous'],
            doc: 'Enum Field with complete',
            namespace: 'enum.field.com',
            nullable: true,
          }),
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "enum_array",
          "type": {
            "items": {
              "aliases": [
                "enum_field_with_complete.previous",
              ],
              "default": "v2",
              "doc": "Enum Field with complete",
              "name": "enum_field_with_complete",
              "namespace": "enum.field.com",
              "symbols": [
                "v1",
                "v2",
              ],
              "type": "enum",
            },
            "type": "array",
          },
        },
      ],
      "name": "enums",
      "namespace": "enum.array",
      "type": "record",
    }
  `);
});

test('should create fixed type arrays', () => {
  expect(
    new AvroSchemaBuilder('fixed')
      .record('fixed.array')
      .addField(
        new ArrayField({
          name: 'fixed_array',
          doc: 'fixed array',
          order: FieldOrder.descending,
          type: new FixedField({
            name: 'fixed_field',
            size: 12352,
            aliases: ['fixed.array.old'],
          }),
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "fixed_array",
          "type": {
            "items": {
              "aliases": [
                "fixed.array.old",
              ],
              "name": "fixed_field",
              "size": 12352,
              "type": "fixed",
            },
            "type": "array",
          },
        },
      ],
      "name": "fixed",
      "namespace": "fixed.array",
      "type": "record",
    }
  `);
});

test('should create reference type arrays', () => {
  expect(
    new AvroSchemaBuilder('fixed')
      .record('fixed.array')
      .addField(
        new ArrayField({
          name: 'fixed_array',
          doc: 'fixed array',
          order: FieldOrder.descending,
          type: new ReferenceField({
            name: 'ref_field',
            type: 'x.y.z',
          }),
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "fixed_array",
          "type": {
            "items": "x.y.z",
            "type": "array",
          },
        },
      ],
      "name": "fixed",
      "namespace": "fixed.array",
      "type": "record",
    }
  `);
});

test('should create named type arrays', () => {
  expect(
    new AvroSchemaBuilder('named_types')
      .record('named.types')
      .addField(
        new ArrayField({
          name: 'named_array',
          doc: 'named array',
          order: FieldOrder.ascending,
          type: new NamedTypeField({
            type: 'int',
          }),
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "named_array",
          "type": {
            "items": {
              "type": "int",
            },
            "type": "array",
          },
        },
      ],
      "name": "named_types",
      "namespace": "named.types",
      "type": "record",
    }
  `);
});
