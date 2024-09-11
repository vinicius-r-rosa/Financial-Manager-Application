# Requisitos

## Descrição do Projeto

Imagine uma aplicação de gerenciamento financeiro onde os dados dos clientes e suas transações são essenciais para a análise de desempenho e comportamento dos clientes. A aplicação permite que os administradores filtrem os registros de transações com base em vários critérios, como nome do cliente e intervalo de datas.

O objetivo é desenvolver uma aplicação web que permita a filtragem de dados de clientes conforme os requisitos abaixo. A aplicação deve incluir tanto o backend quanto o frontend.

- Os administradores podem selecionar um ou mais nomes de clientes para visualizar apenas as transações associadas a esses clientes específicos.
  Exemplo: Filtrar todas as transações de "Maria Silva" e "João Santos".

- Os administradores podem especificar um intervalo de datas (data inicial e final) para visualizar transações que ocorreram dentro desse período.
  Exemplo: Filtrar transações entre "2023-01-01" e "2023-03-31".

- Os administradores podem comparar os resultados com outros filtros semelhantes para analisar tendências e padrões.
  Exemplo: Comparar transações de "Maria Silva" entre "2023-01-01" e "2023-03-31" com transações de "João Santos" no mesmo período.

- Os administradores devem ser capazes de criar filtros predefinidos, que possam ser salvos e reutilizados posteriormente. Esses filtros predefinidos devem conter um nome personalizado definido pelo administrador e utilizar os mesmos critérios de filtragem (nome do cliente, intervalo de datas e comparativos).

### Requisitos do Projeto

#### Filtro 1

- **Campo de Filtragem Múltiplo por Nome de Cliente**: Permitir a seleção de um ou mais nomes de clientes para filtragem.
- **Campo de Filtragem por Intervalo de Data**: Permitir a busca de dados dentro de um intervalo de data especificado (data inicial e data final).

##### Filtro 2

- **Campos Opcionais Comparativos**: Incluir campos opcionais que permitam comparar os resultados utilizando os mesmos critérios do primeiro filtro.

##### Filtro Predefinido

- **Criação de Filtros Predefinidos**: Permitir que os administradores criem e salvem filtros predefinidos, utilizando os mesmos critérios do Filtro 1 (e Filtro 2 se for comparativo), e associando um nome personalizado ao filtro.
- **Reutilização de Filtros Predefinidos**: Permitir que os administradores apliquem os filtros predefinidos a qualquer momento.

#### Funcionalidades Esperadas

- **Backend**: Desenvolver os endpoints necessários que retornem dados falsos fornecidos.
- **Frontend**: Criar a interface do usuário que inclua os filtros e exiba os dados filtrados.

#### Tecnologias Desejadas no Desenvolvimento

- **Backend**: Python/Django
- **Frontend**: React/Typescript e Styled-Components

### Instruções Adicionais

1. **Backend**:

   - Configure uma API utilizando Django que forneça endpoints para os filtros descritos.
   - Retorne dados falsos fornecidos pela aplicação para simular a resposta dos filtros.

2. **Frontend**:

   - Crie uma interface com React e Styled-Components que permita ao usuário aplicar os filtros descritos, além de criar e reutilizar filtros predefinidos.
   - Liberdade criativa para exibir os dados da melhor maneira.
