# movies-explorer-api
Веб-приложение, в котором можно найти фильмы по запросу и сохранить в личном кабинете.
Аутентификация пользователей и добавление фильмов.

Роуты приложения:
- GET /users/me — возвращает информацию о пользователе (email и имя)
- PATCH /users/me — обновляет информацию о пользователе (email и имя)
- GET /movies — возвращает все сохранённые текущим пользователем фильмы
- POST /movies — создает фильм с переданными данными {country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId}
- DELETE /movies/:cardId — удаляет фильм по _id

Домен с API сервисом:
https://api.diploma.ann-bolkunova.nomoredomains.club
