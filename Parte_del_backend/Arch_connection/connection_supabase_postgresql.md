# 🔗 Conexión Supabase y PostgreSQL

Recomendaciónes de como implementar y usar estos backend. Es un borrador 
## Supabase

Puedes usar Supabase JS o la URL/API de Supabase para conectarte. Ejemplo en JS:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://<tu-proyecto>.supabase.co'
const supabaseKey = '<clave-anon-o-service-role>'
const supabase = createClient(supabaseUrl, supabaseKey)
```
PostgreSQL local
Si es PostgreSQL puro:
```js
import { Pool } from 'pg'

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'nombre_bd',
  password: 'admin123',
  port: 5432,
})
```
También puedes usar psql en terminal:
```
psql -U admin -d nombre_bd

```

---

## 🚀 Propuestas de mejora (Triggers, etc.)

### ¿Es necesario un **trigger**?
No obligatorio, pero podrías usar **triggers** en estos casos:

1. **Actualizar recomendaciones automáticamente** tras una compra:
```sql
-- Pseudocódigo:
create function auto_recommendation() returns trigger as $$
begin
  insert into recommendation (id_user, id_product, score)
  values (NEW.id_user, NEW.id_product, 0.5);
  return NEW;
end;
$$ language plpgsql;

create trigger trg_auto_recommend
after insert on purchase_history
for each row
execute procedure auto_recommendation();
```
## ¿Qué más puedes integrar?
- Tabla de reviews (reseñas del producto)
- Tabla wishlist para productos favoritos
- Tabla sector_stats (con resumen por sector útil para dashboards)
- Integración con Google Calendar para programar compras o promociones
- Histórico de cambios (tabla audit_log)
- API con autenticación para los clientes