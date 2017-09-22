export const extend = (target, source) => {
  for (const key of source) {
    target[key] = source[key]
  }
  return target
}
