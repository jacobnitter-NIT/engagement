-- Keep the original administrator as the only role manager.
INSERT INTO an2_config(key,value) SELECT 'owner_account_id',id FROM an2_accounts WHERE role='admin' ORDER BY rowid LIMIT 1 ON CONFLICT(key) DO NOTHING;
DROP INDEX IF EXISTS an2_one_admin;
