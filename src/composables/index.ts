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


export async function fetchCVFromUrl(url: string): Promise<CV | null> {
    try {
      const response = await fetch(url);
      const cv: CV = await response.json();
      return cv;
    } catch (error) {
      return null;
    }
  }