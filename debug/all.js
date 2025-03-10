import User from "../models/user.js"

export const all = async () => {
  try {
    const data = await User.findAll()
    return data
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}