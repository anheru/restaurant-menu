#!/bin/sh

# Lauching API server

cd restaurant-menu-api
docker-compose up -d --build

# # Lauching React server

cd ../restaurant-menu-front
docker-compose up -d --build