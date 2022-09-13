# pull official base image
FROM python:3.10-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
  && apk add gcc python3-dev

# install python dependencies
COPY requeriments.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requeriments.txt

# copy proyect
COPY ./ /app/