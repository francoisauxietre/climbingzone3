##lancement de l'application

lancement du docker docker-compose up
base donnee
lancement du siste npm start 

acces au site
http://localhost:8081/
connexion comme utilisateur user user 
comme admin   admin admin

app.scss  pour le css le plus haut
dans entities cest la vue donc modifier 
et dans share model  objet    representation front de ton dto 
4 a changer 
dto climber.model.ts climber.tsx et le mapper

acces au swagger 
http://localhost:8081/swagger-ui/index.html


dans le dossier docker-compose up
./mvnw
et lancer la back end dans intelij

pour lancer un bash dans le docker de mysql
sudo docker exec -it 3f58ed84ebcc bash

pour se logger sous mysql 
mysql -u root -p 
 avec root comme mot de passe   (root)
afficher les utilisateurs
select user, host from mysql.user;
Creation et affichage de BD
CREATE DATABASE climbingzone;
SHOW DATABASES;
se mettre dans une base 
use climbingzone1;
GRANT ALL PRIVILEGES ON climbingzone1.* TO 'fafa1'@'localhost' IDENTIFIED BY 'fafa1';




verfication qu'un seul docker mysql est en place
base de donnee climbingzone3 fafa1 fafa1 port 3008
lancement sur port 8081

si plusieurs processus sont sur le port les effaccer avec

# sudo netstat -lpn |grep :8080

# kill NOprocessus

#

# Spring Boot configuration for the "dev" profile.

#

# This configuration overrides the application.yml file.

#

# More information on profiles: https://www.jhipster.tech/profiles/

# More information on configuration properties: https://www.jhipster.tech/common-application-properties/

# ===================================================================

# ===================================================================

# Standard Spring Boot properties.

# Full reference is available at:

# http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html

# ===================================================================

logging:
level:
ROOT: DEBUG
io.github.jhipster: DEBUG
com.climbingzone3: DEBUG

spring:
profiles:
active: dev
include: - swagger # Uncomment to activate TLS for the dev profile
#- tls
devtools:
restart:
enabled: true
livereload:
enabled: false # we use Webpack dev server + BrowserSync for livereload
jackson:
serialization:
indent-output: true
datasource:
type: com.zaxxer.hikari.HikariDataSource
url: jdbc:mysql://localhost:3308/climbingzone3?useUnicode=true&characterEncoding=utf8&useSSL=false&useLegacyDatetimeCode=false&serverTimezone=UTC
username: fafa1
password: fafa1
hikari:
poolName: Hikari
auto-commit: false
data-source-properties:
cachePrepStmts: true
prepStmtCacheSize: 250
prepStmtCacheSqlLimit: 2048
useServerPrepStmts: true
jpa:
database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
database: MYSQL
show-sql: true
properties:
hibernate.id.new_generator_mappings: true
hibernate.connection.provider_disables_autocommit: true
hibernate.cache.use_second_level_cache: false
hibernate.cache.use_query_cache: false
hibernate.generate_statistics: false
liquibase: # Remove 'faker' if you do not want the sample data to be loaded automatically
contexts: dev, faker
mail:
host: localhost
port: 25
username:
password:
messages:
cache-duration: PT1S # 1 second, see the ISO 8601 standard
thymeleaf:
cache: false

server:
port: 8081

# ===================================================================

# JHipster specific properties

#

# Full reference is available at: https://www.jhipster.tech/common-application-properties/

# ===================================================================

jhipster:

# CORS is only enabled by default with the "dev" profile, so BrowserSync can access the API

cors:
allowed-origins: '_'
allowed-methods: '_'
allowed-headers: '\*'
exposed-headers: 'Authorization,Link,X-Total-Count'
allow-credentials: true
max-age: 1800
security:
authentication:
jwt: # This token must be encoded using Base64 and be at least 256 bits long (you can type `openssl rand -base64 64` on your command line to generate a 512 bits one)
base64-secret: ZmExOTcwNDdmMWRkZWJiZTVhNzFlNmY2Y2YzNTc4YjUxMWFhNDA2N2FhM2MwZDc0NDJlMjgwMDY1ODY4MTIxYjMwZmZhZGM1N2U1ZWRkOTdlZTkwM2RjODg0NzQ5ODVkZWNiNWQyMjc0ZDMwYjM1NTYyNmRiZGRkNzdmM2RjMTA= # Token is valid 24 hours
token-validity-in-seconds: 86400
token-validity-in-seconds-for-remember-me: 2592000
mail: # specific JHipster mail property, for standard properties see MailProperties
base-url: http://127.0.0.1:8081
metrics:
logs: # Reports metrics in the logs
enabled: false
report-frequency: 60 # in seconds
logging:
use-json-format: false # By default, logs are not in Json format
logstash: # Forward logs to logstash over a socket, used by LoggingConfiguration
enabled: false
host: localhost
port: 5000
queue-size: 512
audit-events:
retention-period: 30 # Number of days before audit events are deleted.

# ===================================================================

# Application specific properties

# Add your own application properties here, see the ApplicationProperties class

# to have type-safe configuration, like in the JHipsterProperties above

#

# More documentation is available at:

# https://www.jhipster.tech/common-application-properties/

# ===================================================================

# application:
