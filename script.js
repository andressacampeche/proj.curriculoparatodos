/**********************************
 * FORMULÁRIO – ADIÇÃO DE CAMPOS
 **********************************/

let contadorFormacao = 0;
let contadorExperiencia = 0;
let contadorExtracurricular = 0;

// FORMAÇÃO
function adicionarFormacao() {
  contadorFormacao++;

  const div = document.createElement("div");
  div.classList.add("bloco-formacao");

  div.innerHTML = `
    <hr>
    <label>Curso:</label>
    <input type="text" name="curso_${contadorFormacao}" required>

    <label>Instituição:</label>
    <input type="text" name="instituicao_${contadorFormacao}" required><br>

    <label>Data de conclusão:</label>
    <input type="date" name="conclusao_${contadorFormacao}" required>

    <button type="button" onclick="this.parentElement.remove()">Remover</button>
  `;

  document.getElementById("formacoes").appendChild(div);
}

// EXPERIÊNCIA PROFISSIONAL
function adicionarExperiencia() {
  contadorExperiencia++;

  const div = document.createElement("div");
  div.classList.add("bloco-experiencia");

  div.innerHTML = `
    <hr>
    <div class="form-espaco"></div>
    <div class="linha-form sem-quebra">

    <label>Tipo:</label>
    <select name="tipo_experiencia_${contadorExperiencia}" required>
      <option value="">SELECIONE</option>
      <option value="Emprego">Emprego</option>
      <option value="Estágio">Estágio</option>
    </select>

    <label>Cargo:</label>
    <input type="text" name="cargo_${contadorExperiencia}" required>

    </div>

    <label>Empresa:</label>
    <input type="text" name="empresa_${contadorExperiencia}" required><br>

    <label>Data de início:</label>
    <input type="date" name="inicio_${contadorExperiencia}" required>

    <label>Data de conclusão:</label>
    <input type="date" name="fim_${contadorExperiencia}" required><br>

    <label>Descrição das atividades:</label>
    <i class="fa fa-exclamation-circle info_icon"
       data-info="Descreva até 3 atividades principais. Use frases curtas e objetivas, iniciando com verbos de ação.">
    </i><br>

    <textarea name="atividades_${contadorExperiencia}" required></textarea><br>

    <button type="button" onclick="this.parentElement.remove()">Remover</button>
  `;

  document.getElementById("experiencias").appendChild(div);
}

// FORMAÇÃO EXTRACURRICULAR
function adicionarExtracurricular() {
  contadorExtracurricular++;

  const div = document.createElement("div");
  div.classList.add("bloco-extracurricular");

  div.innerHTML = `
    <hr>
    <div class="form-espaco"></div>
    <div class="linha-form sem-quebra">

    <label>Tipo:</label>
    <select name="tipo_extracurricular_${contadorExtracurricular}" required>
      <option value="" selected>SELECIONE</option>
      <option value="acao_social">Ação social</option>
      <option value="curso">Curso</option>
      <option value="competicao">Competição</option>
      <option value="evento">Evento</option>
      <option value="exposicao">Exposição</option>
      <option value="iniciacao">Iniciação científica</option>
      <option value="intercambio">Intercâmbio</option>
      <option value="mentoria">Mentoria</option>
      <option value="minicurso">Minicurso</option>
      <option value="oficina">Oficina</option>
      <option value="palestra">Palestra</option>
      <option value="proj_comunitario">Projeto comunitário</option>
      <option value="proj_extensao">Projeto de extensão</option>
      <option value="proj_pesquisa">Projeto de pesquisa</option>
      <option value="trab_voluntario">Trabalho voluntário</option>
      <option value="workshop">Workshop</option>
    </select>

    <label>Título:</label>
    <input type="text" name="titulo_${contadorExtracurricular}" required><br>

    </div>

    <label>Instituição:</label>
    <input type="text" name="instituicao_${contadorExtracurricular}" required>

    <label>Carga horária:</label>
    <input type="number" name="carga_${contadorExtracurricular}" required><br>

    <label>Descrição:</label>
    <textarea name="descricao_${contadorExtracurricular}" required></textarea><br>

    <button type="button" onclick="this.parentElement.remove()">Remover</button>
  `;

  document.getElementById("extracurricular").appendChild(div);
}

