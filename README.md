
````markdown
# Multi-Service Docker Project

This project includes:

- PostgreSQL database
- pgAdmin for managing PostgreSQL
- Redis cache
- Two Spring Boot backend services (`user-auth` and `social-clone`)
- React frontend served by Nginx

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

---

## Getting Started

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <your-project-folder>
````

2. **Build and start all services**

```bash
docker-compose up --build
```

This will:

* Build backend and frontend Docker images
* Start PostgreSQL, Redis, pgAdmin, backend, and frontend containers

---

## Accessing the services

| Service          | URL                                            | Description                                                |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| Frontend         | [http://localhost](http://localhost)           | React app served by Nginx                                  |
| User Auth API    | [http://localhost:8080](http://localhost:8080) | User authentication backend                                |
| Social Clone API | [http://localhost:8082](http://localhost:8082) | Social clone backend                                       |
| PostgreSQL       | localhost:5432                                 | PostgreSQL database (connect with pgAdmin or other client) |
| pgAdmin          | [http://localhost:8085](http://localhost:8085) | PostgreSQL admin UI (login below)                          |
| Redis            | localhost:6379                                 | Redis cache                                                |

---

## pgAdmin Credentials

* Email: `admin@example.com`
* Password: `admin`

To connect pgAdmin to PostgreSQL:

* Hostname: `postgres` (Docker service name)
* Port: `5432`
* Username: `user`
* Password: `pass`

---

## Notes

* The frontend is served on port 80 via Nginx.
* Backend services use environment variables to connect to PostgreSQL and Redis.
* Volumes `postgres_data` and `redis_data` persist database and Redis data.

---

## Stopping and Cleaning Up

To stop containers:

```bash
docker-compose down
```

To remove containers, networks, and volumes (WARNING: deletes all data):

```bash
docker-compose down -v
```

---

## Troubleshooting

* If ports are busy, check for other running services and stop them or change ports in `docker-compose.yml`.
* For logs:

```bash
docker-compose logs -f frontend
docker-compose logs -f user-auth
docker-compose logs -f social-clone
```

---

## Links

* [Docker Documentation](https://docs.docker.com/)
* [Docker Compose Documentation](https://docs.docker.com/compose/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [pgAdmin Documentation](https://www.pgadmin.org/docs/)
* [Redis Documentation](https://redis.io/documentation/)
* [Spring Boot Documentation](https://spring.io/projects/spring-boot)
* [React Documentation](https://reactjs.org/)
* [Nginx Documentation](https://nginx.org/en/docs/)

