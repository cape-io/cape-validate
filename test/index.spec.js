import test from 'tape'
import { isUndefined } from 'lodash'

import { createLengthCheck, firstChar, invalidLength, length, valueLength } from '../src/validation'

test('createLengthCheck', (t) => {
  t.plan(3)
  function myFunc(len, num) {
    t.equal(len, 4, 'length')
    t.equal(num, 3, 'arg num')
  }
  t.equal(createLengthCheck(myFunc)(3, '1234'))
})
test('firstChar', (t) => {
  t.true(isUndefined(firstChar('0', '0123')))
  t.equal(firstChar('a', '0123'), 'First character must be a.')
  t.end()
})
test('valueLength', (t) => {
  t.equal(valueLength(3, 'asdfb'), 5)
  t.end()
})
test('invalidLength', (t) => {
  t.true(invalidLength(3, '01234'))
  t.false(invalidLength(3, '123'))
  t.end()
})
test('length', (t) => {
  t.true(isUndefined(length(6, '012345')))
  t.equal(length(6, '0123'), 'Must be at 6 characters long.')
  t.end()
})
