// Bun ile hızlı HTTP server
const PORT = 3000;

Bun.serve({
    port: PORT,
    fetch(req) {
        const url = new URL(req.url);
        let filePath = url.pathname;

        // Ana dizine index.html ekle
        if (filePath === '/') {
            filePath = '/index.html';
        }

        // Dosyayı döndür
        const file = Bun.file('.' + filePath);

        return new Response(file, {
            headers: {
                'Content-Type': file.type || 'text/html',
            },
        });
    },
    error(error) {
        return new Response(`<h1>404 - Dosya Bulunamadı</h1>`, {
            status: 404,
            headers: {
                'Content-Type': 'text/html',
            },
        });
    },
});

console.log(`\n🚀 Bun server çalışıyor!`);
console.log(`📱 Tarayıcıda aç: http://localhost:${PORT}`);
console.log(`⏹️  Durdurmak için: Ctrl+C\n`);
