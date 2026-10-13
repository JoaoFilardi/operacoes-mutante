const fs = require('fs');
const { execSync } = require('child_process');

const initImgBase64 = fs.readFileSync('reports/stryker_initial_report.png').toString('base64');
const finalImgBase64 = fs.readFileSync('reports/stryker_final_report.png').toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Teste de Mutação - StrykerJS</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      font-size: 8.3pt;
      line-height: 1.35;
    }

    .page {
      page-break-after: always;
      break-after: page;
      position: relative;
      height: 275mm;
      max-height: 275mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 1mm 0;
    }

    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Header & Cover */
    .cover-top {
      text-align: center;
      border-bottom: 2px solid #1e40af;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }
    .cover-top h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1f2937;
      letter-spacing: 0.5px;
    }
    .cover-top h4 {
      font-size: 9pt;
      font-weight: 500;
      color: #4b5563;
      margin-top: 2px;
    }

    .title-banner {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-left: 5px solid #2563eb;
      border-radius: 6px;
      padding: 16px 14px;
      margin: 10px 0 14px 0;
      text-align: center;
    }
    .title-banner h1 {
      font-size: 15.5pt;
      font-weight: 800;
      color: #1e3a8a;
      line-height: 1.25;
      margin-bottom: 5px;
    }
    .title-banner p {
      font-size: 9.2pt;
      font-weight: 600;
      color: #2563eb;
    }

    .id-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 10px 16px;
      margin-bottom: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 14px;
      font-size: 8.6pt;
    }
    .id-item {
      display: flex;
    }
    .id-label {
      font-weight: 700;
      color: #4b5563;
      width: 100px;
      flex-shrink: 0;
    }
    .id-val {
      color: #111827;
      font-weight: 500;
    }

    /* Headings */
    h2.sec-h {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e3a8a;
      border-bottom: 1.5px solid #3b82f6;
      padding-bottom: 2px;
      margin: 8px 0 5px 0;
      display: flex;
      align-items: center;
    }
    h2.sec-h::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 12px;
      background: #2563eb;
      margin-right: 6px;
      border-radius: 2px;
    }

    h3.sub-h {
      font-size: 9pt;
      font-weight: 700;
      color: #1f2937;
      margin: 5px 0 2px 0;
    }

    p {
      margin-bottom: 4.5px;
      text-align: justify;
    }

    /* Tables */
    table.data-tbl {
      width: 100%;
      border-collapse: collapse;
      margin: 5px 0 7px 0;
      font-size: 7.8pt;
    }
    table.data-tbl th, table.data-tbl td {
      border: 1px solid #d1d5db;
      padding: 3.5px 6px;
      text-align: center;
    }
    table.data-tbl th {
      background: #f3f4f6;
      font-weight: 700;
      color: #1f2937;
    }
    table.data-tbl tr:nth-child(even) { background: #f9fafb; }
    .c-green { color: #059669; font-weight: 700; }
    .c-red { color: #dc2626; font-weight: 700; }
    .c-blue { color: #2563eb; font-weight: 700; }

    /* Diffs & Code */
    .diff {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 7px;
      margin: 3px 0 4px 0;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 7.4pt;
      line-height: 1.3;
    }
    .diff-title {
      font-weight: 700;
      color: #475569;
      margin-bottom: 2px;
      font-size: 7pt;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 1px;
    }
    .diff-del { background: #fee2e2; color: #991b1b; padding: 1px 3px; display: block; border-radius: 2px; }
    .diff-ins { background: #dcfce7; color: #166534; padding: 1px 3px; display: block; border-radius: 2px; }
    
    .code-box {
      background: #f1f5f9;
      color: #0f172a;
      padding: 3px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 7.4pt;
      margin: 3px 0;
      border-left: 3px solid #3b82f6;
      white-space: pre-wrap;
    }

    /* Images */
    .fig {
      text-align: center;
      margin: 4px 0 5px 0;
    }
    .fig img {
      width: 78%;
      max-width: 480px;
      border: 1px solid #d1d5db;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .fig-cap {
      font-size: 7.2pt;
      color: #6b7280;
      margin-top: 2px;
      font-style: italic;
    }

    .alert-box {
      background: #eff6ff;
      border-left: 3.5px solid #2563eb;
      padding: 5px 8px;
      margin: 4px 0 5px 0;
      border-radius: 0 4px 4px 0;
      font-size: 7.8pt;
    }
    .alert-box strong { color: #1d4ed8; }

    ul, ol {
      margin-left: 15px;
      margin-bottom: 4px;
    }
    li { margin-bottom: 1.5px; }

    .foot-bar {
      margin-top: auto;
      text-align: center;
      font-size: 7.5pt;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
      padding-top: 3px;
    }
  </style>
</head>
<body>

  <!-- PÁGINA 1: CAPA + 1. INTRODUÇÃO E FUNDAMENTAÇÃO -->
  <div class="page">
    <div class="cover-top">
      <h3>UNIVERSIDADE FEDERAL DE MINAS GERAIS — UFMG</h3>
      <h4>Departamento de Ciência da Computação | Engenharia de Software</h4>
    </div>

    <div class="title-banner">
      <h1>Análise de Eficácia de Testes com Teste de Mutação</h1>
      <p>Avaliação, Diagnóstico e Aprimoramento de Suíte de Testes com StrykerJS</p>
    </div>

    <div class="id-card">
      <div class="id-item"><span class="id-label">Aluno:</span><span class="id-val">João Victor Filardi Souza Pinto</span></div>
      <div class="id-item"><span class="id-label">Matrícula:</span><span class="id-val">2021031920</span></div>
      <div class="id-item"><span class="id-label">Disciplina:</span><span class="id-val">Engenharia de Software (Testes de Software)</span></div>
      <div class="id-item"><span class="id-label">Ambiente:</span><span class="id-val">Node.js v24.15 | Jest v29.7 | StrykerJS v10.0</span></div>
      <div class="id-item" style="grid-column: span 2;">
        <span class="id-label">Repositório:</span>
        <span class="id-val"><a href="https://github.com/JoaoFilardi/operacoes-mutante" style="color:#2563eb; text-decoration:none;">https://github.com/JoaoFilardi/operacoes-mutante</a></span>
      </div>
    </div>

    <h2 class="sec-h">1. Introdução e Fundamentação Teórica</h2>
    <p>
      Na engenharia de software tradicional, a métrica de <strong>cobertura de código</strong> (<em>code coverage</em>) é amplamente empregada na indústria como principal indicador de maturidade de testes. No entanto, ela possui uma deficiência estrutural: mede apenas quais trechos de código foram <em>executados</em>, sem garantir que o seu comportamento foi <em>verificado</em> de fato. Testes cosméticos podem facilmente atingir 100% de cobertura de linhas enquanto mantêm asserções vazias, fracas ou incapazes de constatar falhas caso a lógica seja corrompida.
    </p>
    <p>
      O <strong>Teste de Mutação</strong> (<em>Mutation Testing</em>) aborda diretamente essa vulnerabilidade, atuando como o teste da própria qualidade dos testes. Ele opera aplicando operadores de mutação no código-fonte original para criar pequenos defeitos sintáticos artificiais denominados <strong>mutantes</strong> (por exemplo, invertendo operadores relacionais, trocando operadores aritméticos ou forçando condições booleanas a retornar <code>true</code> ou <code>false</code>).
    </p>
    <p>
      O ciclo do teste de mutação avalia a eficácia dos testes conforme o destino de cada mutante:
    </p>
    <ul>
      <li><strong>Mutante Morto (<em>Killed</em>):</strong> Pelo menos um teste da suíte falhou diante do código mutado. O oráculo de teste comprovou sensibilidade ao defeito inserido.</li>
      <li><strong>Mutante Sobrevivente (<em>Survived</em>):</strong> Toda a suíte de testes continuou passando com sucesso mesmo com o defeito inserido. Revela uma lacuna real na especificação ou no rigor das asserções.</li>
      <li><strong>Mutante sem Cobertura (<em>NoCoverage</em>):</strong> Nenhum teste executou a linha mutada, evidenciando trechos cegos na suíte.</li>
      <li><strong>Mutante Equivalente (<em>Equivalent</em>):</strong> Mutação sintática que mantém a exata mesma semântica comportamental da implementação original, sendo matematicamente impossível de matar por testes de caixa-preta.</li>
    </ul>
    <p>
      A métrica final é o <strong>Mutation Score</strong>, calculada pela razão entre os mutantes detectados (mortos + timeouts) e o total de mutantes válidos. O objetivo deste trabalho prático consiste em diagnosticar a biblioteca matemática <code>operacoes-mutante</code>, identificar as causas dos mutantes sobreviventes na suíte inicial, reestruturar os testes com o framework Jest e elevar o Mutation Score para além da meta de <strong>98%</strong>.
    </p>

    <div class="foot-bar">Página 1 de 4 — Relatório de Teste de Mutação | João Victor Filardi Souza Pinto</div>
  </div>

  <!-- PÁGINA 2: DIAGNÓSTICO INICIAL + MUTANTES CRÍTICOS (PARTE 1) -->
  <div class="page">
    <h2 class="sec-h">2. Diagnóstico Inicial da Suíte de Testes</h2>
    <p>
      A biblioteca em análise possui 50 funções aritméticas em <code>src/operacoes.js</code> e uma suíte inicial em <code>test/operacoes.test.js</code>. O StrykerJS foi configurado com o <code>@stryker-mutator/jest-runner</code> via <code>stryker.conf.json</code>.
    </p>
    <p>
      Inicialmente, geramos o relatório de cobertura de código do Jest (<code>npm test -- --coverage</code>), constatando indicadores aparentemente excelentes:
    </p>

    <table class="data-tbl">
      <thead>
        <tr>
          <th>Suíte de Testes</th>
          <th>% Instruções (Stmts)</th>
          <th>% Ramos (Branch)</th>
          <th>% Funções (Funcs)</th>
          <th>% Linhas (Lines)</th>
          <th>Testes Passando</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Suíte Inicial (Jest)</strong></td>
          <td>85.41%</td>
          <td>58.82%</td>
          <td class="c-green">100.00%</td>
          <td class="c-green">98.64%</td>
          <td>50 / 50 (100%)</td>
        </tr>
      </tbody>
    </table>

    <p>
      Contudo, a primeira análise de mutação com o StrykerJS (<code>npx stryker run</code>) desmistificou a qualidade da suíte: de 213 mutantes gerados, <strong>44 mutantes sobreviveram</strong> e <strong>12 não possuíam cobertura</strong>, resultando em um <strong>Mutation Score de apenas 73.71%</strong>:
    </p>

    <div class="fig">
      <img src="data:image/png;base64,${initImgBase64}" alt="Relatório Inicial StrykerJS - 73.71%">
      <div class="fig-cap">Figura 1: Relatório inicial do StrykerJS — Mutation Score de 73.71% com 44 mutantes sobreviventes e 12 sem cobertura.</div>
    </div>

    <div class="alert-box">
      <strong>Análise da Discrepância (Cobertura de 98.64% vs. Mutação de 73.71%):</strong>
      Mesmo com praticamente 99% das linhas de código exercitadas, mais de 26% das alterações lógicas e defeitos passaram despercebidos. A discrepância decorre de oráculos de teste extremamente frágeis: o teste original continha apenas 1 asserção rasa por função, utilizava <code>expect().toThrow()</code> sem verificar a mensagem de erro (permitindo mutantes de mensagem vazia) e testava apenas o caso feliz, sem testar ramos condicionais alternativos.
    </div>

    <h2 class="sec-h">3. Análise Detalhada de Mutantes Críticos Sobreviventes</h2>

    <h3 class="sub-h">3.1. Mutante Crítico 1: <code>isPar</code> e <code>isImpar</code> (Ausência de Oráculos Negativos)</h3>
    <p>
      Na função <code>isPar(n)</code> (linha 43), o mutador <code>ConditionalExpression</code> substituiu a verificação booleana por <code>return true;</code>:
    </p>
    <div class="diff">
      <div class="diff-title">[Survived] ConditionalExpression — src/operacoes.js:43:28</div>
      <span class="diff-del">- function isPar(n) { return n % 2 === 0; }</span>
      <span class="diff-ins">+ function isPar(n) { return true; }</span>
    </div>
    <p>
      <strong>Por que sobreviveu?</strong> O teste original avaliava unicamente: <code>expect(isPar(100)).toBe(true);</code>. Quando o Stryker alterou o código para retornar <code>true</code> de forma estática, o teste continuou passando! O teste nunca exercitou um número ímpar esperando <code>false</code>. O mesmo defeito ocorreu em <code>isImpar</code>, <code>isMaiorQue</code>, <code>isMenorQue</code> e <code>isDivisivel</code>.
    </p>

    <h3 class="sub-h">3.2. Mutante Crítico 2: <code>celsiusParaFahrenheit</code> (Elemento Absorvente Zero em Fórmulas)</h3>
    <p>
      Na conversão de escala termométrica (linha 93), o mutador <code>ArithmeticOperator</code> trocou divisões por multiplicações:
    </p>
    <div class="diff">
      <div class="diff-title">[Survived] ArithmeticOperator — src/operacoes.js:93:51</div>
      <span class="diff-del">- function celsiusParaFahrenheit(celsius) { return (celsius * 9/5) + 32; }</span>
      <span class="diff-ins">+ function celsiusParaFahrenheit(celsius) { return (celsius * 9 * 5) + 32; }</span>
    </div>
    <p>
      <strong>Por que sobreviveu?</strong> O teste original empregava como entrada 0 °C: <code>expect(celsiusParaFahrenheit(0)).toBe(32);</code>. Como zero é o elemento absorvente da multiplicação, (0 × 9 × 5) = (0 × 9 / 5) = 0, resultando invariavelmente em 0 + 32 = 32. O teste era incapaz de verificar os coeficientes de escala da fórmula física!
    </p>

    <div class="foot-bar">Página 2 de 4 — Relatório de Teste de Mutação | João Victor Filardi Souza Pinto</div>
  </div>

  <!-- PÁGINA 3: MUTANTES CRÍTICOS (PARTE 2) + SOLUÇÕES IMPLEMENTADAS -->
  <div class="page">
    <h3 class="sub-h">3.3. Mutante Crítico 3: <code>medianaArray</code> (Dados Pré-Ordenados e Ramos Ocultos)</h3>
    <p>
      Na função <code>medianaArray</code> (linha 109), os mutadores removeram o método <code>.sort()</code> e corromperam a ordenação:
    </p>
    <div class="diff">
      <div class="diff-title">[Survived] MethodExpression & ArrowFunction — src/operacoes.js:109:18</div>
      <span class="diff-del">- const sorted = [...numeros].sort((a, b) => a - b);</span>
      <span class="diff-ins">+ const sorted = [...numeros];</span>
    </div>
    <p>
      <strong>Por que sobreviveu?</strong> O teste original utilizava o array <code>[1, 2, 3, 4, 5]</code>, que <strong>já estava previamente ordenado</strong>. Sem a ordenação, a posição central continuava contendo 3. Além disso, por ter tamanho ímpar, o bloco par <code>if (sorted.length % 2 === 0)</code> nunca foi executado, gerando 4 mutantes sem cobertura no cálculo de média dos elementos centrais.
    </p>

    <h3 class="sub-h">3.4. Investigação Teórica: Mutantes Equivalentes em <code>fatorial</code></h3>
    <p>
      Na função <code>fatorial(n)</code> (linha 19), 4 mutantes sobreviveram mesmo após exaustivos testes com 0, 1, 2, 3, 4, 5 e negativos:
    </p>
    <div class="diff">
      <div class="diff-title">[Survived] ConditionalExpression & LogicalOperator — src/operacoes.js:19:7</div>
      <span class="diff-del">- if (n === 0 || n === 1) return 1;</span>
      <span class="diff-ins">+ if (false) return 1;  // ou: if (n === 0 && n === 1)</span>
    </div>
    <p>
      <strong>Demonstração de Equivalência Semântica:</strong> Analisando o código subsequente: <code>let resultado = 1; for (let i = 2; i <= n; i++) { resultado *= i; } return resultado;</code>. Se a cláusula de guarda for substituída por <code>false</code>:
    </p>
    <ul>
      <li>Para n = 0: a variável <code>resultado</code> inicia em 1. O laço avalia 2 ≤ 0 (falso) e não itera. Retorna 1.</li>
      <li>Para n = 1: o laço avalia 2 ≤ 1 (falso) e não itera. Retorna 1.</li>
      <li>Para n ≥ 2: o laço itera de 2 até n, calculando com exatidão n!.</li>
    </ul>
    <p>
      Logo, a cláusula <code>if (n === 0 || n === 1) return 1;</code> é código defensivo redundante. A implementação mutada gera a mesmíssima saída para qualquer entrada em ℕ. Trata-se de um <strong>Mutante Equivalente</strong> formal, que não pode ser morto por nenhuma asserção sem alteração do código-fonte.
    </p>

    <h2 class="sec-h">4. Solução Implementada e Fortalecimento da Suíte de Testes</h2>
    <p>
      Para matar todos os mutantes possíveis e maximizar a sensibilidade da suíte, reescrevemos integralmente os testes em <code>test/operacoes.test.js</code> estruturados em blocos com as seguintes diretrizes:
    </p>
    <ol>
      <li>
        <strong>Oráculos de Exceção Estritos:</strong> Substituição de <code>toThrow()</code> genérico por checagem da mensagem exata lançada (ex.: <code>.toThrow('Divisão por zero não é permitida.')</code>), matando 100% dos mutantes de <code>StringLiteral</code> que trocavam as mensagens por <code>""</code>.
      </li>
      <li>
        <strong>Classes de Equivalência e Análise de Valores Limites:</strong> Testes de saídas negativas e valores limítrofes:
        <div class="code-box">expect(isPar(100)).toBe(true);
expect(isPar(3)).toBe(false);   // Mata mutante "return true"
expect(isPar(0)).toBe(true);    expect(isPar(-2)).toBe(true);</div>
      </li>
      <li>
        <strong>Eliminação de Casos Neutros em Fórmulas:</strong> Inclusão de testes com temperaturas não nulas para <code>celsiusParaFahrenheit(100) -> 212</code> e -40 °C → -40 °F, garantindo a integridade dos operadores multiplicativos e divisivos.
      </li>
      <li>
        <strong>Arrays Heterogêneos e Desordenados:</strong> Para <code>medianaArray</code>, testamos arrays desordenados ímpares (<code>[5, 1, 3, 2, 4] -> 3</code>), desordenados pares (<code>[4, 1, 3, 2] -> 2.5</code>), ordenados pares (<code>[1, 2] -> 1.5</code>) e lançamento de erro para array vazio.
      </li>
      <li>
        <strong>Fronteiras Numéricas IEEE 754 (Zero Negativo em <code>clamp</code>):</strong> No JavaScript, <code>-0 < 0</code> é falso, mas <code>-0 <= 0</code> é verdadeiro! Exploramos essa propriedade com o <code>Object.is</code> do Jest para matar mutantes relacionais que sobreviviam com inteiros convencionais:
        <div class="code-box">expect(clamp(-0, 0, 10)).toBe(-0); // Mata mutante "valor <= min"
expect(clamp(0, -10, -0)).toBe(0);  // Mata mutante "valor >= max"</div>
      </li>
    </ol>

    <div class="foot-bar">Página 3 de 4 — Relatório de Teste de Mutação | João Victor Filardi Souza Pinto</div>
  </div>

  <!-- PÁGINA 4: RESULTADOS FINAIS, VALIDAÇÃO E CONCLUSÃO -->
  <div class="page">
    <h2 class="sec-h">5. Resultados Finais e Validação Quantitativa</h2>
    <p>
      Com os novos testes implementados, reexecutamos as ferramentas de análise para validar o aumento da qualidade:
    </p>

    <table class="data-tbl">
      <thead>
        <tr>
          <th>Métrica de Qualidade</th>
          <th>Suíte Inicial</th>
          <th>Suíte Aprimorada</th>
          <th>Evolução Obtida</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cobertura de Linhas (Lines)</strong></td>
          <td>98.64%</td>
          <td class="c-green">100.00%</td>
          <td>+1.36% (Cobertura Total)</td>
        </tr>
        <tr>
          <td><strong>Cobertura de Ramos (Branch)</strong></td>
          <td>58.82%</td>
          <td class="c-green">100.00%</td>
          <td>+41.18% (Todos os ramos testados)</td>
        </tr>
        <tr>
          <td><strong>Cobertura de Instruções (Stmts)</strong></td>
          <td>85.41%</td>
          <td class="c-green">100.00%</td>
          <td>+14.59% (100% atingido)</td>
        </tr>
        <tr>
          <td><strong>Mutantes Mortos (Killed)</strong></td>
          <td>154</td>
          <td class="c-green">206</td>
          <td>+52 mutantes eliminados</td>
        </tr>
        <tr>
          <td><strong>Mutantes em Timeout</strong></td>
          <td>3</td>
          <td>3</td>
          <td>Detectados (Recursão infinita)</td>
        </tr>
        <tr>
          <td><strong>Mutantes Sobreviventes (Survived)</strong></td>
          <td class="c-red">44</td>
          <td class="c-green">4 (Equivalentes)</td>
          <td>Redução de 91% nos sobreviventes</td>
        </tr>
        <tr>
          <td><strong>Mutantes sem Cobertura (NoCoverage)</strong></td>
          <td class="c-red">12</td>
          <td class="c-green">0</td>
          <td>Eliminação total de código cego</td>
        </tr>
        <tr>
          <td><strong>Mutation Score Total</strong></td>
          <td class="c-red">73.71%</td>
          <td class="c-green">98.12%</td>
          <td class="c-blue">META SUPERADA (>98%)</td>
        </tr>
      </tbody>
    </table>

    <div class="fig">
      <img src="data:image/png;base64,${finalImgBase64}" alt="Relatório Final StrykerJS - 98.12%">
      <div class="fig-cap">Figura 2: Relatório final do StrykerJS comprovando Mutation Score de 98.12% (209 mutantes detectados de 213).</div>
    </div>

    <h2 class="sec-h">6. Conclusão</h2>
    <p>
      O experimento prático demonstrou de forma inequívoca que a cobertura de código é uma condição necessária, mas absolutamente insuficiente para atestar a qualidade de uma suíte de testes. A suíte inicial possuía 98.64% de cobertura de linhas e 100% de testes passando, gerando uma perigosa ilusão de robustez enquanto deixava 44 mutantes sobreviverem por falta de oráculos rigorosos.
    </p>
    <p>
      O <strong>StrykerJS</strong> revelou-se um instrumento poderoso de engenharia de qualidade, expondo asserções permissivas, dados de teste algebricamente absorventes e ramos não exercitados. Com a introdução de oráculos específicos, testes de valores-limite e exploração das regras IEEE 754, elevamos a pontuação de mutação de <strong>73.71% para 98.12%</strong> e a cobertura para <strong>100%</strong>, demonstrando eficácia máxima em testes de unidade.
    </p>

    <h2 class="sec-h">7. Acesso ao Repositório e Artefatos do Projeto</h2>
    <p>
      A suíte de testes aprimorada, o arquivo de configuração <code>stryker.conf.json</code>, os relatórios interativos HTML e o código-fonte encontram-se integralmente versionados no repositório GitHub:
    </p>
    <p style="text-align: center; margin-top: 5px;">
      <strong>Link do Fork GitHub:</strong><br>
      <a href="https://github.com/JoaoFilardi/operacoes-mutante" style="color:#2563eb; font-weight:700; font-size:9pt; text-decoration:none;">https://github.com/JoaoFilardi/operacoes-mutante</a>
    </p>

    <div class="foot-bar">Página 4 de 4 — Relatório de Teste de Mutação | João Victor Filardi Souza Pinto</div>
  </div>

</body>
</html>
`;

fs.writeFileSync('relatorio_teste_mutacao.html', htmlContent, 'utf8');
console.log('relatorio_teste_mutacao.html updated.');
