import {AvroSchemaBuilder, EnumField} from '..';

enum Color {
  'red' = 'red',
  'green' = 'green',
  'blue' = 'blue',
}

test('should create a schema', () => {
  expect(
    new AvroSchemaBuilder('enum')
      .record('record.enum')
      .addField(
        new EnumField({
          name: 'enum_field_simple',
          type: Object.values(Color),
        }),
      )
      .addField(
        new EnumField({
          name: 'enum_field_with_default',
          type: Object.values(Color),
          defaultValue: Color.blue,
        }),
      )
      .addField(
        new EnumField({
          name: 'enum_field_with_complete',
          type: Object.values(Color),
          defaultValue: Color.red,
          aliases: ['enum_field_with_complete.previous'],
          doc: 'Enum Field with complete',
          namespace: 'enum.field.com',
          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "enum_field_simple",
          "type": {
            "name": "enum_field_simple",
            "symbols": [
              "red",
              "green",
              "blue",
            ],
            "type": "enum",
          },
        },
        {
          "name": "enum_field_with_default",
          "type": {
            "default": "blue",
            "name": "enum_field_with_default",
            "symbols": [
              "red",
              "green",
              "blue",
            ],
            "type": "enum",
          },
        },
        {
          "name": "enum_field_with_complete",
          "type": [
            "null",
            {
              "aliases": [
                "enum_field_with_complete.previous",
              ],
              "default": "red",
              "doc": "Enum Field with complete",
              "name": "enum_field_with_complete",
              "namespace": "enum.field.com",
              "symbols": [
                "red",
                "green",
                "blue",
              ],
              "type": "enum",
            },
          ],
        },
      ],
      "name": "enum",
      "namespace": "record.enum",
      "type": "record",
    }
  `);
});
