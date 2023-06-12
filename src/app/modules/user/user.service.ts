import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config/index'
import { generateUserId } from './user.utils'
import ApiError from '../../../Errors/ApiErrors'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto Genareted incremental Id
  const id = await generateUserId()
  user.id = id
  // default password

  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createdUser = await User.create(user)

  if (!createUser) {
    throw new ApiError(400,'Failed To Create User')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
