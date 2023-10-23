# Promas Api

## Como iniciar

### Clonamos este repositorio:

```
git clone https://github.com/lowLevelCode/divelement-web-services-ht.git
```

### Instalaciones
- Instalamos la version correspondiente de node, usando [NVM](https://desarrolloweb.com/home/nvm), con el siguiente comando:
```
    nvm use
```
Ese comando deberia de descargar la version mencionada en el archivo configuracion(`.nvmrc`) de NVM.

- Instalamos todas las depencias del proyecto:
```
    npm install
```
- Instalamos [Aws Cli](https://aws.amazon.com/es/cli/) para poder trabajar con localstack

### Levantamos los servicios de docker

Usamos [docker](https://www.redhat.com/es/topics/containers/what-is-docker) para crear algunos servicios de manera local, con el siguiente comando:
```
sudo docker compose up -d
```

Ese comando es para el caso de linux, para windows podemos usar [docker desktop](https://www.docker.com/products/docker-desktop/).
Docker compose nos levantara los siguientes servicios:

- Unas base de datos de Postgresql.
- [LocalStack](https://localstack.cloud/), el cual es una alternativa de servicios en la nube de AWS de manera local.


## Creacion de datos semilla

### Crear bucket de manera local
```
    aws --endpoint-url=http://localhost:4566 \
    s3api create-bucket --bucket files
```

### Subir todos los archivos que tengan el siguiente formato `avatar-*.*` a S3 localstack
```
    for file in ./avatar-*.*; do
        aws --endpoint-url=http://localhost:4566 s3 cp "$file" s3://files/
    done
```

### Subir un simple archivo a s3 localstack
```
    aws --endpoint-url=http://localhost:4566 \
    s3 cp ./avatar-1.jpg \
    s3://files/
```

### Listamos los buckets creados
```
    aws --endpoint-url=http://localhost:4566 s3 ls
```

### Listamos los archivos dentro de un bucket
```
    aws --endpoint-url=http://localhost:4566 \
    s3 ls s3://files
```

### Correr la App en modo desarrollo.

⚠️ En el proyecto viene un archico llamado `.env.local`, este conviente las variables de entorno de manera local. Es necesario hacer una copia de ese archivo y llamarlo `.env`, que ese archivo es que el se toma para leer las variables ⚠️

```
    npm run start:dev
```


### Adicional.
Al proyecto se le agrego conventional commits y linters junto con prettiers para darle orden y amor al codigo 💝
