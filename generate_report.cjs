const fs = require('fs');

const initImgBase64 = fs.readFileSync('reports/stryker_initial_report.png').toString('base64');
const finalImgBase64 = fs.readFileSync('reports/stryker_final_report.png').toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Trabalho Prático - Teste de Mutação com StrykerJS</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 18mm 14mm 18mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #111111;
      background: #ffffff;
      font-size: 9pt;
      line-height: 1.38;
    }

    .page {
      page-break-after: always;
      break-after: page;
      position: relative;
      height: 268mm;
      max-height: 268mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Cabeçalho acadêmico simples */
    .header-academico {
      text-align: center;
      border-bottom: 1px solid #333333;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }
    .header-academico .inst {
      font-size: 10pt;
      font-weight: bold;
      text-transform: uppercase;
      color: #000000;
    }
    .header-academico .curso {
      font-size: 9pt;
      color: #333333;
      margin-top: 2px;
    }

    /* Bloco de título */
    .titulo-trabalho {
      text-align: center;
      margin: 10px 0 12px 0;
    }
    .titulo-trabalho h1 {
      font-size: 13pt;
      font-weight: bold;
      color: #000000;
      margin-bottom: 3px;
      text-transform: uppercase;
    }
    .titulo-trabalho p {
      font-size: 9.2pt;
      color: #444444;
      font-style: italic;
    }

    /* Dados do Aluno */
    .dados-aluno {
      margin-bottom: 12px;
      padding: 8px 12px;
      border: 1px solid #cccccc;
      background: #fafafa;
      font-size: 8.6pt;
    }
    .dados-linha {
      margin-bottom: 2.5px;
    }
    .dados-linha:last-child {
      margin-bottom: 0;
    }
    .dados-linha strong {
      display: inline-block;
      width: 100px;
      color: #222222;
    }

    /* Títulos de seções */
    h2.secao {
      font-size: 10pt;
      font-weight: bold;
      color: #000000;
      border-bottom: 1px solid #888888;
      padding-bottom: 2px;
      margin-top: 8px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    h3.subsecao {
      font-size: 9pt;
      font-weight: bold;
      color: #222222;
      margin-top: 6px;
      margin-bottom: 2px;
    }

    p {
      margin-bottom: 5px;
      text-align: justify;
      text-indent: 1cm;
    }
    p.sem-indent {
      text-indent: 0;
    }

    /* Tabelas normais de relatório */
    table.tabela-dados {
      width: 100%;
      border-collapse: collapse;
      margin: 5px 0 7px 0;
      font-size: 8pt;
    }
    table.tabela-dados th, table.tabela-dados td {
      border: 1px solid #777777;
      padding: 3.5px 6px;
      text-align: center;
    }
    table.tabela-dados th {
      background: #e5e5e5;
      font-weight: bold;
      color: #000000;
    }
    table.tabela-dados tr:nth-child(even) td {
      background: #fbfbfb;
    }

    /* Bloco de código e diffs sóbrios */
    .bloco-codigo {
      background: #f5f5f5;
      border: 1px solid #cccccc;
      padding: 4px 8px;
      margin: 3px 0 5px 0;
      font-family: Consolas, 'Courier New', monospace;
      font-size: 7.6pt;
      line-height: 1.32;
    }
    .codigo-del {
      color: #990000;
      display: block;
    }
    .codigo-add {
      color: #006600;
      display: block;
    }

    /* Figuras */
    .figura {
      text-align: center;
      margin: 4px 0 6px 0;
    }
    .figura img {
      width: 74%;
      max-width: 460px;
      border: 1px solid #888888;
    }
    .legenda {
      font-size: 7.6pt;
      color: #444444;
      margin-top: 2px;
    }

    ul, ol {
      margin-left: 24px;
      margin-bottom: 5px;
    }
    li {
      margin-bottom: 1.5px;
      text-align: justify;
    }

    .rodape {
      margin-top: auto;
      text-align: center;
      font-size: 7.6pt;
      color: #666666;
      border-top: 1px solid #e0e0e0;
      padding-top: 3px;
    }
  </style>
</head>
<body>

  <!-- PÁGINA 1: CABEÇALHO, IDENTIFICAÇÃO E SEÇÃO 1 (INTRODUÇÃO) -->
  <div class="page">
    <div class="header-academico">
      <div class="inst">Pontifícia Universidade Católica de Minas Gerais</div>
      <div class="curso">Curso de Engenharia de Software</div>
    </div>

    <div class="titulo-trabalho">
      <h1>Análise de Eficácia de Testes com Teste de Mutação</h1>
      <p>Avaliação e Refatoração de Suíte de Testes com StrykerJS</p>
    </div>

    <div class="dados-aluno">
      <div class="dados-linha"><strong>Aluno:</strong> João Victor Filardi Souza Pinto</div>
      <div class="dados-linha"><strong>Matrícula:</strong> 806565</div>
      <div class="dados-linha"><strong>Curso:</strong> Engenharia de Software</div>
      <div class="dados-linha"><strong>Repositório:</strong> <a href="https://github.com/JoaoFilardi/operacoes-mutante" style="color:#0000ee; text-decoration:underline;">https://github.com/JoaoFilardi/operacoes-mutante</a></div>
      <div class="dados-linha"><strong>Ferramentas:</strong> Node.js, Jest, StrykerJS</div>
    </div>

    <h2 class="secao">1. Introdução</h2>
    <p>
      Durante o desenvolvimento de software, a métrica de cobertura de código (<em>code coverage</em>) é frequentemente adotada para medir o quanto uma aplicação está sendo testada. No entanto, alcançar uma alta porcentagem de cobertura não significa necessariamente que a suíte de testes é de boa qualidade. Um teste pode executar todas as linhas e desvios de uma função sem verificar adequadamente se o retorno gerado está correto, mantendo asserções incompletas ou oráculos fracos.
    </p>
    <p>
      O Teste de Mutação surge justamente para resolver essa deficiência. Em vez de medir apenas quais linhas de código foram executadas, a técnica avalia se os testes conseguem identificar falhas reais caso pequenos bugs sejam inseridos no sistema. A ferramenta de teste de mutação introduz modificações pontuais no código-fonte original (denominadas <em>mutantes</em>), como trocar um operador de soma por subtração ou inverter uma condição booleana.
    </p>
    <p>
      Após a inserção de cada mutante, a suíte de testes é executada:
    </p>
    <ul>
      <li><strong>Mutante Morto (<em>Killed</em>):</strong> Se algum teste falhar após a alteração do código, significa que a suíte foi capaz de identificar o erro introduzido.</li>
      <li><strong>Mutante Sobrevivente (<em>Survived</em>):</strong> Se todos os testes continuarem passando normalmente, o mutante sobreviveu, indicando que a suíte de testes possui uma brecha ou falta de asserção para aquele cenário.</li>
      <li><strong>Mutante sem Cobertura (<em>NoCoverage</em>):</strong> O mutante foi criado em uma linha que nenhum teste executou.</li>
      <li><strong>Mutante Equivalente:</strong> A alteração feita no código produz a mesma lógica final da original, sendo impossível de ser morta por testes de unidade.</li>
    </ul>
    <p>
      A eficácia da suíte é calculada pelo <em>Mutation Score</em>, que é a razão percentual entre os mutantes detectados e o total de mutantes gerados. O objetivo deste trabalho prático é utilizar o StrykerJS sobre uma biblioteca com 50 funções aritméticas em JavaScript, analisar os mutantes sobreviventes da suíte inicial e escrever novos testes para alcançar uma pontuação de mutação superior a 98%.
    </p>

    <div class="rodape">Página 1 de 4 — Relatório de Teste de Mutação | PUC Minas — Engenharia de Software</div>
  </div>

  <!-- PÁGINA 2: ANÁLISE INICIAL E MUTANTE 1 -->
  <div class="page">
    <h2 class="secao">2. Análise Inicial da Suíte de Testes</h2>
    <p>
      O projeto base fornecido possui 50 funções no arquivo <code>src/operacoes.js</code> e uma suíte de testes inicial em <code>test/operacoes.test.js</code>. O StrykerJS foi adicionado ao projeto com o runner oficial do Jest e configurado através do arquivo <code>stryker.conf.json</code>.
    </p>
    <p>
      Antes de rodar a mutação, executamos a suíte de testes padrão com o relatório de cobertura do Jest (<code>npm test -- --coverage</code>). Os resultados foram os seguintes:
    </p>

    <table class="tabela-dados">
      <thead>
        <tr>
          <th>Suíte de Testes</th>
          <th>Instruções (% Stmts)</th>
          <th>Ramos (% Branch)</th>
          <th>Funções (% Funcs)</th>
          <th>Linhas (% Lines)</th>
          <th>Status dos Testes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Suíte Inicial (Jest)</td>
          <td>85.41%</td>
          <td>58.82%</td>
          <td>100.00%</td>
          <td>98.64%</td>
          <td>50 passaram de 50</td>
        </tr>
      </tbody>
    </table>

    <p>
      À primeira vista, uma cobertura de <strong>98.64% das linhas</strong> dá a impressão de que o código estava amplamente protegido. Contudo, ao rodar a análise do StrykerJS (<code>npx stryker run</code>), obtivemos um <em>Mutation Score</em> de apenas <strong>73.71%</strong>:
    </p>

    <div class="figura">
      <img src="data:image/png;base64,${initImgBase64}" alt="Relatório Inicial do StrykerJS">
      <div class="legenda">Figura 1 – Relatório da primeira execução do StrykerJS (Mutation Score de 73.71%, com 44 mutantes sobreviventes).</div>
    </div>

    <p>
      <strong>Discussão da Discrepância:</strong> O motivo dessa diferença entre quase 99% de linhas cobertas e apenas 73.71% de mutantes mortos está na superficialidade dos testes originais. A suíte antiga apenas testava um único caso "feliz" para cada função. Além disso, quando testava exceções, usava apenas <code>expect(() => fn()).toThrow()</code> genérico, sem verificar qual mensagem de erro foi lançada, o que permitiu que dezenas de mutantes sobrevivessem sem serem notados.
    </p>

    <h2 class="secao">3. Análise de Mutantes Críticos da Primeira Execução</h2>

    <h3 class="subsecao">3.1. Mutante 1: Função isPar (Ausência de Teste para Retorno Falso)</h3>
    <p>
      Na função <code>isPar(n)</code> (linha 43), o Stryker substituiu a expressão por <code>return true;</code>:
    </p>
    <div class="bloco-codigo">
// Mutante em src/operacoes.js (linha 43)
<span class="codigo-del">- function isPar(n) { return n % 2 === 0; }</span>
<span class="codigo-add">+ function isPar(n) { return true; }</span>
    </div>
    <p>
      <strong>Por que sobreviveu:</strong> O teste original continha apenas <code>expect(isPar(100)).toBe(true);</code>. Como a função mutada passou a retornar <code>true</code> fixo, o teste continuou passando. O teste nunca avaliou um número ímpar esperando <code>false</code>. Esse mesmo problema ocorreu nas funções <code>isImpar</code>, <code>isMaiorQue</code>, <code>isMenorQue</code> e <code>isDivisivel</code>.
    </p>

    <div class="rodape">Página 2 de 4 — Relatório de Teste de Mutação | PUC Minas — Engenharia de Software</div>
  </div>

  <!-- PÁGINA 3: MUTANTES 2, 3 E 4 + SOLUÇÃO IMPLEMENTADA -->
  <div class="page">
    <h3 class="subsecao">3.2. Mutante 2: Função celsiusParaFahrenheit (Valor Neutro em Fórmulas)</h3>
    <p>
      Na conversão de Celsius para Fahrenheit (linha 93), o Stryker trocou a divisão por multiplicação:
    </p>
    <div class="bloco-codigo">
// Mutante em src/operacoes.js (linha 93)
<span class="codigo-del">- function celsiusParaFahrenheit(celsius) { return (celsius * 9/5) + 32; }</span>
<span class="codigo-add">+ function celsiusParaFahrenheit(celsius) { return (celsius * 9 * 5) + 32; }</span>
    </div>
    <p>
      <strong>Por que sobreviveu:</strong> O teste inicial usava como entrada 0 °C (<code>celsiusParaFahrenheit(0)</code>). Como zero multiplicado ou dividido por qualquer valor resulta em zero, a conta dava sempre 0 + 32 = 32. O teste não conseguia validar se a fórmula de escala 9/5 estava correta.
    </p>

    <h3 class="subsecao">3.3. Mutante 3: Função medianaArray (Dados Pré-Ordenados e Casos Pares)</h3>
    <p>
      Na função <code>medianaArray</code> (linha 109), o Stryker removeu a chamada ao método de ordenação:
    </p>
    <div class="bloco-codigo">
// Mutante em src/operacoes.js (linha 109)
<span class="codigo-del">- const sorted = [...numeros].sort((a, b) => a - b);</span>
<span class="codigo-add">+ const sorted = [...numeros];</span>
    </div>
    <p>
      <strong>Por que sobreviveu:</strong> O teste original usava a lista <code>[1, 2, 3, 4, 5]</code>, que <strong>já estava ordenada</strong>. Sem ordenar, o elemento central continuava sendo o número 3. Além disso, o array de teste tinha tamanho ímpar (5 elementos), deixando o bloco de cálculo da mediana para arrays de tamanho par completamente sem cobertura (<em>NoCoverage</em>).
    </p>

    <h3 class="subsecao">3.4. Análise de Mutantes Equivalentes na Função fatorial</h3>
    <p>
      Na função <code>fatorial(n)</code> (linha 19), 4 mutantes sobreviveram mesmo após testarmos números positivos, negativos e o zero:
    </p>
    <div class="bloco-codigo">
// Mutante em src/operacoes.js (linha 19)
<span class="codigo-del">- if (n === 0 || n === 1) return 1;</span>
<span class="codigo-add">+ if (false) return 1;</span>
    </div>
    <p>
      <strong>Explicação Teórica:</strong> O código que vem logo a seguir na função é: <code>let resultado = 1; for (let i = 2; i <= n; i++) { resultado *= i; } return resultado;</code>. Se a condição da linha 19 for substituída por <code>false</code>:
    </p>
    <ul>
      <li>Para n = 0: a variável <code>resultado</code> inicia em 1. O laço avalia 2 &le; 0 (falso) e não roda. Retorna 1.</li>
      <li>Para n = 1: o laço avalia 2 &le; 1 (falso) e não roda. Retorna 1.</li>
      <li>Para n &ge; 2: o laço itera normalmente e calcula o fatorial correto.</li>
    </ul>
    <p>
      Ou seja, a condição <code>if (n === 0 || n === 1) return 1;</code> é uma verificação redundante. O código com ou sem essa linha produz exatamente o mesmo resultado para qualquer valor de n. Trata-se de um <strong>mutante equivalente</strong>, sendo impossível de ser morto por testes sem alterar o código original.
    </p>

    <h2 class="secao">4. Solução Implementada</h2>
    <p>
      Para matar os mutantes sobreviventes e aumentar a eficácia dos testes, reescrevemos o arquivo <code>test/operacoes.test.js</code> aplicando as seguintes técnicas:
    </p>
    <ol>
      <li>
        <strong>Asserção Estrita de Exceções:</strong> Em vez de usar <code>toThrow()</code> vazio, passamos a validar a mensagem exata de erro lançada (ex.: <code>expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.')</code>). Isso matou imediatamente todos os mutantes que trocavam as mensagens de texto por <code>""</code>.
      </li>
      <li>
        <strong>Casos Negativos e Condições Falsas:</strong> Adicionamos testes para números ímpares, zero e negativos em funções lógicas (ex.: <code>expect(isPar(3)).toBe(false)</code> e <code>expect(isPar(0)).toBe(true)</code>).
      </li>
      <li>
        <strong>Evitar Valores Neutros em Fórmulas Matemáticas:</strong> Testamos temperaturas com valores diferentes de zero (100 °C &rarr; 212 °F e -40 °C &rarr; -40 °F), forçando a validação real das contas de multiplicação e divisão.
      </li>
      <li>
        <strong>Listas Desordenadas e Casos Pares:</strong> Na função <code>medianaArray</code>, passamos a testar listas desordenadas ímpares (<code>[5, 1, 3, 2, 4] -> 3</code>) e listas pares (<code>[4, 1, 3, 2] -> 2.5</code>), cobrindo o bloco de código que estava sem testes.
      </li>
      <li>
        <strong>Testes de Fronteira no clamp com Zero Negativo:</strong> No JavaScript, de acordo com o padrão IEEE 754, a comparação <code>-0 < 0</code> é falsa, enquanto <code>-0 <= 0</code> é verdadeira. Usamos o <code>Object.is</code> do Jest para matar mutantes de igualdade que sobreviviam em inteiros normais (<code>expect(clamp(-0, 0, 10)).toBe(-0)</code>).
      </li>
    </ol>

    <div class="rodape">Página 3 de 4 — Relatório de Teste de Mutação | PUC Minas — Engenharia de Software</div>
  </div>

  <!-- PÁGINA 4: RESULTADOS FINAIS E CONCLUSÃO -->
  <div class="page">
    <h2 class="secao">5. Resultados Finais</h2>
    <p>
      Após a implementação dos novos testes, executamos novamente o StrykerJS e o Jest Coverage. A tabela abaixo compara os resultados obtidos antes e depois das melhorias:
    </p>

    <table class="tabela-dados">
      <thead>
        <tr>
          <th>Métrica Avaliada</th>
          <th>Suíte Inicial</th>
          <th>Suíte Aprimorada</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cobertura de Linhas (Lines)</td>
          <td>98.64%</td>
          <td>100.00%</td>
          <td>Cobertura total atingida</td>
        </tr>
        <tr>
          <td>Cobertura de Ramos (Branch)</td>
          <td>58.82%</td>
          <td>100.00%</td>
          <td>Todos os desvios testados</td>
        </tr>
        <tr>
          <td>Cobertura de Instruções (Stmts)</td>
          <td>85.41%</td>
          <td>100.00%</td>
          <td>Todas as instruções cobertas</td>
        </tr>
        <tr>
          <td>Mutantes Mortos (Killed)</td>
          <td>154</td>
          <td>206</td>
          <td>+52 mutantes mortos</td>
        </tr>
        <tr>
          <td>Mutantes em Timeout</td>
          <td>3</td>
          <td>3</td>
          <td>Detectados (laço infinito)</td>
        </tr>
        <tr>
          <td>Mutantes Sobreviventes</td>
          <td>44</td>
          <td>4</td>
          <td>Restaram apenas os equivalentes</td>
        </tr>
        <tr>
          <td>Mutantes sem Cobertura (NoCoverage)</td>
          <td>12</td>
          <td>0</td>
          <td>Nenhum mutante sem cobertura</td>
        </tr>
        <tr>
          <td><strong>Mutation Score Final</strong></td>
          <td><strong>73.71%</strong></td>
          <td><strong>98.12%</strong></td>
          <td><strong>Meta alcançada (>98%)</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="figura">
      <img src="data:image/png;base64,${finalImgBase64}" alt="Relatório Final do StrykerJS">
      <div class="legenda">Figura 2 – Relatório final do StrykerJS demonstrando a pontuação de mutação de 98.12% (209 detectados de 213).</div>
    </div>

    <h2 class="secao">6. Conclusão</h2>
    <p>
      A realização deste trabalho prático comprovou a diferença entre ter cobertura de código e ter testes que realmente verificam o comportamento do software. Na análise inicial, a suíte parecia suficiente por cobrir 98.64% das linhas, mas deixou 44 mutantes sobreviverem porque as asserções não eram rigorosas.
    </p>
    <p>
      Com o StrykerJS, foi possível identificar onde os testes falhavam e corrigi-los, testando cenários de erro, valores limites e retornos falsos. O resultado final elevou o Mutation Score de <strong>73.71% para 98.12%</strong> e a cobertura de código para <strong>100%</strong>, demonstrando na prática como o teste de mutação ajuda a construir suítes de teste muito mais confiáveis.
    </p>

    <h2 class="secao">7. Link do Repositório GitHub</h2>
    <p class="sem-indent" style="text-align: center; margin-top: 8px;">
      O código completo do projeto e a suíte de testes aprimorada estão disponíveis no GitHub:<br>
      <a href="https://github.com/JoaoFilardi/operacoes-mutante" style="color: #0000ee; font-weight: bold; font-size: 8.8pt;">https://github.com/JoaoFilardi/operacoes-mutante</a>
    </p>

    <div class="rodape">Página 4 de 4 — Relatório de Teste de Mutação | PUC Minas — Engenharia de Software</div>
  </div>

</body>
</html>
`;

fs.writeFileSync('relatorio_teste_mutacao.html', htmlContent, 'utf8');
console.log('relatorio_teste_mutacao.html updated.');
