// let i = 20;
// let e = 49;

// let b = i + e; // b = 69

// if (b > e) {
//   // 69 > 49 → true
//   console.log("Xato");
// } else {
//   console.log(b);
// }

// // console.log(b);
// let random = Math.floor(Math.random() * 20) + 1;

// if (random === 7) {
//   console.log("🎉 Siz omadli ishtirokchisiz! Sizning raqamingiz:", random);
// } else if (random === 6 || random === 8) {
//   console.log(
//     "⚠️ Siz bir raqam bilan yutqazdingiz. Yaqin edingiz! Raqam:",
//     random,
//     "Tushurishingiz kerak edi 7"
//   );
// } else {
//   console.log("Random raqam:", random);
// }

let sovrinliRaqamlar = {
  3: "100 so'm",
  5: "Smartfon",
  7: "Noutbuk",
  9: "Quloqchin",
  11: "Powerbank",
  13: "10 GB internet",
  15: "Kofe apparati",
  17: "Mini ventilyator",
  19: "USB fleshka",
  20: "Sovrinli sirli quti",
};

let random = Math.floor(Math.random() * 20) + 1;
console.log("Sizning raqamingiz:", random);
if (sovrinliRaqamlar[random]) {
  console.log("Tabriklaymiz siz yutdingiz:", sovrinliRaqamlar[random]);
} else {
  console.log("Omad kelmadi oka");
}
