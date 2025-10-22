// Poster indirme fonksiyonları

// Yardımcı fonksiyon: Canvas oluştur
async function createCanvas() {
    const poster = document.querySelector('.instagram-post');

    if (!poster) {
        alert('Poster bulunamadı!');
        return null;
    }

    // html2canvas kütüphanesi yüklü mü kontrol et
    if (typeof html2canvas === 'undefined') {
        alert('Download özelliği için html2canvas kütüphanesi gereklidir.\nindex.html dosyasına şu satırı ekleyin:\n<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>');
        return null;
    }

    // Orijinal stilleri sakla
    const originalWidth = poster.style.width;
    const originalHeight = poster.style.height;

    try {
        // Posteri geçici olarak tam boyuta zorla (responsive breakpoint'leri atla)
        poster.style.width = '1080px';
        poster.style.height = '1080px';

        // SVG ve font yüklenmesi için kısa bekleme
        await new Promise(resolve => setTimeout(resolve, 200));

        const canvas = await html2canvas(poster, {
            scale: 2, // Yüksek kalite için 2x scale (2160x2160 output)
            useCORS: true, // Dış kaynaklı resimler için
            allowTaint: true,
            backgroundColor: null,
            logging: false, // Debug için true yapılabilir
            imageTimeout: 0,
            foreignObjectRendering: false, // SVG render sorunlarını önler
            scrollY: -window.scrollY,
            scrollX: -window.scrollX
        });

        // Orijinal stillere geri dön
        poster.style.width = originalWidth;
        poster.style.height = originalHeight;

        return canvas;
    } catch (error) {
        // Hata durumunda da orijinal stillere dön
        poster.style.width = originalWidth;
        poster.style.height = originalHeight;

        console.error('Canvas oluşturma hatası:', error);
        alert('Poster oluşturulurken bir hata oluştu.');
        return null;
    }
}

// Sadece PNG indir
async function downloadPosterPNG() {
    // Lucide icons'ı yeniden render et
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const canvas = await createCanvas();
    if (!canvas) return;

    const timestamp = Date.now();
    const link = document.createElement('a');
    link.download = `instagram-post-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    console.log('Poster PNG olarak başarıyla indirildi!');
}

// Sadece JPEG indir
async function downloadPosterJPEG() {
    // Lucide icons'ı yeniden render et
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const canvas = await createCanvas();
    if (!canvas) return;

    const timestamp = Date.now();
    const link = document.createElement('a');
    link.download = `instagram-post-${timestamp}.jpeg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();

    console.log('Poster JPEG olarak başarıyla indirildi!');
}

// Panoya kopyala (Copy to Clipboard)
async function copyPosterToClipboard() {
    // Lucide icons'ı yeniden render et
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const canvas = await createCanvas();
    if (!canvas) return;

    try {
        // Canvas'ı blob'a çevir
        canvas.toBlob(async (blob) => {
            if (!blob) {
                alert('Resim oluşturulamadı!');
                return;
            }

            // Clipboard API ile kopyala
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                alert('✓ Poster panoya kopyalandı!\n\nInstagram\'a veya başka bir uygulamaya yapıştırabilirsiniz (Ctrl+V / Cmd+V)');
                console.log('Poster başarıyla panoya kopyalandı!');
            } catch (clipboardError) {
                console.error('Panoya kopyalama hatası:', clipboardError);
                alert('Panoya kopyalama başarısız oldu.\n\nTarayıcınız bu özelliği desteklemiyor olabilir.\nLütfen PNG veya JPEG olarak indirin.');
            }
        }, 'image/png');
    } catch (error) {
        console.error('Clipboard hatası:', error);
        alert('Panoya kopyalama sırasında bir hata oluştu.');
    }
}

// Geriye dönük uyumluluk için (eski downloadPoster fonksiyonu)
async function downloadPoster() {
    await downloadPosterPNG();
}

// Manuel screenshot alma alternatifi (html2canvas olmadan)
function manualDownloadInstructions() {
    alert('Manuel İndirme:\n\n1. Posterin ekran görüntüsünü alın\n2. Bir görüntü düzenleme programında açın\n3. 1080x1080 piksel olarak kırpın\n4. PNG olarak kaydedin');
}
