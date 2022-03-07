Create database & table

```bash          
            CREATE DATABASE mentorship;
            CREATE TABLE IF NOT EXISTS WeatherApp (
                messageId VARCHAR(255) NOT NULL,
                City VARCHAR(255) NOT NULL,
                Country VARCHAR(255) NOT NULL,
                Description VARCHAR(255) NOT NULL,
                Temperature INT NOT NULL,
                Temp_min INT NOT NULL,
                Temp_max INT NOT NULL,
                Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
            ); 
```


Create new user with root priviledges.
```bash
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

```bash
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
```

Invoke lambda localy.
```bash
aws lambda invoke /dev/null   --endpoint-url http://localhost:3002   --function-name serverless-offline-dev-hello
```