/**********************************
 * TOOLTIP (INFO ICON)
 **********************************/

const tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.innerHTML = `
  <span class="fechar">✕</span>
  <span class="texto"></span>
`;
document.body.appendChild(tooltip);

const textoTooltip = tooltip.querySelector(".texto");
const fecharTooltip = tooltip.querySelector(".fechar");

function isMobile() {
  return window.innerWidth <= 768;
}

/* ===== DESKTOP (HOVER) ===== */
document.addEventListener("mouseover", e => {
  if (!isMobile() && e.target.classList.contains("info_icon")) {
    textoTooltip.textContent = e.target.dataset.info;
    tooltip.style.display = "block";

    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = rect.bottom + window.scrollY + 8 + "px";
    tooltip.style.left = rect.left + window.scrollX + "px";
  }
});

document.addEventListener("mouseout", e => {
  if (!isMobile() && e.target.classList.contains("info_icon")) {
    tooltip.style.display = "none";
  }
});

/* ===== CELULAR (CLIQUE) ===== */
document.addEventListener("click", e => {
  if (e.target.classList.contains("info_icon")) {
    textoTooltip.textContent = e.target.dataset.info;

    if (isMobile()) {
      tooltip.style.top = "";
      tooltip.style.left = "";
    }

    tooltip.style.display = "block";
  }
});

/* ===== FECHAR ===== */
fecharTooltip.addEventListener("click", () => {
  tooltip.style.display = "none";
});

/***********************************
 * FORMATAÇÃO DA DATA PARA RETORNAR
 * APENAS MÊS E ANO
***********************************/
function formatarMesAno(data) {
  if (!data) return "";

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const [ano, mes] = data.split("-");
  return `${meses[parseInt(mes) - 1]}/${ano}`;
}
/* CALCULAR SOMENTE A QUANTIDADE DE MESES TRABALHADOS */
function calcularMesesTrabalhados(inicio, fim) {
  if (!inicio || !fim) return "";

  const inicioDate = new Date(inicio);
  const fimDate = new Date(fim);

  let meses =
    (fimDate.getFullYear() - inicioDate.getFullYear()) * 12 +
    (fimDate.getMonth() - inicioDate.getMonth());

  if (meses < 0) meses = 0;

  if (meses >= 12) {
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;

    if (resto === 0) return `${anos} ano${anos > 1 ? "s" : ""}`;
    return `${anos} ano${anos > 1 ? "s" : ""} e ${resto} mes${resto > 1 ? "es" : ""}`;
  }

  return `${meses} mes${meses > 1 ? "es" : ""}`;
}
/**********************************
 * MONTAGEM DO CURRÍCULO
 **********************************/
function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, "");

  if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  if (telefone.length === 10) {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return telefone; // fallback
}

function montarCurriculo() {
  document.getElementById("cv-nome").innerText =
    document.getElementById("nome").value;

  document.getElementById("cv-cargo").innerText =
    document.getElementById("cargo").value;

  const telefone1 = document.getElementById("telefone1").value;
  const telefone2 = document.getElementById("telefone2").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const bairro = document.getElementById("bairro").value;

  let contato = `${cidade} - ${estado} | ${bairro} 
  ${email} | ${formatarTelefone(telefone1)}`;

  // ✅ só adiciona o segundo telefone se existir
  if (telefone2.trim() !== "") {
    contato += ` | ${formatarTelefone(telefone2)}`;
  }

  document.getElementById("cv-contato").innerText = contato;

  document.getElementById("cv-objetivo").innerText =
    document.getElementById("objetivos").value;
}

