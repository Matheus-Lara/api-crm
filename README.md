# api-crm

This project aims to meet the requirements of the web development discipline project in the software engineering bachelor's course at Positivo University.

A simple API that records products / services, customers, interactions, payment conditions and commercial proposals.

### Running the project

1) Install [docker-compose](https://docs.docker.com/compose/install/) and [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2) Via terminal, go to `.docker` (located in root) and run `docker-compose up -d`, this will download the latest available version of mongodb from [docker hub](https://hub.docker.com/search?q=)

3) in the root folder, run `npm install` to install dependencies

5) Lastly, in the root folder of the project, run `npm start`. If everything is up and running, you will see the image below:

![image](https://user-images.githubusercontent.com/63257275/174695681-6dff2343-8cbb-4d46-b166-86374ccddcb8.png)


### Consuming the API

To consume the API, you can find the [Postman collections](https://www.postman.com/downloads/) in the directory `postman-collections` in the root of this project and import them to postman to test the API.
