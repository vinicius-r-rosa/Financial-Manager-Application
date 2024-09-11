# Financial Manager Application - Frontend

> Este é o README do frontend do projeto. Aqui você encontrará informações sobre como configurar e executar o frontend além da estruturação do projeto.
> OBSERVAÇÃO: Para o pleno funcionamento da aplicação, é necessário que o frontend e o backend estejam rodando SIMULTANEAMENTE.

O frontend foi desenvolvido utilizando React e Typescript. Juntamente ferramentas auxiliares como:

- Styled-Components para estilização dos componentes.
- Axios para requisições HTTP.
- Create React App para a inicialização do projeto e webpack.
- Prettier para padronização do código.

A aplicação é responsável por exibir a interface do usuário, permitindo a aplicação dos filtros descritos na documentação.

O frontend está estruturado da seguinte forma:

- /public: pasta com arquivos estáticos da aplicação.
- /src: pasta com o código fonte da aplicação.
  - /components: pasta com os componentes da aplicação.
  - /pages: pasta com as páginas da aplicação.
  - /services: pasta com os serviços da aplicação.
  - /styles: pasta com os estilos globais da aplicação.
  - /utils: pasta com funções utilitárias da aplicação, definições de interfaces, contantes e tipos do TS.
  - App.tsx: arquivo principal da aplicação.
  - index.tsx: arquivo de inicialização da aplicação.

## Pré-requisitos

- Node v22.0.0+
- Node Package Manager (NPM)

> OBS: Para instalar o Node e o NPM, utilize seu método favorito. Recomendo seguir a documentação: Downloading and installing Node.js and npm

## Iniciando o projeto pela primeira vez

Na primeira vez que for iniciar o projeto é necessário instalar os pacotes npm.

Para fazer isso:

1. Abra um terminal, seja Linux, CMD, PowerShell;
2. Vá até a pasta "/frontend";
3. Digite o comando: `npm install`

## Rodando o projeto localmente

Para rodar o projeto localmente:

1. Abra um terminal, seja Linux, CMD, PowerShell;
2. Vá até a pasta "/frontend";
3. Digite o comando: `npm run start`

Aguarde a inicialização do projeto e automaticamente o navegador será aberto com a aplicação rodando.

### Scripts disponíveis no package.json

#### `npm run start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

#### `npm run build`

Compila o aplicativo para produção na pasta `build`.\
Ele empacota corretamente o React no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!

##### Saiba mais sobre o CRA

Documentação do CRA: [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Documentação oficial do React: [React documentation](https://reactjs.org/).