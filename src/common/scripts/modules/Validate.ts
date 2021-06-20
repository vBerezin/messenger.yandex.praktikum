type Value = string | number;

const validateValue: {
  [key: string]: (value: Value, options?) => boolean
} = {
  isEmpty(value) {
    return !!value.trim().length;
  },
  lengthMinMax(value, { min = 0, max = Infinity }) {
    const length = String(value).trim().length;
    return length >= min && length <= max;
  },
  hasLowerCase(value) {
    return /[a-z]/g.test(value);
  },
  hasUpperCase(value) {
    return /[A-Z]/g.test(value);
  },
  hasNumbers(value) {
    return /[0-9]/g.test(value);
  },
  isCyrilic(value) {
    return /[a-zA-Z]/g.test(value);
  },
  phone(value) {
    const val = value.replace(/[-,\s]/g, '');
    const regExp = new RegExp(/^(8|\+7)9\d{9}$/g);
    return regExp.test(val);
  },
  email(value) {
    const regExp = new RegExp(/^\w+@\w+\.\w+/g);
    return regExp.test(value);
  }
};

const validateField: {
  [key: string]: (value: Value) => string | string[] | null
} = {
  required(value) {
    return validateValue.isEmpty(value) ? null : 'Обязательное поле';
  },
  login(value) {
    return validateValue.isCyrilic(value) ? null : 'Логин должен содержать только латинские буквы';
  },
  password(value) {
    const errors = [];
    const empty = validateValue.isEmpty(value);
    const upperCases = validateValue.hasUpperCase(value);
    const lowerCases = validateValue.hasLowerCase(value);
    const numbers = validateValue.hasNumbers(value);
    const length = validateValue.lengthMinMax(value, { min: 5 });
    if (!empty) {
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
  phone(value) {
    return validateValue.phone(value) ? null : 'Введите телефон';
  },
  email(value) {
    return validateValue.email(value) && value ? null : 'Введите e-mail';
  }
};

export const Validate = { value: validateValue, field: validateField };
