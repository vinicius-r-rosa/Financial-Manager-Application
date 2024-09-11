# Financial Manager Application - Server

> Este é o README do servidor do projeto. Aqui você encontrará informações sobre como configurar e executá-lo além da estruturação do projeto.
> OBSERVAÇÃO: Para o pleno funcionamento da aplicação, é necessário que o frontend e o backend estejam rodando SIMULTANEAMENTE.

O projeto foi desenvolvido utilizando Django e Django Rest Framework para a criação de uma API RESTful que fornece os dados necessários para a aplicação frontend.

A aplicação contém um script de inicialização que popula o banco de dados com dados falsos da pasta /docs/data que servem ao frontend.

O servidor está estruturado da seguinte forma:

- /financial_manager_api: pasta criada automaticamente pelo Django durante a inicialização do projeto. Nela estão contidos os arquivos de configuração do Django, rotas, etc.
- /transactions: pasta com os arquivos de configuração do aplicativo de transações. Nela estão contidos os modelos, serializers, views e urls além de contém o script de inicialização do banco de dados nas subpastas management/commands e migrations.

## Pré-requisitos

- Python 3.11+
- Python Package Installer (PIP)

> OBS: Para instalar o Python e o PIP, utilize seu método favorito. Recomendo seguir a documentação: [Downloading and installing Python](https://www.python.org/downloads/)

## Iniciando o projeto pela primeira vez

> Na primeira vez que for iniciar o projeto é necessário criar um ambiente virtual e instalar as dependências do Python.

Para fazer isso:

1. Crie o arquivo `.env` na pasta `/server` com base no arquivo `.env.example`. Preencha as variáveis de ambiente com as informações necessárias;
2. Abra um terminal, seja Linux, CMD, PowerShell;
3. Vá até a pasta "/server";
4. Digite o comando: `python -m venv venv`
5. Ative o ambiente virtual:
   - No Linux: `source venv/bin/activate`
   - No Windows: `.\venv\Scripts\activate`
6. Instale as dependências: `pip install -r requirements.txt`
7. Execute as migrações: `python manage.py migrate`
8. Execute o script de inicialização: `python manage.py populate_db`

## Rodando o projeto localmente

Para rodar o projeto localmente:

1. Abra um terminal, seja Linux, CMD, PowerShell;
2. Vá até a pasta "/server";
3. Ative o ambiente virtual:
   - No Linux: `source venv/bin/activate`
   - No Windows: `.\venv\Scripts\activate`
4. Execute o comando: `python manage.py runserver`

Aguarde a inicialização do projeto e automaticamente o servidor será iniciado.
