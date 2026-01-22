const express = require('express');
const fs = require('fs');
const app = express();

// Главная страница — редирект на Windy с координатами
app.get('/', (req, res) => {
  try {
    const data = fs.readFileSync('gps.txt', 'utf8').trim();
    const [lat, lon] = data.split(',').map(part => part.trim());
    const windyUrl = `https://www.windy.com/?\( {lat}, \){lon}`;
    res.redirect(windyUrl);
  } catch (err) {
    res.send('Координат пока нет. Роутер должен прислать данные (проверь GPS и HTTP настройки).');
  }
});


// Приём координат от роутера
app.get('/update', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon) {
    const cleanedLat = lat.trim();
    const cleanedLon = lon.trim();
    fs.writeFileSync('gps.txt', `\( {cleanedLat}, \){cleanedLon}`);
    res.send(`OK — сохранены координаты: ${cleanedLat}, ${cleanedLon}`);
  } else {
    res.send('Ошибка: параметры lat и/или lon отсутствуют');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {

  console.log(`Сервер запущен на порту ${port}`);
});
