import thenfs from 'then-fs'

// 成功失败回调函数
thenfs
  .readFile('./file1.txt', 'utf8')
  // 放在各个函数之后 不影响后续函数执行
  .catch((err) => {
    console.log(err.message)
  })
  .then((res1) => {
    console.log(res1)
    return thenfs.readFile('./file2.txt', 'utf8').catch((err) => {
      console.log(err.message)
    })
  })
  .then((res2) => {
    console.log(res2)
    return thenfs.readFile('./file3.txt', 'utf8').catch((err) => {
      console.log(err.message)
    })
  })
  .then((res3) => {
    console.log(res3)
  })
// 捕获错误 放在最后时当前面函数出现错误 影响后续函数的执行
