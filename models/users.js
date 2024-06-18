import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';


class User extends Model {}
User.init({
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    car: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dialoguestatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },

}, {
    freezeTableName: false,
    timestamps: true,
    modelName: 'users',
    sequelize
});


const createNewUserByChatId = async (chat_id) => {
    let res;
    try {
        res = await User.create({ chat_id });
        res = res.dataValues;
      //  logger.info(`Created user with id: ${res.id}`);
    } catch (err) {
      //  logger.error(`Impossible to create user: ${err}`);
    }
    return res;
};

const updateUserByChatId = async (chat_id, updateParams) => {
    const res = await User.update({ ...updateParams } , { where: { chat_id } });
    if (res[0]) {
        const data = await findUserByChatId(chat_id);
        if (data) {
          //  logger.info(`Channel ${data.chat_id} updated`);
            return data;
        }
      //  logger.info(`Channel ${chat_id} updated, but can't read result data`);
    } 
    return undefined;
};

const findUserByChatId = async (chat_id) => {
    const res = await User.findOne({ where: { chat_id: chat_id } });
    if (res) return res.dataValues;
    return res;
};

export {
    User,
    updateUserByChatId,
    findUserByChatId,
    createNewUserByChatId
};   