const cep = document.getElementById('cep')
const button_search = document.getElementsByClassName('btnSearch')
const button_clean = document.getElementsByClassName('clean')
const button_export = document.getElementsByClassName('export')
var tbody = document.getElementsByClassName('tbody')[0]

popularTable();

button_search[0].addEventListener("click", function () {
    const cepValue = cep.value

    if (cepValue == "") {
        return alert("Informe seu cep")
    }
    if (!isValidatedCep(cepValue)) {
        return alert("Informe um cep válido")
    }

    search(cepValue)
});

button_clean[0].addEventListener("click", function () {
    localStorage.removeItem("values")
    tbody.innerHTML="";
});

button_export[0].addEventListener("click", function () {
    if(!localStorage.getItem("values")) {
        return alert("Nenhuma informação encontrada");
    }
    fetch(`/export`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({
            values: localStorage.getItem("values")
        })
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
           alert(response.message)
        })
});

function search(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            return response.json()
        })
        .then(response => {
            if(response.erro) {
                return alert("CEP não encontrado")
            }
            const newRow = tbody.insertRow(tbody.rows.length)
            newRow.innerHTML = "<tr>" +
                "<td>" + response.cep + "</td>" +
                "<td>" + response.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.complemento .normalize('NFD').replace(/[\u0300-\u036f]/g, "")+ "</td>" +
                "<td>" + response.ibge + "</td>" +
                "<td>" + response.gia + "</td>" +
                "<td>" + response.ddd + "</td>" +
                "<td>" + response.siafi + "</td>" +
                "</tr>";

            local = JSON.parse(localStorage.getItem("values"));

            if(!local) {
                localStorage.setItem("values", JSON.stringify([{
                    "cep": response.cep,
                    "logradouro": response.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "bairro": response.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "localidade": response.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "uf": response.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "complemento": response.complemento.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "ibge": response.ibge,
                    "gia": response.gia,
                    "ddd": response.ddd,
                    "siafi": response.siafi,
                }]))
            } else {
                local.push({
                    "cep": response.cep,
                    "logradouro": response.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "bairro": response.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "localidade": response.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "uf": response.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "complemento": response.complemento.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "ibge": response.ibge,
                    "gia": response.gia,
                    "ddd": response.ddd,
                    "siafi": response.siafi,
                })
                localStorage.setItem("values", JSON.stringify(local))
            }

            console.log(`RESULTADO DA API VIACEP:` )
            console.log(response)
        })
}

function popularTable() {
    local = JSON.parse(localStorage.getItem("values"));
    if(local) {
        local.forEach(function (item) {
            tbody.innerHTML += "<tr>" +
                "<td>" + item.cep + "</td>" +
                "<td>" + item.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + item.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + item.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + item.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + item.complemento.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + item.ibge + "</td>" +
                "<td>" + item.gia + "</td>" +
                "<td>" + item.ddd + "</td>" +
                "<td>" + item.siafi + "</td>" +
                "</tr>";
        })
    }
}

function isValidatedCep(value) {
    const cep = value.replace(/\D/g, '');

    if (cep != "") {
        const regex = /^[0-9]{8}$/;
        return regex.test(value)
    }

}
