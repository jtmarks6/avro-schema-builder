import {AvroSchemaBuilder, FixedField} from '..';

test('should create fixed types', () => {
  expect(
    new AvroSchemaBuilder('fixed')
      .record('record.fixed')
      .addField(
        new FixedField({
          name: 'fixed_field',
          size: 1412412,
          aliases: ['fixed.old'],
        }),
      )
      .addField(
        new FixedField({
          name: 'fixed_field_nullable',
          size: 52424302,
          nullable: true,
        }),
      )
      .compile(),
  ).toMatchInlineSnapshot(`
    {
      "fields": [
        {
          "name": "fixed_field",
          "type": {
            "aliases": [
              "fixed.old",
            ],
            "name": "fixed_field",
            "size": 1412412,
            "type": "fixed",
          },
        },
        {
          "name": "fixed_field_nullable",
          "type": [
            "null",
            {
              "name": "fixed_field_nullable",
              "size": 52424302,
              "type": "fixed",
            },
          ],
        },
      ],
      "name": "fixed",
      "namespace": "record.fixed",
      "type": "record",
    }
  `);
});
