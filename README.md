# 🌍 SJ-AIRLINES
SJAirlines : Your best friend for travel, you will have such an interaction to be able to better organize your travels. 
It uses DB based on Mongo to store its data; its APIs are based on REST paradigm.

## 👨🏻‍💻 COMMANDS
- Run `npm start` to start node server an.
- Run `npm run dev` start nodemon server mode dev.
- Run `npm run build` build the project.
- Run `npm test` or `npm t` to test project.

# 🔧 HOW IS MADE?
- Organization of components of Mongoose;
- API calls at DB;
- Testing;

# ❓HOW IT WORKS❓
## ✈️ Airplanes
>- **( C ) POST** => localhost:3001/companies/:id/:plane
>- **( R ) GET** => localhost:3001/companies/:id/planes
>- **( U ) PUT** => localhost:3001/companies/:id/plane/:idAirplane
>- **( D ) DELETE** => localhost:3001/companies/:id/plane/:idAirplane

## 🏢 Companies
>- **( C ) POST** => localhost:3001/companies/
>- **( R ) GET** => localhost:3001/companies/
>- **( U ) PUT** => localhost:3001/companies/:name
>- **( D ) DELETE** => localhost:3001/companies/:name

## 🏷 Tickets
>- **( C ) POST** => localhost:3001/tickets/
>- **( R ) GET** => localhost:3001/tickets/ ( + :id for filtered get )
>- **( U ) PUT** => localhost:3001/tickets/:id
>- **( D ) DELETE** => localhost:3001/tickets/:id

## 🙎🏼‍♂️/🙍🏼‍♀️Users
>- **( C ) POST** => localhost:3001/users/
>- **( R ) GET** => localhost:3001/users/ ( + {?id or ?username or ?name or ?name} for filtered get )
>- **( U ) PUT** => localhost:3001/users/:id
>- **( D ) DELETE** => localhost:3001/users/:username

# 💻 Developers:
>- [@Teoteo11](http://github.com/Teoteo11) : Project manager
>- [@dandelionsam](http://github.com/dandelionsam) : Tester
>- [@BazzaStyle](http://github.com/BazzaStyle) : Programmer
>- [@amatoManuel](http://github.com/amatoManuel) : Programmer
>- [@Gabriele-Zagarella](http://github.com/Gabriele-Zagarella) : Database manager
>- [@davide-aita](http://github.com/davide-aita) : Database manager