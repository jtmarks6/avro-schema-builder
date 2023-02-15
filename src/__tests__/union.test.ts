import {
  ArrayField,
  AvroSchemaBuilder,
  EnumField,
  FixedField,
  MapField,
  PrimitiveField,
  RecordField,
  UnionField,
} from '../';

test('should create a schema with primitive values', () => {
  expect(
    new AvroSchemaBuilder('union')
      .record('record.union')
      .addField(
        new UnionField({
          name: 'union_primitive',
          types: ['int', 'string'],
        }),
      )
      .addField(
        new UnionField({
          name: 'union_primitive_nullable',
          types: ['int', 'string'],
          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "union_primitive",
          "type": [
            "int",
            "string",
          ],
        },
        {
          "name": "union_primitive_nullable",
          "type": [
            "null",
            "int",
            "string",
          ],
        },
      ],
      "name": "union",
      "namespace": "record.union",
      "type": "record",
    }
  `);
});

test('should create a schema with record types', () => {
  expect(
    new AvroSchemaBuilder('union')
      .record('record.union')
      .addField(
        new UnionField({
          name: 'union_record',
          types: [
            new RecordField({
              name: 'record_field_1',
            }).addField(
              new PrimitiveField({
                name: 'int_field',
                nullable: true,
                type: 'int',
              }),
            ),

            new RecordField({
              name: 'record_field_2',
            }).addField(
              new PrimitiveField({
                name: 'int_field',
                type: 'int',
              }),
            ),
          ],
        }),
      )
      .addField(
        new UnionField({
          name: 'union_record_nullable',
          types: [
            new RecordField({
              name: 'record_field_1',
            }).addField(
              new PrimitiveField({
                name: 'int_field',
                nullable: true,
                type: 'int',
              }),
            ),

            new RecordField({
              name: 'record_field_2',
            }).addField(
              new PrimitiveField({
                name: 'int_field',
                type: 'int',
              }),
            ),
          ],

          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "union_record",
          "type": [
            {
              "fields": [
                {
                  "name": "int_field",
                  "type": [
                    "null",
                    "int",
                  ],
                },
              ],
              "name": "record_field_1",
              "type": "record",
            },
            {
              "fields": [
                {
                  "name": "int_field",
                  "type": "int",
                },
              ],
              "name": "record_field_2",
              "type": "record",
            },
          ],
        },
        {
          "name": "union_record_nullable",
          "type": [
            "null",
            {
              "fields": [
                {
                  "name": "int_field",
                  "type": [
                    "null",
                    "int",
                  ],
                },
              ],
              "name": "record_field_1",
              "type": "record",
            },
            {
              "fields": [
                {
                  "name": "int_field",
                  "type": "int",
                },
              ],
              "name": "record_field_2",
              "type": "record",
            },
          ],
        },
      ],
      "name": "union",
      "namespace": "record.union",
      "type": "record",
    }
  `);
});

test('should create a schema with array types', () => {
  expect(
    new AvroSchemaBuilder('union')
      .record('array.union')
      .addField(
        new UnionField({
          name: 'union_array',
          types: [
            new ArrayField({
              name: 'array_field_1',
              type: 'int',
            }),
            new ArrayField({
              name: 'array_field_2',
              type: 'string',
            }),
          ],
        }),
      )
      .addField(
        new UnionField({
          name: 'union_array_nullable',
          types: [
            new ArrayField({
              name: 'array_field_1',
              type: 'int',
            }),
            new ArrayField({
              name: 'array_field_2',
              type: 'string',
            }),
          ],

          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "union_array",
          "type": [
            {
              "items": "int",
              "type": "array",
            },
            {
              "items": "string",
              "type": "array",
            },
          ],
        },
        {
          "name": "union_array_nullable",
          "type": [
            "null",
            {
              "items": "int",
              "type": "array",
            },
            {
              "items": "string",
              "type": "array",
            },
          ],
        },
      ],
      "name": "union",
      "namespace": "array.union",
      "type": "record",
    }
  `);
});

test('should create a schema with map types', () => {
  expect(
    new AvroSchemaBuilder('union')
      .record('map.union')
      .addField(
        new UnionField({
          name: 'union_map',
          types: [
            new MapField({
              name: 'array_field_1',
              type: 'int',
            }),
            new MapField({
              name: 'array_field_2',
              type: 'string',
            }),
          ],
        }),
      )
      .addField(
        new UnionField({
          name: 'union_map_nullable',
          types: [
            new MapField({
              name: 'array_field_1',
              type: 'int',
            }),
            new MapField({
              name: 'array_field_2',
              type: 'string',
            }),
          ],

          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "union_map",
          "type": [
            {
              "type": "map",
              "values": "int",
            },
            {
              "type": "map",
              "values": "string",
            },
          ],
        },
        {
          "name": "union_map_nullable",
          "type": [
            "null",
            {
              "type": "map",
              "values": "int",
            },
            {
              "type": "map",
              "values": "string",
            },
          ],
        },
      ],
      "name": "union",
      "namespace": "map.union",
      "type": "record",
    }
  `);
});

