#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
# Help found here:
# https://docs.docker.com/engine/examples/dotnetcore/
# https://stackoverflow.com/questions/59319788/dockerfile-for-net-core-3-web-api-spa-application-vue
# https://github.com/MGIsnard/VueJs-DotNetCore-Docker
# https://www.docker.com/blog/multi-arch-images/
# https://github.com/robrich/docker-vue-and-aspnetcore/blob/main/1-container-1-domain/Dockerfile
# https://github.com/SoftwareAteliers/asp-net-core-vue-starter
# https://stackoverflow.com/questions/60960955/dotnet-restore-fails-from-docker-container

# https://hub.docker.com/_/microsoft-dotnet-core-aspnet/
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-focal-arm64v8 AS base
# FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
# EXPOSE 443
# EXPOSE 5000

# https://hub.docker.com/_/microsoft-dotnet-core-sdk
# FROM mcr.microsoft.com/dotnet/core/sdk:3.1-focal-arm64v8 AS build-net-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build-net-core
WORKDIR /src
COPY text-snippets/text-snippets.csproj .
RUN dotnet restore
COPY text-snippets .
RUN dotnet build -c Release
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN rm -r ClientApp/src/libs
RUN git clone https://github.com/JonasSchubert/vue-library.git
RUN cp -rf vue-library/src/ ClientApp/src/libs/
RUN dotnet build "/src/text-snippets.csproj" -c Release -o /app/build

FROM build-net-core AS publish
RUN dotnet publish "/src/text-snippets.csproj" -c Release -o /app/publish

FROM base AS runtime
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "text-snippets.dll"]