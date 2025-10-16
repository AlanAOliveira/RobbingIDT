
function addCount(input) {
    item = document.getElementById(input)
    if (item.value == '') {
        item.value = 1
    } else {
        item.value++
    }
}

function subCount(input) {
    item = document.getElementById(input)
    if (item.value == '') {
        item.value = 0
    } else {
        item.value--
    }
}

function poste() {
    yourUrl = ""
    value = "OLOCO"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.response);
        }
    }
}

function PegaLista() {
    yourUrl = ""
    value = "getLista"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById("listapecas").innerHTML = xhr.response
        }
    }
}

function PegaListaSingle() {
    yourUrl = ""
    value = "getListaSingle"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById("listapecas").innerHTML = xhr.response
        }
    }
}



function salvaLista(numlista) {

    console.log(numlista)
    var listaString = $("#formLista").serializeArray()


    yourUrl = ""
    value = "salvaLista"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value,
        dados: listaString
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById("listapecas").innerHTML = xhr.response
        }
    }
}

function salvaListaSingle() {

    var listaString = $("#formLista").serializeArray()


    yourUrl = ""
    value = "salvaListaSingle"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value,
        dados: listaString
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById("listapecas").innerHTML = xhr.response
        }
    }
}

function relatorioFinal() {
    yourUrl = ""
    value = "relatorioFinal"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //document.getElementById("status").innerHTML = xhr.response
        }
    }
}

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);
    html5QrcodeScanner.clear();
}

function readpartnumber(texto) {
    texto = texto.toUpperCase()
    regras = [["TKM - India", 96, 16, 30],
    ["TKM - India", 95, 16, 30],
    ["TKM - India", 97, 16, 30, 14],
    ["TMNA - EUA", 250, 1, 15, 14],
    ["TLI - Filipinas", 74, 0, 11, 12],
    ["TLI - Filipinas", 73, 0, 11, 12],
    ["TLI - Filipinas", 78, 0, 11, 12],
    ["TLI - Filipinas", 68, 0, 11, 12],
    ["TLI - Filipinas", 70, 0, 11, 12],
    ["TMT - Tailândia", 166, 27, 39, 12],
    ["TMC - Japão", 152, 64, 76, 12],
    ["TMMIN - Indonésia", 134, 51, 65, 14],
    ["Tshusho - Taiwan", 106, 0, 11],
    ["Kuo - Kuozui", 66, 0, 11],
    ["Kuo - Kuozui", 91, 44, 56, 12],
    ["UMWT - Malásia", 109, 17, 27, 10],
    ["TMV - Vietnam", 24, 7, 17, 10],
    ["TME TK - Bélgica", 14, 0, 14, 14],
    ["Tshusho - China", 14, 0, 11, 4],
    ["Tshusho - Japão", 14, 0, 11, 14],
    ["Tshusho - México", 12, 0, 11]]
    check = 0
    newregra = ["Vazio", 0, 0, 0]
    partnumber = ""
    regras.forEach(element => {
        if (texto.length == element[1] && check == 0) {
            newregra = element
            console.log(newregra[0])
            check = 1
        }
    });


    if (check == 0) {
        console.log(`regra nao encontradas para texto tamanho${texto.lenght}`)
    }


    if (check == 1) {
        if (newregra[4] == 14) {
            partnumber = texto.slice(newregra[2], newregra[3])
        }
        if (newregra[4] == 12) {
            partnumber = texto.slice(newregra[2], newregra[2] + 5)
            partnumber = partnumber + "-" + texto.slice(newregra[2] + 5, newregra[2] +
                10)
            partnumber = partnumber + "-" + texto.slice(newregra[2] +
                10, newregra[2] + 12)
        }

        if (newregra[4] == 11) {
            partnumber = texto.slice(newregra[2], newregra[2] + 5)
            partnumber = partnumber + "-" + texto.slice(newregra[2] + 5, newregra[2] +
                10)
            partnumber = partnumber + "-00"
        } if (newregra[4] == 10) {
            partnumber = texto.slice(newregra[2], newregra[2] + 5)
            partnumber = partnumber + "-" + texto.slice(newregra[2] + 5, newregra[2] +
                10)
            partnumber = partnumber + "-00"
            console.log(`partnumber: ${partnumber}`)
        }
        //  for peca in sqlite.Pecas:
        //      if peca["PartNumber"] == partnumber:
        //          console.log(peca["PartName "])
    }

    return partnumber
}

