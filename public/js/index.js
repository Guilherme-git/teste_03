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
    fetch(`/search`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({
            cep: cep
        })
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.message.erro) {
                return alert("CEP não encontrado")
            }
            const newRow = tbody.insertRow(tbody.rows.length)
            newRow.innerHTML = "<tr>" +
                "<td>" + response.message.cep + "</td>" +
                "<td>" + response.message.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.message.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.message.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.message.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + "</td>" +
                "<td>" + response.message.complemento .normalize('NFD').replace(/[\u0300-\u036f]/g, "")+ "</td>" +
                "<td>" + response.message.ibge + "</td>" +
                "<td>" + response.message.gia + "</td>" +
                "<td>" + response.message.ddd + "</td>" +
                "<td>" + response.message.siafi + "</td>" +
                "</tr>";

            local = JSON.parse(localStorage.getItem("values"));

            if(!local) {
                localStorage.setItem("values", JSON.stringify([{
                    "cep": response.message.cep,
                    "logradouro": response.message.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "bairro": response.message.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "localidade": response.message.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "uf": response.message.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "complemento": response.message.complemento.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "ibge": response.message.ibge,
                    "gia": response.message.gia,
                    "ddd": response.message.ddd,
                    "siafi": response.message.siafi,
                }]))
            } else {
                local.push({
                    "cep": response.message.cep,
                    "logradouro": response.message.logradouro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "bairro": response.message.bairro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "localidade": response.message.localidade.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "uf": response.message.uf.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "complemento": response.message.complemento.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    "ibge": response.message.ibge,
                    "gia": response.message.gia,
                    "ddd": response.message.ddd,
                    "siafi": response.message.siafi,
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
