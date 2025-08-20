# Weather Forecast Test
![demo](https://github.com/user-attachments/assets/3fb074fe-ac7a-42f2-b987-f2e8ce197dd1)

## Tecnologias utilizadas

### Frameworks
* [Laravel 12 - PHP](https://laravel.com/docs/12.x/installation) (frontend, backend e APIs)
* [Bootstrap - CSS](https://getbootstrap.com/docs/5.3/getting-started/vite/) (frontend)
* [Vite](https://vite.dev/) (frontend)
* [React.JS](https://react.dev/) (frontend)
* [Karma](https://karma-runner.github.io/6.4/dev/git-commit-msg.html) (padrão para commits)

### Ferramentas
* [VS Code](https://code.visualstudio.com/download)
* [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
* MySQL
* PHPmyadmin
* WSL - Ubunto terminal
* Postman
 > Uma cópia da collection do postman foi anexado ao projeto com todas as rotas das APIs 

## Metodologia

Decidi utilizar várias tecnologias diferentes justamente para usufruir da melhor parte de cada uma.
Laravel me permitiu criar rapidamente um projeto com estrutura, podendo utilizar seu sistema de roteamente, APIs e middlewares, assim como sua integração nativa com vite que já compila arquivos css, scss e js em arquivos prontos para produção.

React trouxe reatividade ao projeto, onde as páginas seriam estáticas e teriam necessidade de vários recarregamentos de tela e rotas adicionais para buscar, listar, chamar as APIs externas...
Desta forma o experiencia do usuário fica mais dinamica e também nos ajuda no reaproveitamento de código, sendo que pude componentizar partes que foram reutilizadas em diversas páginas. 
(Blade do laravel permite uma "componentização" utilizando os @extends, porém o projeto perderia a reatividade que acredito ser importante nesse tipo de projeto).

No geral mantive a estrutura padrão do Laravel, apenas adicionando alguns arquivos a mais para API, middleware e services.
* Middleware foi utilizada para interceptar as requests feitas ao Laravel, sendo feitas via website ou api, e gerar loga no banco de dados
    * Mesmo não sendo requisito acredito ser importante sempre manter registro mesmo em desenvolvimento para conseguirmos encontrar e resolver qualquer erro o mais rápido possivel 
* Services foram utilizados para interagir com os serviços/APIs externas (ViaCep, WeatherStack)
    * Desta forma o usuário realizava a ação no front, a API/Controller eram chamados e estes por sua vez executavam as calls para os serviços externos
* API foi utilizada para usuário poder realizar as ações de CRUD, mesmo dentro de um componente React.

Para utilização do React neste projeto Laravel decidi fazer uma integração de forma simples, [onde cada componente é "isolado" e pode ser utilzado/chamado em qualquer parte do código HTML](https://react.dev/learn/add-react-to-an-existing-project#step-2-render-react-components-anywhere-on-the-page).
Os componentes foram criados dentro da estrutura padrão do Laravel (resources/js) desta forma bastou importalos no `resources/js/app.js` e todo o projeto Laravel tinha acesso aos componentes.
Os componentes por sua vez interagiam com o Laravel atraves de requisições para a API do mesmo projeto (busca, salvando e excluido informações).
```
- Weather_forecast_projetc/
  - app/
    - Http/
        - Controllers/
            - API/
                - ... 
        - Middlewares/
            -  LogRequest
    - ...
    - resources/
        - js/
            - components/
                - (React componentes)
            - app.js
            - bootstrap.js 
        - sass /
  - ...
 ````
Alguns da arquitetura padrão dos frameworks foi utilizado nomenclaturas de funções mais descritivas e facil entendimento para quem as lê.
Ex: `buscaPrevisoesSalvas()`, `buscarCidade()`, seguindo a padronização de camelCase do JS.

## Discussões
* Após o início do projeto foi constatado que as novas versões do Laravel possuem integração com outros frameworks JS nativamente por meio do Inertia.JS. No entanto para não começar do zero foi seguido utilizando o React de forma isolada nas blades do projeto.
* A API WeatherStack possui problemas de estabilidade e em diversos casos retorna dados errados, de outras cidades com mesmo nome, mesmo passando o maximo de informações possiveis no parametro query (cidade, uf, pais)
    * Aconselho repensar e trocar por outra com maior precisão como a openWeather - que também possui planos gratuitos e até com mais quotas de busca


## DEV

> É recomendado utilizar docker para subir os containers configurados. (No entanto, caso queira, é possivel rodar o projeto clonando-o em um servidor php e alterando as configurações do arquivo .env)  

Para rodar o projeto:

1. Copie o arquivo `.env.example` para `.env`
    * Ele está configurado para funcionar com os containers do docker.
    * Caso vá utilizar outra conexão certifique-se que os dados do .env correspondem a ela.
    * Insira sua key do WEATHERSTACK no campo WEATHERSTACK_API_KEY
    
2. No terminal fora do container execute:
```
npm i
docker-compose up
```
3.- No terminal dentro do container `weather-forecast` execute:
```
composer install
php artisan key:generate
php artisan config:clear
php artisan config:cache
php artisan migrate
```
4. Reinicie o container `weather-forecast`
5. Rode `npm run dev` no terminal fora do container para o vite assistir e atualizar as alterações de css, scss e js

### Erros comuns e soluções

1- Erro do Docker ao criar a network
  * Ao executar `docker-compose up` pela primeirava caso enfrente erros para o docker criar a network tente criar a network manualmente executando: `docker network create weather-forecast` e depois rode `docker-compose up` novamente.

