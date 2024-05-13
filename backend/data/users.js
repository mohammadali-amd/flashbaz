import bcrypt from 'bcryptjs'

const users = [
   {
      name: 'Admin User',
      email: 'admin@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
   },
   {
      name: 'Amir',
      email: 'amir@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
   },
   {
      name: 'Mohammad',
      email: 'mohammad@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
   },
]

export default users