import Component from './component';

export default class Form extends Component {
  _checkInputValidity(input) {
    const errorView = this._options.getErrorViewForInput(input);
    Form._isValid(input);
    errorView.textContent = input.validationMessage;
  }

  _setSubmitButtonState(enabled) {
    if (enabled) {
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.setAttribute('disabled', true);
    }
  }

  static _isValid(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity('Это обязательное поле');
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(`Должно быть от ${input.getAttribute('minlength')} до ${input.getAttribute('maxlength')} символов`);
      return false;
    }

    if (input.validity.typeMismatch && input.type === 'email') {
      input.setCustomValidity('Здесь должен быть адрес электронной почты');
      return false;
    }

    return input.checkValidity();
  }

  _input(event) {
    this._checkInputValidity(event.target);
    this._updateSubmitButtonState();
  }

  _updateSubmitButtonState() {
    this._setSubmitButtonState(this._getInputs().every(Form._isValid));
  }

  _submit(event) {
    event.preventDefault();
    const data = this._getInputs().reduce((result, input) => {
      result[input.name] = input.value; /* eslint-disable-line no-param-reassign */
      return result;
    }, {});
    this._options.onSubmit(data);
  }

  _getInputs() {
    return [...this._element.elements].filter((input) => input !== this._submitButton);
  }

  reset() {
    this._getInputs().forEach((input) => {
      const errorView = this._getErrorViewForInput(input);
      errorView.textContent = '';
    });
    this._element.reset();
    this._setSubmitButtonState(false);
    this.setError();
  }

  setValues(data) {
    this._getInputs().forEach((input) => {
      input.value = data[input.name]; /* eslint-disable-line no-param-reassign */
    });
    this._updateSubmitButtonState();
  }

  setError(errorText) {
    const error = this._element.querySelector('.popup__error');
    if (error) {
      error.textContent = errorText || '';
    }
  }

  _initialize() {
    this._submitButton = this._element.querySelector('button[type="submit"]');
    this._element.addEventListener('submit', this._submit.bind(this));
    this._element.addEventListener('input', this._input.bind(this));
  }
}
