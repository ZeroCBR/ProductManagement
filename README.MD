# Product Management

A basic CRUD .Net Core 3.1 web application for product management, built with Angular as frontend framework

## Project Structure

- **ProductManagement.Api** - Main entry with controllers and Angular web app with folder name "ClientApp"
- **ProductManagement.Core** - Dtos and prodcut services
- **ProductManagement.Data.EF** - Models, db context and migration script
- **ProductManagement.Core.Test** - Unit tests for services

## How To Run

### Option 1 - Use Docker
1. In the root folder,  run **ProductManagement.Api** and **MS SQL** in Docker container,  `./batect run-server`
2. Do a database update for docker container in another terminal, `./migrationSchema.sh`
3. Go to browser with url http://localhost:5000

### Option 2 - Local API Start Up
1. Go to **ProductManagement.Data.EF** folder,  `cd ./ProductManagement.Data.EF`
2. Do a database update, `dotnet ef database update --startup-project ../ProductManagement.Api/ --context ProductManagementDbContext --verbose`
3. Simply run product_management in visual studio
4. The ProductManagement.Api will run with 50 products seeding, run the angular app and use *(localdb)\\MSSQLLocalDB* as database
5. Go to browser with url http://localhost:5000 or https://localhost:5001