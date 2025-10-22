// Node.js ile basit HTTP server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    // URL decode ve path temizleme
    let filePath = '.' + decodeURIComponent(req.url);

    // Ana dizine index.html ekle
    if (filePath === './') {
        filePath = './index.html';
    }

    // Dosya uzantısını al
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Dosyayı oku ve gönder
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // 404 - Dosya bulunamadı
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Dosya Bulunamadı</h1>', 'utf-8');
            } else {
                // 500 - Server hatası
                res.writeHead(500);
                res.end('Server Hatası: ' + error.code, 'utf-8');
            }
        } else {
            // Başarılı
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Server çalışıyor!`);
    console.log(`📱 Tarayıcıda aç: http://localhost:${PORT}`);
    console.log(`⏹️  Durdurmak için: Ctrl+C\n`);
});
