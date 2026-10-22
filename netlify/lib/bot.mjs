import { store, nextId, reqKey, getChats } from './store.mjs';
import { cfg, tg, esc, notify, MODELS as MODEL_NAMES } from './core.mjs';

let SITE = '';
const PHONE = '+998 93 330 35 75';
const BOT_LINE = '━━━━━━━━━━━━━━━━';
const bar = (n, total) => '▰'.repeat(n) + '▱'.repeat(total - n);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const KB = { keyboard: [
  [{ text: '📝 Zayavka' }, { text: '📦 Modellar' }],
  [{ text: '🎁 Bepul xizmatlar' }, { text: '🚰 Mahsulot' }],
  [{ text: '💧 Suv testi' }, { text: '💳 To\'lov' }],
  [{ text: '📞 Aloqa' }, { text: '❓ Savollar' }],
], resize_keyboard: true, is_persistent: true, input_field_placeholder: 'Menyudan tanlang 👇' };
const MAIN = { inline_keyboard: [
  [{ text: '📝 Zayavka qoldirish', callback_data: 'apply' }],
  [{ text: '📦 Modellar va narxlar', callback_data: 'models' }, { text: '🎁 Bepul xizmatlar', callback_data: 'free' }],
  [{ text: '🚰 Mahsulot', callback_data: 'info:0' }, { text: '💧 Suv testi', callback_data: 'quiz' }],
  [{ text: '💳 0% to\'lov', callback_data: 'pay' }, { text: '📞 Aloqa', callback_data: 'contact' }],
] };
const APPLY_BTN = [{ text: '📝 Zayavka qoldirish', callback_data: 'apply' }];

const WELCOME =
  '💧 <b>SUV FILTER SAMARQAND</b>\n' + BOT_LINE + '\n' +
  '✨ <b>Aura Cebilon Pro</b>\n<i>Suvni tozalashning yangi standarti</i>\n\n' +
  '🇩🇪 Original Germaniya texnologiyasi\n' +
  '💰 Narxlar: <b>4 990 000 — 15 990 000</b> so\'m\n' +
  '💳 <b>0% — foizsiz muddatli to\'lov</b>\n' +
  '🎁 <b>Yetkazish, o\'rnatish, servis — BEPUL</b>\n' +
  '🎬 Demo xizmati\n' +
  '🚚 Samarqand · Toshkent · Qarshi\n' + BOT_LINE + '\n' +
  'Toza suv — butun oila salomatligi 💙\nQuyidan tanlang 👇';

const PAGES = [
  '🚰 <b>Aura Cebilon Pro</b>  <code>1/4</code>\n' + BOT_LINE + '\n' +
  'Zamonaviy suv tozalash apparati.\n💰 Narxlar: <b>4 990 000 — 15 990 000</b> so\'m (modelga qarab)\n\n' +
  '🌀 Ko\'p bosqichli tozalash tizimi\n🏠 Ixcham dizayn — oshxonaga mos\n⚙️ Oson o\'rnatish va qulay foydalanish\n🎁 Yetkazish, o\'rnatish, servis — <b>bepul</b>',
  '🧪 <b>Tozalash sifati</b>  <code>2/4</code>\n' + BOT_LINE + '\n' +
  '✅ Begona hid\n✅ Tuz aralashmalari\n✅ Zang va sariq tus\n\n' +
  '😋 Natija: ichimlikdan shirin, mazali suv.\n👶 Bolalar uchun xavfsiz.',
  '🇩🇪 <b>Texnologiya</b>  <code>3/4</code>\n' + BOT_LINE + '\n' +
  'Original Germaniya texnologiyasi.\n\n' +
  '🔧 Original ehtiyot qismlar\n🛠 Servis xizmati — <b>bepul</b>\n🎬 Demo: apparat ishlashini o\'zingiz ko\'rasiz',
  '💳 <b>Shartlar</b>  <code>4/4</code>\n' + BOT_LINE + '\n' +
  '💰 Narxlar: <b>4 990 000 — 15 990 000</b> so\'m\n💳 <b>0%</b> — foizsiz muddatli to\'lov\n🎁 <b>Bepul:</b> yetkazib berish, o\'rnatish, servis\n📍 Samarqand, Toshkent, Qarshi\n\n' +
  `Aniq narx va shartlar uchun: <b>${PHONE}</b>`,
];
const pageKb = (i) => ({ inline_keyboard: [
  [{ text: '◀️', callback_data: `info:${(i + 3) % 4}` }, { text: `${i + 1} / 4`, callback_data: 'noop' }, { text: '▶️', callback_data: `info:${(i + 1) % 4}` }],
  APPLY_BTN, [{ text: '🏠 Menyu', callback_data: 'menu' }],
] });

