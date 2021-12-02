const users = [
//   {
//   username: 'dax',
//   email: 'email',
//   firstName: 'dax',
//   lastName: 'parke',
//   passHash: '$2a$05$zJOCtAxmjgavvYGc7PioMejdj6m3x5sL2OMLBXDMA1zg0ePuM9nG2'
// }
]

const bcrypt = require('bcryptjs')



module.exports = {
  login: (req, res) => {
    // console.log('Logging In User')
    console.log(req.body)
    const { username, password } = req.body
    // const salt = bcrypt.genSaltSync(5)
    // const newPass = bcrypt.hashSync(password, salt )
    // const userVer = {
    //   username,
    //   newPass
    // }

    for (let i = 0; i < users.length; i++) {
      // console.log(username,users[i].username,newPass,users[i].passHash)
      // let existing = bcrypt.compareSync(password, users[i].passHash)
      console.log(bcrypt.compareSync(password, users[i].passHash))
      if (users[i].username === username){
        if(bcrypt.compareSync(password, users[i].passHash)){

          let returnLogin = {...users[i]}
          delete returnLogin.passHash
          res.status(200).send(returnLogin)
          console.log(returnLogin)
          return
        }
      }
    }
    res.status(400).send("User not found.")
  },
  register: (req, res) => {
    const {username, email, firstName, lastName, password} = req.body
    const salt = bcrypt.genSaltSync(5)
    const passHash = bcrypt.hashSync(password, salt )
    
    let userObj = {
    username,
    email,
    firstName,
    lastName,
    passHash
    }

    let returnUser = {...userObj}
    delete returnUser.passHash
    // console.log(userObj)
    users.push(userObj)
    console.log(users)
    console.log(returnUser)
    
    // console.log('Registering User')
    // console.log(req.body)
    // users.push(req.body)
    res.status(200).send(returnUser)
    
    
  }
}
// console.log(users)