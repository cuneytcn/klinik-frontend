# 🚀 Deployment Kurulum Rehberi

## GitHub'a Push Ettikten Sonra Yapılması Gerekenler

### 1. Hosting Platform Environment Variables

Projenizi hangi platformda host edeceğinize göre environment variables'ları ayarlamanız gerekiyor:

#### **Vercel için:**

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. Settings > Environment Variables
4. Şu değişkenleri ekleyin:
   - `VITE_SUPABASE_URL`: `https://wyfyyojmwxposdnyzjtb.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Znl5b2ptd3hwb3Nkbnl6anRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjAwMjMsImV4cCI6MjA2OTg5NjAyM30.6ojgfLNIpXMg4YDUSBrMDwhM2rxoQicXC0YDZ4zPGcE`

#### **Netlify için:**

1. Netlify Dashboard'a gidin
2. Site Settings > Environment Variables
3. Yukarıdaki değişkenleri ekleyin

#### **GitHub Pages için:**

GitHub Pages static hosting olduğu için environment variables desteklemez. Bu durumda:

1. Build sırasında değişkenleri hardcode etmeniz gerekir
2. Veya başka bir hosting platformu tercih edin

### 2. Supabase Database Kurulumu

Projenizin çalışması için Supabase'de `appointments` ve `contacts` tablolarının olması gerekiyor.

#### Appointments Tablosu:

```sql
CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  owner_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address TEXT,
  pet_name VARCHAR(50) NOT NULL,
  pet_type VARCHAR(30) NOT NULL,
  pet_breed VARCHAR(50),
  pet_age INTEGER,
  service VARCHAR(100) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  notes TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Contacts Tablosu (İletişim Formu):

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. RLS (Row Level Security) Ayarları

Güvenlik için RLS'yi aktif edin:

```sql
-- Appointments tablosu için RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Herkesin insert edebilmesi için policy
CREATE POLICY "Allow public insert" ON appointments
FOR INSERT TO public
WITH CHECK (true);

-- Contacts tablosu için RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Herkesin insert edebilmesi için policy
CREATE POLICY "Allow public insert" ON contacts
FOR INSERT TO public
WITH CHECK (true);
```

### 4. Test Etme

Deploy ettikten sonra:

1. Randevu formunu test edin
2. İletişim formunu test edin
3. Browser console'da hata olup olmadığını kontrol edin

### 5. Domain Ayarları (Opsiyonel)

Eğer custom domain kullanacaksanız:

1. Hosting platformunda domain'i ekleyin
2. SSL sertifikası otomatik oluşturulacak
3. Supabase'de domain'i authorized origins'e ekleyin

## ⚠️ Önemli Notlar

- Environment variables production'da mutlaka ayarlanmalı
- Supabase key'ler public olduğu için güvenli
- RLS politikaları ile database güvenliğini sağlayın
- Form gönderimlerini test etmeyi unutmayın
