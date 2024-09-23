import {AvroSchemaBuilder, FieldOrder, PrimitiveField} from '../';

test('should create a schema - raw values', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.primitive')
      .addField(
        new PrimitiveField({
          name: 'boolean_field',
          type: 'boolean',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'bytes_field',
          type: 'bytes',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'double_field',
          type: 'double',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'float_field',
          type: 'float',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'int_field',
          type: 'int',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'long_field',
          type: 'long',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'null_field',
          type: 'null',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'string_field',
          type: 'string',
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "boolean_field",
          "type": "boolean",
        },
        {
          "name": "bytes_field",
          "type": "bytes",
        },
        {
          "name": "double_field",
          "type": "double",
        },
        {
          "name": "float_field",
          "type": "float",
        },
        {
          "name": "int_field",
          "type": "int",
        },
        {
          "name": "long_field",
          "type": "long",
        },
        {
          "name": "null_field",
          "type": "null",
        },
        {
          "name": "string_field",
          "type": "string",
        },
      ],
      "name": "primitive",
      "namespace": "record.primitive",
      "type": "record",
    }
  `);
});

test('should create a schema - nullable values', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record()
      .addField(
        new PrimitiveField({
          name: 'boolean_field',
          type: 'boolean',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'bytes_field',
          type: 'bytes',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'double_field',
          type: 'double',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'float_field',
          type: 'float',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'int_field',
          type: 'int',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'long_field',
          type: 'long',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'null_field',
          type: 'null',
          nullable: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'string_field',
          type: 'string',
          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "name": "primitive",
      "type": {
        "fields": [
          {
            "name": "boolean_field",
            "type": [
              "null",
              "boolean",
            ],
          },
          {
            "name": "bytes_field",
            "type": [
              "null",
              "bytes",
            ],
          },
          {
            "name": "double_field",
            "type": [
              "null",
              "double",
            ],
          },
          {
            "name": "float_field",
            "type": [
              "null",
              "float",
            ],
          },
          {
            "name": "int_field",
            "type": [
              "null",
              "int",
            ],
          },
          {
            "name": "long_field",
            "type": [
              "null",
              "long",
            ],
          },
          {
            "name": "null_field",
            "type": "null",
          },
          {
            "name": "string_field",
            "type": [
              "null",
              "string",
            ],
          },
        ],
        "name": "primitive",
        "type": "record",
      },
    }
  `);
});

test('should create a schema - with order', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record()
      .addField(
        new PrimitiveField({
          name: 'boolean_field',
          type: 'boolean',
          order: FieldOrder.ascending,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'bytes_field',
          type: 'bytes',
          order: FieldOrder.descending,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'double_field',
          type: 'double',
          order: FieldOrder.ignore,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "name": "primitive",
      "type": {
        "fields": [
          {
            "name": "boolean_field",
            "order": "ascending",
            "type": "boolean",
          },
          {
            "name": "bytes_field",
            "order": "descending",
            "type": "bytes",
          },
          {
            "name": "double_field",
            "order": "ignore",
            "type": "double",
          },
        ],
        "name": "primitive",
        "type": "record",
      },
    }
  `);
});

test('should create a schema - with doc', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record()
      .addField(
        new PrimitiveField({
          name: 'boolean_field',
          type: 'boolean',
          doc: 'boolean field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'bytes_field',
          type: 'bytes',
          doc: 'bytes field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'double_field',
          type: 'double',
          doc: 'double field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'float_field',
          type: 'float',
          doc: 'float field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'int_field',
          type: 'int',
          doc: 'int field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'long_field',
          type: 'long',
          doc: 'long field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'null_field',
          type: 'null',
          doc: 'null field',
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'string_field',
          type: 'string',
          doc: 'double field',
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "name": "primitive",
      "type": {
        "fields": [
          {
            "doc": "boolean field",
            "name": "boolean_field",
            "type": "boolean",
          },
          {
            "doc": "bytes field",
            "name": "bytes_field",
            "type": "bytes",
          },
          {
            "doc": "double field",
            "name": "double_field",
            "type": "double",
          },
          {
            "doc": "float field",
            "name": "float_field",
            "type": "float",
          },
          {
            "doc": "int field",
            "name": "int_field",
            "type": "int",
          },
          {
            "doc": "long field",
            "name": "long_field",
            "type": "long",
          },
          {
            "doc": "null field",
            "name": "null_field",
            "type": "null",
          },
          {
            "doc": "double field",
            "name": "string_field",
            "type": "string",
          },
        ],
        "name": "primitive",
        "type": "record",
      },
    }
  `);
});

test('should create a schema - with default values', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record()
      .addField(
        new PrimitiveField({
          name: 'boolean_field',
          type: 'boolean',
          defaultValue: true,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'bytes_field',
          type: 'bytes',
          defaultValue: 12321312,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'double_field',
          type: 'double',
          defaultValue: 0,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'float_field',
          type: 'float',
          defaultValue: 0,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'int_field',
          type: 'int',
          defaultValue: 0,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'long_field',
          type: 'long',
          defaultValue: 0,
        }),
      )
      .addField(
        new PrimitiveField({
          name: 'string_field',
          type: 'string',
          defaultValue: '',
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "name": "primitive",
      "type": {
        "fields": [
          {
            "default": true,
            "name": "boolean_field",
            "type": "boolean",
          },
          {
            "default": 12321312,
            "name": "bytes_field",
            "type": "bytes",
          },
          {
            "default": 0,
            "name": "double_field",
            "type": "double",
          },
          {
            "default": 0,
            "name": "float_field",
            "type": "float",
          },
          {
            "default": 0,
            "name": "int_field",
            "type": "int",
          },
          {
            "default": 0,
            "name": "long_field",
            "type": "long",
          },
          {
            "default": "",
            "name": "string_field",
            "type": "string",
          },
        ],
        "name": "primitive",
        "type": "record",
      },
    }
  `);
});

test('should create a schema - with custom properties', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.primitive')
      .addField(
        new PrimitiveField({
          name: 'boolean_field',
          type: 'boolean',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'bytes_field',
          type: 'bytes',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'double_field',
          type: 'double',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'float_field',
          type: 'float',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'int_field',
          type: 'int',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'long_field',
          type: 'long',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'null_field',
          type: 'null',
        }).prop('customProp', 'val'),
      )
      .addField(
        new PrimitiveField({
          name: 'string_field',
          type: 'string',
        }).prop('customProp', 'val'),
      )
      .prop('customPropTopLevel', 'val')
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "customPropTopLevel": "val",
      "fields": [
        {
          "customProp": "val",
          "name": "boolean_field",
          "type": "boolean",
        },
        {
          "customProp": "val",
          "name": "bytes_field",
          "type": "bytes",
        },
        {
          "customProp": "val",
          "name": "double_field",
          "type": "double",
        },
        {
          "customProp": "val",
          "name": "float_field",
          "type": "float",
        },
        {
          "customProp": "val",
          "name": "int_field",
          "type": "int",
        },
        {
          "customProp": "val",
          "name": "long_field",
          "type": "long",
        },
        {
          "customProp": "val",
          "name": "null_field",
          "type": "null",
        },
        {
          "customProp": "val",
          "name": "string_field",
          "type": "string",
        },
      ],
      "name": "primitive",
      "namespace": "record.primitive",
      "type": "record",
    }
  `);
});
