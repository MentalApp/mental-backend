# Mental App
Backend for Mental App from UET
## Getting Started

Follow these instructions to set up this project on local machine.

### Prerequisites

- [Install node](https://nodejs.org/en/download/) and it will also install npm.
- After that, install yarn.

  ```
  npm install -g yarn
  ```

  then check it

  ```
  node -v

  // v14.3.0

  yarn -v

  // 1.22.4
  ```

### Installing
- Clone project
  ```
  git clone https://github.com/NamNguyen99/mental-backend.git && cd mental-backend
  ```
- Install dependencies
  ```
  yarn
  ```
- Make env file

  ```
  cp .env.example .env
  ```
- Create database

  ```
  sequelize-cli db:create db:migrate db:seed:all
  ```
  
- Run Rabbit MQ
  ```
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
  ```

- Run project
  ```
  yarn start
  ```
