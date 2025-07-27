Fullstack Developer - Tasks
==========
### Setup środowiska

  1. Skonfiguruj sobie lokalny serwer (np. Apache) pod development; ustaw vHosta tak, żeby pod wybraną domeną pokazywał na odpowiedni katalog na dysku (tj. katalog `public/` z repo) - przykład poniżej:

        ```
        <VirtualHost *:80>
            # Root - katalog /public z repozytorium z Github
            DocumentRoot "C:/xampp/htdocs/recruitment_task_fullstack/public/"
            # domena lokalna
            ServerName 127.0.0.1:8000
        </VirtualHost>
        ```
  1. Zainstaluj paczki composera i npm (`$ composer install && npm install`).
  1. Zbuduj appkę frontową w trybie watch (`$ npm run watch --dev`).
  1. Uruchom serwer symfony `symfony server:start`.

### Setup środowiska za pomocą dockera

  1. Uruchom komendę: `docker compose up -d`.
  1. Pod adresem  `127.0.0.1:8000` powinna uruchomić się aplikacja.
