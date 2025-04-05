# Lumi Energy Bill Processor - Frontend

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?logo=typescript)
![Recharts](https://img.shields.io/badge/Recharts-2.7.0-22B5BF)

Interface de usuário para o sistema de processamento e análise de faturas de energia elétrica da Lumi.

## 🚀 Configuração e Execução

### Pré-requisitos

- Node.js (v16+)
- Yarn ou npm
- Backend em execução (consulte o [README do backend](../backend/README.md))

### Instalação

Clone o repositório e navegue até a pasta do frontend:

```bash
# Clone o projeto
git clone https://github.com/rodrigobarros2/lumi-front.git

# Entre no diretório do projeto
cd lumi-front
```

Instale as dependências:

```bash
# Usando Yarn (recomendado)
yarn install

# OU usando npm
npm install
```

### Configuração do ambiente

Coloquei no projeto para facilitar a execução

### Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
# Usando Yarn (recomendado)
yarn dev

# OU usando npm
npm run dev
```

O frontend estará disponível em [http://localhost:5173](http://localhost:5173)

## 🧪 Testes

Execute os testes unitários:

```bash
# Usando Yarn (recomendado)
yarn test

# OU usando npm
npm test
```
## 📱 Build para produção

Para gerar a versão de produção:

```bash
# Usando Yarn (recomendado)
yarn build

# OU usando npm
npm run build
```

Os arquivos serão gerados na pasta `dist/`, prontos para serem implantados em qualquer servidor web estático.

## 📋 Funcionalidades principais

- **Dashboard**: Visualização de consumo e economia
  - Gráficos de consumo de energia vs. energia compensada
  - Gráficos financeiros: valor sem GD vs. economia GD
  - Cards de resumo com totais
  
- **Biblioteca de Faturas**: Gerenciamento completo
  - Listagem e filtragem por cliente/período
  - Visualização detalhada de cada fatura
  - Download de PDFs originais

## 🛠️ Tecnologias utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/) (visualização de dados)
- [React Query](https://tanstack.com/query) (gerenciamento de estado da API)
- [Axios](https://axios-http.com/) (cliente HTTP)
- [Vitest](https://vitest.dev/) (testes)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📁 Estrutura de diretórios

```
frontend/
├── public/          # Recursos estáticos
├── src/
│   ├── assets/      # Imagens e recursos
│   ├── components/  # Componentes reutilizáveis
│   ├── hooks/       # Custom hooks
│   ├── pages/       # Páginas da aplicação
│   ├── services/    # Serviços e API
│   ├── types/       # Definições de tipos
│   ├── utils/       # Funções utilitárias
│   ├── App.tsx      # Componente principal
│   └── main.tsx     # Ponto de entrada
├── tests/           # Arquivos de teste
├── .env.example     # Exemplo de variáveis de ambiente
├── package.json     # Dependências e scripts
├── tsconfig.json    # Configuração do TypeScript
└── vite.config.ts   # Configuração do Vite
```

## 🔧 Scripts disponíveis

| Comando         | Descrição                                       |
|-----------------|--------------------------------------------------|
| `yarn dev`      | Inicia o servidor de desenvolvimento            |
| `yarn build`    | Gera a versão de produção                       |
| `yarn preview`  | Inicia um servidor local com a versão de build  |
| `yarn test`     | Executa os testes unitários                     |
| `yarn lint`     | Executa a verificação de linting                |
| `yarn format`   | Formata o código com Prettier                   |

## 🔍 Solução de problemas comuns

### API não está respondendo

Verifique se:
1. O backend está rodando na porta correta
2. A URL da API no arquivo `.env` está configurada corretamente

### Erros de dependência

Se encontrar problemas com versões de pacotes:

```bash
# Limpe o cache do Yarn
yarn cache clean

# Reinstale as dependências
rm -rf node_modules
yarn install
```
