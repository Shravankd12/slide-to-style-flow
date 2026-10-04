import { describe, expect, it } from "vitest";
import { demoDocumentProcessingService } from "../lib/document-processing.server";

describe("demo document processing", () => {
  it("labels submitted form values as demo data rather than document OCR", () => {
    const fields = demoDocumentProcessingService.extractFields({
      applicant: "Acme Ltd", beneficiary: "North Supply", amount: 1200,
      currency: "USD", validity: "2026-12-31", incoterms: "FOB", documentName: "invoice.pdf",
    });
    expect(fields.find((field) => field.field_name === "Amount")?.field_value).toBe("USD 1200");
    expect(fields.every((field) => field.source_document.includes("DEMO AI MODE"))).toBe(true);
    expect(fields.every((field) => field.confidence === 65)).toBe(true);
  });
  it("classifies a named trade document", () => {
    expect(demoDocumentProcessingService.classifyDocument("commercial-invoice.pdf")).toBe("Commercial Invoice");
  });
});