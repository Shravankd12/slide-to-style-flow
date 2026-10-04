/** Replace this adapter with a document-intelligence provider when one is configured.
 * Demo mode uses submitted form values, never claims to have read the uploaded file. */
export type ProcessingInput = {
  applicant: string;
  beneficiary: string;
  amount: number;
  currency: string;
  validity: string;
  incoterms: string;
  documentName: string;
};

export type ProcessingField = {
  field_name: string;
  field_value: string;
  confidence: number;
  source_document: string;
};

export interface DocumentProcessingService {
  classifyDocument(name: string): string;
  extractFields(input: ProcessingInput): ProcessingField[];
}

export const demoDocumentProcessingService: DocumentProcessingService = {
  classifyDocument(name) {
    const value = name.toLowerCase();
    if (/invoice/.test(value)) return "Commercial Invoice";
    if (/bill.of.lading|\bbol\b/.test(value)) return "Bill of Lading";
    if (/certificate/.test(value)) return "Beneficiary Certificate";
    if (/undertaking/.test(value)) return "Signed Undertaking";
    if (/application|\blc\b/.test(value)) return "LC Application Form";
    return "Supporting document";
  },
  extractFields(input) {
    // These are form values, not OCR output. Keep confidence low so a human
    // must review each value before requesting approval.
    const source_document = "Submitted application form · DEMO AI MODE";
    const values: Array<[string, string]> = [
      ["Applicant", input.applicant],
      ["Beneficiary", input.beneficiary],
      ["Amount", `${input.currency} ${input.amount}`],
      ["Validity", input.validity],
      ["Incoterms", input.incoterms],
    ];
    return values.filter(([, value]) => Boolean(value)).map(([field_name, field_value]) => ({
      field_name,
      field_value,
      confidence: 65,
      source_document,
    }));
  },
};