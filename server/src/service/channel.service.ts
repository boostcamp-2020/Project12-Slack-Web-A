import UserModel from '@model/user.model'
import ChannelModel from '@model/channel.model'
import ThreadModel from '@model/thread.model'
import MessageModel from '@model/message.model'
import FileModel from '@model/file.model'
import ReactionModel from '@model/reaction.model'
import { statusCode, resMessage } from '@util/constant'

interface ChannelType {
  name?: string
  type?: string
  userId?: number
  workspaceId?: number
  channelId?: number
}

const isValidNewChannelData = ({ name, type, workspaceId }: ChannelType) => {
  if (!name || !type || !workspaceId) return false
  if (
    !(typeof name === 'string') ||
    !(typeof type === 'string') ||
    !(typeof workspaceId === 'number')
  ) {
    return false
  }
  return true
}

const createChannel = async (data: ChannelType) => {
  if (!isValidNewChannelData(data)) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: true, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    await ChannelModel.create({ ...data })
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const readChannelsByUser = async ({ userId }: ChannelType) => {
  try {
    const channels = await ChannelModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { id: userId },
          attributes: [],
        },
      ],
    })
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: channels,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

interface ThreadInstance extends ThreadModel {
  message: MessageModel[]
}

interface ChannelInstance extends ChannelModel {
  thread: ThreadInstance[]
  // eslint-disable-next-line no-unused-vars
  addUser: (id: number) => Promise<void>
  user: UserModel[]
}

const readChannelThreads = async ({ channelId }: ChannelType) => {
  try {
    const threads = (await ChannelModel.findOne({
      include: [
        {
          model: ThreadModel,
          include: [
            {
              model: MessageModel,
              attributes: ['id', 'content', 'isHead', 'createdAt', 'updatedAt'],
              include: [
                {
                  model: UserModel,
                  attributes: ['id', 'email', 'name', 'profileImageUrl'],
                },
                {
                  model: FileModel,
                  attributes: ['id', 'url', 'type', 'createdAt', 'updatedAt'],
                },
                {
                  model: ReactionModel,
                  attributes: ['id', 'content'],
                },
              ],
            },
            {
              model: UserModel,
              attributes: ['id', 'email', 'name', 'profileImageUrl'],
            },
          ],
          attributes: ['id', 'createdAt', 'updatedAt'],
        },
      ],
      attributes: ['id', 'type', 'createdAt', 'updatedAt'],
      where: { id: channelId },
    })) as ChannelInstance
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: threads,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const joinChannel = async ({ userId, channelId }: ChannelType) => {
  const targetChannel = (await ChannelModel.findOne({
    include: [{ model: UserModel, as: 'user' }],
    where: { id: channelId },
  })) as ChannelInstance

  if (!targetChannel) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }

  const currentUsers = targetChannel.user.map((user) => user.id)

  if (!currentUsers.includes(userId)) {
    await targetChannel.addUser(userId)
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
      },
    }
  }
  return {
    code: statusCode.BAD_REQUEST,
    json: { success: false, message: resMessage.DUPLICATE_VALUE_ERROR },
  }
}

export default {
  createChannel,
  readChannelsByUser,
  readChannelThreads,
  joinChannel,
}
