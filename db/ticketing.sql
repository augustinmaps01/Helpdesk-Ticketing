--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-17 22:54:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 243 (class 1259 OID 25015)
-- Name: approvals; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.approvals (
    id bigint NOT NULL,
    ticket_id bigint NOT NULL,
    approved_by bigint NOT NULL,
    approved_at timestamp(0) without time zone,
    status character varying(255) NOT NULL
);


ALTER TABLE public.approvals OWNER TO super_admin;

--
-- TOC entry 242 (class 1259 OID 25014)
-- Name: approvals_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.approvals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.approvals_id_seq OWNER TO super_admin;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 242
-- Name: approvals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.approvals_id_seq OWNED BY public.approvals.id;


--
-- TOC entry 245 (class 1259 OID 25032)
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.audit_logs (
    id bigint NOT NULL,
    ticket_id bigint NOT NULL,
    action character varying(255) NOT NULL,
    performed_by bigint NOT NULL,
    performed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO super_admin;

--
-- TOC entry 244 (class 1259 OID 25031)
-- Name: audit_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.audit_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_logs_id_seq OWNER TO super_admin;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 244
-- Name: audit_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.audit_logs_id_seq OWNED BY public.audit_logs.id;


--
-- TOC entry 233 (class 1259 OID 24889)
-- Name: branch; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.branch (
    id bigint NOT NULL,
    branch_name character varying(255) NOT NULL,
    brak character varying(255) NOT NULL,
    brcode character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.branch OWNER TO super_admin;

--
-- TOC entry 232 (class 1259 OID 24888)
-- Name: branch_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.branch_id_seq OWNER TO super_admin;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 232
-- Name: branch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.branch_id_seq OWNED BY public.branch.id;


--
-- TOC entry 223 (class 1259 OID 24829)
-- Name: cache; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO super_admin;

--
-- TOC entry 224 (class 1259 OID 24836)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO super_admin;

--
-- TOC entry 237 (class 1259 OID 24905)
-- Name: categories; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    description text
);


ALTER TABLE public.categories OWNER TO super_admin;

--
-- TOC entry 236 (class 1259 OID 24904)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO super_admin;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 236
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 241 (class 1259 OID 24994)
-- Name: comments; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    ticket_id bigint NOT NULL,
    user_id bigint NOT NULL,
    comment text NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.comments OWNER TO super_admin;

--
-- TOC entry 240 (class 1259 OID 24993)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO super_admin;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 240
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 235 (class 1259 OID 24898)
-- Name: departments; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.departments (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.departments OWNER TO super_admin;

--
-- TOC entry 234 (class 1259 OID 24897)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.departments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO super_admin;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 234
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 239 (class 1259 OID 24912)
-- Name: employees; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.employees (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    role_id bigint NOT NULL,
    branch_id bigint NOT NULL,
    department_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.employees OWNER TO super_admin;

--
-- TOC entry 238 (class 1259 OID 24911)
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.employees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO super_admin;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 238
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- TOC entry 229 (class 1259 OID 24861)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO super_admin;

--
-- TOC entry 228 (class 1259 OID 24860)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO super_admin;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 228
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 227 (class 1259 OID 24853)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO super_admin;

--
-- TOC entry 226 (class 1259 OID 24844)
-- Name: jobs; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO super_admin;

--
-- TOC entry 225 (class 1259 OID 24843)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO super_admin;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 225
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 218 (class 1259 OID 24786)
-- Name: migrations; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO super_admin;

--
-- TOC entry 217 (class 1259 OID 24785)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO super_admin;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 217
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 221 (class 1259 OID 24813)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO super_admin;

--
-- TOC entry 231 (class 1259 OID 24882)
-- Name: roles; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.roles OWNER TO super_admin;

--
-- TOC entry 230 (class 1259 OID 24881)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO super_admin;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 222 (class 1259 OID 24820)
-- Name: sessions; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO super_admin;

--
-- TOC entry 249 (class 1259 OID 32824)
-- Name: ticket_assignments; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.ticket_assignments (
    id bigint NOT NULL,
    ticket_id bigint NOT NULL,
    assigned_to bigint NOT NULL,
    assigned_by bigint NOT NULL,
    assigned_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.ticket_assignments OWNER TO super_admin;

--
-- TOC entry 248 (class 1259 OID 32823)
-- Name: ticket_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.ticket_assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ticket_assignments_id_seq OWNER TO super_admin;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 248
-- Name: ticket_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.ticket_assignments_id_seq OWNED BY public.ticket_assignments.id;


--
-- TOC entry 247 (class 1259 OID 32797)
-- Name: tickets; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.tickets (
    id bigint NOT NULL,
    ticket_no character varying(255) NOT NULL,
    subject character varying(255) NOT NULL,
    description text NOT NULL,
    status character varying(255) NOT NULL,
    priority character varying(255) NOT NULL,
    image character varying(255),
    requires_approval boolean DEFAULT false NOT NULL,
    category_id bigint NOT NULL,
    assigned_to bigint,
    submitted_by bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tickets OWNER TO super_admin;

--
-- TOC entry 246 (class 1259 OID 32796)
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_id_seq OWNER TO super_admin;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 246
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- TOC entry 220 (class 1259 OID 24803)
-- Name: users; Type: TABLE; Schema: public; Owner: super_admin
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    role character varying(255) DEFAULT 'hr'::character varying NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'hr'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO super_admin;

--
-- TOC entry 219 (class 1259 OID 24802)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: super_admin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO super_admin;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4793 (class 2604 OID 25018)
-- Name: approvals id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.approvals ALTER COLUMN id SET DEFAULT nextval('public.approvals_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 25035)
-- Name: audit_logs id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.audit_logs ALTER COLUMN id SET DEFAULT nextval('public.audit_logs_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 24892)
-- Name: branch id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.branch ALTER COLUMN id SET DEFAULT nextval('public.branch_id_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 24908)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 24997)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 4788 (class 2604 OID 24901)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 24915)
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 24864)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 4783 (class 2604 OID 24847)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 24789)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4786 (class 2604 OID 24885)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 32827)
-- Name: ticket_assignments id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.ticket_assignments ALTER COLUMN id SET DEFAULT nextval('public.ticket_assignments_id_seq'::regclass);


--
-- TOC entry 4796 (class 2604 OID 32800)
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 24806)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5031 (class 0 OID 25015)
-- Dependencies: 243
-- Data for Name: approvals; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.approvals (id, ticket_id, approved_by, approved_at, status) FROM stdin;
\.


--
-- TOC entry 5033 (class 0 OID 25032)
-- Dependencies: 245
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.audit_logs (id, ticket_id, action, performed_by, performed_at) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 24889)
-- Dependencies: 233
-- Data for Name: branch; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.branch (id, branch_name, brak, brcode, created_at, updated_at) FROM stdin;
1	Head Office	HO	00	2025-08-03 14:31:55	2025-08-03 14:52:06
36	Salay Branch	SB	03	2025-08-10 10:43:03	2025-08-10 10:43:03
37	CDO Branch	CDOB	04	2025-08-10 10:44:27	2025-08-10 10:44:27
38	Maramag Branch	MB	05	2025-08-16 14:53:10	2025-08-16 14:53:10
39	Gingoog Branch Lite	GNG-BLU	06	2025-08-16 15:21:08	2025-08-16 15:21:08
2	Main Offices	MO	01	2025-08-03 14:33:50	2025-08-16 15:34:32
3	Jasaan Branch	SB	03	2025-08-03 14:51:10	2025-08-16 17:21:35
40	Camiguin Branch Lite	CMG-BLU	07	2025-08-16 17:22:16	2025-08-16 17:22:16
\.


--
-- TOC entry 5011 (class 0 OID 24829)
-- Dependencies: 223
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- TOC entry 5012 (class 0 OID 24836)
-- Dependencies: 224
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 5025 (class 0 OID 24905)
-- Dependencies: 237
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.categories (id, name, created_at, updated_at, description) FROM stdin;
2	Software Support	2025-08-17 04:29:32	2025-08-17 04:29:32	Application bugs, installation help
3	Network Issues	2025-08-17 04:29:32	2025-08-17 04:29:32	Internet, WiFi, connectivity problems
1	Hardware Issues	2025-08-17 04:29:32	2025-08-17 04:35:34	Problems with computer hardware, servers, workstations, peripherals, and physical equipment malfunctions
5	Network/Internet	2025-08-17 04:35:34	2025-08-17 04:35:34	WiFi connectivity, internet access, network configuration, VPN issues, and network performance problems
6	Account/Access	2025-08-17 04:35:34	2025-08-17 04:35:34	User account issues, password resets, permission problems, login difficulties, and access control
7	Mobile/Phone	2025-08-17 04:35:34	2025-08-17 04:35:34	Mobile device setup, smartphone issues, tablet problems, mobile app support, and device synchronization
8	Printer/Scanner	2025-08-17 04:35:34	2025-08-17 04:35:34	Printer connectivity, print quality issues, scanner problems, driver installations, and print queue management
9	Email Issues	2025-08-17 04:35:34	2025-08-17 04:35:34	Email configuration, delivery problems, spam filtering, Outlook/email client issues, and email security
10	Other	2025-08-17 04:35:34	2025-08-17 04:35:34	General IT support requests, miscellaneous technical issues, and problems not covered by other categories
11	CBS	2025-08-17 04:42:43	2025-08-17 04:42:43	Core banking issues
12	Software Problems	2025-08-17 05:19:31	2025-08-17 05:19:31	Application errors, software crashes, installation issues, licensing problems, and software compatibility
\.


--
-- TOC entry 5029 (class 0 OID 24994)
-- Dependencies: 241
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.comments (id, ticket_id, user_id, comment, created_at) FROM stdin;
\.


--
-- TOC entry 5023 (class 0 OID 24898)
-- Dependencies: 235
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.departments (id, name, created_at, updated_at) FROM stdin;
1	HR Department	2025-08-16 17:30:17	2025-08-16 17:30:17
2	Accounting Department	2025-08-16 17:30:39	2025-08-16 17:30:39
3	Cash Section	2025-08-16 17:30:55	2025-08-16 17:30:55
4	Loan Section	2025-08-16 17:31:07	2025-08-16 17:31:07
5	Audit Department	2025-08-16 17:31:19	2025-08-16 17:31:19
\.


--
-- TOC entry 5027 (class 0 OID 24912)
-- Dependencies: 239
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.employees (id, name, "position", role_id, branch_id, department_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5017 (class 0 OID 24861)
-- Dependencies: 229
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 5015 (class 0 OID 24853)
-- Dependencies: 227
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 5014 (class 0 OID 24844)
-- Dependencies: 226
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- TOC entry 5006 (class 0 OID 24786)
-- Dependencies: 218
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_07_26_022314_create_roles	2
5	2025_07_26_020859_branch	3
6	2025_07_26_021250_departments	4
7	2025_07_26_021600_create_categories	5
8	2025_07_26_020737_employees	6
10	2025_07_26_022002_create_comments	8
11	2025_07_26_022051_create_approvals	9
12	2025_07_26_022131_create_autit-logs	10
13	2025_07_26_021746_create_tickets	11
14	2025_08_17_042707_add_description_and_color_to_categories_table	12
15	2025_08_17_051713_remove_color_from_categories_table	13
17	2025_08_17_063117_add_role_to_users_table	14
\.


--
-- TOC entry 5009 (class 0 OID 24813)
-- Dependencies: 221
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- TOC entry 5019 (class 0 OID 24882)
-- Dependencies: 231
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.roles (id, name, created_at, updated_at) FROM stdin;
1	Customer Associate	2025-07-27 00:17:26	2025-07-27 00:17:26
3	Teller	2025-08-16 07:18:13	2025-08-16 07:18:13
4	Cashier	2025-08-16 07:24:06	2025-08-16 07:24:06
5	Branch Manager	2025-08-16 07:32:40	2025-08-16 07:32:40
6	Accounting Clerk	2025-08-16 15:11:12	2025-08-16 15:11:12
7	HR Associate	2025-08-16 15:11:26	2025-08-16 15:11:26
8	Account Officer	2025-08-16 15:11:42	2025-08-16 15:11:42
9	Loan Processor	2025-08-16 15:12:22	2025-08-16 15:12:22
10	Branch Lite Head	2025-08-16 15:12:50	2025-08-16 15:12:50
11	Office Associate	2025-08-16 15:13:05	2025-08-16 15:13:05
12	Loan Officer	2025-08-16 15:13:25	2025-08-16 15:13:25
13	Assistant Cashier	2025-08-16 15:15:44	2025-08-16 15:15:44
14	General Bookkeeper	2025-08-16 15:16:03	2025-08-16 15:16:03
15	Loans Bookkeeper	2025-08-16 15:16:20	2025-08-16 15:16:20
16	SME Specialist	2025-08-16 15:17:13	2025-08-16 15:17:13
17	HR Manager	2025-08-16 15:18:32	2025-08-16 15:18:32
18	Audit Manager	2025-08-16 15:19:19	2025-08-16 15:19:19
19	Loan Supervisor	2025-08-16 15:29:04	2025-08-16 15:29:04
20	Business Development Officer	2025-08-16 15:29:58	2025-08-16 15:29:58
21	MFU Manager	2025-08-16 15:30:11	2025-08-16 15:30:11
22	MFU	2025-08-16 15:31:01	2025-08-16 15:31:01
23	Compliance Staff	2025-08-16 15:31:40	2025-08-16 15:31:40
24	Audit Staff	2025-08-16 15:31:57	2025-08-16 15:31:57
25	OL	2025-08-16 15:32:53	2025-08-16 15:32:53
26	Executive Assistant	2025-08-16 15:33:12	2025-08-16 15:33:12
27	Compliance Officer	2025-08-16 16:01:56	2025-08-16 16:01:56
2	Administrator	2025-07-27 00:18:05	2025-08-16 17:34:00
\.


--
-- TOC entry 5010 (class 0 OID 24820)
-- Dependencies: 222
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
1alV5DU8Utu8lEV8uxHkBKLapx96lc4KD8SnMcH7	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	YToyOntzOjY6InN0YXR1cyI7czozODoiWW91IGhhdmUgYmVlbiBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dC4iO3M6NjoiX2ZsYXNoIjthOjI6e3M6MzoibmV3IjthOjA6e31zOjM6Im9sZCI7YToxOntpOjA7czo2OiJzdGF0dXMiO319fQ==	1755441164
busRiQ32Rzo5B8p9iXFlpnIOiFcYCZS7KscGl64Y	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	YTozOntzOjY6Il90b2tlbiI7czo0MDoiWHFSU0NXSDNUd1N3ZXlSc2d1YzJjMGF2bGUzd3o1bTE0ZkR0R1lMWSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jcmVhdGUtdGlja2V0Ijt9fQ==	1755442373
\.


--
-- TOC entry 5037 (class 0 OID 32824)
-- Dependencies: 249
-- Data for Name: ticket_assignments; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.ticket_assignments (id, ticket_id, assigned_to, assigned_by, assigned_at, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5035 (class 0 OID 32797)
-- Dependencies: 247
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.tickets (id, ticket_no, subject, description, status, priority, image, requires_approval, category_id, assigned_to, submitted_by, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5008 (class 0 OID 24803)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: super_admin
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role) FROM stdin;
3	Admin User	admin@example.com	2025-08-17 06:39:24	$2y$12$/jWT7e32ObWo5BewSE5g6OMlYl14AbFGfT2nF//UziYMNho6lLDsa	PmhH5R00s1	2025-08-17 06:39:24	2025-08-17 06:39:24	hr
4	HR User	hr@example.com	2025-08-17 06:39:24	$2y$12$/jWT7e32ObWo5BewSE5g6OMlYl14AbFGfT2nF//UziYMNho6lLDsa	13tBmpJlt0	2025-08-17 06:39:24	2025-08-17 06:39:24	hr
5	Test User	test@example.com	2025-08-17 06:39:24	$2y$12$/jWT7e32ObWo5BewSE5g6OMlYl14AbFGfT2nF//UziYMNho6lLDsa	9OG9i5XEZH	2025-08-17 06:39:24	2025-08-17 06:39:24	hr
6	Admin User	admin@test.com	\N	$2y$12$E0kA4uS9mV2BYPmCRo6gHOfmVQc4R2d79VlP2SG7IlZ.nJ6DpoKTm	\N	2025-08-17 06:40:51	2025-08-17 06:53:06	hr
7	HR User	hr@test.com	\N	$2y$12$fNip3ehXM1p8KWwcrUpr1.uOIAKsIAggb2BhievK9DCG7IzLlAcvS	\N	2025-08-17 06:53:06	2025-08-17 06:53:06	hr
2	Bryan Abelo	bryanabelo@gmail.com	\N	$2y$12$iQfxSMLCwBqKvMFcti9XAeXqEpboIWGmo96fhDKEEpjMuNlM9g6Te	\N	2025-08-16 12:31:59	2025-08-16 12:31:59	hr
8	HR staff	hr@gmail.com	\N	$2y$12$PMYo1CQ6oMqmGkpvLh8zBumiOm8HSY77.zHrZqfXfA2Hx/uS4b3D2	\N	2025-08-17 07:23:59	2025-08-17 07:23:59	hr
9	John Admin	john.admin@company.com	\N	$2y$12$RTh1cAvwaPQFbPPuNNkAiORiQFN7kl6i3sJTcyk/oQW1EBNOEyXY.	\N	2025-08-17 10:03:20	2025-08-17 10:03:20	admin
10	Sarah Manager	sarah.manager@company.com	\N	$2y$12$IHKe01k6Rsr1nf6lRLB74OH3wIzA.WY3S9JlvvmrO2wXzuDJs9Xkq	\N	2025-08-17 10:03:20	2025-08-17 10:03:20	admin
11	Mike Senior	mike.senior@company.com	\N	$2y$12$quwfaHiGJkLtePZqEPx4YeKSkAxsdRBRfRMBnMj1iAmAZ5vQ7tGP2	\N	2025-08-17 10:03:20	2025-08-17 10:03:20	admin
1	Augustin Maputol	cloudsephiroth56@gmail.com	\N	$2y$12$BFSXYIqV7B6ypnyMyHw79.LXQFexfhf5FehFjoR6Wg/4/ZHMvvUfG	\N	2025-07-26 23:59:39	2025-07-26 23:59:39	admin
\.


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 242
-- Name: approvals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.approvals_id_seq', 1, false);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 244
-- Name: audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.audit_logs_id_seq', 1, false);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 232
-- Name: branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.branch_id_seq', 40, true);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 236
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.categories_id_seq', 12, true);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 240
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 234
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.departments_id_seq', 5, true);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 238
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.employees_id_seq', 1, false);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 228
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 225
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 217
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 18, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.roles_id_seq', 27, true);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 248
-- Name: ticket_assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.ticket_assignments_id_seq', 1, false);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 246
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.tickets_id_seq', 1, false);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_admin
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- TOC entry 4839 (class 2606 OID 25020)
-- Name: approvals approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.approvals
    ADD CONSTRAINT approvals_pkey PRIMARY KEY (id);


--
-- TOC entry 4841 (class 2606 OID 25038)
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 24896)
-- Name: branch branch_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 24842)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 4814 (class 2606 OID 24835)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 4833 (class 2606 OID 24910)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4837 (class 2606 OID 25002)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 4831 (class 2606 OID 24903)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 4835 (class 2606 OID 24919)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 4823 (class 2606 OID 24869)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4825 (class 2606 OID 24871)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 4821 (class 2606 OID 24859)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 24851)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4802 (class 2606 OID 24791)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4808 (class 2606 OID 24819)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 4827 (class 2606 OID 24887)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4811 (class 2606 OID 24826)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 32830)
-- Name: ticket_assignments ticket_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT ticket_assignments_pkey PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 32805)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4845 (class 2606 OID 32822)
-- Name: tickets tickets_ticket_no_unique; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_ticket_no_unique UNIQUE (ticket_no);


