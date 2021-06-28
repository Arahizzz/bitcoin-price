# Bitcoin Price API
Written in Nest.js Framework (Node.js, Typescript).
## Run
	npm run start
## Create new user

    POST: http://localhost:3000/users/create
    {
	"username": "abc@email.com",
	"password": "password"
	}


## Login (JWT authentication)
	POST: http://localhost:3000/users/login
    {
	"username": "abc@email.com",
	"password": "password"
	}
## Bitcoin Price
	GET: http://localhost:3000/btcRate
	(With supplied bearer token)
## Project structure

 - `models` folder has all models that are used in the project.
 - **Users module** — persistence of user data. Each user is saved to separate JSON file.
 - **Auth module** — authentication logic and controller for login/registration.
 - **Exchange module** — module that is responsible for providing exchange rate info. `ExchangeService` fetches exchange rate data from third-party API. `ExchangeController` has `/btcRate` endpoint for receiving bitcoin price.

