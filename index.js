const express = require('express');
const fs = require('fs');
const app = express();

// Главная страница — открывает Windy с последними координатами
app.get('/', (req, res) => {
  try {
    const data = fs.readFileSync('gps.txt', 'utf8');
    const [lat, lon] = data.split(',');
    res.redirect(`https://www.windy.com/?\( {lat.trim()}, \){lon.trim()}`);
  } catch (err) {
    res.send('Координат пока нет. Подожди, пока роутер пришлёт данные.');
  }
});

// Сюда роутер шлёт GPS
app.get('/update', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon) {
    fs.writeFileSync('gps.txt', \( {lat}, \){lon});
    res.send('OK — координаты обновлены!');
  } else {
    res.send('Ошибка: нет lat или lon');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(Сервер работает на порту ${port});
});
