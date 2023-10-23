# Promas Api

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

aws --endpoint-url=http://localhost:4566 \
s3 ls

aws --endpoint-url=http://localhost:4566 \
s3api list-buckets

aws --endpoint-url=http://localhost:4566 \
s3 ls s3://files

aws --endpoint-url=http://localhost:4566 \
s3api get-bucket-location --bucket files

aws --endpoint-url=http://localhost:4566 \
s3 cp ./avatar-1.jpg \
s3://files/

aws --endpoint-url=http://localhost:4566 \
s3 cp ./avatar-2.png \
s3://files/
