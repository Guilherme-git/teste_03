<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset("css/index.css")}}">
    <title>Teste 03</title>
</head>
<body>
<meta name="csrf-token" content="{{ csrf_token() }}">

<div style="display: flex; flex-direction: row; justify-content: space-between; width: 300px;">
    <input type="text" id="cep" maxlength="8" placeholder="Informe seu cep">
    <button class="btnSearch"><b>Pesquisar</b></button>
</div>


<table id="t">
    <thead>
    <tr>
        <th>CEP</th>
        <th>Logradouro</th>
        <th>Bairro</th>
        <th>Localidade</th>
        <th>UF</th>
        <th>Complemento</th>
        <th>IBGE</th>
        <th>GIA</th>
        <th>DDD</th>
        <th>Siafi</th>
    </tr>
    </thead>
    <tbody class="tbody">

    </tbody>

</table>

<div style="display: flex; flex-direction: row; justify-content: space-between; width: 250px;">
    <button class="export"><b>Exportar informações</b></button>
    <button class="clean"><b>Limpar tabela</b></button>
</div>


<script src="{{asset("js/index.js")}}"></script>
</body>
</html>
