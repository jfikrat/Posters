# Instagram Poster Templates

HTML ve CSS kullanarak oluşturulmuş profesyonel Instagram paylaşım şablonları. Canva tarzı tasarımlar yapmak için hazır framework.

## Özellikler

- 📱 Instagram standart boyutu (1080x1080px)
- 🎨 Hazır gradient renk paletleri
- 📥 PNG olarak indirme özelliği
- 📱 Responsive tasarım
- ✨ Kolay özelleştirilebilir
- 🚀 Hızlı ve hafif

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd Posters
```

2. Local server başlatın (önerilen):
```bash
# Seçenek 1: Node.js
npm run start

# Seçenek 2: Bun (en hızlı)
npm run dev

# Seçenek 3: Python
npm run serve
```

3. Tarayıcıda açın:
- http://localhost:8000 adresine gidin
- Örnek şablonları görmek için linklere tıklayın

**Alternatif:** `index.html` dosyasını doğrudan tarayıcıda da açabilirsiniz (çift tıklayın)

## Kullanım

### Yeni Şablon Oluşturma

1. `templates/base-template.html` dosyasını kopyalayın
2. `examples/` klasörüne yeni bir isimle kaydedin
3. İçeriği özelleştirin:
   - Başlık ve açıklama metinlerini değiştirin
   - Gradient sınıflarını kullanın veya kendi renk paletinizi ekleyin
   - Resimleri `assets/images/` klasörüne ekleyin

### Gradient Renk Paletleri

Hazır gradient sınıfları (`css/poster.css`):
- `.gradient-purple` - Mor tonları
- `.gradient-orange` - Turuncu/Pembe
- `.gradient-blue` - Mavi tonları
- `.gradient-green` - Yeşil tonları
- `.gradient-sunset` - Gün batımı
- `.gradient-instagram` - Instagram renkleri

### Resim Ekleme

```html
<div class="instagram-post">
    <img src="../assets/images/your-image.jpg" class="background-image" alt="">
    <div class="overlay"></div>
    <div class="content text-white">
        <!-- İçerik buraya -->
    </div>
</div>
```

### İndirme

Her şablon sayfasında sağ alt köşede "Download PNG" butonu bulunur. Butona tıklayarak tasarımı 1080x1080px PNG olarak indirebilirsiniz.

## Proje Yapısı

```
Posters/
├── index.html              # Ana sayfa
├── package.json            # npm scripts ve proje bilgileri
├── server.js               # Node.js development server
├── server-bun.js           # Bun development server
├── css/
│   ├── main.css           # Genel stiller
│   └── poster.css         # Poster stilleri
├── js/
│   ├── main.js            # Ana JavaScript
│   └── download.js        # İndirme fonksiyonları
├── templates/
│   └── base-template.html # Temel şablon
├── examples/
│   ├── template1.html     # Örnek 1
│   ├── template2.html     # Örnek 2
│   └── template3.html     # Örnek 3
└── assets/
    ├── images/            # Resim dosyaları
    └── fonts/             # Font dosyaları
```

## Development Server

Proje 3 farklı server seçeneği sunar:

### Node.js Server
```bash
node server.js
# veya
npm run start
```

### Bun Server (En Hızlı)
```bash
bun run server-bun.js
# veya
npm run dev
```

### Python Server
```bash
python3 -m http.server 8000
# veya
npm run serve
```

Tüm serverlar **http://localhost:8000** adresinde çalışır.

## Tarayıcıda Görüntüleme

**Seçenek 1 (Önerilen):** Local server başlatın
```bash
npm run start
```
Ardından http://localhost:8000 adresine gidin

**Seçenek 2:** Dosyayı doğrudan açın
- HTML dosyasına çift tıklayın
- Veya sağ tıklayıp "Open with Browser" seçin

## Özelleştirme İpuçları

- Farklı font'lar için Google Fonts kullanın
- Kendi gradient'lerinizi `poster.css` dosyasına ekleyin
- Animasyonlar eklemek için CSS transitions kullanın
- Responsive boyutlar otomatik ayarlanır

## Lisans

Bu proje açık kaynaklıdır ve özgürce kullanılabilir.
