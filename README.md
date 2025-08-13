# Weather Forecast Test

## Tecnologias utilizadas

### Ferramentas

* VS Code
* Docker

## DEV

> É recomendado utilizar docker para subir os containers configurados. (No entanto, caso queira, é possivel rodar o projeto clonando-o em um servidor php e alterando as configurações do arquivo .env) 

Para rodar o projeto:

1- Copie o arquivo `.env.example` para `.env`
    * Ele está configurado para funcionar com os containers do docker.
    * Caso vá utilizar outra conexão certifique-se que os dados do .env correspondem a ela.
2- No terminal fora do container execute:
```
docker-compose up
```
3- No terminal dentro do container `weather-forecast` execute:
```
php artisan key:generate
php artisan config:clear
php artisan config:cache
```

### Erros comuns e soluções

1- Erro do Docker ao criar a network
  * Ao executar `docker-compose up` pela primeirava caso enfrente erros para o docker criar a network tente criar a network manualmente executando: `docker network create weather-forecast` e depois rode `docker-compose up` novamente.

