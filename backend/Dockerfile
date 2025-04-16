# Estágio de compilação (Maven + Java 17)
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY ../.. .
RUN mvn clean package -DskipTests

# Estágio de execução (Java 17)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Instala o pacote de timezone (necessário para Alpine Linux)
RUN apk add --no-cache tzdata

# Instala o curl (necessário para healthchecks)
RUN apk add --no-cache curl

# Define a timezone para America/Sao_Paulo
ENV TZ=America/Sao_Paulo

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# O parâmetro -Duser.timezone deve vir ANTES de -jar
CMD ["java", "-Duser.timezone=America/Sao_Paulo", "-jar", "app.jar", "--spring.profiles.active=prod"]