const PAY =
  '💳 <b>FOIZSIZ MUDDATLI TO\'LOV</b>\n' + BOT_LINE + '\n' +
  '💰 Ustama foiz: <b>0%</b>\n' +
  '🎁 Yetkazish, o\'rnatish, servis: <b>BEPUL</b>\n' +
  '📍 Samarqand · Toshkent · Qarshi\n' +
  '🎬 Avval demo — keyin qaror\n\n' +
  `Aniq shartlar va narxni operator aytadi:\n📞 <b>${PHONE}</b>`;

const FREE =
  '🎁 <b>BEPUL XIZMATLAR</b>\n' + BOT_LINE + '\n' +
  'Mahsulotni olganingizdan keyin:\n\n' +
  '🚚 <b>Yetkazib berish</b> — bepul\n' +
  '🔧 <b>O\'rnatish</b> — bepul\n' +
  '🛠 <b>Servis xizmati</b> — bepul\n\n' +
  '📍 Samarqand · Toshkent · Qarshi\n' +
  '💳 Va 0% foizsiz muddatli to\'lov\n' + BOT_LINE + '\n' +
  'Qo\'shimcha to\'lovlarsiz — apparatni xarid qilasiz, qolganini biz qilamiz 💙';

const CONTACT =
  '📞 <b>ALOQA</b>\n' + BOT_LINE + '\n' +
  `☎️ <b>${PHONE}</b>\n📍 Samarqand · Toshkent · Qarshi\n\n` +
  '📸 instagram.com/suv_filtir_samarqand\n✈️ t.me/auracebilonsamarqandpro';

const FAQ = [
  ['💳 To\'lov qanday?', 'Foizsiz muddatli to\'lov mavjud. Aniq shartlarni operator tushuntiradi.'],
  ['🚚 Qayerga yetkazasiz?', 'Samarqand, Toshkent va Qarshi bo\'ylab. Mahsulotni olgandan keyin yetkazib berish bepul.'],
  ['🎬 Sinab ko\'rsa bo\'ladimi?', 'Ha, demo xizmatimiz bor — apparat ishlashini o\'zingiz ko\'rasiz.'],
  ['⚙️ O\'rnatish va servis pullikmi?', 'Yo\'q, mahsulotni olgandan keyin yetkazib berish, o\'rnatish va servis xizmati bepul.'],
  ['💰 Narxi qancha?', `Narxlar modelga qarab 4 990 000 so'mdan 15 990 000 so'mgacha. Aniq narx uchun ${PHONE} raqamiga qo'ng'iroq qiling yoki zayavka qoldiring.`],
];
const faqKb = { inline_keyboard: [...FAQ.map(([q], i) => [{ text: q, callback_data: `faq:${i}` }]), [{ text: '🏠 Menyu', callback_data: 'menu' }]] };

const PROBLEMS = ['🤢 Noxush hid', '🧂 Tuzli suv', '🟠 Zang / sariq tus', '🌫 Loyqa', '🫖 Idishda oq qatlam', '😕 Mazasi yoqmaydi'];
const quizKb = (set) => ({ inline_keyboard: [
  ...PROBLEMS.map((p, i) => [{ text: (set.has(i) ? '✅ ' : '⬜ ') + p, callback_data: `qz:${i}` }]),
  [{ text: '🔍 Natijani ko\'rish', callback_data: 'qzdone' }],
] });
const QUIZ_HEAD = '💧 <b>SUV TESTI</b>\n' + BOT_LINE + '\nSuvingizda qanday muammo bor? Hammasini belgilang 👇';

const send = (chat_id, text, extra = {}) => tg('sendMessage', { chat_id, text, parse_mode: 'HTML', ...extra });
const typing = (chat_id) => tg('sendChatAction', { chat_id, action: 'typing' }).catch(() => {});
const getSess = (id) => store.get('sess/' + id);
const setSess = (id, s) => store.set('sess/' + id, s);
const delSess = (id) => store.del('sess/' + id);
const getQuiz = async (id) => new Set((await store.get('quiz/' + id)) || []);
const setQuiz = (id, set) => store.set('quiz/' + id, [...set]);

