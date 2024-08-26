import util from 'util'

export function deeplog(obj: unknown) {
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  )
}
