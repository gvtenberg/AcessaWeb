# AcessaWeb

Projeto desenvolvido para a disciplina **Programação para Web Designers**, do curso de Sistemas para Internet.

O **AcessaWeb** é o site de uma empresa fictícia que oferece soluções de acessibilidade para outros sites e produtos digitais.

Além das páginas informativas, o projeto possui personalização visual, login, logout e uma lista de tarefas conectada a um backend em Java com Spring Boot.

---

## Funcionalidades

O site possui:

* página inicial de apresentação;
* página com as soluções oferecidas pela empresa;
* página de personalização visual;
* seis paletas de cores prontas;
* criação de paleta personalizada;
* alteração do tipo e do tamanho da fonte;
* armazenamento das preferências no navegador;
* aviso sobre o uso do armazenamento local;
* layout responsivo para computador, tablet e celular;
* menu compartilhado entre as páginas;
* formulário de contato demonstrativo;
* widget VLibras;
* login e logout;
* lista de tarefas;
* criação, edição e exclusão de tarefas;
* separação das tarefas de acordo com o usuário autenticado.

---

## Tecnologias utilizadas

### Frontend

* [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
* [Tailwind CSS](https://tailwindcss.com/)
* [jQuery](https://jquery.com/)
* [AJAX](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Network_requests)
* Widget [VLibras](https://vlibras.gov.br/doc/widget/introduction/presentation.html)

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Banco de dados H2
* API REST

O backend original utilizado neste projeto está disponível em:

https://github.com/w2costa/todo-with-auth

---

## Aviso de uso educacional

Este projeto foi desenvolvido exclusivamente para fins educacionais e de demonstração acadêmica.

O código não foi projetado, revisado ou testado para uso em ambiente de produção. Antes de utilizar qualquer parte deste projeto em um sistema real, é necessário realizar uma análise completa de segurança, privacidade, desempenho, acessibilidade, boas práticas, armazenamento de dados e configuração do servidor.

O autor não se responsabiliz por falhas, perda de dados, vulnerabilidades, indisponibilidade, acessos não autorizados ou quaisquer outros danos causados pelo uso total ou parcial deste projeto em ambiente de produção.

### Uso do Tailwind CSS

Neste projeto, o Tailwind CSS é carregado diretamente no navegador por meio de CDN, sem um processo de compilação ou build.

Essa forma de uso foi escolhida para facilitar o desenvolvimento e a apresentação acadêmica, mas não é recomendada para sistemas em produção.

Em um projeto real, o recomendado é instalar o Tailwind CSS no ambiente de desenvolvimento e utilizar um processo de build para gerar somente as classes necessárias, reduzir o tamanho dos arquivos e melhorar o desempenho, a segurança e a manutenção do sistema.

---

## Como o projeto funciona?

O frontend é formado por arquivos HTML, CSS e JavaScript.

As páginas de apresentação, soluções e personalização funcionam diretamente no navegador.

As preferências de paleta, fonte e tamanho do texto são guardadas no `localStorage`. Isso faz com que as escolhas continuem aplicadas mesmo depois que o navegador é fechado e aberto novamente.

As páginas de conta e tarefas dependem do backend.

Quando o usuário faz login, o Spring Security cria uma sessão e envia ao navegador um cookie chamado `JSESSIONID`.

Nas requisições que alteram informações, como criar, editar ou excluir uma tarefa, também é enviado um token de proteção CSRF.

O frontend se comunica com o backend usando AJAX com jQuery.

O fluxo básico é:

```text
Frontend
   ↓
Usuário envia login e senha
   ↓
Spring Security verifica os dados
   ↓
Backend cria uma sessão
   ↓
Navegador guarda o cookie da sessão
   ↓
Frontend acessa a API de tarefas
   ↓
Backend mostra apenas as tarefas do usuário autenticado
```

---

## Estrutura do frontend

```text
AcessaWeb/
├── README.md
│
├── index.html
├── componentes.html
├── configuracoes.html
├── login.html
├── menu.html
├── solucoes.html
├── tarefas.html
│
├── styles/
│   ├── style.css
│   └── tailwind-config.js
│
├── scripts/
│   ├── app.js
│   ├── autenticacao.js
│   ├── carrega-tema.js
│   ├── componentes.js
│   ├── configuracoes.js
│   ├── contato.js
│   ├── login.js
│   ├── menu.js
│   └── tarefas.js
│
└── img/
    ├── icon.svg
    ├── pagina1.png
    ├── pagina2.png
    ├── pagina3.png
    ├── pagina4.png
    ├── img1.png
    ├── img2.png
    ├── img3.png
    ├── img4.png
    ├── img5.png
    ├── img6.png
    ├── img7.png
    ├── img8.png
    └── img9.png
```

---

## Responsabilidade dos principais arquivos

### Arquivos HTML

| Arquivo              | Responsabilidade                                                             |
| -------------------- | ---------------------------------------------------------------------------- |
| `index.html`         | Página inicial, apresentação do projeto e formulário de contato.             |
| `solucoes.html`      | Apresenta os serviços, etapas de trabalho, entregas e depoimentos fictícios. |
| `configuracoes.html` | Permite alterar paleta, fonte e tamanho do texto.                            |
| `login.html`         | Permite entrar, consultar o estado da sessão e sair da conta.                |
| `tarefas.html`       | Contém a interface da lista de tarefas.                                      |
| `menu.html`          | Contém o menu carregado nas páginas do site.                                 |
| `componentes.html`   | Contém o rodapé, o aviso de armazenamento local e o botão do WhatsApp.       |

### Arquivos CSS

| Arquivo              | Responsabilidade                                                       |
| -------------------- | ---------------------------------------------------------------------- |
| `style.css`          | Estilos personalizados, paletas, responsividade e componentes visuais. |
| `tailwind-config.js` | Configurações adicionais utilizadas pelo Tailwind CSS.                 |

### Arquivos JavaScript

| Arquivo            | Responsabilidade                                                         |
| ------------------ | ------------------------------------------------------------------------ |
| `carrega-tema.js`  | Aplica as preferências visuais antes de a página aparecer.               |
| `app.js`           | Controla preferências globais e o aviso de armazenamento local.          |
| `menu.js`          | Carrega o menu e controla sua abertura em telas menores.                 |
| `componentes.js`   | Carrega o rodapé e os demais componentes compartilhados.                 |
| `configuracoes.js` | Salva e aplica paleta, fonte e tamanho do texto.                         |
| `contato.js`       | Controla o formulário de contato e suas mensagens.                       |
| `autenticacao.js`  | Centraliza login, logout, sessão, cookies e token CSRF.                  |
| `login.js`         | Controla o formulário e a área da conta.                                 |
| `tarefas.js`       | Faz o cadastro, carregamento, edição e exclusão das tarefas usando AJAX. |

---

## O que é necessário instalar?

Para executar o projeto localmente, você precisará de:

* um navegador atualizado;
* [Visual Studio Code](https://code.visualstudio.com/) ou outro editor;
* extensão **Live Server** no Visual Studio Code;
* Git, caso queira clonar os repositórios;
* Java JDK compatível com o backend;
* Maven ou o Maven Wrapper que acompanha o backend.

O Git não é obrigatório quando os projetos são baixados como arquivo ZIP.

---

# Baixando o frontend

Existem duas formas simples de obter o projeto.

## Opção 1 — Baixar como ZIP

1. Abra o repositório do AcessaWeb no GitHub.
2. Clique no botão **Code**.
3. Clique em **Download ZIP**.
4. Extraia o arquivo baixado.
5. Abra a pasta extraída no Visual Studio Code.

## Opção 2 — Clonar com Git

Abra um terminal na pasta em que deseja guardar o projeto e execute:

```bash
git clone https://github.com/gvtenberg/AcessaWeb.git
```

Depois, entre na pasta:

```bash
cd AcessaWeb
```

Criar um fork é opcional. O fork é útil quando você pretende salvar suas próprias alterações em outro repositório do GitHub.

---

# Baixando o backend

O backend utilizado pelo projeto está disponível em:

https://github.com/w2costa/todo-with-auth

## Opção 1 — Baixar como ZIP

1. Abra o link do backend.
2. Clique no botão **Code**.
3. Clique em **Download ZIP**.
4. Extraia o arquivo baixado.
5. Abra a pasta extraída em uma IDE compatível com Java.

Algumas opções de IDE são:

* IntelliJ IDEA;
* Eclipse;
* Spring Tool Suite;
* Visual Studio Code com extensões para Java.

## Opção 2 — Clonar com Git

Abra um terminal e execute:

```bash
git clone https://github.com/w2costa/todo-with-auth.git
```

Depois, entre na pasta:

```bash
cd todo-with-auth
```

---

# Preparando o backend

O backend original possui sua própria interface.

Neste projeto, o frontend é aberto separadamente pelo Live Server. Por isso, precisamos permitir que o navegador faça requisições entre portas diferentes.

Normalmente, os endereços utilizados serão:

```text
Frontend: http://localhost:5500
Backend:  http://localhost:8080
```

Essa permissão é chamada de **CORS**.

A alteração necessária deve ser feita no arquivo:

```text
src/main/java/com/example/todo_with_auth/config/SecurityConfig.java
```

> As instruções abaixo consideram a estrutura original do repositório do backend.

---

## Passo 1 — Adicionar os imports

Abra `SecurityConfig.java`.

No início do arquivo, junto com os outros imports, adicione:

```java
import java.util.List;

import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
```

Não apague os imports que já existem.

---

## Passo 2 — Criar a configuração de CORS

Dentro da classe `SecurityConfig`, localize o método:

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

Logo depois dele e antes do método `filterChain()`, adicione:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration =
            new CorsConfiguration();

    configuration.setAllowedOriginPatterns(
            List.of(
                    "http://localhost:*",
                    "http://127.0.0.1:*"
            )
    );

    configuration.setAllowedMethods(
            List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
            )
    );

    configuration.setAllowedHeaders(
            List.of(
                    "Content-Type",
                    "X-XSRF-TOKEN",
                    "X-Requested-With"
            )
    );

    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration(
            "/**",
            configuration
    );

    return source;
}
```

A linha abaixo é muito importante:

```java
configuration.setAllowCredentials(true);
```

Ela permite que o navegador envie o cookie da sessão para o backend.

Sem essa configuração, o login pode até ser enviado, mas a sessão não será usada corretamente nas requisições seguintes.

---

## Passo 3 — Ativar o CORS no Spring Security

Ainda em `SecurityConfig.java`, localize este trecho:

```java
http
        .csrf((csrf) -> csrf
```

Substitua por:

```java
http
        .cors(Customizer.withDefaults())
        .csrf((csrf) -> csrf
```

Não apague as configurações que já existem dentro de:

* `csrf`;
* `authorizeHttpRequests`;
* `formLogin`;
* `logout`;
* `exceptionHandling`.

A alteração apenas ativa a configuração de CORS que foi criada no passo anterior.

---

## Passo 4 — Salvar e reiniciar

Depois das alterações:

1. salve o arquivo `SecurityConfig.java`;
2. pare o backend, caso ele esteja rodando;
3. inicie o backend novamente.

Essas são as únicas modificações necessárias no backend para que ele se comunique com o frontend local.

---

# Iniciando o backend

Abra um terminal dentro da pasta do backend.

## Linux ou macOS

Caso o projeto tenha o Maven Wrapper, execute:

```bash
./mvnw spring-boot:run
```

## Windows

Execute:

```powershell
mvnw.cmd spring-boot:run
```

## Quando o Maven estiver instalado

Também é possível executar:

```bash
mvn spring-boot:run
```

Outra opção é abrir o projeto em uma IDE e executar a classe principal do Spring Boot usando o botão **Run**.

Quando o backend iniciar corretamente, ele deverá ficar disponível em:

```text
http://localhost:8080
```

Não feche o terminal enquanto estiver usando o login ou a lista de tarefas.

---

# Iniciando o frontend

1. Abra a pasta do AcessaWeb no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito no arquivo `index.html`.
4. Clique em **Open with Live Server**.

O endereço normalmente será:

```text
http://localhost:5500/index.html
```

A porta pode mudar, por exemplo, para `5501`.

A configuração de CORS aceita qualquer porta em `localhost`.

Não abra o site clicando diretamente no arquivo HTML e usando um endereço iniciado por:

```text
file://
```

Algumas funcionalidades que carregam arquivos compartilhados podem não funcionar dessa forma.

Também é recomendado usar o mesmo nome de host nos dois projetos:

```text
Frontend: http://localhost:5500
Backend:  http://localhost:8080
```

Evite usar:

```text
Frontend: http://127.0.0.1:5500
Backend:  http://localhost:8080
```

Misturar `localhost` e `127.0.0.1` pode causar problemas com cookies e sessão.

---

# Conferindo o endereço do backend

No frontend, abra o arquivo:

```text
scripts/autenticacao.js
```

Confira se a constante do backend está assim:

```javascript
const BASE_URL = 'http://localhost:8080';
```

Esse endereço é usado para:

* obter o token CSRF;
* realizar login;
* realizar logout;
* consultar a sessão;
* criar tarefas;
* editar tarefas;
* excluir tarefas.

Caso o backend esteja rodando em outra porta, altere essa constante.

---

# Fazendo login

O backend cria automaticamente um usuário de demonstração:

```text
Usuário: admin
Senha: 123456
```

Para entrar:

1. abra a página **Conta**;
2. digite `admin` no campo de usuário;
3. digite `123456` no campo de senha;
4. clique em **Entrar**.

Depois do login, o navegador guarda o cookie da sessão.

Não é necessário copiar ou editar o cookie manualmente.

As credenciais acima servem apenas para demonstração e não devem ser usadas em um sistema real publicado.

---

# Testando a lista de tarefas

Depois de realizar o login:

1. abra a página **Tarefas**;
2. cadastre uma nova tarefa;
3. atualize a página;
4. confirme que a tarefa continua aparecendo;
5. edite a tarefa;
6. clique em **Atualizar lista**;
7. exclua a tarefa;
8. volte para a página **Conta**;
9. clique em **Sair da conta**.

As tarefas são armazenadas no banco H2 usado pelo backend.

Cada tarefa fica associada ao usuário que estava autenticado no momento de sua criação.

---

# Testando a personalização

Na página **Personalização**, teste:

* as seis paletas prontas;
* a paleta personalizada;
* os tipos de fonte;
* os tamanhos de texto;
* o botão para restaurar as configurações padrão.

Depois, feche e abra o navegador novamente.

As preferências devem continuar aplicadas porque são salvas no `localStorage`.

---

# Problemas comuns

## Não foi possível conectar ao servidor

Confira se o backend está rodando em:

```text
http://localhost:8080
```

O terminal do backend deve continuar aberto.

---

## Erro de CORS no console

Confira se:

* os imports foram adicionados ao `SecurityConfig.java`;
* o método `corsConfigurationSource()` foi criado;
* `.cors(Customizer.withDefaults())` foi adicionado;
* `setAllowCredentials(true)` está presente;
* o backend foi reiniciado depois da alteração;
* o frontend está sendo aberto pelo Live Server.

---

## Erro 401

O código `401` normalmente significa que:

* o usuário ainda não realizou login;
* a sessão expirou;
* o cookie da sessão não foi enviado.

Abra a página **Conta** e faça login novamente.

---

## Erro 403

O código `403` pode indicar um problema com o token CSRF.

Atualize a página e tente novamente.

Caso o erro continue, confira se:

* `autenticacao.js` é carregado antes de `login.js`;
* `autenticacao.js` é carregado antes de `tarefas.js`;
* o backend e o frontend estão usando `localhost`;
* a configuração de CORS permite o cabeçalho `X-XSRF-TOKEN`.

---

## O menu ou o rodapé não aparecem

Confira se o frontend está sendo aberto pelo Live Server.

Os arquivos `menu.html` e `componentes.html` são carregados por JavaScript e podem não funcionar quando a página é aberta diretamente pelo endereço `file://`.

---

## A página aparece sem estilos

Confira se os caminhos abaixo continuam corretos:

```text
styles/style.css
styles/tailwind-config.js
scripts/
img/
```

Também confira se o computador possui acesso à internet, pois o Tailwind CSS e o jQuery são carregados por CDN.

---

# Publicação no GitHub Pages

O GitHub Pages consegue hospedar o frontend porque ele é formado por arquivos estáticos.

O endereço normalmente será:

```text
https://seuUsuario.github.io/AcessaWeb/
```

Porém, o login e a lista de tarefas não funcionarão para outras pessoas enquanto o backend estiver disponível apenas em:

```text
http://localhost:8080
```

Para publicar o sistema completo, seria necessário:

1. hospedar o backend em um servidor público;
2. alterar `BASE_URL` em `scripts/autenticacao.js`;
3. ajustar o CORS do backend para permitir o endereço do GitHub Pages;
4. verificar a configuração de cookies e HTTPS.

Para apresentar o trabalho localmente, basta executar:

```text
Frontend pelo Live Server
Backend pelo Spring Boot
```

---

# Salvando alterações com Git

Depois de modificar o projeto, use:

```bash
git add .
git commit -m "Descrição das alterações realizadas"
git push
```

Exemplo:

```bash
git add README.md
git commit -m "Atualiza instruções de instalação e execução"
git push
```

---

# Validação

É recomendado validar os arquivos HTML usando:

https://validator.w3.org/

Também é útil:

* abrir o console do navegador;
* verificar se não existem erros em vermelho;
* testar o site em diferentes larguras;
* testar login, logout e tarefas;
* testar o site com o backend desligado;
* testar as opções de personalização.

---

# Autor

* [@gvtenberg](https://github.com/gvtenberg)