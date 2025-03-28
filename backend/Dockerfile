# Estágio de compilação (Maven + Java 17)
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY ../.. .
RUN mvn clean package -DskipTests

# Estágio de execução (Java 17)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]