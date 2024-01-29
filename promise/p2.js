import thenFs from 'then-fs'

const promiseArr = [
  thenFs.readFile('./file1.txt', 'utf8'),
  thenFs.readFile('./file2.txt', 'utf8'),
  thenFs.readFile('./file3.txt', 'utf8'),
]

// 并行异步操作 所有promise执行结束后再执行then()  ---等待机制
// 此处res为读取的全部文件结果
Promise.all(promiseArr).then((res) => {
  console.log(res)
})

// 并行异步操作 任何一个promise执行结束后就执行then() ---赛跑机制

Promise.race(promiseArr)
  // 此处res为执行最快的promise文件
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err.message)
  })
