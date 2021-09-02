1) Build image - go to the directory that has your Dockerfile
docker build . -t <your username>/node-web-app
2) Run Image - in the example below, Docker mapped the 8000 port inside of the container to the port 80 on your machine
docker run -p 80:8080 -d <your username>/node-web-app
3) Access the server on https://localhost:80/
Ref
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/