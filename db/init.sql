--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

-- CREATE ROLE postgres;
-- ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:yt6IQrs7ZQm12g70IqDv4A==$HJ2uBAQ5vCxXCk9JYZrAunF/YOkttIZuKMRheab2k+s=:o8yT0mL1fCNkKrWsUEYeDDcViJfVyJImdD7VhtxBDEQ=';
CREATE ROLE task_api;
ALTER ROLE task_api WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:IjAA4dCGgWDQeRm6KB9Phg==$AcxAaS3OpmHK18X11O4sjr4iSWBlOSXsASPhFImqsq0=:t+GiQVsAz4XIXJFZrGG7VmQqNLjChuQdwwkM2OGe/xo=';
CREATE ROLE task_writer;
ALTER ROLE task_writer WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:2Tnrg8ccwrfg1kCGOL/lBw==$S/5OKCExA/F/4SMHnRJU1iBmP5fBGcdKD8nClFgNzv0=:OfSznL3gNvAFqq9xUefnNrr6iGawZupa2Sf1Ld3cv2Y=';

--
-- User Configurations
--


--
-- Role memberships
--

GRANT task_writer TO task_api WITH INHERIT TRUE GRANTED BY postgres;






--
-- Databases
--

--
-- Database "tasks" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

--
-- Name: tasks; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tasks_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';


ALTER DATABASE tasks_db OWNER TO postgres;

\connect tasks_db

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

--
-- Name: task; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task AS (
	id uuid,
	name character varying(255),
	sort_order integer
);


ALTER TYPE public.task OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    sortorder integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: DATABASE tasks; Type: ACL; Schema: -; Owner: postgres
--

GRANT CONNECT ON DATABASE tasks_db TO task_writer;


--
-- Name: TABLE tasks; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.tasks TO task_writer;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

