import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const processDocumentDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ documentId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: document, error: documentError } = await supabase
      .from("lc_documents")
      .select("id,application_id,name,uploaded_by,processing_status")
      .eq("id", data.documentId).single();
    if (documentError || !document) throw new Error("Document not found or access denied.");
    if (document.uploaded_by !== userId) throw new Error("Only the uploader can start processing.");
    if (document.processing_status !== "Pending") throw new Error("This document has already been processed.");

    const { data: application, error: applicationError } = await supabase
      .from("lc_applications")
      .select("id,applicant,beneficiary,amount,currency,validity,incoterms,customer_id,status")
      .eq("id", document.application_id).single();
    if (applicationError || !application) throw new Error("Application not found or access denied.");
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const isStaff = roles?.some(({ role }) => role !== "customer") ?? false;
    if (application.customer_id !== userId && !isStaff) throw new Error("Access denied.");
    if (application.status === "Issued" || application.status === "Rejected") throw new Error("This application is closed.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { demoDocumentProcessingService } = await import("./document-processing.server");
    const classification = demoDocumentProcessingService.classifyDocument(document.name);
    const fields = demoDocumentProcessingService.extractFields({
      applicant: application.applicant,
      beneficiary: application.beneficiary,
      amount: application.amount,
      currency: application.currency,
      validity: application.validity,
      incoterms: application.incoterms,
      documentName: document.name,
    });
    const { error: classificationError } = await supabaseAdmin.from("lc_documents")
      .update({ document_type: classification, processing_status: "Processing" }).eq("id", document.id);
    if (classificationError) throw classificationError;
    const { data: existing } = await supabaseAdmin.from("extracted_fields")
      .select("id").eq("application_id", application.id).limit(1);
    if (!existing?.length && fields.length) {
      const { error } = await supabaseAdmin.from("extracted_fields")
        .insert(fields.map((field) => ({ ...field, application_id: application.id })));
      if (error) throw error;
    }
    const { error: statusError } = await supabaseAdmin.from("lc_documents")
      .update({ processing_status: "Requires Review" }).eq("id", document.id);
    if (statusError) throw statusError;
    const { error: stageError } = await supabaseAdmin.from("lc_applications")
      .update({ stage: "AI extraction & validation", status: "Review required", updated_at: new Date().toISOString() })
      .eq("id", application.id);
    if (stageError) throw stageError;
    await supabaseAdmin.from("audit_logs").insert({ application_id: application.id, actor_id: userId,
      action: "Demo processing completed", details: `${classification}; submitted form values queued for human review. No document OCR performed.` });
    return { mode: "DEMO AI MODE", classification, fields: fields.length };
  });