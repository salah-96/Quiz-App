Nödvändiga appar

Docker Desktop


Steg för att starta Quiz Appen.

1. Skapa en databas som mongodb i docker:

# docker run --name mongo-container -d -p 27017:27017 -v mongo-data:/data/db mongo

2. Starta docker container:

# docker start mongo-container

2. Navigera till backend mappen:cd

# cd .\backend\

3. Starta backend:

# npm start

4. Öppna en ny terminal och navigera till frontend:

# cd .\frontend\

5. Starta frontend i en annan terminal:

# npm start


Jenkins Setup

# Skapa jenkins container:

Kör följande kommando i terminalen efter du CD-at till root i projektet på Vscode:

1. docker run -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock --name jenkins --user root jenkins/jenkins:lts-jdk17


# kommando för att gå in i Jenkins-containern:

I samma terminal kör:

2. docker exec -it jenkins bash


# kommando för att se om Docker är tillgängligt:

3. docker --version

Vid svar "bash: docker: command not found" kör steg 3.1, 3.2 och 3.3


# Uppdatera paketlistorna:

3.1 apt-get update


# Installera Docker-klienten: Installera Docker-klienten så att du kan köra Docker-kommandon inifrån Jenkins:

3.2 apt-get install -y docker.io

# Verifiera att docker installationen gått igenom:


3.3 docker --version

# Gå till Docker Desktop och kolla efter en körande Jenkins container, default körs den på http://localhost:8080/ - Konfigurera Jenkins samt installera en extra plugin sök efter "Docker pipeline" och installera.