FROM python:3

ENV PYTHONUNBUFFERED 1
EXPOSE 80

WORKDIR /code

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/

# done by tutorial:
# https://docs.docker.com/compose/django/