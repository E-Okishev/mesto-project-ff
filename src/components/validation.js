function enableValidation({
                            formSelector,
                            inputSelector,
                            submitButtonSelector,
                            inactiveButtonClass,
                            inputErrorClass,
                            errorClass
                          }) {
  const form = document.querySelector(formSelector)
  const inputList = Array.from(form.querySelectorAll(inputSelector))
  const buttonElement = form.querySelector(submitButtonSelector)

  startValidation()

  function startValidation() {

    form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement)
        toggleButton()
      })
    })
  }

  function checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity(checkLengthMismatch(inputElement))
    }
    if (!inputElement.validity.valid) {
      toggleErrorSpan(inputElement, inputElement.validationMessage)
    } else {
      toggleErrorSpan(inputElement)
    }
  }

  function checkLengthMismatch(inputElement) {
    if (inputElement.type !== 'text') {
      return ''
    }
    const valueLength = inputElement.value.trim().length
    if (valueLength < inputElement.minLength) {
      return `Минимальное количество символов: ${inputElement.minLength}`
    }
    return ''
  }

  function hasInvalidInput() {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  function toggleErrorSpan(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.name}-input-error`)
    if (errorMessage) {
      inputElement.classList.add(inputErrorClass)
      errorElement.textContent = errorMessage
      errorElement.classList.add(errorClass)
    } else {
      inputElement.classList.remove(inputErrorClass)
      errorElement.textContent = ''
      errorElement.classList.remove(errorClass)
    }
  }

  function toggleButton() {
    if (hasInvalidInput()) {
      buttonElement.classList.add(inactiveButtonClass)
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
    }
  }
}

function clearValidation(form, validationConfig) {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = validationConfig;

  const inputList = Array.from(form.querySelectorAll(inputSelector))
  const buttonElement = form.querySelector(submitButtonSelector)
  const errorList = Array.from(form.querySelectorAll('.form__input-error'))

  buttonElement.classList.add(inactiveButtonClass)

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(inputErrorClass)
  })
  
  errorList.forEach((error) => {
    error.textContent = "";
    error.classList.remove(errorClass)
  })
}

export {enableValidation, clearValidation}