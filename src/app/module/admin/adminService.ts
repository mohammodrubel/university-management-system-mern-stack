import httpStatus from 'http-status'
import AppError from '../../ERROR/App__Error'
import Tadmin from './adminInterface'
import { Admin } from './adminModel'

const getAllAdminService = async () => {
  const result = await Admin.find()
  return result
}
const getSingleAdminService = async (id: string) => {
  const result = await Admin.findById(id)
  return result
}
const updateAdminService = async (id: string, payload: Partial<Tadmin>) => {
  try {
    const { name, ...remainingData } = payload
    const modifyData: Record<string, unknown> = { ...remainingData }
    //update name
    if (name && Object.keys(name).length > 0) {
      for (const [key, value] of Object.entries(name)) {
        modifyData[`name.${key}`] = value
      }
    }
    const result = await Admin.findByIdAndUpdate(id, modifyData, { new: true })
    return result
  } catch (error) {
    throw error
  }
}

const softDeleteAdminService = async (id: string) => {
  const isValidAdmin = await Admin.findById(id)
  if (!isValidAdmin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Id')
  }

  try {
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, runValidators: true },
    )
    return deletedAdmin
  } catch (error) {
    throw error
  }
}

export const AdminService = {
  getAllAdminService,
  getSingleAdminService,
  updateAdminService,
  softDeleteAdminService,
}
