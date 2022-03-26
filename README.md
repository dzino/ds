# Приложение приема платежей

<!-- TOC -->

- [Приложение приема платежей](#%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%D0%B0-%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%B5%D0%B9)
  - [Команды](#%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B)
  - [Ссылки](#%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8)
  - [Стек](#%D1%81%D1%82%D0%B5%D0%BA)
  - [Задачи](#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8)

<!-- /TOC -->

## Команды

```bash
# Билд контейнеров
docker-compose build

# Запуск контейнеров
docker-compose up

# Проверка API
curl -X POST http://localhost:3000/api/payments -H 'Content-Type: application/json' -d '{"CardNumber": "0000000000000000", "ExpDate": "04/2022", "Cvv": "123", "Amount": 100}'

# Проверка коллекции
curl http://localhost:3000/api/payments
```

## Ссылки

- [Build and Dockerize a Full-stack React app with Node.js, MySQL and Nginx](https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/)
- [Express-Docker документация](https://nodejs.org/ru/docs/guides/nodejs-docker-webapp/)
- [React-Docker документация](https://mherman.org/blog/dockerizing-a-react-app/)
- [How to create a full stack React/Express/MongoDB app using Docker](https://medium.com/free-code-camp/create-a-fullstack-react-express-mongodb-app-using-docker-c3e3e21c4074)

## Стек

- ReactJS
- MUI
- ExpessJS
- MongoDB

```txt
data-volume ▬ ────  db ▲ ─┐                  ▬ ─ Volume
        api ▄ ────    api ▲ ──┐              ▄ ─ Бандл
     client ▄ ──── client ▲ ──┴── nginx ▲    ▲ ─ Контейнер
```

## Задачи

- [ ] Приложение должно выводить _форму с полями_:
  - [ ] Card Number
  - [ ] Expiration Date
  - [ ] CVV
  - [ ] Amount
- [ ] Валидация:
  - [ ] Card Number - (только цифры, длина значения 16)
  - [ ] Expiration Date (формат даты MM/YYYY)
  - [ ] CVV (только цифры, длина значения 3)
  - [ ] Amount (только цифры)
- [ ] Кнопка "оплатить":
  - [ ] должна быть активно если все поля введены корректно
  - [ ] при нажатии идет запрос на сервер с данными формы в формате JSON
- [x] Сервер: (**expess/featherjs**)

  - [x] должен _сохранять_ данные в **mongoDB**
  - [ ] при успешном сохранении должнен возвращать _ответ_ ID записи и Amount в формате JSON пример запроса

    ```json
    {
      "CardNumber": "0000000000000000",
      "ExpDate": "04/2022",
      "Cvv": "123",
      "Amount": 100
    }
    ```

    пример ответа

    ```json
    {
      "RequestId": "61b248040041bc64b411a691",
      "Amount": 100
    }
    ```

    (edited)
