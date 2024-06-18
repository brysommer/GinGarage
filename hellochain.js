import bot from "./bot.js";
import phrases from "./phrases.js";
import { createNewUserByChatId } from "./models/users.js";

const helloChain = () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        switch (msg.text) {
            case '/start': 

                await createNewUserByChatId(chatId);
                
                bot.sendMessage(chatId, phrases.helloGarage, 
                    { reply_markup:  
                        { inline_keyboard: [[
                            { text: 'Записатися на ремонт', callback_data: `book` }, 
                            { text: 'Звязатися з розробником бота', callback_data: `contact` }
                        ]]} 
                    }
                )
        }
    });
}

export default helloChain;