const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine: handlebars } = require('express-handlebars');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { createCA, createCert } = require('mkcert');
const db = require('./config/db');

//connect to database
db.connect();

const route = require('./routes');

const app = express();
const port = 3000;

async function generateCertificates() {
    const certDir = path.resolve(__dirname, '../public/https/cert');

    // Kiểm tra và tạo các thư mục nếu chưa tồn tại
    if (!fs.existsSync(certDir)) {
        fs.mkdirSync(certDir, { recursive: true });
        console.log(`Directory created: ${certDir}`);
    } else {
        console.log(`Directory already exists: ${certDir}`);
    }

    // Tạo Certificate Authority (CA)
    const ca = await createCA({
        organization: '',
        countryCode: '',
        state: '',
        locality: '',
        validity: 365,
    });

    // Tạo chứng chỉ cho localhost và 127.0.0.1
    const cert = await createCert({
        ca: { key: ca.key, cert: ca.cert },
        domains: ['127.0.0.1', 'localhost'],
        validity: 365,
    });

    // Lưu chứng chỉ và khóa vào file
    try {
        fs.writeFileSync(path.join(certDir, 'ca.key'), ca.key);
        fs.writeFileSync(path.join(certDir, 'ca.crt'), ca.cert);
        fs.writeFileSync(path.join(certDir, 'cert.key'), cert.key);
        fs.writeFileSync(path.join(certDir, 'cert.crt'), cert.cert);
        console.log('Certificates created and saved to the cert folder.');
    } catch (err) {
        console.error('Error writing files:', err);
    }
}

async function startServer() {
    // Chạy hàm tạo chứng chỉ trước khi khởi động server
    await generateCertificates();

    // Kiểm tra các tệp chứng chỉ đã được tạo
    const keyPath = path.join(__dirname, '../public/https/cert/cert.key');
    const certPath = path.join(__dirname, '../public/https/cert/cert.crt');

    console.log('Key file path:', keyPath);
    console.log('Cert file path:', certPath);

    console.log('Key file exists:', fs.existsSync(keyPath));
    console.log('Cert file exists:', fs.existsSync(certPath));

    // Đọc chứng chỉ và khóa
    const options = {
        key: fs.readFileSync(
            path.join(__dirname, '../public/https/cert/cert.key'),
        ),
        cert: fs.readFileSync(
            path.join(__dirname, '../public/https/cert/cert.crt'),
        ),
    };

    // HTTP logger: dùng morgan để in lỗi ra
    app.use(morgan('combined'));

    // Templates engine: dùng templates engine để có .hbs
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, 'resources', 'views'));

    // Middleware để xử lý các request
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Route init
    route(app);

    // Khởi động server HTTPS
    http.createServer(options, app).listen(port, '0.0.0.0', () => {
        console.log(`App listening on port ${port}`);
    });
}

// Chạy server
startServer().catch((err) => {
    console.error('Error starting server:', err);
});
