# Sutor-Random

[![Build Status](https://semaphoreci.com/api/v1/dancouper/sutor-random/branches/master/badge.svg)](https://semaphoreci.com/dancouper/sutor-random)

[![Coverage Status](https://coveralls.io/repos/github/DanCouper/Sutor-Random/badge.svg?branch=master)](https://coveralls.io/github/DanCouper/Sutor-Random?branch=master)

A naïve seeded pseudo-random number generator for JS. This is mainly meant for testing purposes: the method used is [reportedly](http://stackoverflow.com/questions/521295/javascript-random-seeds) ~2-3 times slower than `Math.random()`.

- Should allow for multiple independent generators (testing required).
- Array shuffle function included (uses what will be a slow implementation, leveraging `reduce`)


## Available functions:

### `Random.seeded([seed])`

Returns a random value between zero and one inclusive. Functionally identical to `Math.random()`. If the optional seed is passed, values become predictable.

```
> Random.seeded(1)
0.7098480789645691
```

### `Random.intBetween(min, max[, seed])`

Returns a random *integer* between min and max inclusive. If the optional seed is passed, values become predictable.

```
> Random.intBetween(10, 20, 1)
17
```

### `Random.intUpTo(max[, seed])`

Returns a random *integer* between zero and max inclusive. If the optional seed is passed, values become predictable.

```
> Random.intBetween(20, 1)
14
```


### `Random.shuffle(array[, seed])`

Shuffles an array randomly, using `Random.seeded()` + a privately-defined shuffle function. If the optional seed is passed, values become predictable.

```
> Random.shuffle([1,2,3,4,5,6], 20)
[2,4,6,3,1,5]
```

