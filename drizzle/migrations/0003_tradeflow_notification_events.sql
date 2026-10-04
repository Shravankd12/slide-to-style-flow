CREATE OR REPLACE FUNCTION public.notify_tradeflow_activity() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE owner_id uuid;
DECLARE event_title text;
DECLARE event_body text;
DECLARE target_role public.app_role;
BEGIN
  SELECT customer_id INTO owner_id FROM public.lc_applications WHERE id = NEW.application_id;
  IF TG_TABLE_NAME = 'lc_documents' THEN
    event_title := 'Document uploaded'; event_body := NEW.name || ' was uploaded securely.'; target_role := 'officer';
  ELSIF TG_TABLE_NAME = 'extracted_fields' THEN
    IF EXISTS (SELECT 1 FROM public.extracted_fields WHERE application_id = NEW.application_id AND id <> NEW.id) THEN RETURN NEW; END IF;
    event_title := 'Extraction ready for review'; event_body := 'DEMO AI MODE: submitted form values require officer review; file content was not analyzed.'; target_role := 'officer';
  ELSIF TG_TABLE_NAME = 'approvals' THEN
    event_title := 'LC awaiting approval'; event_body := 'A human approval decision is required.'; target_role := 'approver';
  END IF;
  IF owner_id IS NOT NULL AND TG_TABLE_NAME = 'lc_documents' THEN
    INSERT INTO public.notifications(recipient_id,application_id,title,body) VALUES(owner_id,NEW.application_id,event_title,event_body);
  END IF;
  INSERT INTO public.notifications(recipient_id,application_id,title,body)
    SELECT DISTINCT ur.user_id,NEW.application_id,event_title,event_body FROM public.user_roles ur
    WHERE ur.role = target_role OR ur.role = 'admin';
  RETURN NEW;
END $$;
CREATE TRIGGER tradeflow_document_activity AFTER INSERT ON public.lc_documents FOR EACH ROW EXECUTE FUNCTION public.notify_tradeflow_activity();
CREATE TRIGGER tradeflow_extraction_activity AFTER INSERT ON public.extracted_fields FOR EACH ROW EXECUTE FUNCTION public.notify_tradeflow_activity();
CREATE TRIGGER tradeflow_approval_activity AFTER INSERT ON public.approvals FOR EACH ROW EXECUTE FUNCTION public.notify_tradeflow_activity();