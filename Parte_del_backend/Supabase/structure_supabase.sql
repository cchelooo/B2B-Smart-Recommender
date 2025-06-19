-- SUPABASE: Project name: B2B-Smart-Recommender
-- SUPABASE: Database Password: B2B-Smart-Recommender
-- Creamos las tablas cliente, productos, historial, recomendaciones.
-- Habilitamos Row Level Security en todas las tablas


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

-- Activamos RLS
alter table client enable row level security;
alter table product enable row level security;
alter table purchase_history enable row level security;
alter table recommendation enable row level security;

-- Políticas RLS básicas (puedes editarlas luego)

-- CLIENT
create policy "allow read client" on client for select using (true);
create policy "allow insert client" on client for insert with check (true);
create policy "allow update client" on client for update using (auth.uid() = id_user);

-- PRODUCT
create policy "allow read product" on product for select using (true);
create policy "allow insert product" on product for insert with check (true);
create policy "allow update product" on product for update using (true);

-- PURCHASE_HISTORY
create policy "allow read history" on purchase_history for select using (auth.uid() = id_user);
create policy "allow insert history" on purchase_history for insert with check (auth.uid() = id_user);

-- RECOMMENDATION
create policy "allow read recommendation" on recommendation for select using (auth.uid() = id_user);
create policy "allow insert recommendation" on recommendation for insert with check (auth.uid() = id_user);
create policy "allow update recommendation" on recommendation for update using (auth.uid() = id_user);