// FORMAÇÃO
function montarFormacoes() {
  const container = document.getElementById("cv-formacoes");
  container.innerHTML = "";

  document.querySelectorAll(".bloco-formacao").forEach(bloco => {
    const curso = bloco.querySelector('input[name^="curso"]').value;
    const inst = bloco.querySelector('input[name^="instituicao"]').value;
    const data = bloco.querySelector('input[name^="conclusao"]').value;

    const dataFormatada = formatarMesAno(data);

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${curso}</strong><br>
      ${inst} — Conclusão ${dataFormatada}
      <p>`;

    container.appendChild(div);
  });
}
// EXPERIÊNCIA
function montarExperiencias() {
  const container = document.getElementById("cv-experiencias");
  container.innerHTML = "";

  const experiencias = document.querySelectorAll(".bloco-experiencia");

  // Se não houver experiências, esconde a seção
  if (experiencias.length === 0) {
    container.parentElement.style.display = "none";
    return;
  }

  container.parentElement.style.display = "block";

  experiencias.forEach(bloco => {
    const tipo = bloco.querySelector('select[name^="tipo_experiencia"]')?.value || "";
    const cargo = bloco.querySelector('input[name^="cargo"]')?.value || "";
    const empresa = bloco.querySelector('input[name^="empresa"]')?.value || "";
    const inicio = bloco.querySelector('input[name^="inicio"]')?.value || "";
    const fim = bloco.querySelector('input[name^="fim"]')?.value || "";
    const atividades = bloco.querySelector('textarea[name^="atividades"]')?.value || "";

    // ignora bloco vazio
    if (!cargo && !empresa) return;

    temExperienciaValida = true;

    const duracao = calcularMesesTrabalhados(inicio, fim);

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${cargo}</strong> — ${empresa}<br>
      ${tipo ? `${tipo} | ` : ""}${duracao}<br>
      ${atividades}
      <p>
    `;

    container.appendChild(div);
  });

  // ✅ se não houver nenhuma experiência válida, some com a seção
  if (!temExperienciaValida) {
    secao.style.display = "none";
  } else {
    secao.style.display = "block";
  }
}




// EXTRACURRICULAR
function montarExtracurricular() {
  const container = document.getElementById("cv-extracurricular");
  const secao = document.getElementById("secao-extracurricular");

  container.innerHTML = "";

  const blocos = document.querySelectorAll(".bloco-extracurricular");

  // ❌ Se não houver nenhuma formação extracurricular
  if (blocos.length === 0) {
    secao.style.display = "none";
    return;
  }

  // ✅ Se houver pelo menos uma
  secao.style.display = "block";

  blocos.forEach(bloco => {
    const selectTipo = bloco.querySelector("select");
    const tipo = selectTipo.options[selectTipo.selectedIndex].text;

    const titulo = bloco.querySelector('input[name^="titulo"]').value;
    const inst = bloco.querySelector('input[name^="instituicao"]').value;
    const carga = bloco.querySelector('input[name^="carga"]').value;
    const desc = bloco.querySelector("textarea").value;

    container.innerHTML += `
      <p>
        <strong>${titulo}</strong> — ${inst}<br>
        ${tipo} | ${carga}h<br>
        ${desc}
      </p>
      <p>`;
  });
}

/**********************************
 * GERAÇÃO DO PDF
 **********************************/

function gerarPDF() {
  const curriculo = document.getElementById("curriculo");
  curriculo.style.display = "block";

  html2pdf()
    .from(curriculo)
    .set({
      filename: "curriculo.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .save()
    .then(() => {
      curriculo.style.display = "none";
    });
}

/**********************************
 * SUBMIT DO FORMULÁRIO
 **********************************/

document.querySelector(".formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  montarCurriculo();
  montarFormacoes();
  montarExperiencias();
  montarExtracurricular();

  gerarPDF();
});

/* MOSTRAR E ESCONDER SECOES */

function mostrarSecao(id) {
  const secoes = document.querySelectorAll('.secao');
  const header = document.getElementById('header-principal');
  const footer = document.getElementById('rodape');

  // Esconde todas as seções
  secoes.forEach(secao => secao.classList.remove('ativa'));

  // Mostra a seção clicada
  document.getElementById(id).classList.add('ativa');

  // Controle do menu
  if (id === 'secao1') {
    header.style.display = 'none';
    footer.style.display = 'none'
  } else {
    header.style.display = 'block';
    footer.style.display = 'block'
  }
}
