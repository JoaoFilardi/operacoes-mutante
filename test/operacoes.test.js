const {
  soma, subtracao, multiplicacao, divisao, potencia, raizQuadrada, restoDivisao,
  fatorial, mediaArray, somaArray, maximoArray, minimoArray, valorAbsoluto,
  arredondar, isPar, isImpar, calcularPorcentagem, aumentarPorcentagem,
  diminuirPorcentagem, inverterSinal, seno, cosseno, tangente, logaritmoNatural,
  logaritmoBase10, arredondarParaBaixo, arredondarParaCima, hipotenusa,
  grausParaRadianos, radianosParaGraus, mdc, mmc, isPrimo, fibonacci,
  produtoArray, clamp, isDivisivel, celsiusParaFahrenheit, fahrenheitParaCelsius,
  inverso, areaCirculo, areaRetangulo, perimetroRetangulo, isMaiorQue,
  isMenorQue, isEqual, medianaArray, dobro, triplo, metade
} = require('../src/operacoes');

describe('Suíte de Testes Robusta para 50 Operações Aritméticas (Alta Eficácia e Mutação)', () => {
  // === Bloco 1: Operações Básicas (1-10) ===
  describe('Bloco 1: Operações Básicas', () => {
    test('1. soma deve somar números positivos, negativos e zero', () => {
      expect(soma(2, 3)).toBe(5);
      expect(soma(-2, -3)).toBe(-5);
      expect(soma(5, 0)).toBe(5);
    });

    test('2. subtracao deve subtrair números positivos, negativos e zero', () => {
      expect(subtracao(5, 2)).toBe(3);
      expect(subtracao(2, 5)).toBe(-3);
      expect(subtracao(5, 0)).toBe(5);
    });

    test('3. multiplicacao deve multiplicar positivos, negativos e por zero', () => {
      expect(multiplicacao(3, 4)).toBe(12);
      expect(multiplicacao(3, -4)).toBe(-12);
      expect(multiplicacao(5, 0)).toBe(0);
    });

    test('4. divisao deve dividir e lançar erro com mensagem correta para divisão por zero', () => {
      expect(divisao(10, 2)).toBe(5);
      expect(divisao(10, -2)).toBe(-5);
      expect(divisao(0, 5)).toBe(0);
      expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
    });

    test('5. potencia deve calcular potência com expoentes positivo, zero e negativo', () => {
      expect(potencia(2, 3)).toBe(8);
      expect(potencia(2, 0)).toBe(1);
      expect(potencia(2, -1)).toBe(0.5);
    });

    test('6. raizQuadrada deve calcular raiz de quadrado perfeito, zero e lançar erro para negativos', () => {
      expect(raizQuadrada(16)).toBe(4);
      expect(raizQuadrada(0)).toBe(0);
      expect(() => raizQuadrada(-1)).toThrow('Não é possível calcular a raiz quadrada de um número negativo.');
      expect(() => raizQuadrada(-16)).toThrow('Não é possível calcular a raiz quadrada de um número negativo.');
    });

    test('7. restoDivisao deve retornar o resto da divisão', () => {
      expect(restoDivisao(10, 3)).toBe(1);
      expect(restoDivisao(10, 2)).toBe(0);
      expect(restoDivisao(7, 4)).toBe(3);
    });

    test('8. fatorial deve calcular para 0, 1, maiores que 1 e lançar erro para negativos', () => {
      expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
      expect(fatorial(0)).toBe(1);
      expect(fatorial(1)).toBe(1);
      expect(fatorial(2)).toBe(2);
      expect(fatorial(3)).toBe(6);
      expect(fatorial(4)).toBe(24);
      expect(fatorial(5)).toBe(120);
    });

    test('9. mediaArray deve calcular a média e retornar 0 para array vazio', () => {
      expect(mediaArray([])).toBe(0);
      expect(mediaArray([10, 20, 30])).toBe(20);
      expect(mediaArray([5])).toBe(5);
      expect(mediaArray([-10, 10])).toBe(0);
    });

    test('10. somaArray deve somar múltiplos elementos e retornar 0 para array vazio', () => {
      expect(somaArray([])).toBe(0);
      expect(somaArray([1, 2, 3])).toBe(6);
      expect(somaArray([-5, 5])).toBe(0);
      expect(somaArray([42])).toBe(42);
    });
  });

  // === Bloco 2: Operações em Arrays e Checagens (11-20) ===
  describe('Bloco 2: Arrays e Checagens', () => {
    test('11. maximoArray deve encontrar o valor máximo e lançar erro para array vazio', () => {
      expect(() => maximoArray([])).toThrow('Array vazio не possui valor máximo.');
      expect(maximoArray([1, 50, 10])).toBe(50);
      expect(maximoArray([-10, -2, -50])).toBe(-2);
      expect(maximoArray([7])).toBe(7);
    });

    test('12. minimoArray deve encontrar o valor mínimo e lançar erro para array vazio', () => {
      expect(() => minimoArray([])).toThrow('Array vazio не possui valor mínimo.');
      expect(minimoArray([10, 2, 100])).toBe(2);
      expect(minimoArray([-10, -2, -50])).toBe(-50);
      expect(minimoArray([7])).toBe(7);
    });

    test('13. valorAbsoluto deve retornar o valor absoluto de negativos, positivos e zero', () => {
      expect(valorAbsoluto(-5)).toBe(5);
      expect(valorAbsoluto(5)).toBe(5);
      expect(valorAbsoluto(0)).toBe(0);
    });

    test('14. arredondar deve arredondar para cima e para baixo', () => {
      expect(arredondar(9.8)).toBe(10);
      expect(arredondar(9.2)).toBe(9);
      expect(arredondar(9.5)).toBe(10);
    });

    test('15. isPar deve validar números pares e ímpares, incluindo zero e negativos', () => {
      expect(isPar(100)).toBe(true);
      expect(isPar(3)).toBe(false);
      expect(isPar(0)).toBe(true);
      expect(isPar(-2)).toBe(true);
      expect(isPar(-3)).toBe(false);
    });

    test('16. isImpar deve validar números ímpares e pares, incluindo zero e negativos', () => {
      expect(isImpar(7)).toBe(true);
      expect(isImpar(4)).toBe(false);
      expect(isImpar(0)).toBe(false);
      expect(isImpar(-7)).toBe(true);
      expect(isImpar(-4)).toBe(false);
    });

    test('17. calcularPorcentagem deve calcular a porcentagem de um valor', () => {
      expect(calcularPorcentagem(50, 200)).toBe(100);
      expect(calcularPorcentagem(0, 200)).toBe(0);
      expect(calcularPorcentagem(25, 80)).toBe(20);
    });

    test('18. aumentarPorcentagem deve aumentar o valor percentualmente', () => {
      expect(aumentarPorcentagem(100, 10)).toBeCloseTo(110);
      expect(aumentarPorcentagem(100, 0)).toBeCloseTo(100);
      expect(aumentarPorcentagem(50, 100)).toBeCloseTo(100);
    });

    test('19. diminuirPorcentagem deve diminuir o valor percentualmente', () => {
      expect(diminuirPorcentagem(100, 10)).toBeCloseTo(90);
      expect(diminuirPorcentagem(100, 0)).toBeCloseTo(100);
      expect(diminuirPorcentagem(50, 50)).toBeCloseTo(25);
    });

    test('20. inverterSinal deve inverter o sinal de positivos, negativos e zero', () => {
      expect(inverterSinal(42)).toBe(-42);
      expect(inverterSinal(-42)).toBe(42);
      expect(inverterSinal(0)).toBe(-0);
    });
  });

  // === Bloco 3: Funções Trigonométricas e Logarítmicas (21-30) ===
  describe('Bloco 3: Funções Trigonométricas e Logarítmicas', () => {
    test('21. seno deve calcular o seno de ângulos em radianos', () => {
      expect(seno(0)).toBe(0);
      expect(seno(Math.PI / 2)).toBeCloseTo(1);
    });

    test('22. cosseno deve calcular o cosseno de ângulos em radianos', () => {
      expect(cosseno(0)).toBe(1);
      expect(cosseno(Math.PI)).toBeCloseTo(-1);
    });

    test('23. tangente deve calcular a tangente de ângulos em radianos', () => {
      expect(tangente(0)).toBe(0);
      expect(tangente(Math.PI / 4)).toBeCloseTo(1);
    });

    test('24. logaritmoNatural deve calcular o logaritmo natural', () => {
      expect(logaritmoNatural(Math.E)).toBe(1);
      expect(logaritmoNatural(1)).toBe(0);
    });

    test('25. logaritmoBase10 deve calcular o logaritmo na base 10', () => {
      expect(logaritmoBase10(100)).toBe(2);
      expect(logaritmoBase10(10)).toBe(1);
      expect(logaritmoBase10(1)).toBe(0);
    });

    test('26. arredondarParaBaixo deve arredondar para o menor inteiro mais próximo', () => {
      expect(arredondarParaBaixo(5.9)).toBe(5);
      expect(arredondarParaBaixo(-5.1)).toBe(-6);
    });

    test('27. arredondarParaCima deve arredondar para o maior inteiro mais próximo', () => {
      expect(arredondarParaCima(5.1)).toBe(6);
      expect(arredondarParaCima(-5.9)).toBe(-5);
    });

    test('28. hipotenusa deve calcular a hipotenusa de um triângulo retângulo', () => {
      expect(hipotenusa(3, 4)).toBe(5);
      expect(hipotenusa(5, 12)).toBe(13);
    });

    test('29. grausParaRadianos deve converter graus para radianos', () => {
      expect(grausParaRadianos(180)).toBeCloseTo(Math.PI);
      expect(grausParaRadianos(90)).toBeCloseTo(Math.PI / 2);
      expect(grausParaRadianos(0)).toBe(0);
    });

    test('30. radianosParaGraus deve converter radianos para graus', () => {
      expect(radianosParaGraus(Math.PI)).toBeCloseTo(180);
      expect(radianosParaGraus(Math.PI / 2)).toBeCloseTo(90);
      expect(radianosParaGraus(0)).toBe(0);
    });
  });

  // === Bloco 4: Teoria dos Números e Sequências (31-40) ===
  describe('Bloco 4: Teoria dos Números e Sequências', () => {
    test('31. mdc deve calcular o MDC de dois números', () => {
      expect(mdc(10, 5)).toBe(5);
      expect(mdc(14, 21)).toBe(7);
      expect(mdc(17, 19)).toBe(1);
      expect(mdc(0, 5)).toBe(5);
    });

    test('32. mmc deve calcular o MMC de dois números', () => {
      expect(mmc(10, 5)).toBe(10);
      expect(mmc(4, 6)).toBe(12);
      expect(mmc(7, 5)).toBe(35);
    });

    test('33. isPrimo deve verificar corretamente números primos e compostos', () => {
      expect(isPrimo(7)).toBe(true);
      expect(isPrimo(2)).toBe(true);
      expect(isPrimo(3)).toBe(true);
      expect(isPrimo(13)).toBe(true);
      expect(isPrimo(1)).toBe(false);
      expect(isPrimo(0)).toBe(false);
      expect(isPrimo(-7)).toBe(false);
      expect(isPrimo(4)).toBe(false);
      expect(isPrimo(9)).toBe(false);
      expect(isPrimo(15)).toBe(false);
    });

    test('34. fibonacci deve calcular os termos da sequência de Fibonacci', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(3)).toBe(2);
      expect(fibonacci(4)).toBe(3);
      expect(fibonacci(10)).toBe(55);
    });

    test('35. produtoArray deve calcular o produto e retornar 1 para array vazio', () => {
      expect(produtoArray([])).toBe(1);
      expect(produtoArray([2, 3, 4])).toBe(24);
      expect(produtoArray([5])).toBe(5);
      expect(produtoArray([2, 0, 4])).toBe(0);
      expect(produtoArray({ length: 0 })).toBe(1);
    });

    test('36. clamp deve restringir o valor aos limites mínimo e máximo', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(10, 0, 10)).toBe(10);
      expect(clamp(-0, 0, 10)).toBe(-0);
      expect(clamp(0, -10, -0)).toBe(0);
    });

    test('37. isDivisivel deve verificar divisibilidade', () => {
      expect(isDivisivel(10, 2)).toBe(true);
      expect(isDivisivel(10, 3)).toBe(false);
      expect(isDivisivel(7, 7)).toBe(true);
    });

    test('38. celsiusParaFahrenheit deve converter Celsius para Fahrenheit com precisão', () => {
      expect(celsiusParaFahrenheit(0)).toBe(32);
      expect(celsiusParaFahrenheit(100)).toBe(212);
      expect(celsiusParaFahrenheit(-40)).toBe(-40);
    });

    test('39. fahrenheitParaCelsius deve converter Fahrenheit para Celsius com precisão', () => {
      expect(fahrenheitParaCelsius(32)).toBe(0);
      expect(fahrenheitParaCelsius(212)).toBe(100);
      expect(fahrenheitParaCelsius(-40)).toBe(-40);
    });

    test('40. inverso deve calcular o inverso e lançar erro ao inverter zero', () => {
      expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
      expect(inverso(4)).toBe(0.25);
      expect(inverso(-2)).toBe(-0.5);
      expect(inverso(1)).toBe(1);
    });
  });

  // === Bloco 5: Geometria e Lógica de Comparação (41-50) ===
  describe('Bloco 5: Geometria e Lógica de Comparação', () => {
    test('41. areaCirculo deve calcular a área do círculo', () => {
      expect(areaCirculo(10)).toBeCloseTo(314.159);
      expect(areaCirculo(0)).toBe(0);
      expect(areaCirculo(1)).toBeCloseTo(Math.PI);
    });

    test('42. areaRetangulo deve calcular a área de retângulos', () => {
      expect(areaRetangulo(5, 4)).toBe(20);
      expect(areaRetangulo(0, 4)).toBe(0);
    });

    test('43. perimetroRetangulo deve calcular o perímetro de retângulos', () => {
      expect(perimetroRetangulo(5, 4)).toBe(18);
      expect(perimetroRetangulo(1, 1)).toBe(4);
    });

    test('44. isMaiorQue deve verificar se a é maior que b', () => {
      expect(isMaiorQue(10, 5)).toBe(true);
      expect(isMaiorQue(5, 10)).toBe(false);
      expect(isMaiorQue(5, 5)).toBe(false);
    });

    test('45. isMenorQue deve verificar se a é menor que b', () => {
      expect(isMenorQue(5, 10)).toBe(true);
      expect(isMenorQue(10, 5)).toBe(false);
      expect(isMenorQue(5, 5)).toBe(false);
    });

    test('46. isEqual deve verificar se dois valores são estritamente iguais', () => {
      expect(isEqual(7, 7)).toBe(true);
      expect(isEqual(7, 8)).toBe(false);
      expect(isEqual('7', 7)).toBe(false);
    });

    test('47. medianaArray deve calcular mediana de arrays ordenados e desordenados, pares e ímpares, e lançar erro para vazio', () => {
      expect(() => medianaArray([])).toThrow('Array vazio не possui mediana.');
      expect(medianaArray([1, 2, 3, 4, 5])).toBe(3);
      expect(medianaArray([5, 1, 3, 2, 4])).toBe(3);
      expect(medianaArray([4, 1, 3, 2])).toBe(2.5);
      expect(medianaArray([1, 2])).toBe(1.5);
      expect(medianaArray([42])).toBe(42);
    });

    test('48. dobro deve calcular o dobro', () => {
      expect(dobro(10)).toBe(20);
      expect(dobro(-5)).toBe(-10);
      expect(dobro(0)).toBe(0);
    });

    test('49. triplo deve calcular o triplo', () => {
      expect(triplo(10)).toBe(30);
      expect(triplo(-5)).toBe(-15);
      expect(triplo(0)).toBe(0);
    });

    test('50. metade deve calcular a metade', () => {
      expect(metade(20)).toBe(10);
      expect(metade(-10)).toBe(-5);
      expect(metade(0)).toBe(0);
    });
  });
});