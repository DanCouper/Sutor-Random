import test from 'ava'
import 'babel-core/register'

import Random from '../src/random.js'
const isNum = (x) => typeof(x) === 'number'

test('`Random.seeded` works like `Math.random`', (t) => {
  const input  = Random.seeded()
  const inRange = (x) => (x >= 0) && (x <= 1)

  t.true(isNum(input), 'Should return a numeric value')
  t.true(inRange(input), 'Should return a value between 0 and 1')
})

test('`Random.seeded` returns a predictable value if a seed is passed', (t) => {
  const input  = Random.seeded(1)

  t.is(input, 0.7098480789645691, 'Should return this exact value')
})

test('`Random.seeded` works via Math.sin; the 10000 is a minimum for avoiding odd patterns', (t) => {
  const initial  = Math.sin(1) * 10000
  const input = initial - Math.floor(initial)

  t.is(input, 0.7098480789645691, 'Should return this exact value')
})

test('`Random.intBetween` plucks a random value from min—max inclusive', (t) => {
  const input = Random.intBetween(10, 20, 1)
  const inRange = (x) => (x >= 10) && (x <= 20)

  t.true(isNum(input), 'Should return a numeric value')
  t.true(inRange(input), 'Should return a value between 10 and 20')
  t.is(input, 17, 'Should return this exact value')
})


test('`Random.intUpTo` plucks a random value from zero—max inclusive', (t) => {
  const input = Random.intUpTo(20, 1)
  const inRange = (x) => (x >= 0) && (x <= 20)

  t.true(isNum(input), 'Should return a numeric value')
  t.true(inRange(input), 'Should return a value between 10 and 20')
  t.is(input, 14, 'Should return this exact value')
})

test('`Random.shuffle` takes an array and returns a new shuffled version', (t) => {
  const input = Random.shuffle([1,2,3,4,5,6], 1)

  t.deepEqual(input, [1,2,4,5,6,3])
})
