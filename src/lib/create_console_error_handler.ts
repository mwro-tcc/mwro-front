function createConsoleErrorHandler(message: String) {
  return (error: Error) => console.error(message, error)
}

export default createConsoleErrorHandler