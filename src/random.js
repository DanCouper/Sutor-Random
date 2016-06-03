const Random = {
  /**
   * Curried random number function. Allows multiple
   * independent random number generators.
   * Given a seed, generates a random number between 0 and 1.
   * See: stackoverflow.com/questions/521295/javascript-random-seeds
   *
   * @param  {Number}   Value to use as a seed. Should not be be 0
   *                    or multiple of Pi.
   *
   * @return {Function} A function that, when called, returns a
   *                    floating-point number between 0 and 1.
   */
  cSeeded(seed = Date.now()) {
    return () => {
      let x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }
  },

  /**
   * Given a seed, generates a random number between 0 and 1.
   *
   * @param  {Number} Value to use as a seed. Should not be 0
   *                  or multiple of Pi.
   *
   * @return {Number} A floating-point number between 0 and 1
   */
  seeded(seed = Date.now()) {
    return this.cSeeded(seed)()
  },

  /**
   * Generates a random integer between min and max inclusive.
   *
   * @param  {Number} min  Minimum possible integer.
   * @param  {Number} max  Maximum possible integer.
   * @param  {Number} seed Value to use as a seed. Should not be 0
   *                       or multiple of Pi.
   *
   * @return {Number}      Integer between min and max inclusive.
   */
  intBetween(min, max, seed = Date.now()) {
    return Math.floor(this.seeded(seed) * (max - min + 1) + min)
  },

  /**
   * Generates a random integer between zero and max inclusive.
   *
   * @param  {Number} max  Maximum possible integer.
   * @param  {Number} seed Value to use as a seed. Should not be be 0
   *                       or multiple of Pi.
   *
   * @return {Number}      Integer between 0 and max inclusive.
   */

  intUpTo(max, seed = Date.now()) {
    return Math.floor(this.seeded(seed) * (max + 1))
  },

  /**
   * Alias for whichever shuffle algorithm is to be normally used.
   *
   * @param  {Array}  array
   * @param  {Number} seed  Value to use as a seed. Should not be be 0
   *                        or multiple of Pi.
   *
   * @return {Array}        New shuffled version of original array
   */
  shuffle(array, seed = Date.now()) {
    return durstenfeldShuffle(array, seed)
  },
}

/**
 * Shuffle an array using a reducer version of Durstenfeld's algorithm.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 *
 * @param  {Array} array
 *
 * @return {Array} New shuffled version of original array
 */
function durstenfeldShuffle(array, seed = Date.now()) {
  // Note the `array.slice()` - for immutability, a copy of the array
  // is passed as an accumulator:
  return array.reduce((shuffled, _, i) => {
    const j = Random.intUpTo(i, seed)
    return mutableArrValueSwap(shuffled, i, j)
  }, array.slice())
}

/**
 * Swap two values in an array, in-place.
 *
 * NOTE If I swap inside the loop - ie, just using
 * `[arr[i], arr[j]] = [arr[j], arr[i]]`), it doesn't work. WHY?
 *
 * @param  {Array}  arr
 * @param  {Number} i   An array index
 * @param  {Number} j   Another array index
 *
 * @return {Array}     The original array with the values at i and j swapped
 */
function mutableArrValueSwap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
  return arr
}

/**
 * NOTE: CJS `exports` used instead of ES6 `export`/`export default`.
 *       until such time as this is not an issue.
 */
module.exports = Random
