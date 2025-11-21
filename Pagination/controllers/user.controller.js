import User from '../models/user.model.js'
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const getUsers = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    console.time('Fetching users from database')
    const [users, total] = await Promise.all([
      User.find().skip(skip).limit(limit).lean().exec(),
      User.countDocuments()
    ])
    const totalPages = Math.ceil(total / limit)
    res
    .status(200)
    .json({ success: true, message: 'Success fetching users', data: users, page, totalPages })
    console.timeEnd('Fetching users from database')
    console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}