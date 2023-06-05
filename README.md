# avro-schema-builder

[![CircleCI](https://circleci.com/gh/diogofcunha/avro-schema-builder.svg?style=svg)](https://circleci.com/gh/diogofcunha/avro-schema-builder)
[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/avro-schema-builder.png?style=flat-square
[npm]: https://www.npmjs.com/package/avro-schema-builder

A robust and feature-rich package for building Avro Schema definitions.

## Description

avro-schema-builder is a convenient way of programmatically building Avro Schemas. With the help of TypeScript type definitions, this library provides a type-safe and self-documenting way of creating Avro schemas, without dealing with JSON files or worrying about schema validation or learning the depth of Avro specific representation like defaults and object nesting.

## Install

```bash
yarn add avro-schema-builder
```

```bash
npm install avro-schema-builder
```

## Usage

```typescript
import {AvroSchemaBuilder, PrimitiveField, PrimitiveType} from 'avro-schema-builder';

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
          defaultValue: null,
        }).addField(
          new PrimitiveField({
            name: 'id',
            type: 'int',
          }),
        ),
      ),
  )
  .compile();

console.log(JSON.stringify(schema, null, 2));
```

This will output the following Avro Schema:

```json
{
  "type": "record",
  "name": "myRecord",
  "namespace": "record.record",
  "fields": [
    {
      "name": "children",
      "type": [
        "null",
        {
          "fields": [
            {
              "name": "id",
              "type": "int"
            },
            {
              "name": "grandchildren",
              "type": [
                "null",
                {
                  "default": null,
                  "fields": [
                    {
                      "name": "id",
                      "type": "int"
                    }
                  ],
                  "name": "grandchildren",
                  "namespace": "record.primitive.x.y",
                  "type": "record"
                }
              ]
            }
          ],
          "name": "children",
          "namespace": "record.primitive.x",
          "type": "record"
        }
      ]
    }
  ]
}
```

## Documentation

This package provides several classes and types for building Avro schemas:

- `AvroSchemaBuilder`: Main entry point for creating a schema. It is initialized with the name of the schema.
- `FieldBuilder`: Represents a field in the schema. It can be of various types including PrimitiveField, RecordField, ArrayField, EnumField, MapField, FixedField, UnionField, and ReferenceField.
- Other classes (`PrimitiveField`, `RecordField`, `ArrayField`, etc.): Represent the different types of fields available in Avro.
- `types`: Contains TypeScript type definitions for the various Avro types.

For a more detailed explanation of the classes and types available, and how to use them, please check out the source code. Each class and type is documented with JSDoc comments.

## Contributing

Contributions are welcome! Please submit a pull request with any improvements or bug fixes. Make sure to add tests for any new features and bug fixes, and ensure that the existing tests pass.

# License

This project is licensed under the MIT License.

# Contact

If you need help or have questions, feel free to open an issue in the GitHub repository.
