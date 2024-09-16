Nödvändiga appar

Docker Desktop


Steg för att starta Quiz Appen.

1. Skapa en databas som mongodb i docker:

# docker run --name mongo-container -d -p 27017:27017 -v mongo-data:/data/db mongo

2. Starta docker container:

# docker start mongo-container

2. Navigera till backend mappen:

# cd .\backend\

3. Starta backend:

# npm start

4. Öppna en ny terminal och navigera till frontend:

# cd .\frontend\

5. Starta frontend i en annan terminal:

# npm start
