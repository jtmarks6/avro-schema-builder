import {
  AvroSchemaBuilder,
  EnumField,
  FieldOrder,
  PrimitiveField,
  RecordField,
  ReferenceField,
} from '../';

test('should fail with a descriptive error message when fields are not attached (without namespace)', () => {
  expect(() => {
    new AvroSchemaBuilder('record_without_fields').record().compile();
  }).toThrowErrorMatchingInlineSnapshot(
    `"Can't compile record "record_without_fields" without fields. Use 'addField' method to add fields."`,
  );
});

test('should fail with a descriptive error message when fields are not attached (with namespace)', () => {
  expect(() => {
    new AvroSchemaBuilder('record_without_fields_with_namespace')
      .record('record.without.fields')
      .compile();
  }).toThrowErrorMatchingInlineSnapshot(
    `"Can't compile record "record_without_fields_with_namespace" with namespace "record.without.fields" without fields. Use 'addField' method to add fields."`,
  );
});

test('should create a deep record schema', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.primitive')
      .addField(
        new RecordField({
          namespace: 'record.primitive.x',
          name: 'children',
          doc: 'children field',
          order: FieldOrder.ascending,
        })
          .addField(
            new PrimitiveField({
              name: 'id',
              type: 'int',
            }),
          )
          .addField(
            new ReferenceField({
              name: 'type_in_schema',
              type: 'record.primitive.x',
            }),
          )
          .addField(
            new ReferenceField({
              name: 'type_in_schema_diff_key',
              type: 'record.primitive.x',
            }),
          )
          .addField(
            new EnumField({
              keyNameOverride: 'enum_field_key_override',
              name: 'enum_field',
              type: ['v1', 'v2'],
            }),
          )
          .addField(
            new RecordField({
              namespace: 'record.primitive.x.y',
              name: 'grandchildren',
              doc: 'children field',
              order: FieldOrder.descending,
            }).addField(
              new PrimitiveField({
                name: 'id',
                type: 'int',
              }),
            ),
          ),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "children",
          "type": {
            "fields": [
              {
                "name": "id",
                "type": "int",
              },
              {
                "name": "type_in_schema",
                "type": "record.primitive.x",
              },
              {
                "name": "type_in_schema_diff_key",
                "type": "record.primitive.x",
              },
              {
                "name": "enum_field_key_override",
                "type": {
                  "name": "enum_field",
                  "symbols": [
                    "v1",
                    "v2",
                  ],
                  "type": "enum",
                },
              },
              {
                "name": "grandchildren",
                "type": {
                  "fields": [
                    {
                      "name": "id",
                      "type": "int",
                    },
                  ],
                  "name": "grandchildren",
                  "namespace": "record.primitive.x.y",
                  "type": "record",
                },
              },
            ],
            "name": "children",
            "namespace": "record.primitive.x",
            "type": "record",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.primitive",
      "type": "record",
    }
  `);
});

test('should create a deep record schema (record name override)', () => {
  expect(
    new AvroSchemaBuilder('primitive')
      .record('record.primitive')
      .addField(
        new RecordField({
          keyNameOverride: 'children',
          namespace: 'record.primitive.x',
          name: 'record_children',
          doc: 'children field',
          order: FieldOrder.ascending,
        })
          .addField(
            new PrimitiveField({
              name: 'id',
              type: 'int',
            }),
          )
          .addField(
            new ReferenceField({
              name: 'type_in_schema',
              type: 'record.primitive.x',
            }),
          )
          .addField(
            new ReferenceField({
              name: 'type_in_schema_diff_key',
              type: 'record.primitive.x',
            }),
          )
          .addField(
            new EnumField({
              keyNameOverride: 'enum_field_key_override',
              name: 'enum_field',
              type: ['v1', 'v2'],
            }),
          )
          .addField(
            new RecordField({
              namespace: 'record.primitive.x.y',
              name: 'grandchildren',
              doc: 'children field',
              order: FieldOrder.descending,
            }).addField(
              new PrimitiveField({
                name: 'id',
                type: 'int',
              }),
            ),
          ),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "children",
          "type": {
            "fields": [
              {
                "name": "id",
                "type": "int",
              },
              {
                "name": "type_in_schema",
                "type": "record.primitive.x",
              },
              {
                "name": "type_in_schema_diff_key",
                "type": "record.primitive.x",
              },
              {
                "name": "enum_field_key_override",
                "type": {
                  "name": "enum_field",
                  "symbols": [
                    "v1",
                    "v2",
                  ],
                  "type": "enum",
                },
              },
              {
                "name": "grandchildren",
                "type": {
                  "fields": [
                    {
                      "name": "id",
                      "type": "int",
                    },
                  ],
                  "name": "grandchildren",
                  "namespace": "record.primitive.x.y",
                  "type": "record",
                },
              },
            ],
            "name": "record_children",
            "namespace": "record.primitive.x",
            "type": "record",
          },
        },
      ],
      "name": "primitive",
      "namespace": "record.primitive",
      "type": "record",
    }
  `);
});

test('should create nullable records', () => {
  expect(
    new AvroSchemaBuilder('myRecord')
      .record('record.record')
      .addField(
        new RecordField({
          namespace: 'record.primitive.x',
          name: 'children',
          doc: 'children field',
          order: FieldOrder.ascending,
          nullable: true,
        })
          .addField(
            new PrimitiveField({
              name: 'id',
              type: 'int',
            }),
          )
          .addField(
            new RecordField({
              namespace: 'record.primitive.x.y',
              name: 'grandchildren',
              doc: 'children field',
              order: FieldOrder.descending,
              nullable: true,
            }).addField(
              new PrimitiveField({
                name: 'id',
                type: 'int',
              }),
            ),
          ),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "children",
          "type": [
            "null",
            {
              "fields": [
                {
                  "name": "id",
                  "type": "int",
                },
                {
                  "name": "grandchildren",
                  "type": [
                    "null",
                    {
                      "fields": [
                        {
                          "name": "id",
                          "type": "int",
                        },
                      ],
                      "name": "grandchildren",
                      "namespace": "record.primitive.x.y",
                      "type": "record",
                    },
                  ],
                },
              ],
              "name": "children",
              "namespace": "record.primitive.x",
              "type": "record",
            },
          ],
        },
      ],
      "name": "myRecord",
      "namespace": "record.record",
      "type": "record",
    }
  `);
});
