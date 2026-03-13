# Atlantis

O Atlantis é um sistema de gestão para parques aquáticos, clubes e hotéis, criado para cadastrar clientes e seus dependentes. Utilizando o padrão de design "protótipo", o sistema armazena informações como endereço e telefone de maneira eficiente. A primeira versão do projeto foca na criação de um módulo simples e funcional, com a intenção de facilitar a administração desses estabelecimentos.

## Requisitos para rodar

### 1) Git
Necessário para clonar o repositório.

Como verificar se já tem instalado:

```bash
git --version
```

Se aparecer uma versão (ex.: `git version 2.x.x`), está OK.

### 2) Node.js (LTS)
Necessário para executar JavaScript no terminal.

Como verificar:

```bash
node -v
```

Se aparecer uma versão (ex.: `v20.x.x`), está OK.

### 3) npm
Gerenciador de pacotes que vem junto com o Node.js.

Como verificar:

```bash
npm -v
```

Se aparecer uma versão numérica, está OK.

### 4) TypeScript (via projeto)
Este projeto é escrito em `.ts` e precisa ser compilado para `.js`.

Observação:
- O TypeScript já está configurado no projeto em `devDependencies`.
- Ao executar `npm install`, ele será instalado automaticamente.

Como verificar depois da instalação:

```bash
npx tsc -v
```

Se aparecer uma versão do TypeScript, está OK.

## Como rodar o projeto (partindo do GitHub)

Repositório:

```text
https://github.com/SarahBatagioti/AV1-TPII
```

### 1) Clonar o repositório

```bash
git clone https://github.com/SarahBatagioti/AV1-TPII.git
```

### 2) Entrar na pasta do projeto

```bash
cd AV1-TPII
```

### 3) Instalar dependências do projeto

```bash
npm install
```

### 4) Compilar TypeScript para JavaScript

```bash
npx tsc
```

Saída esperada:
- Os arquivos compilados serão gerados na pasta `js`.

### 5) Executar o projeto

```bash
node js/teste/index.js
```
