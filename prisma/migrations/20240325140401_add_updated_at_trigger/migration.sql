CREATE TRIGGER "sync_worker_updated_at" BEFORE UPDATE ON "worker" FOR EACH ROW EXECUTE PROCEDURE sync_updated_at();

CREATE TRIGGER "sync_worker_shift_updated_at" BEFORE UPDATE ON "worker_shift" FOR EACH ROW EXECUTE PROCEDURE sync_updated_at();
