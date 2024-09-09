Steg för att starta Quiz Appen.

1. Skapa en databas som mongodb i docker:

# docker run --name mongo-container -d -p 27017:27017 -v mongo-data:/data/db mongo

2. Starta docker container:

# docker start mongo-container

2. Navigera till backend mappen:

# cd .\backend\

3. Installera npm i backend

# npm install

4. Starta backend:

# npm start

5. Öppna en ny terminal och navigera till frontend:

# cd .\frontend\

6. Installera npm i frontend

# npm install

7. Starta frontend:

# npm start
