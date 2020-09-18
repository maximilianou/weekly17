start:
	docker-compose -f docker-compose.dev.yml up --build
stop:
	docker-compose -f docker-compose.dev.yml down	
clean: 
	docker system prune -a 

doc:
	cd share/docs/src/ && node cmd.js

start_api:
	cd api_ts && npm run dev
ui:
	nvm install 14
	nvm use 14
	npm install -g npm@latest
	npm install -g @angular/cli
	ng new ui_angular
start_ui: 
	cd ui_angular && ng serve
ng8:
	cd ui_angular && ng generate module app-routing --flat --module=app
	cd ui_angular && ng generate component home
	cd ui_angular && ng generate component header
	cd ui_angular && ng generate component profile
	cd ui_angular && ng generate component auth
	cd ui_angular && ng generate module auth
	cd ui_angular && ng generate service auth/auth
	cd ui_angular && ng generate guard auth/auth
	cd ui_angular && ng generate component auth/register
	cd ui_angular && ng generate component auth/login
	cd ui_angular && npm install bootstrap --save
	cd ui_angular && npm install @auth0/angular-jwt --save
	cd ui_angular && npm install moment --save

ng9:
	#cd ui_angular && npm install angular-in-memory-web-api --save
	#cd ui_angular && ng generate service InMemoryData
	#cd ui_angular && ng generate component dish-search

create_api:
	mkdir api_ts
	cd api_ts && npm init -y
	cd api_ts && npm install typescript ts-node
	cd api_ts && npm install --save express body-parser nodemon
	cd api_ts && mkdir lib
	cd api_ts && mkdir lib/config
	cd api_ts && touch lib/config/app.ts
	cd api_ts && touch lib/server.ts
	cd api_ts && mkdir lib/routes
	cd api_ts && mkdir lib/assets
	cd api_ts && touch lib/environment.ts
	cd api_ts && npm install --save axios compression dotenv helmet jsonwebtoken jwk-to-pem morgan uuid winston
	cd api_ts && npm install --save express-openapi-validator swagger-ui-express yamljs @types/yamljs @types/swagger-ui-express
	cd api_ts && npm install --save-dev @types/yamljs @types/swagger-ui-express
	cd api_ts && npm install --save-dev eslint eslint-config-airbnb-typescript eslint-plugin-import 
	cd api_ts && npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
	cd api_ts && npm install --save-dev @types/compression @types/express @types/helmet
	cd api_ts && npm install --save-dev @types/jsonwebtoken @types/jwk-to-pem
	cd api_ts && npm install --save-dev mocha @types/mocha @types/morgan @types/node @types/uuid
	cd api_ts && npm i --save chai-http chai 
	cd api_ts && npm i --save-dev @types/chai @types/chai-http


test_api:
	curl http://localhost:6017/api_ts/api-docs
test_ui:
	curl http://localhost:4217/

