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
        }),
      )
      .addField(
        new MapField({
          name: 'bytes_map',
          doc: 'bytes map',
          type: 'bytes',
        }),
      )
      .addField(
        new MapField({
          name: 'double_map',
          doc: 'double map',
          type: 'double',
        }),
      )
      .addField(
        new MapField({
          name: 'float_map',
          doc: 'float map',
          type: 'float',
        }),
      )
      .addField(
        new MapField({
          name: 'int_map',
          doc: 'int map',
          type: 'int',
        }),
      )
      .addField(
        new MapField({
          name: 'long_map',
          doc: 'long map',
          type: 'long',
        }),
      )
      .addField(
        new MapField({
          name: 'string_map',
          doc: 'string map',
          type: 'string',
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "boolean_map",
          "type": {
            "type": "map",
            "values": "boolean",
          },
        },
        {
          "name": "bytes_map",
          "type": {
            "type": "map",
            "values": "bytes",
          },
        },
        {
          "name": "double_map",
          "type": {
            "type": "map",
            "values": "double",
          },
        },
        {
          "name": "float_map",
          "type": {
            "type": "map",
            "values": "float",
          },
        },
        {
          "name": "int_map",
          "type": {
            "type": "map",
            "values": "int",
          },
        },
        {
          "name": "long_map",
          "type": {
            "type": "map",
            "values": "long",
          },
        },
        {
          "name": "string_map",
          "type": {
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
          }),
        }),
      )
      .addField(
        new MapField({
          name: 'enum_map_nullable',
          doc: 'enum map nullable',
          nullable: true,
          type: new EnumField({
            name: 'enum',
            type: ['v1', 'v2'],
          }),
        }),
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
              }),
            )
            .addField(
              new PrimitiveField({
                name: 'string_field',
                type: 'string',
              }),
            ),
        }),
      )
      .addField(
        new MapField({
          name: 'array_map',
          doc: 'array map',
          type: new ArrayField({
            name: 'array_field',
            type: 'int',
          }),
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "enum_map",
          "type": {
            "type": "map",
            "values": {
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
          "name": "enum_map_nullable",
          "type": [
            "null",
            {
              "type": "map",
              "values": {
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
          "name": "record_map",
          "type": {
            "type": "map",
            "values": {
              "fields": [
                {
                  "name": "int_field",
                  "type": "int",
                },
                {
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
          "name": "array_map",
          "type": {
            "type": "map",
            "values": {
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