// edit text messages in place; photo messages (welcome card) get a fresh message instead
const show = async (q, text, reply_markup) => {
  const m = q.message;
  if (m.photo) return send(m.chat.id, text, { reply_markup });
  try { await tg('editMessageText', { chat_id: m.chat.id, message_id: m.message_id, text, parse_mode: 'HTML', reply_markup }); }
  catch (e) { if (!/not modified/i.test(e.message)) await send(m.chat.id, text, { reply_markup }); }
};

async function sendWelcome(chat_id) {
  await typing(chat_id);
  const photo = SITE + '/welcome.jpg';
  try { await tg('sendPhoto', { chat_id, photo, caption: WELCOME, parse_mode: 'HTML', reply_markup: MAIN }); }
  catch { await send(chat_id, WELCOME, { reply_markup: MAIN }); }
  await send(chat_id, 'Pastdagi menyu har doim yoningizda 👇', { reply_markup: KB });
}

const modelLine = (s) => (s.model ? `📦 <b>${esc(MODEL_NAMES[s.model])}</b>\n` : '');
const stepCard = (n, title, body) => `📝 <b>ZAYAVKA</b>  ${bar(n, 3)} <code>${n}/3</code>\n${BOT_LINE}\n<b>${title}</b>\n${body}\n\n<i>Bekor qilish: /cancel</i>`;

async function startApply(chat_id, prefill = '', model = '') {
  await setSess(chat_id, { step: 'name', message: prefill, model });
  await send(chat_id, stepCard(1, '👤 Ismingiz?', 'Ismingizni yozing.'), { reply_markup: { remove_keyboard: true } });
}

const summary = (s) =>
  `🧾 <b>ZAYAVKANI TEKSHIRING</b>\n${BOT_LINE}\n${modelLine(s)}👤 <b>${esc(s.name)}</b>\n📞 <b>${esc(s.phone)}</b>\n` +
  (s.message ? `💬 ${esc(s.message)}\n` : '') + `${BOT_LINE}\nHammasi to'g'rimi?`;
const confirmKb = { inline_keyboard: [[{ text: '✅ Yuborish', callback_data: 'confirm' }, { text: '✏️ Qaytadan', callback_data: 'apply' }], [{ text: '✖️ Bekor qilish', callback_data: 'cancel' }]] };

async function finish(chat_id, from) {
  const s = await getSess(chat_id); if (!s || s.step !== 'confirm') return;
  await delSess(chat_id);
  const wait = await send(chat_id, '⏳ Zayavka yuborilmoqda...\n▱▱▱▱▱');
  const id = await nextId();
  const r = { id, name: s.name, phone: s.phone, message: s.message || '', status: 'new', createdAt: new Date().toISOString(), sent: false, source: 'bot', model: s.model || '', tgUser: from.username ? '@' + from.username : '' };
  await store.set(reqKey(id), r);
  await tg('editMessageText', { chat_id, message_id: wait.message_id, text: `⏳ Zayavka yuborilmoqda...\n${bar(3, 5)}` }).catch(() => {});
  r.sent = await notify(r, SITE).catch(() => false); await store.set(reqKey(id), r);
  await tg('editMessageText', { chat_id, message_id: wait.message_id, parse_mode: 'HTML',
    text: `🎉 <b>Zayavka #${r.id} qabul qilindi!</b>\n▰▰▰▰▰\n\nRahmat, <b>${esc(s.name)}</b>! Tez orada <b>${esc(s.phone)}</b> raqamiga qo'ng'iroq qilamiz.\n\n🎁 Eslatma: yetkazib berish, o'rnatish va servis — bepul.\n💧 Toza suv — sog'lom oila!` }).catch(() => {});
  await send(chat_id, 'Yana nimadir kerakmi? 👇', { reply_markup: KB });
}

const MODELS = [
  ['eco', '<b>Cebilon Eco</b> — ixcham oq korpus'],
  ['nature', '<b>Cebilon Nature</b> — qora-oq zamonaviy dizayn'],
  ['black', '<b>Cebilon Black</b> — qora-oq dizayn, boshqaruv paneli bilan'],
  ['pro', '<b>Cebilon Pro</b> — oq klassik korpus, tepasida displey'],
  ['cebilup', '<b>Cebilup</b> — polda turadigan model'],
];
const MODELS_TEXT = '📦 <b>MODELLAR VA NARXLAR</b>\n' + BOT_LINE + '\n💰 <b>4 990 000 — 15 990 000</b> so\'m\n<i>Aniq narx modelga qarab belgilanadi.</i>\n\n💳 0% foizsiz muddatli to\'lov\n🎁 Yetkazish, o\'rnatish, servis — BEPUL\n\nModel tanlab, zayavka qoldiring 👇';