function getPartNumber(partnumber) {
    yourUrl = ""
    value = "getPartNumber"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value,
        dados: partnumber
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            try {
                info = JSON.parse(xhr.response)
                document.getElementById("showPartName").innerText = `Part Name: ${info["PartName"]}`
                document.getElementById("showModDestino").innerText = `Colocar essa caixa no modulo: ${info["Destino"]}`
                document.getElementById("showModDestinoCor").classList.value = `fs-big bg-${info["Destino"].slice(3, 5)}`
                document.getElementById("showModDestinoCor").innerText = `${info["Destino"].slice(3, 5)}`
            } catch (error) {
                document.getElementById("showModDestinoCor").innerText = `Erro`
            }
        }
    }
}

function insertPartNumber(partnumber, modnumber) {
    yourUrl = ""
    value = "getPartNumber"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value,
        dados: partnumber
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            info = JSON.parse(xhr.response)
            if (modnumber.substring(0, 5) == info["Destino"]) {
                caixasEstufadas.push([modnumber, partnumber])
                contadorDeCaixas++
                document.getElementById("contador").innerText = `Caixas no Modulo: ${contadorDeCaixas}`
                document.getElementById("listaCaixas").innerHTML =
                    `<li id="pn_${caixasEstufadas.length}" class="list-group-item">PN: ${partnumber} <button onclick="itemDelete('pn_${caixasEstufadas.length}',${caixasEstufadas.length})" type="button" class="btn btn-danger">X</button></li>` +
                    document.getElementById("listaCaixas").innerHTML
                document.getElementById('campoEstufaPart').value = ""
                document.getElementById('campoEstufaPart').focus()
            } else {
                document.getElementById('campoEstufaPart').value = ""
                document.getElementById('campoEstufaPart').focus()
                alert("partnumber inconpativel com esse modulo")
            }


        }
    }
}



function fechaModulo() {
    console.log(caixasEstufadas)

    yourUrl = ""
    value = "fechaModulo"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value,
        dados: caixasEstufadas
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            info = JSON.parse(xhr.response)
            console.log(info["Destino"])
            caixasEstufadas = []
            document.getElementById("listaCaixas").innerHTML = ""
            contadorDeCaixas = 0
            document.getElementById("contador").innerText = `Caixas no Modulo: ${contadorDeCaixas}`

            return info["Destino"]
        }
    }
}

function updateDataBase() {
    yourUrl = ""
    value = 'updateDataBase'

    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        function: value
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            info = JSON.parse(xhr.response)
            console.log(info)
        }
    }
}

function itemDelete(id, index) {
    item = document.getElementById(id)
    item.remove()
    caixasEstufadas[index - 1] = ['-', '-']
    contadorDeCaixas--
    document.getElementById("contador").innerText = `Caixas no Modulo: ${contadorDeCaixas}`

}

const form = document.getElementById('formPartNumber');

if (form != null) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var campo = document.getElementById('campoPartNumber');
        var partnumber = readpartnumber(campo.value);
        campo.value = partnumber;
        getPartNumber(partnumber)
        campo.focus()
        campo.value = ""
    });

}

const form2 = document.getElementById('formEstufaMod');

var caixasEstufadas = []
var contadorDeCaixas = 0

if (form2 != null) {
    form2.addEventListener('submit', function (event) {
        event.preventDefault();
        var estufaMod = document.getElementById('campoEstufaMod');
        var estufaPart = document.getElementById('campoEstufaPart');
        //console.log(readpartnumber(estufaPart.value))
        estufaPart.value = readpartnumber(estufaPart.value)
        insertPartNumber(estufaPart.value, estufaMod.value)
    });
}
