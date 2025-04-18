PGDMP                      }         
   NexusGrade    16.1    16.1 (    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    123176 
   NexusGrade    DATABASE     �   CREATE DATABASE "NexusGrade" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "NexusGrade";
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            O           1247    123178    eaccesslevel    TYPE     W   CREATE TYPE public.eaccesslevel AS ENUM (
    'ADMIN',
    'TEACHER',
    'STUDENT'
);
    DROP TYPE public.eaccesslevel;
       public          postgres    false    4            �            1259    123224    grades    TABLE       CREATE TABLE public.grades (
    gradeid integer NOT NULL,
    date date NOT NULL,
    value integer NOT NULL,
    "subjectId" integer NOT NULL,
    "studentId" integer NOT NULL,
    CONSTRAINT grades_value_check CHECK (((value >= 1) AND (value <= 10)))
);
    DROP TABLE public.grades;
       public         heap    postgres    false    4            �            1259    123223    grades_gradeid_seq    SEQUENCE     �   CREATE SEQUENCE public.grades_gradeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.grades_gradeid_seq;
       public          postgres    false    222    4            �           0    0    grades_gradeid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.grades_gradeid_seq OWNED BY public.grades.gradeid;
          public          postgres    false    221            �            1259    123206    students    TABLE     |   CREATE TABLE public.students (
    studentid integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);
    DROP TABLE public.students;
       public         heap    postgres    false    4            �            1259    123217    subjects    TABLE     �   CREATE TABLE public.subjects (
    subjectid integer NOT NULL,
    name character varying(255) NOT NULL,
    teacherid integer
);
    DROP TABLE public.subjects;
       public         heap    postgres    false    4            �            1259    123216    subjects_subjectid_seq    SEQUENCE     �   CREATE SEQUENCE public.subjects_subjectid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.subjects_subjectid_seq;
       public          postgres    false    4    220            �           0    0    subjects_subjectid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.subjects_subjectid_seq OWNED BY public.subjects.subjectid;
          public          postgres    false    219            �            1259    123196    teachers    TABLE     |   CREATE TABLE public.teachers (
    teacherid integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);
    DROP TABLE public.teachers;
       public         heap    postgres    false    4            �            1259    123186    users    TABLE     �   CREATE TABLE public.users (
    userid integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    accesslevel public.eaccesslevel NOT NULL,
    username character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    4    847            �            1259    123185    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    4    216            �           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    215            1           2604    123227    grades gradeid    DEFAULT     p   ALTER TABLE ONLY public.grades ALTER COLUMN gradeid SET DEFAULT nextval('public.grades_gradeid_seq'::regclass);
 =   ALTER TABLE public.grades ALTER COLUMN gradeid DROP DEFAULT;
       public          postgres    false    221    222    222            0           2604    123220    subjects subjectid    DEFAULT     x   ALTER TABLE ONLY public.subjects ALTER COLUMN subjectid SET DEFAULT nextval('public.subjects_subjectid_seq'::regclass);
 A   ALTER TABLE public.subjects ALTER COLUMN subjectid DROP DEFAULT;
       public          postgres    false    219    220    220            /           2604    123189    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    123224    grades 
   TABLE DATA           P   COPY public.grades (gradeid, date, value, "subjectId", "studentId") FROM stdin;
    public          postgres    false    222   K,       �          0    123206    students 
   TABLE DATA           D   COPY public.students (studentid, first_name, last_name) FROM stdin;
    public          postgres    false    218   h,       �          0    123217    subjects 
   TABLE DATA           >   COPY public.subjects (subjectid, name, teacherid) FROM stdin;
    public          postgres    false    220   �,       �          0    123196    teachers 
   TABLE DATA           D   COPY public.teachers (teacherid, first_name, last_name) FROM stdin;
    public          postgres    false    217   �,       �          0    123186    users 
   TABLE DATA           O   COPY public.users (userid, email, password, accesslevel, username) FROM stdin;
    public          postgres    false    216   �,       �           0    0    grades_gradeid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.grades_gradeid_seq', 1, false);
          public          postgres    false    221            �           0    0    subjects_subjectid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.subjects_subjectid_seq', 1, false);
          public          postgres    false    219            �           0    0    users_userid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_userid_seq', 1, false);
          public          postgres    false    215            >           2606    123230    grades grades_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (gradeid);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pkey;
       public            postgres    false    222            :           2606    123210    students students_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (studentid);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    218            <           2606    123222    subjects subjects_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subjectid);
 @   ALTER TABLE ONLY public.subjects DROP CONSTRAINT subjects_pkey;
       public            postgres    false    220            8           2606    123200    teachers teachers_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (teacherid);
 @   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_pkey;
       public            postgres    false    217            4           2606    123195    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            6           2606    123193    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            B           2606    123245    grades studentId    FK CONSTRAINT     �   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT "studentId" FOREIGN KEY ("studentId") REFERENCES public.students(studentid) NOT VALID;
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT "studentId";
       public          postgres    false    4666    222    218            @           2606    123211     students students_studentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studentid_fkey FOREIGN KEY (studentid) REFERENCES public.users(userid);
 J   ALTER TABLE ONLY public.students DROP CONSTRAINT students_studentid_fkey;
       public          postgres    false    218    4662    216            C           2606    123240    grades subjectID    FK CONSTRAINT     �   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT "subjectID" FOREIGN KEY ("subjectId") REFERENCES public.subjects(subjectid) NOT VALID;
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT "subjectID";
       public          postgres    false    4668    222    220            A           2606    123235    subjects teacherId    FK CONSTRAINT     �   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT "teacherId" FOREIGN KEY (teacherid) REFERENCES public.teachers(teacherid) NOT VALID;
 >   ALTER TABLE ONLY public.subjects DROP CONSTRAINT "teacherId";
       public          postgres    false    4664    217    220            ?           2606    123201     teachers teachers_teacherid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_teacherid_fkey FOREIGN KEY (teacherid) REFERENCES public.users(userid);
 J   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_teacherid_fkey;
       public          postgres    false    217    216    4662            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     