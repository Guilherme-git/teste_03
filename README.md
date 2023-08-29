# teste 03

Este teste realiza uma consulta na api viacep, trazendo as informações do endereço do usuário de acordo com o cep informado por ele no **_input_**.


No teste consta uma tabela para armazenar as pesquisas feitas pelo cep e também um input html para o usuário digitar o cep.

No momento que o usuário terminar de digitar o cep, e clicar no botão de cor verde chamado **PESQUISAR**, é feita uma validação se o cep não está vazio e se o cep informado é valido. Caso tudo ocorrer bem, é então realizada a consulta no viacep utilizando o fetch, caso o cep não seja encontrado, é mostrada a mensagem para o usuário, caso o cep for encontrado, é mostrado dentro da tabela as informações retornadas da api, que também é salva no localsotorage do navegador, para o usuário não perdê-las caso atualizar a página.

---

## Descrição dos métodos criados no arquivo javascript

### Método *search(cep)* - Esse método é responsável por realizar a consulta na api viacep utilizando o fetch. Caso o cep não seja encontrado, é mostrada uma mensagem para o usuário. Se tudo ocorrer como o previsto, é inserido na tabela html, as informações retornadas da api e também é salvo essas informações no localstorage do navegador

### > Método *popularTable()* - Esse método é resposável por consultar o localstorage do navegador quando o usuário entrar na página, e carregar a tabela html com as informações salvas

### Método *isValidatedCep(cep)* - Esse método é resposável por validar se o cep informado no input é válido.

---

## Descrição dos métodos criados no controller chamado IndexController

### Método *export(Request $request)* - Esse método é responsável por criar um arquivo **.csv** com todas as consultas por cep realizadas pelo usuário. Ao ser realizada a criação do arquivo, é mostrada uma mensagem para o usuário. O arquivo se encontra dentro da pasta **PUBLIC/** do projeto laravel

---

## Descrição das funcionalidades dos botões

### Botão *Pesquisar* - Esse botão é reponsável por chamar o método search(cep) que realizara a consulta na api viacep, e também validar se o cep informado é válido e se ele esta preenchido

### Botão *Exportar informações* - Esse botão é responsável enviar para o IndexController dentro método export() todas as informações armazenadas no localstorage para ser criado o arquivo .csv. Caso não haver nenhuma informações salva no localstorage é mostrada uma mensagem para o usuário.

### Botão *Limpar tabela* -- Esse botão é responsável por limpar o localstorage, e com isso é removida as informações na tabela html

