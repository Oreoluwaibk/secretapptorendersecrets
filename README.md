# Secrets

A small Express app where a signed-in person can submit a secret and read the secrets other people have submitted. Accounts use a username and password, or Google. Pages are EJS templates in `views/`: home, register, login, submit, and the secrets list.

This is a learning project. It uses Passport, a local strategy, and Google OAuth.

## Stack

Node.js, Express, EJS, MongoDB and Mongoose, Passport, and `dotenv`.

## Run locally

MongoDB needs to be running. Put the database URL, the session secret, and the Google OAuth client values in a `.env` file. The app loads that file with `dotenv`. Do not commit those values.

```bash
npm install
node app.js
```

Open the port the process prints, then register or use Google, submit a secret, and open the secrets page.
