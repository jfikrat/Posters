// Ana JavaScript dosyası

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log('Instagram Poster Templates yüklendi!');

    // Version dropdown listener
    const versionDropdown = document.getElementById('versionDropdown');
    if (versionDropdown) {
        // LocalStorage'dan kaydedilmiş versiyonu yükle
        const savedVersion = localStorage.getItem('selectedVersion');
        if (savedVersion) {
            versionDropdown.value = savedVersion;
        }

        versionDropdown.addEventListener('change', function() {
            const selectedVersion = this.value;
            localStorage.setItem('selectedVersion', selectedVersion);
            console.log('Seçili versiyon:', selectedVersion);

            // Version değiştiğinde bildirim göster
            showNotification(`${this.options[this.selectedIndex].text} seçildi`);
        });
    }
});

// Bildirim gösterme fonksiyonu
function showNotification(message) {
    // Mevcut bildirimi kaldır
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animasyon için bir miktar bekle
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mevcut görünümü PNG olarak kaydet
async function saveCurrentView() {
    // Ana container'ı al
    const container = document.querySelector('.container');

    if (!container) {
        alert('Kaydedilecek içerik bulunamadı!');
        return;
    }

    // html2canvas kütüphanesi yüklü mü kontrol et
    if (typeof html2canvas === 'undefined') {
        alert('PNG kaydetme özelliği için html2canvas kütüphanesi gereklidir.\nSayfa yeniden yükleniyor...');
        location.reload();
        return;
    }

    try {
        showNotification('PNG hazırlanıyor...');

        // Canvas'a dönüştür
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#fafafa'
        });

        // PNG olarak indir
        const link = document.createElement('a');
        const version = localStorage.getItem('selectedVersion') || 'v1';
        link.download = `instagram-templates-${version}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        showNotification('PNG başarıyla kaydedildi!');
        console.log('Sayfa PNG olarak kaydedildi');
    } catch (error) {
        console.error('Kaydetme hatası:', error);
        alert('PNG kaydedilirken bir hata oluştu.');
    }
}

// Resim önizleme fonksiyonu
function previewImage(input, targetId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const target = document.getElementById(targetId);
            if (target) {
                target.src = e.target.result;
                target.style.display = 'block';
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Metin güncelleme fonksiyonu
function updateText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

// Renk değiştirme fonksiyonu
function changeColor(elementId, color) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.color = color;
    }
}

// Arka plan rengi değiştirme
function changeBackground(elementId, color) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.background = color;
    }
}
