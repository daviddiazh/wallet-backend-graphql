# Backend Application (Wallet) with Clean Architecture

## Stack usado
- NestJS
- TypeScript
- GraphQL - Apollo
- MongoDB
- Docker Compose (DEV Mode)

Para correr localmente este proyecto, se necesita una base de datos mongoDB
```
docker-compose up -d
```

* El -d, significa __detached__

* La URL de MongoDB Local: 
```
mongodb://localhost:27017/wallet
```

* Para reconstruir los modulos de node y levantar el servidor de node con nestjs es necesario tener instalado *yarn* y luego ejecutar este comando:
```
yarn
```
