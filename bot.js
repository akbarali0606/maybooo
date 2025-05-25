const TelegramBot = require("node-telegram-bot-api");
const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akbarali06",
  database: "akbarali",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQLga ulanishda xatolik:", err);
    process.exit(1);
  }
  console.log("MySQLga muvaffaqiyatli ulandi.");
  sendMessageToAll();
});

// function sendMessageToAll() {
//   connection.query("SELECT id FROM users", (err, results) => {
//     if (err) return console.error("Foydalanuvchilarni olishda xatolik:", err);

//     if (results.length === 0) return console.log("Bazada foydalanuvchi yo‘q.");

//     results.forEach((user) => {
//       bot
//         .sendPhoto(
//           user.id,
//           fs.createReadStream("img/photo_2025-05-25_16-03-04.jpg"),
//           {
//             caption:
//               "🔥 YANGI VIDEO JOYLANDNDI! 🚀\n\n📌 *Kod: 15*\n\n✅ 𝐔𝐬𝐡𝐛𝐮 𝐕𝐢𝐝𝐞𝐨𝐧𝐢 𝐭𝐨’𝐥𝐢𝐪𝐢𝐧𝐢 𝐛𝐨𝐭𝐠𝐚 𝐣𝐨𝐲𝐥𝐚𝐝𝐢𝐤 𝐛𝐨𝐭 𝐨𝐫𝐪𝐚𝐥𝐢 𝐲𝐮𝐤𝐥𝐚𝐛 𝐛𝐞𝐦𝐚𝐥𝐨𝐥 𝐤𝐨’𝐫𝐢𝐬𝐡𝐢𝐧𝐠𝐢𝐳 𝐦𝐮𝐦𝐤𝐮𝐧 ! ",
//             parse_mode: "Markdown",
//             protect_content: true,
//           }
//         )
//         .catch((e) => {
//           console.error(
//             `Foydalanuvchi ${user.id} ga xabar yuborishda xatolik: ${e}`
//           );

//           // Agar 403 - bot bloklangan xatolik bo'lsa, foydalanuvchini o'chirish
//           if (e.response && e.response.statusCode === 403) {
//             connection.query(
//               "DELETE FROM users WHERE id = ?",
//               [user.id],
//               (err) => {
//                 if (err)
//                   console.error(`Foydalanuvchini o'chirishda xatolik: ${err}`);
//                 else
//                   console.log(
//                     `Foydalanuvchi ${user.id} bazadan o'chirildi (bloklangan).`
//                   );
//               }
//             );
//           }
//         });
//     });

//     console.log(
//       `Jami ${results.length} foydalanuvchiga avtomatik xabar yuborildi.`
//     );
//   });
// }

function sendMessageToAll() {
  // `id` bilan birga `name` ustunini ham so'rab olamiz
  connection.query("SELECT id, name FROM users", (err, results) => {
    if (err) return console.error("Foydalanuvchilarni olishda xatolik:", err);

    if (results.length === 0) return console.log("Bazada foydalanuvchi yo‘q.");

    results.forEach((user) => {
      // Foydalanuvchining ismini olamiz. Agar `name` bo'sh bo'lsa, xabarda faqat "Salom!" ko'rinadi.
      const userNamePrefix = user.name ? `Salom, ${user.name}! ` : "Salom! "; // Ism bo'lsa "Salom, Ism!", bo'lmasa shunchaki "Salom!"

      bot
        .sendMessage(
          user.id,
          `${userNamePrefix}🎁 Aynan siz uchun telegram bepul stars ishlash imkoni mavjud. 4 ta dostingizni taklif qilib 15 stars ishlang. 👇`, // Xabarda foydalanuvchi ismi ishlatiladi yoki faqat "Salom!"
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚀 Imkoniyatni qo'ldan boy bermang!", // Tugma matni
                    url: "https://t.me/patrickstarsrobot?start=907402803", // Sizning referral havolangiz
                  },
                ],
              ],
            },
            // protect_content: true, // Agar xohlasangiz, xabarni himoyalashingiz mumkin
          }
        )
        .catch((e) => {
          console.error(
            `Foydalanuvchi ${user.id} ga xabar yuborishda xatolik: ${e}`
          );

          // Agar 403 - bot bloklangan xatolik bo'lsa, foydalanuvchini o'chirish
          if (e.response && e.response.statusCode === 403) {
            connection.query(
              "DELETE FROM users WHERE id = ?",
              [user.id],
              (err) => {
                if (err)
                  console.error(`Foydalanuvchini o'chirishda xatolik: ${err}`);
                else
                  console.log(
                    `Foydalanuvchi ${user.id} bazadan o'chirildi (bloklangan).`
                  );
              }
            );
          }
        });
    });

    console.log(
      `Jami ${results.length} foydalanuvchiga avtomatik xabar yuborildi.`
    );
  });
}

