let quiz = {}
let pontos = 0
let pergunta = 1
let resposta = ""
let idInputResposta = ""
let respostaCorretaId = ""

async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quiz.forEach(dado => {
            quiz = dado
        })
    })
}

function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = `
            <section class="pergunta">
                <p>Pergunta ${pergunta}/5</p>
                
                <div class="barra_progresso">
                    <div style = "width: ${pergunta * 20}%"></div>
                </div>

                <h2></h2>

                <h2>${quiz.questions[pergunta-1].question}</h2>
                
            </section>

            <section class="alternativas">
                <form action="">
                    <label for="alternativa_a">
                        <input type="radio" id="alternativa_a" name="alternativa" value="${quiz.questions[pergunta-1].options[0]}">
                        <div>
                            ${quiz.questions[pergunta-1].options[0]}
                        </div>
                    </label>

                    <label for="alternativa_b">
                        <input type="radio" id="alternativa_b" name="alternativa" value="${quiz.questions[pergunta-1].options[1]}">

                        <div>
                            ${quiz.questions[pergunta-1].options[1]}
                        </div>
                    </label>

                    <label for="alternativa_c" >
                        <input type="radio" id="alternativa_c" name="alternativa" value="${quiz.questions[pergunta-1].options[2]}">

                        <div>
                            ${quiz.questions[pergunta-1].options[2]}
                        </div>
                    </label>

                    <label for="alternativa_d">
                        <input type="radio" id="alternativa_d" name="alternativa" value="${quiz.questions[pergunta-1].options[3]}">

                        <div>
                            ${quiz.questions[pergunta-1].options[3]}    
                        </div>
                    </label>

                </form>
                
                <a href="">
                    <button>Responder</button>
                </a>

            </section>
        `
}

function guardarResposta(evento) {
    resposta = evento.target.value
    idInputResposta = evento.target.id

    const botaoEnviar = document.querySelector(".alternativas button")
    botaoEnviar.addEventListener("click", validarResposta)
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".alternativas button")
    botaoEnviar.innerText = "Próxima"
    botaoEnviar.removeEventListener("click", validarResposta)
    

    if (pergunta === 5) {
        botaoEnviar.innerText = "Finalizar"
        botaoEnviar.addEventListener("click", finalizar)
    } else {
        botaoEnviar.addEventListener("click", proximaPergunta)
    }

    if (resposta === quiz.questions[pergunta-1].answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta")
        pontos = pontos + 1  
    } else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id","errada")
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id","correta")
    }

    
    event.preventDefault();
    pergunta = pergunta + 1
}

function finalizar() {
    localStorage.setItem("pontos", pontos)

    window.location.href = "../ranking/ranking.html"
    event.preventDefault();
}

function proximaPergunta() {
    event.preventDefault();
    montarPergunta()
    adicionarEventoInputs()
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input")
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta)

        if (input.value === quiz.questions[pergunta-1].answer) {
            respostaCorretaId = input.id
        }
    })
}

async function getName() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/getname", {
            headers: {
                "Authorization": token,
            },
        });

        if (!response.ok) {
            throw new Error("Falha ao buscar nome do usuário.");
        }

        const data = await response.json();
        const nameP = document.querySelector(".user p");

        if (nameP) {
            nameP.innerText = `Usuário: ${data.name}`;
        }
    } catch (error) {
        console.error("Erro ao buscar o nome:", error);
    }
}
 
async function iniciar() {
    await buscarPerguntas()
    montarPergunta()
    adicionarEventoInputs()
    
    getName();

}

iniciar()