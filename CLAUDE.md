# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proje Hakkında

Bu proje, HTML ve CSS kullanarak Instagram paylaşımları için Canva tarzı poster şablonları oluşturmaya yönelik bir framework'tür. Instagram'ın standart kare formatını (1080x1080px) kullanarak profesyonel görünümlü tasarımlar yapılmasını sağlar.

## Temel Komutlar

### Geliştirme

Proje statik HTML/CSS/JS dosyalarından oluştuğu için build/compile işlemine gerek yoktur. İki kullanım yöntemi:

**1. Doğrudan Tarayıcıda Açma:**
```bash
# Ana sayfayı aç (index.html)
# Çift tıklayın veya tarayıcıda açın

# Belirli bir şablonu test et
# examples/ klasöründeki herhangi bir HTML dosyasını açın
```

**2. Local Development Server (Önerilen):**

Dış kaynaklı resimleri test etmek ve CORS sorunlarını önlemek için local server kullanın.

### Local Server Başlatma

Sistem Python, Node.js ve Bun ile birlikte gelir. İstediğiniz birini kullanın:

#### npm Scripts ile (Hızlı)
```bash
npm run start      # Node.js server (http://localhost:8000)
npm run dev        # Bun server (en hızlı)
npm run serve      # Python server
```

#### Manuel Başlatma

**Node.js ile:**
```bash
node server.js
# → http://localhost:8000
```

**Bun ile (En Hızlı):**
```bash
bun run server-bun.js
# → http://localhost:8000
```

**Python ile (Basit):**
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Tüm serverlar port 8000'de çalışır. Durdurmak için: `Ctrl+C`

## Mimari ve Yapı

### Dosya Organizasyonu

```
/
├── index.html              # Ana giriş sayfası - tüm şablon gallerisi
├── css/
│   ├── main.css           # Galeri ve genel UI stilleri
│   └── poster.css         # Instagram poster stilleri, gradient'ler, layout
├── js/
│   ├── main.js            # Genel yardımcı fonksiyonlar (text/color update)
│   └── download.js        # html2canvas ile PNG indirme fonksiyonu
├── templates/
│   └── base-template.html # YENİ şablon oluştururken kopyalanacak temel dosya
├── examples/              # Hazır örnek şablonlar
│   ├── template1.html     # Modern & Minimal
│   ├── template2.html     # Colorful & Bold
│   ├── template3.html     # Elegant & Professional
│   └── kant-parka-v1.html # Kant Parka ürün tanıtım posteri
└── assets/
    ├── references/        # **YENİ** Tasarım ilhamı için referans görseller
    ├── logos/             # **YENİ** Marka logoları (Kant, Delta Plus, vb.)
    ├── products/          # **YENİ** Ürün fotoğrafları
    ├── images/            # Genel kullanım ve arka plan görselleri
    └── fonts/             # Özel fontlar (isteğe bağlı)
```

### Temel Tasarım Prensipleri

#### 1. Instagram Boyut Standardı
- Tüm posterler **1080x1080px** kare formatında
- `.instagram-post` sınıfı bu boyutu tanımlar
- Responsive: 1100px altında 540x540px, 600px altında viewport'a göre küçülür

