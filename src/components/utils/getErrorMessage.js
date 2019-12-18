export const baseErrorMessage = 'Error de Servicio REST. Consulte detalles en la consola: [CTRL]+[SHIFT]+[I]'

export const getErrorMessage = (responseData) => {
  let errorMessage = ''

  if (responseData.hasOwnProperty('error')) {

    let error = responseData.error

    if (error === 'UNKNOWN_USER') {

      errorMessage = 'Usuario desconocido'

    } else if (error === 'INVALID_PASSWORD') {

      errorMessage = 'Contraseña inválida'

    } else if (error === 'INVALID_TOKEN') {

      errorMessage = 'Token de sesión inválido. Proceda a la autenticación.'

    } else if (error === 'TOKEN_REQUIRED') {

      errorMessage = 'Token de sesión requerido. Proceda a la autenticación.'

    } else {

      errorMessage = JSON.stringify(error)
    }

  } else {

    errorMessage = JSON.stringify(responseData)
  }

  return errorMessage
}
