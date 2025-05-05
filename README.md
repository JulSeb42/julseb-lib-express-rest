# Julseb Lib Express Rest

A basic boilerplate for server functions and API, using Express in TypeScript and MongoDB.

## Install project

Rename the file `template.env` to `.env`, and replace the values with your email, password, etc.

Then run `yarn` at the root of the project.

## Run project

Run `yarn dev` at the root of the project.

## Packages

-   [Express](https://expressjs.com/)
-   [ExpressJWT](https://www.npmjs.com/package/express-jwt)
-   [JulSeb utils](https://www.npmjs.com/package/@julseb-lib/utils): Small library of util functions, [documentation here](https://julseb-lib-documentation.vercel.app/helpers/js-utils)
-   [Mongoose](https://mongoosejs.com/)
-   [Nodemailer](https://nodemailer.com/)
-   [Plop](https://plopjs.com/)
-   [tsx](https://www.npmjs.com/package/tsx)

## Plop functions

-   `yarn plop:r`: generates a new route on server 
-   `yarn plop:m`: generates a new Mongoose model
-   `yarn plop:ty`: generates a new type or interface

## API

All the functions can be found in the `routes` folder. You can create new ones with everything you can need by running `yarn plop:r <your new route name>`.

## Models

All the models can be found in `models` folder. You can create a boilerplate one by running `yarn plop:m <your new model name>`.

## Create data

You can add some fake users by running `yarn seed-users`.
