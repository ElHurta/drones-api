<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Drone Delivery Service

This repository is built with the [Nest](https://github.com/nestjs/nest) framework, utilizing TypeScript, and is designed to address a cutting-edge technical challenge in the field of transportation - the development of a drone delivery service for medications.

## Technical Challenge Description

The project aims to leverage drone technology as a disruptive force in the transportation sector, particularly for delivering small, urgently needed items like medications to locations with difficult access. Our solution involves a fleet of 10 drones capable of carrying and delivering medication loads efficiently.

**Key Features of Our Drone Delivery System:**

- **Drone Management:** Register drones with specifications including serial number, model, weight limit, battery capacity, and state (e.g., IDLE, LOADING, LOADED, etc.).
- **Medication Delivery:** Load drones with medication items, ensuring the compatibility of names, weights, codes, and images with defined criteria.
- **Operational Monitoring:** Check loaded medications for a given drone, available drones for loading, and the battery level of drones.

## Installation

```bash
$ yarn install
```

## Database

```bash
# create a database from dockerfile
$ docker-compose up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Technical Specifications
- Drones: Identified by a unique serial number, with specific models categorized by weight class. Each has a defined weight limit and battery capacity.
- Medications: Characterized by a name, weight, unique code, and an image. The naming convention excludes special characters except for '-' and '_'.
- Service Communication: Implemented through a REST API, facilitating operations like drone registration, medication loading, and status checks.

## Stay in touch

- Author - [Juan Hurtado](https://juan-hurtado-portfolio.netlify.app/)

## License

Nest is [MIT licensed](LICENSE).