async function sendModels(chat_id) {
  await tg('sendChatAction', { chat_id, action: 'upload_photo' }).catch(() => {});
  try {
    await tg('sendMediaGroup', { chat_id, media: MODELS.map(([k, cap]) => ({ type: 'photo', media: `${SITE}/models/${k}.jpg`, caption: cap, parse_mode: 'HTML' })) });
  } catch (e) { console.error('Media group:', e.message); }
  await send(chat_id, MODELS_TEXT, { reply_markup: { inline_keyboard: [
    ...MODELS.map(([k]) => [{ text: `📝 ${MODEL_NAMES[k]} — narxini bilish`, callback_data: `mdl:${k}` }]),
    [{ text: '🏠 Menyu', callback_data: 'menu' }],
  ] } });
}

const MENU_TEXT = { '📝 Zayavka': 'apply', '📦 Modellar': 'models', '🎁 Bepul xizmatlar': 'free', '🚰 Mahsulot': 'info', '💧 Suv testi': 'quiz', '💳 To\'lov': 'pay', '📞 Aloqa': 'contact', '❓ Savollar': 'faq' };

async function route(chat_id, action, q) {
  const reply = q ? (t, kb) => show(q, t, kb) : (t, kb) => send(chat_id, t, { reply_markup: kb });
  switch (action) {
    case 'apply': return startApply(chat_id);
    case 'models': return sendModels(chat_id);
    case 'free': return reply(FREE, { inline_keyboard: [[{ text: '📦 Modellar va narxlar', callback_data: 'models' }], APPLY_BTN, [{ text: '🏠 Menyu', callback_data: 'menu' }]] });
    case 'info': return reply(PAGES[0], pageKb(0));
    case 'pay': return reply(PAY, { inline_keyboard: [APPLY_BTN, [{ text: '🏠 Menyu', callback_data: 'menu' }]] });
    case 'contact': return reply(CONTACT, { inline_keyboard: [[{ text: '✈️ Telegram kanal', url: 'https://t.me/auracebilonsamarqandpro' }], APPLY_BTN] });
    case 'faq': return reply('❓ <b>KO\'P SO\'RALADIGAN SAVOLLAR</b>\n' + BOT_LINE + '\nSavolni tanlang 👇', faqKb);
    case 'quiz': await setQuiz(chat_id, new Set()); return reply(QUIZ_HEAD, quizKb(new Set()));
    case 'menu': return q ? show(q, '🏠 <b>ASOSIY MENYU</b>\nNima qilamiz? 👇', MAIN) : sendWelcome(chat_id);
  }
}

async function onMessage(m) {
  const chat_id = m.chat.id, text = (m.text || '').trim();
  const [cmd, arg] = text.split(/\s+/);
  const { bind } = cfg();

  if (cmd === '/start' && arg && bind && arg === bind) {
    const chats = await getChats();
    if (!chats.includes(chat_id)) { chats.push(chat_id); await store.set('chats', chats); }
    return send(chat_id, '✅ <b>Ulandi!</b>\nEndi sayt va botdan kelgan zayavkalar shu yerga keladi.\n\n/stop — o\'chirish');
  }
  if (cmd === '/stop') {
    const chats = await getChats();
    if (chats.includes(chat_id)) { await store.set('chats', chats.filter((c) => c !== chat_id)); return send(chat_id, 'O\'chirildi.'); }
  }
  if (cmd === '/start') { await delSess(chat_id); return sendWelcome(chat_id); }
  if (cmd === '/menu') { await delSess(chat_id); return route(chat_id, 'menu'); }
  if (cmd === '/cancel') { await delSess(chat_id); return send(chat_id, '✖️ Bekor qilindi.', { reply_markup: KB }); }
  if (MENU_TEXT[text]) { await delSess(chat_id); await typing(chat_id); return route(chat_id, MENU_TEXT[text]); }

  const s = await getSess(chat_id);
  if (!s) return send(chat_id, 'Menyudan tanlang 👇', { reply_markup: MAIN });

  if (s.step === 'name') {
    if (text.length < 2) return send(chat_id, 'Iltimos, ismingizni yozing 🙂');
    s.name = text.slice(0, 100); s.step = 'phone'; await setSess(chat_id, s);
    return send(chat_id, stepCard(2, `📞 Telefon raqamingiz, ${esc(s.name)}?`, 'Tugmani bosing yoki yozing: <code>+998 90 123 45 67</code>'), {
      reply_markup: { keyboard: [[{ text: '📱 Raqamimni yuborish', request_contact: true }]], resize_keyboard: true, one_time_keyboard: true },
    });
  }
  if (s.step === 'phone') {
    const phone = (m.contact?.phone_number || text).trim();
    if (phone.replace(/\D/g, '').length < 9) return send(chat_id, '🤔 Raqam to\'g\'ri emas. Qaytadan yozing: <code>+998 90 123 45 67</code>');
    s.phone = (phone.startsWith('+') || !/^998/.test(phone) ? phone : '+' + phone).slice(0, 30);
    s.step = 'message'; await setSess(chat_id, s);
    return send(chat_id, stepCard(3, '💬 Qo\'shimcha xabar', 'Masalan: qaysi shahar, qulay vaqt. Yozing yoki o\'tkazib yuboring.'), {
      reply_markup: { inline_keyboard: [[{ text: '⏭ O\'tkazib yuborish', callback_data: 'skip' }]] },
    });
  }
  if (s.step === 'message') {
    s.message = [s.message, text].filter(Boolean).join(' | ').slice(0, 1000); s.step = 'confirm'; await setSess(chat_id, s);
    return send(chat_id, summary(s), { reply_markup: confirmKb });
  }
  if (s.step === 'confirm') return send(chat_id, 'Pastdagi tugmalardan birini bosing 👇', { reply_markup: confirmKb });
}

