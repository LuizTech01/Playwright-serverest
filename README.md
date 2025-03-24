# Playwright-serverest

Este projeto tem como objetivo automatizar as funcionalidades de **registro**, **login** e **cadastro de novos usuários** no site [https://front.serverest.dev/](https://front.serverest.dev/) utilizando o **Playwright**.

## Funcionalidades

O projeto é composto pelas seguintes funcionalidades automatizadas:

1. **Registro**: Automação do processo de registro de um novo usuário.
2. **Login**: Automação para realizar login com um usuário registrado.
3. **Cadastro de Novo Usuário como Admin**: Realiza o cadastro de um novo usuário com privilégios de administrador.

## Requisitos

Certifique-se de que seu ambiente de desenvolvimento atenda aos seguintes requisitos:

- **Node.js** >= 16
- **Playwright**
- Dependências do Playwright (instaladas via `npm` ou `yarn`)

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/LuizTech01/Playwright-serverest.git
   ```

2. **Instale as dependências:**

   Navegue até o diretório do projeto e execute:

   ```bash
   cd seu_repositorio
   npm install
   ```

3. **Instale o Playwright e configure os navegadores:**

   Execute o seguinte comando para instalar o Playwright e os navegadores necessários:

   ```bash
   npx playwright install
   ```

## Como Usar

Siga os passos abaixo para executar os testes de automação no seu ambiente:

1. **Configuração do Playwright**

   Certifique-se de que o Playwright está instalado corretamente. Para isso, execute:

   ```bash
   npx playwright install
   ```

2. **Executar os testes de automação**

   Para rodar os testes de automação (registro, login e cadastro de usuários), execute o comando:

   ```bash
   npx playwright test
   ```

   Isso executará os testes definidos no Playwright, automatizando as funcionalidades mencionadas no site.

OBS: caso queira testar os arquivos de teste lembre-se de comentar o beforeEach ou excluir o usuario para evitar conflitos e consequentemente erros nos testes.