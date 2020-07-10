--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
46	44	4	4495
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
44	2020-07-10 23:02:32.753192+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
23	44	Sierra Henderson	5555 5555 5555 5555	123 Fake St.\nCity, State 00987	2020-07-10 23:02:55.288674+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Anti-Slip Yoga Mat	5995	/images/yoga-mat.jpg	Made with natural and ethically sourced rubber, this mat is as comfortable as it is environmentally responsible.	Made with natural and ethically sourced rubber, this mat is as comfortable as it is environmentally responsible. Let the calming blue colors of the mat soothe you during your practice. The anti-gripping technology makes sure you feel secure in the most challenging of poses. Also suitable for hot yoga.
4	Meditation Cushion	4495	/images/meditation-cushion.jpg	For those who want a little extra support while meditating, this meditation cushion has you covered.	For those who want a little extra support while meditating, this meditation cushion has you covered. The plush surface makes sure you are comfortable while still maintaining your posture. Can be used in combination with bolsters, blankets, and blocks for a more personalized meditation experience.
5	Soothing Eye Pillow	945	/images/eye-pillow.jpeg	Enhanced with lavender sprigs and essential oils, this eye pillow helps guarantee a soothing meditation experience.	This product is inspired by one of the owner’s favorite yoga teachers, who would place homemade eye pillows beside each pupil as they made their way into Shavasana. The buckwheat kernels distribute an even amount of weight over the eyes to further induce relaxation. Enhanced with lavender sprigs and essential oils, this eye pillow helps guarantee a soothing meditation experience.
2	Cork Yoga Block	2195	/images/cork-block.jpg	The cork material makes this block an environmentally friendly alternative to standard foam blocks without sacrificing quality.	The cork material makes this block an environmentally friendly alternative to standard foam blocks without sacrificing quality. It makes an extremely versatile prop, with three height options that can be used either alone or in combination with other props. Those with less flexibility can also use this block to do easier or restorative variations of poses.
3	Rectangular Bolster	4545	/images/bolster-2.jpg	Ideal for people with injuries, the elderly, or beginners to ease into the practice of yoga.	Ideal for people with injuries, the elderly, or beginners to ease into the practice of yoga. A perfect prop for restorative work, this bolster can be used to support parts of the body into more relaxing poses. Also can be used in combination with other props or in chest opening exercises.
6	Brass Singing Bowl	9995	/images/singing-bowl.jpg	Harness the powers of sound healing with this beautiful brass singing bowl.	Harness the powers of sound healing with this beautiful brass singing bowl. Whether you lead a meditation group or want to bring sound into your own practice, this singing bowl brings meditation into another level. Can also be used by itself in the home.
7	Protective Yoga Bag	2495	/images/yoga-bag.jpg	Keep your mat looking and feeling brand new with our protective yoga bag.	Keep your mat looking and feeling brand new with our protective yoga bag. The cross-body strap makes this bag easy to carry. The durable canvas keeps your mat protected in cramped cars, smelly gym lockers and cross country moves. No matter what is going on in your life, rest easy knowing that your yoga mat is protected.
8	Energizing Mat Wash	895	/images/mat-wash.jpg	This mat wash is specifically formulated with essential oils to keep your mat clean without any harsh chemicals.	This mat wash is specifically formulated with essential oils to keep your mat clean without any harsh chemicals. The tea tree oil is used as a natural anti-bacterial to keep your mat clean. With tangerine and lemongrass essential oils, its invigorating scent will stay after multiple uses.
9	Woven Yoga Blanket	2045	/images/blanket.jpg	Made with natural fibers, this yoga blanket is the perfect addition to your meditation practice or yoga practice.	Made with natural fibers, this yoga blanket is the perfect addition to your meditation practice or yoga practice. The thin blanket can either be spread out thin to protect your yoga mat or be folded up thick to cushion your body. It also works well in combination with other props such as bolsters and blocks for a restorative experience.
10	Yoga Strap	1295	/images/yoga-strap.jpg	This yoga strap will give you the extra boost you need to get deeper into stretches and hold them for a longer period of time.	This yoga strap will give you the extra boost you need to get deeper into stretches and hold them for a longer period of time. The stainless steel buckle allows the strap to be tightened into a loop, allowing you to hold your body in positions without holding onto the strap. Also helpful for beginners that need that extra help in attaining specific poses.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 46, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 44, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 23, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

