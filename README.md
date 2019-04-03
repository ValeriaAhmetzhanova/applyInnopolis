# Build and run
 1. Run `docker-compose up --build -d` from the project root directory.

# Manage API server

Server is managed by Django `manage.py` script. It was created via the following command:

```
# docker-compose run back django-admin startproject applyInnopolis .
```

Manage it with:

```
# docker-compose run back python manage.py [command...]
```

or with a shortcut:

```
# ./docker-manage.sh [command...]
```
