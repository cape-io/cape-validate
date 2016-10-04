import { forEach, isArray, isEmpty, isString, map, memoize } from 'lodash'

import * as validatorFunctions from './validation'
// Stupid eslint thing.
const validationFuncs = validatorFunctions

function getValidateFunc(methodName) {
  if (!isString(methodName)) {
    throw new Error(`${methodName} must be a string or an array!`)
  }
  if (!validationFuncs[methodName]) {
    throw new Error(`${methodName} is not a validation function!`)
  }
  return validationFuncs[methodName]
}

// Take a validation string or array and turn it into a validation function.
export const validatorToFunc = memoize((validator) => {
  if (isArray(validator)) {
    const [ methodName, args ] = validator
    // Call function with args and then return result function.
    return getValidateFunc(methodName)(args)
  }
  // Strings are simple functions. Just return the method by key.
  return getValidateFunc(validator)
})

// Return any errors.
export default function fieldValidation(validators) {
  if (!validators || !validators.length) throw new Error('validators array required')

  // Turn each string/array into a validation function.
  const validatorFuncs = map(validators, validatorToFunc)
  return (value) => {
    let errorResult = null
    // Loop validatorFuncs. Assign first error to `errorResult` and quit loop.
    forEach(validatorFuncs, (validator) => {
      // Do not validate empty values. Bad move?
      if (isEmpty(value)) return true
      errorResult = validator(value)
      // If we find an error quit early.
      return !errorResult
    })
    // Return the first error or undefined.
    return errorResult || undefined
  }
}
