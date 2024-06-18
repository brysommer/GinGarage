import bot from "./bot.js";
import phrases from "./phrases.js";
import { updateUserByChatId, findUserByChatId } from "./models/users.js";

const bookingChain = () => {    

    bot.on("callback_query", async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;
        switch (action) {
            case 'book': 
                await updateUserByChatId(chatId, {dialoguestatus: 'phone'})
                bot.sendMessage(chatId, phrases.nameQuestion);

    }})

    bot.on("message", async (msg) => {

        const chatId = msg.chat.id;
        const text = msg.text;
        const userData = await findUserByChatId(chatId);

        let dialogueStatus, userName, userPhone, userModel;
        if (userData?.dialoguestatus) dialogueStatus = userData.dialoguestatus;
        if (userData?.phone) userPhone = userData.phone;
        if (userData?.userName) userName = userData.userName;
        if (userData?.car) userModel = userData.car;

        console.log(dialogueStatus)

        switch (dialogueStatus) {
            case 'phone':                 
                await bot.sendMessage(chatId, phrases.phoneQuestion(text));
                await updateUserByChatId(chatId, {userName: text, dialoguestatus: 'model'});
            break;

            case 'model': 
                await bot.sendMessage(chatId, phrases.modelQuestion);
                await updateUserByChatId(chatId, {phone: text, dialoguestatus: 'bookingSum'});
            break;

            case 'bookingSum':
                await bot.sendMessage(chatId, phrases.bookingSummary(userName, userPhone, text));
                await new Promise(resolve => setTimeout(resolve, 4000));
                await bot.sendMessage(chatId, `Щоб замовити індивідуальну розробку телефонуйте`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                await bot.sendContact(chatId, '+380674600500', 'Євген');
                await updateUserByChatId(chatId, {dialoguestatus: '', car: text})
            break;
        }
    })
}

export default bookingChain;