CREATE TABLE public.notifications (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), recipient_id uuid NOT NULL, application_id uuid REFERENCES public.lc_applications(id), title text NOT NULL, body text NOT NULL DEFAULT '', channel text NOT NULL DEFAULT 'in_app', read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recipient reads notifications" ON public.notifications FOR SELECT TO authenticated USING (recipient_id = auth.uid());
CREATE POLICY "recipient marks notification read" ON public.notifications FOR UPDATE TO authenticated USING (recipient_id = auth.uid()) WITH CHECK (recipient_id = auth.uid());
CREATE INDEX notifications_recipient_created_idx ON public.notifications(recipient_id, created_at DESC);
CREATE OR REPLACE FUNCTION public.notify_tradeflow_event() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE owner_id uuid;
BEGIN
  SELECT customer_id INTO owner_id FROM public.lc_applications WHERE id = NEW.application_id;
  IF TG_TABLE_NAME = 'clarifications' AND TG_OP = 'INSERT' AND owner_id IS NOT NULL THEN
    INSERT INTO public.notifications(recipient_id,application_id,title,body) VALUES (owner_id,NEW.application_id,'Clarification requested',NEW.question);
  ELSIF TG_TABLE_NAME = 'approvals' AND TG_OP = 'UPDATE' AND NEW.decision IS DISTINCT FROM OLD.decision AND NEW.decision IN ('Approved','Rejected') AND owner_id IS NOT NULL THEN
    INSERT INTO public.notifications(recipient_id,application_id,title,body) VALUES (owner_id,NEW.application_id,'LC decision recorded',NEW.decision || ': ' || coalesce(NEW.reason,''));
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER tradeflow_clarification_notification AFTER INSERT ON public.clarifications FOR EACH ROW EXECUTE FUNCTION public.notify_tradeflow_event();
CREATE TRIGGER tradeflow_approval_notification AFTER UPDATE ON public.approvals FOR EACH ROW EXECUTE FUNCTION public.notify_tradeflow_event();