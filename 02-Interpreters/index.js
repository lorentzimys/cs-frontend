const instructions = {
  'SET A': 0,
  'PRINT A': 1,
  'IFN A': 2,
  'RET': 3,
  'DEC A': 4,
  'JMP': 5
};

const program = [
  // Ставим значения аккумулятора
  instructions['SET A'],
  // В 10
  10,
  
  // Выводим значение на экран
  instructions['PRINT A'],
  
  // Если A равно 0
  instructions['IFN A'],
  
  // Программа завершается
  instructions['RET'],
  
  // И возвращает 0
  0,
  
  // Уменьшаем A на 1
  instructions['DEC A'],
  
  // Устанавливаем курсор выполняемой инструкции
  instructions['JMP'],
  
  // В значение 2
  2
];

function execute(code) {
  let acc = 0;
  let i = 0;
  
  while (true) {
    switch (code[i]) {
      case reg['SET A']:
        acc = code[i+1];
        i += 2;
        break;
      case reg['PRINT A']:
        console.log(acc);
        ++i;
        break;
      case reg['IFN A']:
        if (acc === 0) {
          ++i;
        } else {
          i += 2;
        }
        break;
      case reg['DEC A']:
        --acc;
        ++i
        break;
      case reg['JMP']:
        i = code[i+1]
        break;
      case reg['RET']:
        return acc;
    }
  }
}
execute([0, 10, 1, 2, 3, 4, 5, 2])