async function onCallback(q) {
  const chat_id = q.message.chat.id, d = q.data;
  await tg('answerCallbackQuery', { callback_query_id: q.id }).catch(() => {});
  if (d === 'noop') return;
  if (d.startsWith('mdl:')) { const k = d.split(':')[1]; return MODEL_NAMES[k] ? startApply(chat_id, '', k) : undefined; }
  if (d.startsWith('info:')) { const i = +d.split(':')[1]; return show(q, PAGES[i], pageKb(i)); }
  if (d.startsWith('faq:')) {
    const [qq, aa] = FAQ[+d.split(':')[1]];
    return show(q, `<b>${qq}</b>\n${BOT_LINE}\n${aa}`, { inline_keyboard: [[{ text: '◀️ Savollar', callback_data: 'faq' }], APPLY_BTN] });
  }
  if (d.startsWith('qz:')) {
    const set = await getQuiz(chat_id), i = +d.split(':')[1];
    set.has(i) ? set.delete(i) : set.add(i); await setQuiz(chat_id, set);
    return show(q, QUIZ_HEAD, quizKb(set));
  }
  if (d === 'qzdone') {
    const set = await getQuiz(chat_id);
    if (!set.size) return tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Avval kamida bitta muammoni belgilang', show_alert: true }).catch(() => {});
    const list = [...set].map((i) => PROBLEMS[i]);
    const note = set.size === 1 ? 'Aura Cebilon ko\'p bosqichli tozalash bilan bunga yechim bo\'la oladi.'
      : 'Bir nechta muammo bor — ko\'p bosqichli tizim aynan shunday suv uchun.';
    return show(q, `🔍 <b>NATIJA</b>\n${BOT_LINE}\nMuammolar: <code>${bar(set.size, 6)}</code> ${set.size}/6\n\n${list.join('\n')}\n\n💡 ${note}\n🎬 Demo ko'rsatamiz, maslahat bepul!`,
      { inline_keyboard: [[{ text: '✅ Bepul maslahat olish', callback_data: 'qzapply' }], [{ text: '🏠 Menyu', callback_data: 'menu' }]] });
  }
  if (d === 'qzapply') {
    const set = await getQuiz(chat_id);
    return startApply(chat_id, set.size ? 'Suv muammolari: ' + [...set].map((i) => PROBLEMS[i].replace(/^\S+\s/, '')).join(', ') : '');
  }
  if (d === 'skip') {
    const s = await getSess(chat_id);
    if (s && s.step === 'message') { s.step = 'confirm'; await setSess(chat_id, s); return show(q, summary(s), confirmKb); }
    return;
  }
  if (d === 'confirm') return finish(chat_id, q.from);
  if (d === 'cancel') { await delSess(chat_id); return show(q, '✖️ Bekor qilindi.', { inline_keyboard: [APPLY_BTN] }); }
  return route(chat_id, d, q);
}

export async function handleUpdate(u, origin) {
  SITE = process.env.URL || origin;
  if (u.callback_query) return onCallback(u.callback_query);
  if (u.message && (u.message.text || u.message.contact)) return onMessage(u.message);
}