test('should create a schema with enum types', () => {
  expect(
    new AvroSchemaBuilder('union')
      .record('enum.union')
      .addField(
        new UnionField({
          name: 'union_enum',
          types: [
            new EnumField({
              name: 'enum_field_1',
              type: ['v1', 'v2', 'v3'],
            }),
            new EnumField({
              name: 'enum_field_2',
              type: ['v1', 'v2', 'v3'],
            }),
          ],
        }),
      )
      .addField(
        new UnionField({
          name: 'union_enum_nullable',
          types: [
            new EnumField({
              name: 'enum_field_1',
              type: ['v1', 'v2', 'v3'],
            }),
            new EnumField({
              name: 'enum_field_2',
              type: ['v1', 'v2', 'v3'],
            }),
          ],

          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "union_enum",
          "type": [
            {
              "name": "enum_field_1",
              "symbols": [
                "v1",
                "v2",
                "v3",
              ],
              "type": "enum",
            },
            {
              "name": "enum_field_2",
              "symbols": [
                "v1",
                "v2",
                "v3",
              ],
              "type": "enum",
            },
          ],
        },
        {
          "name": "union_enum_nullable",
          "type": [
            "null",
            {
              "name": "enum_field_1",
              "symbols": [
                "v1",
                "v2",
                "v3",
              ],
              "type": "enum",
            },
            {
              "name": "enum_field_2",
              "symbols": [
                "v1",
                "v2",
                "v3",
              ],
              "type": "enum",
            },
          ],
        },
      ],
      "name": "union",
      "namespace": "enum.union",
      "type": "record",
    }
  `);
});

test('should create a schema with fixed types', () => {
  expect(
    new AvroSchemaBuilder('union')
      .record('fixed.union')
      .addField(
        new UnionField({
          name: 'union_fixed',
          types: [
            new FixedField({
              name: 'fixed_field_1',
              size: 123,
            }),
            new FixedField({
              name: 'fixed_field_2',
              size: 5353,
            }),
          ],
        }),
      )
      .addField(
        new UnionField({
          name: 'union_fixed_nullable',
          types: [
            new FixedField({
              name: 'fixed_field_1',
              size: 123,
            }),
            new FixedField({
              name: 'fixed_field_2',
              size: 5353,
            }),
          ],

          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "union_fixed",
          "type": [
            {
              "name": "fixed_field_1",
              "size": 123,
              "type": "fixed",
            },
            {
              "name": "fixed_field_2",
              "size": 5353,
              "type": "fixed",
            },
          ],
        },
        {
          "name": "union_fixed_nullable",
          "type": [
            "null",
            {
              "name": "fixed_field_1",
              "size": 123,
              "type": "fixed",
            },
            {
              "name": "fixed_field_2",
              "size": 5353,
              "type": "fixed",
            },
          ],
        },
      ],
      "name": "union",
      "namespace": "fixed.union",
      "type": "record",
    }
  `);
});
