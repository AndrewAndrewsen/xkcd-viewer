# XKCD Viwer
This is an app to view XKCD strips. It's made in Next.js using a middleware API to save the data and images locally for faster loading times and to avoid single point of failure.

## Setup

1. Run `yarn` to install  
2. Create a `.env` file.  
On dev-environment add the following lines:  
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3000/api/
    NEXT_PUBLIC_SITE_URL=http://localhost:3000/
    NEXT_PUBLIC_XKCD_URL=https://xkcd.com/
    DB_PATH=./storage/db.sql
    LOCAL_STRIP_PATH=./storage/strips/
    ```
**Also:** Remember to set the correct port you'd want in `server.js`

3. Run `yarn dev` to start local development enviroment. 

App is by default running on port 3000

## Build and deploy
1. Run `yarn build` to build the project.  
2. Run `yarn start` to start the build.  
*Note that the `start` command has an env-variable in it's command. If you're running on window you have to change it to `SET NODE_ENV` instead of the default `NODE_ENV`*  


## Structure
`/blocks` - Holds all the "blocks". A block is a bigger part of one "page". Holds own style and uses components.  
`/components` - Holds all the "components". Elements that holds more logic and style.  
`/pages` - Holds all the main browsable pages.  
`/pages/api` - Holds the endpoints for the local API.  
`/storage` - Holds the strip images and the local database.  
`/util` - Holds files with helper functions.  

## Database tables
### strips (mimics XKCD-api response)
num INT  
link TEXT  
month TEXT  
year TEXT  
news TEXT  
safe_title TEXT  
transcript TEXT  
alt TEXT  
img TEXT  
title TEXT  
day TEXT

### votes
num INT  
vote TEXT  
client TEXT  
obsolete INT  

# Features
### Startpage / Random
This shows a random strip from XKCD.
### Browse 
Here you can browse through all strips from XKCD
### Favorites 
Here you can see the strips that you have favorite.

### Misc  
On the first startup the server will download all the images and store them locally, it will also save the data to a sqlite database. The reason for that was to make a fallback API if the third-party host did not respond (or vice verse). While fetching the pages will look for locally stored image, if it doesn't exist it use the remote link and download the non-existing image locally and save the data to the database. The database also holds votes for the strips, the votes is utilized publically and anonymously. It is only connected to your clients unique id. Same with favorites, which are saved in the local storage.

# Deploy strategy
If this would be a live project I would use the regular `gitflow` branching strtegy. Where I would have a `develop` branch connected to a dev-server, from the `develop` branch you'd make `feature` branches to work on. It would be sound to use a staging server also, either have a `staging` branch or using `main` as staging. From main I'd use `tags` to make releases. While commiting to a feature branch you would use a pre-commit hook that would run a linter. On a pull-request an automatic test should run, checking how the site renders and if the api responds correctly. Regular **CI/CD** flow.
