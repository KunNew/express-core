import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'User',
    email: 'user@email.com',
    password: bcrypt.hashSync('user123', 10),
  },
]

export default users