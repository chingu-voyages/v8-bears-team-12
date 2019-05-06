# Pal-a-table

Web app for connecting people to meet and eat together at restaurants.

## Team

Jane:

- Github: https://github.com/janeslee
- Linkedin: https://www.linkedin.com/in/janelee53/

Jay:

- Github: https://github.com/jaytula
- Linkedin: https://www.linkedin.com/in/jay-tulathimutte-7104934/

Vi:

- Github: https://github.com/ivycoursera
- Linkedin: https://www.linkedin.com/in/vidhubansal/

## Features

- Search for pals that have restaurants selected at a location
- Select restaurants so other people can discover you
- Add pals to chat with real-time

## Requirements

- Node 10.x
- MongoDB
- Mailgun API Key
- Yelp API Key

## Installing

### Downloading

```bash
git clone git@github.com:chingu-voyages/v8-bears-team-12.git
cd v8-bears-team-12
npm install
```

### Configuration

This project expect certain environment variables to be provided. It can
be supplied with a `.env` file in project root directory.

The environment variables:

| Name             | Required | Description                                                     |
| ---------------- | -------- | --------------------------------------------------------------- |
| `PORT`           | yes      | Express server port                                             |
| `ATLAS_DBURI`    | yes      | MongoDB URI connection string                                   |
| `YELP_APIKEY`    | yes      | Yelp API Key                                                    |
| `SECRET`         | yes      | Any string to be used as JWT secret                             |
| `MAILGUN_APIKEY` | yes      | Mailgun API Key                                                 |
| `MAILGUN_DOMAIN` | yes      | Mailgun Domain                                                  |
| `TESTDATA`       | no       | Set to anything to use restaurant test data instead of Yelp API |
| `MAIL_FROM`      | yes      | Email address to be used as from address for Mailgun sends      |
| `PROTOCOL`       | no       | Specify protocol to use for http links in email (http or https) |

### Running

To run in development mode:

```bash
npm run devmon
```

To build and run in production mode:

```bash
npm run build
npm start
```

## Additional Information

### NPM run scripts

- `npm run dev`: Will run `node server/main.js` with `NODE_ENV` set to `development`
- `npm run devmon`: Same as `npm run dev` but using nodemon to automatically watch for file changes and restart server
- `npm run build`: Builds the Webpack bundles into `client/build` folder
- `npm start`: Does a `npm run build` and run `node server/main.js` with NODE_ENV set to `production`

### CLI tool

There is a CLI tool built for rudimentary initial testing. It could be expanded upon. It can be run while
in the project folder with:

```bash
npm run cli -- users list
npm run cli -- users add
```

You may want to create a bash alias if planning to use it often:

```bash
# file: $HOME/.bashrc
alias meet-cli="cd /Users/username/projects/v8-bears-team-12 && npm run --silent cli"
```
