import {ArrayField, AvroSchemaBuilder, EnumField, MapField, PrimitiveField, RecordField} from '..';

test('should create primitive type maps', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.map')
      .addField(
        new MapField({
          name: 'boolean_map',
          doc: 'boolean map',
          type: 'boolean',
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'bytes_map',
          doc: 'bytes map',
          type: 'bytes',
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'double_map',
          doc: 'double map',
          type: 'double',
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'float_map',
          doc: 'float map',
          type: 'float',
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'int_map',
          doc: 'int map',
          type: 'int',
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'long_map',
          doc: 'long map',
          type: 'long',
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'string_map',
          doc: 'string map',
          type: 'string',
        }).prop('customProp', 'val'),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "customProp": "val",
          "name": "boolean_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "boolean",
          },
        },
        {
          "customProp": "val",
          "name": "bytes_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "bytes",
          },
        },
        {
          "customProp": "val",
          "name": "double_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "double",
          },
        },
        {
          "customProp": "val",
          "name": "float_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "float",
          },
        },
        {
          "customProp": "val",
          "name": "int_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "int",
          },
        },
        {
          "customProp": "val",
          "name": "long_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "long",
          },
        },
        {
          "customProp": "val",
          "name": "string_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": "string",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.map",
      "type": "record",
    }
  `);
});

test('should create complex type maps', () => {
  expect(
    new AvroSchemaBuilder('complex')
      .record('record.map')
      .addField(
        new MapField({
          name: 'enum_map',
          doc: 'enum map',
          type: new EnumField({
            name: 'enum',
            type: ['v1', 'v2'],
          }).prop('customProp', 'val'),
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'enum_map_nullable',
          doc: 'enum map nullable',
          nullable: true,
          type: new EnumField({
            name: 'enum',
            type: ['v1', 'v2'],
          }).prop('customProp', 'val'),
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'record_map',
          doc: 'record map',
          type: new RecordField({
            name: 'map_record',
          })
            .addField(
              new PrimitiveField({
                name: 'int_field',
                type: 'int',
              }).prop('customProp', 'val'),
            )
            .addField(
              new PrimitiveField({
                name: 'string_field',
                type: 'string',
              }).prop('customProp', 'val'),
            ),
        }).prop('customProp', 'val'),
      )
      .addField(
        new MapField({
          name: 'array_map',
          doc: 'array map',
          type: new ArrayField({
            name: 'array_field',
            type: 'int',
          }).prop('customProp', 'val'),
        }).prop('customProp', 'val'),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "customProp": "val",
          "name": "enum_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": {
              "customProp": "val",
              "name": "enum",
              "symbols": [
                "v1",
                "v2",
              ],
              "type": "enum",
            },
          },
        },
        {
          "customProp": "val",
          "name": "enum_map_nullable",
          "type": [
            "null",
            {
              "customProp": "val",
              "type": "map",
              "values": {
                "customProp": "val",
                "name": "enum",
                "symbols": [
                  "v1",
                  "v2",
                ],
                "type": "enum",
              },
            },
          ],
        },
        {
          "customProp": "val",
          "name": "record_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": {
              "fields": [
                {
                  "customProp": "val",
                  "name": "int_field",
                  "type": "int",
                },
                {
                  "customProp": "val",
                  "name": "string_field",
                  "type": "string",
                },
              ],
              "name": "map_record",
              "type": "record",
            },
          },
        },
        {
          "customProp": "val",
          "name": "array_map",
          "type": {
            "customProp": "val",
            "type": "map",
            "values": {
              "customProp": "val",
              "items": "int",
              "type": "array",
            },
          },
        },
      ],
      "name": "complex",
      "namespace": "record.map",
      "type": "record",
    }
  `);
});
