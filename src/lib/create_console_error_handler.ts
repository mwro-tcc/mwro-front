function createConsoleErrorHandler(message: string) {
  return (error: Error) => console.error(message, error)
}

export default createConsoleErrorHandler

