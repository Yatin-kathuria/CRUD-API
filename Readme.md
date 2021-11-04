# REST API

CRUD operation of differnt Authenication, User, Profile and Cities.

## Install

    npm install

## Run the app

    npm run dev

# Authentication

Basic User Authentication

## Register the User

`POST /register`

    curl --location -g --request POST 'http://[DOMAIN]:[PORT]/register'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --header 'Accept-Language: en'
    --data-urlencode 'name=My Name'
    --data-urlencode 'email=my@email.com'
    --data-urlencode 'password=12345'

## Verify the User

`POST /verify`

    curl --location -g --request POST 'http://[DOMAIN]:[PORT]/verify'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'id=b98b1dea-b3f4-4b72-bcdf-9d36607e2603'

## Forgot Password

`POST /forgot`

    curl --location -g --request POST 'http://[DOMAIN]:[PORT]/forgot'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --header 'Accept-Language: en'
    --data-urlencode 'email=admin@admin.com'

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    {"token":"dffs8f7sf9fyfywe98yyr38rhy8rh238rrr.rrg8rg829r2grr9wgfgwfw","message":"message"}

## Reset Password

`POST /reset`

    curl --location -g --request POST 'http://[DOMAIN]:[PORT]/reset'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'token=dffs8f7sf9fyfywe98yyr38rhy8rh238rrr.rrg8rg829r2grr9wgfgwfw'
    --data-urlencode 'password=12345'

## Login

`POST /login`

    curl --location -g --request POST 'http://[DOMAIN]:[PORT]/login'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'email=admin@admin.com'
    --data-urlencode 'password=12345'

## Token Fetch

`GET /token`

    curl --location -g --request GET 'http://[DOMAIN]:[PORT]/token'
    --header 'Authorization: Bearer [AUTH_TOKEN_STRING]'

# Users CRUD

Basic User CRUD operation

## Users List with Condition

`GET /users?filter=ad&fields=name,email&page=1&limit=10&sort=name&order=-1`

    curl --location -g --request GET 'http://[DOMAIN]:[PORT]/users?filter=ad&fields=name,email&page=1&limit=10&sort=name&order=-1'
    --header 'Authorization: Bearer [AUTH_TOKEN_STRING]'

## User Creation

`POST /users`

    curl --location -g --request POST 'http://[DOMAIN]:[PORT]/users'
    --header 'Authorization: Bearer [AUTH_TOKEN_STRING]'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'name=New User'
    --data-urlencode 'email=myemail@email.com'
    --data-urlencode 'password=12345'
    --data-urlencode 'role=admin'
    --data-urlencode 'phone=123123'
    --data-urlencode 'city=Bucaramamga'
    --data-urlencode 'country=Colombia'

## User Deletion

`DELETE /users/5aab2443ef417d2d19e6c8f2`

    curl --location -g --request DELETE 'http://[DOMAIN]:[PORT]/users/5aab2443ef417d2d19e6c8f2'
    --header 'Authorization: Bearer [AUTH_TOKEN_STRING]'

## User Single Fetch

`GET /users/5aa1c2c35ef7a4e97b5e995a`

    curl --location -g --request GET 'http://[DOMAIN]:[PORT]/users/5aa1c2c35ef7a4e97b5e995a'
    --header 'Authorization: Bearer [AUTH_TOKEN_STRING]'

## User Update

`PATCH /users/5aa1c2c35ef7a4e97b5e995a`

    curl --location --request PATCH 'http://localhost:3000/users/5aa1c2c35ef7a4e97b5e995a'
    --header 'Authorization: Bearer [AUTH_TOKEN_STRING]'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'name=New Name'
    --data-urlencode 'email=new@email.com'
    --data-urlencode 'role=admin'
    --data-urlencode 'phone=12345'
    --data-urlencode 'city=Cali'
    --data-urlencode 'country=Colombia'
