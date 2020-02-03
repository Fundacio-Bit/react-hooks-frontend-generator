export const baseErrorMessage = 'Error de Servicio REST. Consulte detalles en la consola: [CTRL]+[SHIFT]+[I]'

export const getErrorMessage = (errorResponseData) => {
  let errorMessage = errorResponseData

  if (errorResponseData.error) {
    if (errorResponseData.error === 'UNKNOWN_USER') {
      errorMessage = 'Usuario desconocido'
    } else if (errorResponseData.error === 'INVALID_PASSWORD') {
      errorMessage = 'Contraseña inválida'
    } else if (errorResponseData.error === 'INVALID_TOKEN') {
      errorMessage = 'Token de sesión inválido. Proceda a la autenticación.'
    } else if (errorResponseData.error === 'TOKEN_REQUIRED') {
      errorMessage = 'Token de sesión requerido. Proceda a la autenticación.'
    } else {
      errorMessage = errorResponseData.error
    }
  }

  return errorMessage
}
