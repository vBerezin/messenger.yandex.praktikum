type Value = string | number;

const validateValue: {
  [ key: string ]: (value: Value, options?) => boolean
} = {
  isEmpty: (value) => {
    return String(value).trim().length === 0;
  },
  lengthMinMax(value, { min = 0, max = Infinity }) {
    const length = String(value).trim().length;
    return length >= min && length <= max;
  },
  hasLowerCase: (value) => {
    return /[a-z]/g.test(String(value));
  },
  hasUpperCase: (value) => {
    return /[A-Z]/g.test(String(value));
  },
  hasNumbers: (value) => {
    return /[0-9]/g.test(String(value));
  },
  isCyrilic: (value) => {
    return /[a-zA-Z]/g.test(String(value));
  },
  phone: (value) => {
    const val = String(value).replace(/[-,()\s]/g, '');
    const regExp = new RegExp(/^(8|\+7)9\d{9}$/g);
    return regExp.test(val);
  },
  email: (value) => {
    const regExp = new RegExp(/^\w+@\w+\.\w+/g);
    return regExp.test(String(value));
  }
};

const validateField: {
  [ key: string ]: (value: Value) => string | string[] | null
} = {
  required: (value) => {
    return validateValue.isEmpty(value) ? 'Обязательное поле' : null;
  },
  login: (value) => {
    return validateValue.isCyrilic(value) ? null : 'Логин должен содержать только латинские буквы';
  },
  password: (value) => {
    const errors = [];
    const empty = validateValue.isEmpty(value);
    const upperCases = validateValue.hasUpperCase(value);
    const lowerCases = validateValue.hasLowerCase(value);
    const numbers = validateValue.hasNumbers(value);
    const length = validateValue.lengthMinMax(value, { min: 5 });
    if (empty) {
      errors.push('Введите пароль');
    }
    if (!length) {
      errors.push('Минимальная длина пароля 5 символов');
    }
    if (!upperCases && !lowerCases) {
      errors.push('Пароль должен содержать только латинские буквы');
    }
    if (!upperCases) {
      errors.push('Пароль должен содержать заглавные буквы');
    }
    if (!lowerCases) {
      errors.push('Пароль должен содержать строчные буквы');
    }
    if (!numbers) {
      errors.push('Пароль должен содержать цифры');
    }
    return errors.length ? errors : null;
  },
  phone: (value) => {
    return validateValue.phone(value) ? null : 'Введите телефон';
  },
  email: (value) => {
    return validateValue.email(value) ? null : 'Введите e-mail';
  }
};

export const Validate = { value: validateValue, field: validateField };