--
-- TOC entry 4804 (class 2606 OID 24812)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 4806 (class 2606 OID 24810)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4819 (class 1259 OID 24852)
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: super_admin
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- TOC entry 4809 (class 1259 OID 24828)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: super_admin
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 4812 (class 1259 OID 24827)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: super_admin
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- TOC entry 4852 (class 2606 OID 25026)
-- Name: approvals approvals_approved_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.approvals
    ADD CONSTRAINT approvals_approved_by_foreign FOREIGN KEY (approved_by) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4853 (class 2606 OID 25044)
-- Name: audit_logs audit_logs_performed_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_performed_by_foreign FOREIGN KEY (performed_by) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4851 (class 2606 OID 25008)
-- Name: comments comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4848 (class 2606 OID 24925)
-- Name: employees employees_branch_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_branch_id_foreign FOREIGN KEY (branch_id) REFERENCES public.branch(id) ON DELETE CASCADE;


--
-- TOC entry 4849 (class 2606 OID 24930)
-- Name: employees employees_department_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departments(id) ON DELETE CASCADE;


--
-- TOC entry 4850 (class 2606 OID 24920)
-- Name: employees employees_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4857 (class 2606 OID 32841)
-- Name: ticket_assignments ticket_assignments_assigned_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT ticket_assignments_assigned_by_foreign FOREIGN KEY (assigned_by) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4858 (class 2606 OID 32836)
-- Name: ticket_assignments ticket_assignments_assigned_to_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT ticket_assignments_assigned_to_foreign FOREIGN KEY (assigned_to) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4859 (class 2606 OID 32831)
-- Name: ticket_assignments ticket_assignments_ticket_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT ticket_assignments_ticket_id_foreign FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- TOC entry 4854 (class 2606 OID 32811)
-- Name: tickets tickets_assigned_to_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_assigned_to_foreign FOREIGN KEY (assigned_to) REFERENCES public.employees(id) ON DELETE SET NULL;


--
-- TOC entry 4855 (class 2606 OID 32806)
-- Name: tickets tickets_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4856 (class 2606 OID 32816)
-- Name: tickets tickets_submitted_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: super_admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_submitted_by_foreign FOREIGN KEY (submitted_by) REFERENCES public.employees(id) ON DELETE CASCADE;


-- Completed on 2025-08-17 22:54:27

--
-- PostgreSQL database dump complete
--

