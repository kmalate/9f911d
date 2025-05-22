import { FieldSchema } from "./fieldschema";

export interface Form {
    id: string,
    name: string,
    description: string,
    field_schema: FieldSchema
}