#### 2. Gradient Sistemi
`poster.css` dosyasında hazır gradient sınıfları:
- `.gradient-purple` - Mor-lavanta tonları (#667eea → #764ba2)
- `.gradient-orange` - Pembe-kırmızı (#f093fb → #f5576c)
- `.gradient-blue` - Açık mavi tonları (#4facfe → #00f2fe)
- `.gradient-green` - Yeşil-turkuaz (#43e97b → #38f9d7)
- `.gradient-sunset` - Pembe-sarı gün batımı (#fa709a → #fee140)
- `.gradient-instagram` - Instagram logo gradient (radial)

#### 3. İçerik Katmanları
Her poster şu katman yapısını kullanır:
```html
<div class="instagram-post">
    <!-- KATMAN 1: Arka plan resmi (opsiyonel) -->
    <img class="background-image" src="..." />

    <!-- KATMAN 2: Overlay (opsiyonel, resim üzerine koyu ton) -->
    <div class="overlay"></div>

    <!-- KATMAN 3: İçerik (text, elementler) -->
    <div class="content">
        <!-- Başlık, açıklama, iconlar vb. -->
    </div>
</div>
```

### Tasarım Workflow'u (Claude İçin)

**ÖNEMLI:** Yeni bir poster tasarımı yaparken aşağıdaki adımları takip et:

#### 1. Referans Görselleri İncele
```bash
# Kullanıcı referans fotoğraflarını assets/references/ klasörüne koyacak
# Read tool ile bu görselleri görüntüle ve tasarım stilini analiz et
```

**Nelere dikkat etmelisin:**
- Renk paleti (gradient'ler, ana renkler)
- Tipografi (font boyutları, ağırlıkları, hiyerarşi)
- Layout kompozisyonu (elementlerin yerleşimi)
- İkon ve grafik kullanımı
- Boşluk (whitespace) kullanımı
- Genel tasarım stili (modern, minimal, bold, vb.)

#### 2. Logo ve Ürün Fotoğraflarını Kullan
- **Logo:** `assets/logos/` klasöründen uygun logoyu seç
- **Ürün:** `assets/products/` klasöründen ürün fotoğrafını kullan
- Görsellerin yolunu doğru belirt: `../assets/logos/logo.png`

#### 3. Tasarım İlkelerini Uygula
- Referans görsellerden aldığın ilhamı kullan
- Instagram standartlarına uy (1080x1080px)
- Lucide Icons kullan (emoji yerine profesyonel SVG ikonlar)
- Web sitesi URL'sini büyük ve belirgin yap (Instagram'da buton çalışmaz)
- İndirim badge'lerini vurgulamaya özen göster

#### 4. Test ve Export
- Tarayıcıda önizle
- "Download PNG" ile test et
- PNG'nin doğru render olduğundan emin ol

### Yeni Şablon Oluşturma Workflow'u

1. **Temel şablonu kopyala:**
   ```bash
   cp templates/base-template.html examples/yeni-tasarim.html
   ```

2. **HTML yapısını özelleştir:**
   - `.instagram-post` div'ine bir gradient sınıfı ekle VEYA inline style ile background tanımla
   - `.content` içine başlık, açıklama, emoji, ikon ekle
   - Resim kullanılacaksa `<img class="background-image">` ekle

3. **CSS stilleri ekle:**
   - Özel stiller için `<style>` bloğu kullan (template3.html'deki gibi)
   - VEYA yeni bir CSS dosyası oluşturup link et
   - Font boyutları: `.title` için 4-6rem, `.description` için 2-2.5rem önerilir

4. **İndirme fonksiyonunu test et:**
   - html2canvas kütüphanesi yüklenmiş olmalı (CDN linki mevcut)
   - "Download PNG" butonuna tıklayarak test et

### Resim Ekleme

Kullanıcı resimleri `assets/images/` klasörüne eklenir:

```html
<!-- Arka plan resmi -->
<img src="../assets/images/foto.jpg" class="background-image" alt="">

<!-- Overlay ile (resmin üzerine koyu ton) -->
<div class="instagram-post">
    <img src="../assets/images/foto.jpg" class="background-image" alt="">
    <div class="overlay"></div> <!-- opacity: 0.4 siyah overlay -->
    <div class="content text-white">...</div>
</div>
```

### Download Mekanizması

`download.js` dosyası html2canvas kütüphanesini kullanır:
- `.instagram-post` div'i canvas'a dönüştürülür
- `scale: 2` ile yüksek çözünürlük sağlanır
- PNG olarak timestamp ile indirilir

**Önemli:** html2canvas CDN linki her şablon sayfasında olmalı:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

### CSS Yardımcı Sınıflar

Hızlı kullanım için hazır utility sınıfları (`poster.css`):
- `.text-white` - Beyaz metin
- `.text-center` - Ortalanmış metin
- `.flex-center` - Flex ile ortalama

## Geliştirme Notları

### Lucide Icons Kullanımı

**ÖNEMLI:** Emoji yerine Lucide Icons kullan (daha profesyonel ve SVG tabanlı)

1. **CDN Ekle:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
```

2. **Icon Kullan:**
```html
<i data-lucide="droplets" class="feature-icon"></i>
<i data-lucide="zap" class="feature-icon"></i>
<i data-lucide="layers" class="feature-icon"></i>
```

3. **Initialize Et:**
```html
<script>
    lucide.createIcons();
</script>
```

4. **Popüler İkonlar:**
- `droplets` - Su geçirmezlik
- `zap` - Enerji, reflektör
- `shield` - Koruma, güvenlik
- `layers` - Katman, çok parçalı
- `sun` - Güneş, ışık
- `wind` - Hava geçirgenlik
- `thermometer` - Sıcaklık
- Tüm ikonlar: [lucide.dev/icons](https://lucide.dev/icons)

### Yeni Gradient Ekleme

`css/poster.css` dosyasına yeni gradient eklemek için:

```css
.gradient-isim {
    background: linear-gradient(135deg, #renk1 0%, #renk2 100%);
}
```

### Font Değiştirme

Özel font kullanmak için Google Fonts:

```html
<head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
        .title { font-family: 'Poppins', sans-serif; }
    </style>
</head>
```

### Animasyon Ekleme

CSS transitions/animations kullanarak:

```css
.title {
    animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## Kullanıcı İş Akışı

1. Kullanıcı fotoğrafları `assets/images/` klasörüne ekler
2. Yeni şablon oluşturur veya mevcut birini kopyalar
3. HTML içeriğini özelleştirir (başlık, renk, resim yolu)
4. Tarayıcıda açıp önizler
5. "Download PNG" ile 1080x1080px PNG indirir
6. Instagram'da paylaşır

## Dikkat Edilmesi Gerekenler

- **Boyut:** Tüm posterler mutlaka 1080x1080px olmalı (`.instagram-post` sınıfını değiştirmeyin)
- **Responsive:** Mobil önizleme için boyutlar otomatik küçülür, ama indirilen PNG her zaman 1080x1080px
- **CORS:** Dış URL'lerden resim kullanılıyorsa, html2canvas CORS hatası verebilir - lokal dosya kullanımı tercih edilmeli
- **Font Boyutları:** Başlıklar 4-6rem, açıklamalar 2-2.5rem aralığında okunabilir
- **Renk Kontrast:** Arka plan gradient'i ile metin arasında yeterli kontrast olmalı (`.text-white` + koyu gradient veya tersi)

## Ortak Hatalar ve Çözümler

### Download butonu çalışmıyor
- html2canvas CDN linki eklenmiş mi kontrol et
- Console'da hata var mı kontrol et
- CORS hatası varsa resimleri lokal kullan

### PNG indirmede içerik kesilmiş veya yanlış görünüyor
- **Sorun:** download.js responsive breakpoint'leri bypass ediyor mu?
- **Çözüm:** download.js'te poster geçici olarak 1080x1080'e zorlanıyor
- Lucide icons render edilmiyor mu? `lucide.createIcons()` çağrısı var mı?
- `scrollY` ve `scrollX` ayarları eklenmiş mi?

### Lucide icons PNG'de görünmüyor
- Download fonksiyonlarında `lucide.createIcons()` çağrısı eklenmiş mi?
- `foreignObjectRendering: false` ayarı var mı?
- 200ms bekleme süresi yeterli mi?

### Responsive görünüm bozuk
- `poster.css` dosyasındaki media query'leri kontrol et
- `viewport` meta tag'i var mı kontrol et

### Metin taşıyor
- Font boyutlarını küçült
- `.content` padding'ini ayarla
- `line-height` değerini kontrol et

### Ürün fotoğrafı yuvarlatılmış kenarlarla görünmüyor
- Container'a `overflow: hidden` ve `border-radius` eklenmiş mi?
- Image'a değil, container'a border-radius uygulanmalı

## İleride Eklenebilecek Özellikler

Proje genişletilmek istenirse:
- Dinamik metin/renk editörü (JavaScript ile)
- Daha fazla hazır şablon kategorisi
- Video/GIF desteği
- Multi-page (karusel) Instagram post desteği
- Template galerisi için filtreleme sistemi
