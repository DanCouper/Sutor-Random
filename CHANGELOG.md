# Notable changes to Sutor-Random


## 1.1.0

**FIXED** import issue. Package had used the ES6 `export default` statement. This turns out to not be totally compatible with Node CJS, so switched to `module.exports`.

*Example of issue, now fixed*:

```
// in package `export default { ... }`
> var Random = require('sutor-random')
> Random.seeded()
ReferenceError
> Random.default.seeded()
0.23452345647...
```

## 1.0.0

Initial package release.
