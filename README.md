
# Programação para Web Designers

Este repositório faz parte da disciplina Programação para Web Designers do Curso de Sistemas para Internet, e contém um projeto de site fictício chamado **AcessaWeb**, cujo negócio é a venda de acessibilidade para outros sites. São usadas as seguintes tecnologias:
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [jQuery](https://jquery.com/)
- [AJAX](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Network_requests)
- Widget [VLibras](https://vlibras.gov.br/doc/widget/introduction/presentation.html)
- Back end em Java Spring Boot, disponibilizado [aqui](https://github.com/w2costa/todo-with-auth.git)

## Estrutura do repositório
```text
repositório/
├── README.md
│
├── index.html
│
├── componentes.html
│
├── configuracoes.html
│
├── login.html
│
├── menu.html
│
├── solucoes.html
│
├── tarefas.html
│
│
├── styles/
│   ├── style.css
|   └── tailwind-config.js
│
│
├── scripts/
│   ├── app.js
│   ├── carrega-tema.js
│   ├── componentes.js
│   ├── configuracoes.js
│   ├── contato.js
│   ├── menu.js
│   └── tarefas.js
│
│
├── img/
│   ├── icon.svg
│   ├── pagina1.png
│   ├── pagina2.png
│   ├── pagina3.png
│   ├── pagina4.png
│   ├── img1.png
│   ├── img2.png
│   ├── img3.png
│   ├── img4.png
│   ├── img5.png
│   ├── img6.png
│   ├── img7.png
│   ├── img8.png
│   └── img9.png
```

## Como usar

- [Crie um fork](https://github.com/gvtenberg/AcessaWeb/fork) deste repositório para o seu GitHub 
- Crie uma chave SSH na sua máquina com os seguintes comandos em um Terminal Linux:
```bash
  cd ~/.ssh
  ssh-keygen -o -t rsa -C "seu.email@exemplo.com"
```
- Confirme todas as perguntas com Enter, não precisa digitar nada. Em seguida use o seguinte comando para mostrar a chave pública gerada:
```bash
  cat id_rsa.pub
```
- Copie a chave mostrada no comando anterior e cole em uma nova chave SSH na página do GitHub, menu Settings e SSH and GPG keys.
- Selecione a pasta onde ficará o repositório clonado e abra o Terminal nesta pasta. Na página do seu repositório clonado, clique em Code, Local, SSH e copie o endereço que aparece. No terminal, digite o comando a seguir com o endereço SSH do seu repositório:
```bash
  git clone git@github.com:gvtenberg/AcessaWeb.git
```
- Substitua o ```git@github.com:gvtenberg/AcessaWeb.git``` pelo endereço copiado do seu repositório no GitHub. Note que após os ```:``` aparece o seu usuário no GitHub (no meu caso, ```gvtenberg```).
- Edite os arquivos da maneira que bem entender, [valide-os na W3C](https://validator.w3.org/#validate_by_input+with_options), e salve-os no seu repositório do GitHub com os seguintes comandos:
```bash
  git add .
  git commit -m "Comentário a respeito das modificações realizadas"
  git push
```
- Pronto! Seu repositório no GitHub está atualizado!

- Acesse seu site em ```seuUsuario.github.io/AcessaWeb```, onde ```seuUsuario``` é o seu usuário no GitHub.


## Autor

- [@gvtenberg](https://www.github.com/gvtenberg)
