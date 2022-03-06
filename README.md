# tgl-api-nestjs-graphql
## step by step to run the project

1) To install all dependencies, run: `npm install`
2) Before running the project you will need to create a network in Docker: `docker network create tgl-api-graphql`
3) And also set the environment variables in the `.env` file
4) To upload and run the MySQL application and database on Docker: `docker-compose up`
5) After running the previous command, it will also be necessary to run the migrations and seeders: `npm run startdb`
6) Finally, to have access to all the features available in the API, just download the file located at `_data/tgl-api-nestjs-graphql-workspace.json` and import it into Insomnia.
