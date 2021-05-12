  const form1 = new Validator({
    selector: '#form1',
    pattern: {
      name: /^[А-Яа-яЁё\s\-]+$/
    },
    method: {
      'form1-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form1-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form1-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ]
    }
  });
  //Блок Остались вопросы
  const form2 = new Validator({
    selector: '#form2',
    pattern: {
      name: /^[А-Яа-яЁё\s\-]+$/,
      text: /^[А-Яа-яЁё\s\-]+$/
    },
    method: {
      'form2-phone': [
        ['notEmpty'],
        ['pattern', 'phone'],
      ],
      'form2-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form2-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ],
      'form2-message': [
        ['notEmpty'],
        ['pattern', 'text']
      ]
    }
  });
  //Модальное окно
  const form3 = new Validator({
    selector: '#form3',
    pattern: {
      name: /^[А-Яа-яЁё\s\-]+$/
    },
    method: {
      'form3-phone': [
        ['notEmpty'],
        ['pattern', 'phone'],
      ],
      'form3-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form3-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ]
    }
  });
  form1.init();
  form2.init();
  form3.init();