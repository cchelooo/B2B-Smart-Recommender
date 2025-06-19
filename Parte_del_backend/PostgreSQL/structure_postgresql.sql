
-- POSTGRESQL
-- Creacion de tablas, Permisos y roles.

-- Roles
create role cliente login password 'cliente123';
create role administrador login password 'admin123';

-- Tablas

create table client (
  id_user uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  sector text
);

create table product (
  id_product uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  price numeric not null
);

create table purchase_history (
  id_history uuid primary key default gen_random_uuid(),
  id_user uuid references client(id_user),
  id_product uuid references product(id_product),
  quantity integer not null,
  date_time timestamp default now()
);

create table recommendation (
  id_r uuid primary key default gen_random_uuid(),
  id_user uuid references client(id_user),
  id_product uuid references product(id_product),
  score numeric
);

-- Permisos

-- Permitir a cliente leer e insertar en history y recommendation
grant select, insert on purchase_history, recommendation to cliente;

-- Permitir a cliente leer productos
grant select on product to cliente;

-- Permitir a admin todo
grant all privileges on all tables in schema public to administrador;
