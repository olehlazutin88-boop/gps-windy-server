
const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

let currentLat = null;
let currentLon = null;

// Новый маршрут для обновления координат от Teltonika
app.get('/update', (req, res) => {
    const lat = req.query.lat;  // Берёт lat из URL (?lat=...)
    const lon = req.query.lon;  // Берёт lon из URL (?lon=...)

    if (lat && lon) {
        currentLat = parseFloat(lat);  // Сохраняет широту как число
        currentLon = parseFloat(lon);  // Сохраняет долготу как число
        console.log(`Обновлены 

координаты: lat=\( {currentLat}, lon= \){currentLon}`);  // Пишет в логи для проверки
        res.send('Координаты обновлены успешно!');  // Ответ Teltonika, чтобы считалось успешным
    } else {
        res.send('Ошибка: нет lat или lon в запросе.');  // Если параметры не пришли
    }
});

// Главная страница
app.get('/', (req, res) => {
    if (currentLat !== null && currentLon !== null) {
        res.redirect(`https://www.windy.com/\( {currentLat}, \){currentLon}?\( {currentLat}, \){currentLon},8`);  // Перенаправляет на Windy с зумом 8
    } else {

        res.send('Координат пока нет. Роутер должен прислать данные (проверь GPS и HTTP настройки).');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
