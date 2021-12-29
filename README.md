<p align="center">
<strong>Announcement 📣</strong><br/>... nothing to announce😅<br/>
</p>

# Express (TypeScript ), Prisma, MySQL

- Express - TypeScript
- ESLint
- Prettier
- dotenv
- prisma(ORM)
- docker(MySQL)
- and so on

# Develop

## Start Hacking

```bash
$ npm install
$ npm run dev
```

## Run MySQL

```bash
$ docker-compose up
```

# Prisma

## Set Env

Initial environment value for the DB created with docker-compose.

```bash
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

## Migrate Schema to DB

```bash
$ npx prisma db push
```

## Run Prisma Studio

```bash
$ npx prisma studio
```

# CRUD etc

https://www.prisma.io/express
