function scope(fn: () => any) {
  return fn()
}

export default scope
