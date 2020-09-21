### ../../../DO.md 
# weekly17
Learning, javascript, typescript, docker, docker-compose, openapi, react, angular, postgresql, mongodb


References:

https://levelup.gitconnected.com/setup-restful-api-with-node-js-express-mongodb-using-typescript-261959ef0998

https://appdividend.com/2020/07/09/angular-authentication-system-login-and-registration-in-angular/


### ../../../Makefile 
```
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

start_ui: 
	cd ui_ng && ng serve

create_ui:
	#nvm install 14
	#nvm use 14
	npm install -g npm@latest
	npm install -g @angular/cli
	ng new ui
	cd ui && ng generate module app-routing --flat --module=app
	cd ui && ng generate component home
	cd ui && ng generate component header
	cd ui && ng generate component profile
	cd ui && ng generate component auth
	cd ui && ng generate module auth
	cd ui && ng generate service auth/auth
	cd ui && ng generate guard auth/auth
	cd ui && ng generate component auth/register
	cd ui && ng generate component auth/login
	cd ui && npm install bootstrap --save
	cd ui && npm install @auth0/angular-jwt --save
	cd ui && npm install moment --save
	cd ui && ng add @angular/material

ng9:
	#cd ui_ng && npm install angular-in-memory-web-api --save
	#cd ui_ng && ng generate service InMemoryData
	#cd ui_ng && ng generate component dish-search

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
	cd api_ts && npm i --save-dev @types/chai 


test_api:
	curl http://localhost:6017/api_ts/api-docs
test_ui:
	curl http://localhost:4217/


```
### ../../../docker-compose.dev.yml 
```
version: "3.8" # specify docker-compose version

# Define the services/containers to be run
services:
  cook17_ng: 
    build: 
      context: ./ui
      dockerfile: Dockerfile.dev
    container_name: cook17_ng
    volumes:
      - ./ui:/ui
      - /ui/node_modules
    ports:
      - "4217:4200" 
      - "49153:49153"
    environment:
      - NODE_ENV=dev

  cook17_ts:
    build:
      context: ./api_ts
      dockerfile: Dockerfile.dev
    container_name: cook17_ts
    volumes:
      - ./api_ts:/api_ts
      - /api_ts/node_modules
    ports:
      - "6017:3000"


  cook17_database:
    image: postgres
    #restart: always
    environment:
      POSTGRES_PASSWORD: example

  cook17_adminer:
    image: adminer
    #restart: always
    ports:
      - 9017:8080

  cook17_mongo:
    image: mongo
    #restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  cook17_mongo_admin:
    image: mongo-express
    #restart: always
    ports:
      - 10017:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example

  cook17_nginx: 
    build: loadbalancer 
    container_name: cook17_nginx
    ports:
      - "8017:80" 
    links:
      - cook17_ts
      - cook17_ng


```
### ../../../api_ts/README.md 

## api_ts

### openapi swagger ui, to check endpoints

curl http://localhost:6017/api_ts/api-docs 


### ../../../ui/README.md 

# Ui

package.json
```
    "start": "ng serve --disableHostCheck=true --host=0.0.0.0 ",
    "serve": "ng serve --proxy-config proxy.conf.json",
```

proxy.conf.json
```
{
  "/api_js": {
    "target": "http://localhost:5017",
    "secure": false
  }
}
```



