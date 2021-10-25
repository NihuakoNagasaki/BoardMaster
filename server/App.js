var express = require('express');
var app = express();
var cors = require('cors')
const fs = require("fs")
const { userModel, areaModel, user_has_area, areaColumns, columnCards, sequelize } = require('./models/models')
const cookieParser = require('cookie-parser')
var LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./users');
app.use(cors())
app.use(cookieParser())

async function sync() {
  await sequelize.authenticate()
  await sequelize.sync()
}
sync()

// respond with "hello world" when a GET request is made to the homepage
app.get('/api/getcookies', async function (req, res) {
  if (req.cookies.user) {
    res.send(req.cookies.user)
  }
  console.log(req.cookies.user);
});

app.get('/api/userLog/:usermail/:userpass', async function (req, res) {
  const usermail = req.params.usermail
  const userpass = req.params.userpass
  let userEmail = await userModel.findAll({
    where: {
      email: usermail,
      pass: userpass
    }
  })
  console.log(userEmail);
  // let userData = res.json(userEmail)
  // JSON.stringify(userEmail)
  // console.log(userEmail);
  // localStorage.setItem('userData' , userEmail)
  // console.log(localStorage.getItem('userData'))
  res.send(userEmail)

})

app.get('/api/areaGet/:userid', async function (req, res) {
  const userid = req.params.userid
  let userStudyAreas = await user_has_area.findAll({
    where: {
      user_id: userid
    }
  })
  let idArr = []
  userStudyAreas.forEach(element => idArr.push(element.area_id))
  // let resultArr = await idArr.map((element) =>  areaModel.findAll({
  //   where: {
  //     id: element
  //   }
  // }))
  let resultArr = await areaModel.findAll({
    where: {
      id: idArr
    }
  })

  res.send(resultArr)
})

app.get('/api/areaColumns/:areaid', async function (req, res) {
  const areaid = req.params.areaid
  let columns = await areaColumns.findAll({
    where: {
      area_id: areaid
    }
  })

  res.send(columns)

})

app.get('/api/getCards/:areaid', async function (req, res) {
  const areaid = req.params.areaid
  let cards = await columnCards.findAll({
    where: {
      area_id: areaid
    }
  })
  
  res.send(cards)

})

app.get('/api/getCard/:cardid', async function (req, res) {
  const cardid = req.params.cardid
  let cards = await columnCards.findAll({
    where: {
      id: cardid
    }
  })
  console.log(cards);
  res.send(cards)

})


app.use(express.json())

app.post('/api/userRegistration', async function (req, res) {
  const { name, surname, email, pass } = req.body
  const user = await userModel.create({ name, surname, email, pass })
  res.send(user)
})

app.post('/api/columnAdd', async function (req, res) {
  const { name, description, area_id } = req.body
  const column = await areaColumns.create({ name, description, area_id })
  res.send(column)
})

app.post('/api/cardAdd', async function (req, res) {
  const { name, description, column_id, area_id, card_type, content } = req.body
  const card = await columnCards.create({ name, description, column_id, area_id, card_type, content })
  res.send(card)
})

app.post('/api/areaadd', async function (req, res) {
  const { name, description, user_id } = req.body
  const taskitem = await areaModel.create({ name, description })
  console.log(taskitem.id);
  const area_id = taskitem.id
  console.log(area_id);
  const area_user = await user_has_area.create({ user_id, area_id })
  res.send(taskitem)
})

app.patch('/api/cardChange/:cardId', async function (req, res) {
  const cardId = req.params.cardId
  const cardUpdate = req.body
  await columnCards.update(cardUpdate, {
    where: {
      id: cardId
    }
  })
  res.send({
    message: "Updated"
  })
});

app.patch('/api/cardContentChange/:cardId', async function (req, res) {
  const cardId = req.params.cardId
  const cardUpdate = req.body
  await columnCards.update(cardUpdate, {
    where: {
      id: cardId
    }
  })
  res.send({
    message: "Updated"
  })
});

app.delete('/api/cardDelete/:cardId', async function (req, res) {
  const cardId = req.params.cardId
  await columnCards.destroy({
    where: {
      id: cardId
    }
  })
  res.send({
    message: 'succses'
  })
})

app.listen(3000, () => {
  console.log('Server started at 3000');
})










