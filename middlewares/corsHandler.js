const allowedCors = [
  'http://lehus.movies.nomoredomainsmonster.ru',
  'https://lehus.movies.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
  'http://localhost:5173',
  'https://localhost:5173',
  'http://127.0.0.1:5173',
  'https://127.0.0.1:5173',
  'http://51.250.5.154',
  'https://51.250.5.154',
];

const cors = (req, res, next) => {
  // Сохранаяем origin запроса в переменную origin
  const { origin } = req.headers;
  // Сохранаяем метод(тип) запроса в переменную method
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  // Проверяем, что origin есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // Если это так, устанавливаем заголовок и останавливаем middleware
    res.header('Access-Control-Allow-Origin', origin);
  }
  // Если предварительный запрос OPTIONS - добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем CORS запросы людых типов
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем CORS запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // Возвращаем результат запроса
    return res.end();
  }
  return next();
};

module.exports = cors;