// function sendMessageToAll() {
//   connection.query("SELECT id FROM users", (err, results) => {
//     if (err) return console.error("Foydalanuvchilarni olishda xatolik:", err);

//     if (results.length === 0) return console.log("Bazada foydalanuvchi yo‘q.");

//     results.forEach((user) => {
//       bot
//         .sendMessage(
//           user.id,
//           "🎁 Bepul Start olmoqchimisiz?\nUnda pastdagi tugmani bosing:",
//           {
//             reply_markup: {
//               inline_keyboard: [
//                 [
//                   {
//                     text: "🎯 Start olish",
//                     url: "https://t.me/patrickstarsrobot?start=907402803",
//                   },
//                 ],
//               ],
//             },
//           }
//         )
//         .catch((e) => {
//           console.error(
//             `Foydalanuvchi ${user.id} ga xabar yuborishda xatolik: ${e}`
//           );

//           // Agar 403 - bot bloklangan bo‘lsa, foydalanuvchini o‘chirish
//           if (e.response && e.response.statusCode === 403) {
//             connection.query(
//               "DELETE FROM users WHERE id = ?",
//               [user.id],
//               (err) => {
//                 if (err)
//                   console.error(`Foydalanuvchini o‘chirishda xatolik: ${err}`);
//                 else
//                   console.log(
//                     `Foydalanuvchi ${user.id} bazadan o‘chirildi (bloklangan).`
//                   );
//               }
//             );
//           }
//         });
//     });

//     console.log(
//       `Jami ${results.length} foydalanuvchiga avtomatik xabar yuborildi.`
//     );
//   });
// }

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";
  const userId = msg.from.id;
  const username = msg.from.username || "No Username";
  const name = msg.from.first_name || "No Name";

  if (text === "/users") {
    connection.query("SELECT id, name, username FROM users", (err, results) => {
      if (err) return bot.sendMessage(chatId, "Xatolik yuz berdi.");

      if (results.length === 0)
        return bot.sendMessage(chatId, "Bazada foydalanuvchi yo‘q.");

      const total = results.length;
      bot.sendMessage(chatId, `Bazada jami foydalanuvchilar soni: ${total}`);
    });
    return;
  }

  if (text.startsWith("/sendall ")) {
    const messageToSend = text.replace("/sendall ", "");
    connection.query("SELECT id FROM users", (err, results) => {
      if (err) return bot.sendMessage(chatId, "Xatolik yuz berdi.");

      results.forEach((user) => {
        bot.sendMessage(user.id, messageToSend).catch((e) => {
          console.error(`Xabar yuborishda xatolik: ${e}`);

          // Agar 403 xatolik bo'lsa, foydalanuvchini o'chirish
          if (e.response && e.response.statusCode === 403) {
            connection.query(
              "DELETE FROM users WHERE id = ?",
              [user.id],
              (err) => {
                if (err)
                  console.error(`Foydalanuvchini o'chirishda xatolik: ${err}`);
                else
                  console.log(
                    `Foydalanuvchi ${user.id} bazadan o'chirildi (bloklangan).`
                  );
              }
            );
          }
        });
      });

      bot.sendMessage(chatId, "Xabarlar yuborildi.");
    });
    return;
  }

  // Foydalanuvchini bazaga saqlash
  const query =
    "INSERT INTO users (id, name, username) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), username = VALUES(username)";
  connection.query(query, [userId, name, username], (err) => {
    if (err) return console.error("Foydalanuvchini saqlashda xatolik:", err);
  });

  // Asosiy xabarni yuborish
  bot.sendMessage(
    chatId,
    "Video tomosha qilishdan oldin quyidagi havoladan to‘liq ro‘yxatdan o‘ting 📍",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Qo'shilish ➕",
              url: "https://t.me/patrickstarsrobot?start=907402803",
            },
            {
              text: "Tekshirish ✅",
              callback_data: "check_registration",
            },
          ],
        ],
      },
    }
  );
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "check_registration") {
    bot.sendMessage(
      chatId,
      "Siz deyarli ro\\'yxatdan o\\'tdingiz\\. Kanallarga qo\\'shiling va *\\\"Проверять подписка\\\"* tugmasini bosing\\.",
      { parse_mode: "MarkdownV2" }
    );
  }
});
