#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS base
RUN apk add icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:14-alpine as build-node
WORKDIR /ClientApp
COPY ProductManagement.Api/ClientApp/package.json .
COPY ProductManagement.Api/ClientApp/package-lock.json .
RUN npm install
COPY ProductManagement.Api/ClientApp/ . 
RUN npm run build

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build

WORKDIR /src
COPY ["ProductManagement.Api/ProductManagement.Api.csproj", "ProductManagement.Api/"]
COPY ["ProductManagement.Data.EF/ProductManagement.Data.EF.csproj", "ProductManagement.Data.EF/"]
COPY ["ProductManagement.Core/ProductManagement.Core.csproj", "ProductManagement.Core/"]
RUN dotnet restore "ProductManagement.Api/ProductManagement.Api.csproj"
COPY . .
WORKDIR "/src/ProductManagement.Api"
RUN dotnet build "ProductManagement.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProductManagement.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-node /ClientApp/dist ./ClientApp/dist
ENTRYPOINT ["dotnet", "ProductManagement.Api.dll"]