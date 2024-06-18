import bot from "./bot.js";
import phrases from "./phrases.js";
import { updateUserByChatId, findUserByChatId } from "./models/users.js";

const marketingChain = () => {    

    bot.on("callback_query", async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;
        switch (action) {
            case 'contact': 
                await bot.sendMessage(chatId, `Щоб замовити індивідуальну розробку телефонуйте`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                await bot.sendContact(chatId, '+380674600500', 'Євген');

        }
    })
};

export default marketingChain;