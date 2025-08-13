# Weather Forecast Test

## Tecnologias utilizadas

### Ferramentas

* VS Code
* Docker

## DEV

> É recomendado utilizar docker para subir os containers configurados. (No entanto, caso queira, é possivel rodar o projeto clonando-o em um servidor php e alterando as configurações do arquivo .env) 

Para rodar o projeto execute:
```
docker-compose up
```

### Erros comuns e soluções

1- Erro do Docker ao criar a network
  * Ao executar `docker-compose up` pela primeirava caso enfrente erros para o docker criar a network tente criar a network manualmente executando: `docker network create weather-forecast` e depois rode `docker-compose up` novamente.

