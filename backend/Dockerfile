# Etapa 1: Construcción (Build)
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copiamos el wrapper de Gradle y sus archivos de configuración
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copiamos el código fuente
COPY src ./src

# Damos permisos de ejecución al wrapper (vital si vienes de Windows)
RUN chmod +x ./gradlew

# Compilamos el proyecto ignorando los tests
RUN ./gradlew clean build -x test --no-daemon

# Etapa 2: Ejecución (Run)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiamos el .jar generado por Gradle (suele estar en build/libs/)
COPY --from=build /app/build/libs/*.jar app.jar

# Exponemos el puerto que usa Spring Boot
EXPOSE 8080

# Comando para arrancar la app
ENTRYPOINT ["java", "-jar", "app.jar"]