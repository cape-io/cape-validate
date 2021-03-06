import { curry, eq, flow, gt, head, lt, negate, nthArg, over, property, spread } from 'lodash'

export function createBasicValidator(checkFunc, errMsg) {
  return val => ((checkFunc(val)) ? errMsg : undefined)
}

export function createValidator(validateFunc, errMsg) {
  return curry((args, value) => {
    if (validateFunc(args, value)) return errMsg
    return undefined
  })
}
export const firstChar = curry((arg, value) => {
  if (!eq(arg, head(value))) return `First character must be ${arg}.`
  return undefined
})
export const valueLength = flow(nthArg(1), property('length'))
export function createLengthCheck(func) {
  return flow(over(valueLength, nthArg(0)), spread(func))
}
export const invalidLength = negate(createLengthCheck(eq))
export const length = curry((arg, value) => {
  if (invalidLength(arg, value)) return `Must be at ${arg} characters long.`
  return undefined
})

export const underMinLen = createLengthCheck(lt)
export const minLength = curry((arg, value) => {
  if (underMinLen(arg, value)) return `Must be at least ${arg} characters.`
  return undefined
})

export const overMaxLen = createLengthCheck(gt)
export const maxLength = curry((arg, value) => {
  if (overMaxLen(arg, value)) return `Must be no more than ${arg} characters.`
  return undefined
})

const isNumString = val => !/^\d+$/.test(val)
export const numString = createBasicValidator(isNumString, 'Must contain only numbers.')
