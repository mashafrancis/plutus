
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."contact" (
    "id" integer NOT NULL,
    "message" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."contact" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."contact_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."contact_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."contact_id_seq" OWNED BY "public"."contact"."id";

CREATE TABLE IF NOT EXISTS "public"."expenses" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "notes" "text",
    "price" "text" DEFAULT '0'::"text" NOT NULL,
    "paid_via" "text" DEFAULT ''::"text" NOT NULL,
    "category" "text" NOT NULL,
    "date" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "uuid" NOT NULL,
    "nameHash" "text"
);

ALTER TABLE "public"."expenses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."feedbacks" (
    "id" integer NOT NULL,
    "message" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."feedbacks" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."feedbacks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."feedbacks_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."feedbacks_id_seq" OWNED BY "public"."feedbacks"."id";

CREATE TABLE IF NOT EXISTS "public"."income" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "notes" "text",
    "price" "text" DEFAULT '0'::"text" NOT NULL,
    "category" "text" NOT NULL,
    "date" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "uuid" NOT NULL,
    "nameHash" "text"
);

ALTER TABLE "public"."income" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."investments" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "notes" "text",
    "price" "text" DEFAULT '0'::"text" NOT NULL,
    "units" "text" DEFAULT '0'::"text" NOT NULL,
    "category" "text" NOT NULL,
    "date" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "uuid" NOT NULL,
    "nameHash" "text"
);

ALTER TABLE "public"."investments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "notes" "text",
    "url" "text" NOT NULL,
    "price" "text" DEFAULT '0'::"text" NOT NULL,
    "paid" "text" NOT NULL,
    "notify" boolean DEFAULT false NOT NULL,
    "date" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "uuid" NOT NULL,
    "active" boolean DEFAULT true,
    "cancelled_at" "text",
    "nameHash" "text"
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "currency" "text" DEFAULT 'KES'::"text" NOT NULL,
    "locale" "text" DEFAULT 'en-KE'::"text" NOT NULL,
    "order_identifier" "text",
    "order_store_id" "text",
    "order_number" "text",
    "order_status" "text",
    "billing_start_date" "text",
    "plan_status" "text" DEFAULT 'basic'::"text" NOT NULL,
    "trial_start_date" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "usage" integer DEFAULT 0 NOT NULL,
    "basic_usage_limit_email" boolean DEFAULT false NOT NULL,
    "new_signup_email" boolean DEFAULT false NOT NULL,
    "premium_plan_expired_email" boolean DEFAULT false NOT NULL,
    "premium_usage_limit_email" boolean DEFAULT false NOT NULL,
    "monthly_email_report" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

ALTER TABLE ONLY "public"."contact" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."contact_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."feedbacks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."feedbacks_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."contact"
    ADD CONSTRAINT "contact_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."feedbacks"
    ADD CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."income"
    ADD CONSTRAINT "income_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."investments"
    ADD CONSTRAINT "investments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."income"
    ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."investments"
    ADD CONSTRAINT "investments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."users" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."users" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."contact" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."expenses" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."feedbacks" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."income" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."investments" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."subscriptions" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."users" FOR SELECT USING (true);

CREATE POLICY "Enable update for users based on email" ON "public"."users" FOR UPDATE USING ((("auth"."jwt"() ->> 'email'::"text") = "email")) WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = "email"));

ALTER TABLE "public"."contact" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."feedbacks" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."income" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."investments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."contact" TO "anon";
GRANT ALL ON TABLE "public"."contact" TO "authenticated";
GRANT ALL ON TABLE "public"."contact" TO "service_role";

GRANT ALL ON SEQUENCE "public"."contact_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."contact_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."contact_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."expenses" TO "anon";
GRANT ALL ON TABLE "public"."expenses" TO "authenticated";
GRANT ALL ON TABLE "public"."expenses" TO "service_role";

GRANT ALL ON TABLE "public"."feedbacks" TO "anon";
GRANT ALL ON TABLE "public"."feedbacks" TO "authenticated";
GRANT ALL ON TABLE "public"."feedbacks" TO "service_role";

GRANT ALL ON SEQUENCE "public"."feedbacks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."feedbacks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."feedbacks_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."income" TO "anon";
GRANT ALL ON TABLE "public"."income" TO "authenticated";
GRANT ALL ON TABLE "public"."income" TO "service_role";

GRANT ALL ON TABLE "public"."investments" TO "anon";
GRANT ALL ON TABLE "public"."investments" TO "authenticated";
GRANT ALL ON TABLE "public"."investments" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
