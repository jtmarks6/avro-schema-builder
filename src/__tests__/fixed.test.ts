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
      .addField(
        new FixedField({
          keyNameOverride: 'fixed_field_key_override',
          name: 'fixed_field_key_override_example',
          size: 12451302,
          nullable: true,
        }),
      )
      .addField(
        new FixedField({
          name: 'fixed_field_customProp',
          size: 52424302,
          nullable: true,
        }).prop('customProp', 'val'),
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
        {
          "name": "fixed_field_key_override",
          "type": [
            "null",
            {
              "name": "fixed_field_key_override_example",
              "size": 12451302,
              "type": "fixed",
            },
          ],
        },
        {
          "customProp": "val",
          "name": "fixed_field_customProp",
          "type": [
            "null",
            {
              "customProp": "val",
              "name": "fixed_field_customProp",
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
