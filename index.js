const express = require("express")
const path = require("path")
const fs = require("fs/promises")

const app = express()

function createError(err) {
  return {
    success: false,
    errMessage: err
  }
}

function createSuccess(obj) {
  return {
    success: true,
    data: obj
  }
}

app.get('/*', async (req, res) => {
  let filePath = path.join(__dirname, "json", req.url, "index.json");
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data)
    res.json(createSuccess(JSON.parse(data)))
  }catch (e){
    res.status(404)
    console.error(e)
    res.json(createError(`404 not found`))
  }
  // fs.readFile(filePath, function (err, data) {
  //   if (err != null) {
  //     res.status(404)
  //     res.json(createError(`${err.name} not found`))
  //   }else {
  //     console.log(data)
  //     res.json(createSuccess(JSON.parse(data)))
  //   }
  // })
  // fs.stat(filePath, (err, stats) => {
  //   if (err != null) {
  //     res.json(createError(`${err.name} not found`))
  //   }else if(!stats.isFile()){
  //       res.json(createError(`404 not found`))
  //   }else {
  //
  //   }
  // });

  // res.json({
  //   "url": req.url,
  //   "filePath": filePath,
  // })
})

const server = app.listen(8080, () => {
  const host = server.address()
  console.log("start on :", host)
})