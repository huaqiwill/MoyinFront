/**
 * 休眠
 * @param timeoutMilliseconds 休眠的时间.单位毫秒
 * @returns
 */
export function sleep(timeoutMilliseconds = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeoutMilliseconds)
  })
}
