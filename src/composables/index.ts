import Ajv from "ajv"
import { CVSchema,CV } from "@/types";
const cvSchema: CVSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "additionalProperties": {
        "type": "array",
        "items": {
            "type": "string"
        }
    }
};

export function validateCV(cv: CV): boolean {
    const ajv = new Ajv();
    const validate = ajv.compile(cvSchema);
    const isValid = validate(cv);
    return isValid;
};