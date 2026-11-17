const PACAR = "Pacar";
const KAMU = "Kamu";


const p = (text, next) => ({ t: "say", who: PACAR, text, next });
const k = (text, next) => ({ t: "say", who: KAMU, text, next });
const n = (text, next) => ({ t: "say", who: "Narasi", text, next });
const c = (...options) => ({ t: "choice", options }); // options: [{text, next}]
const o = (text, next) => ({ text, next });
const end = (text) => ({ t: "end", text });

const story = {
  // ---------- Intro ----------
  start: p("Yang", "i1"),
  i1: p("Tadi kan aku ngeliatin dewi lewat", "i2"),
  i2: p("Tau gak?", "i3"),
  i3: k("Kenapa", "i4"),
  i4: p("Ih amit amit dah", "i5"),
  i5: p("Dia pake bulu mata", "i6"),
  i6: p("Aku juga suka bingung deh", "i7"),
  i7: p("Sama cewek kayak gitu", "i8"),
  i8: p("Muka Pas-pasan aja. G ngaca apa", "choice1"),

  // ---------- Pilihan 1 ----------
  choice1: c(
    o("wkwkwk kamu juga bukanya", "a1"),
    o("......", "kesel"),
    o("Yah kamu ngapain ngurusin orang", "b1")
  ),
  a1: p("Aku mah beda sama dia", "kesel"),
  b1: p("Abis dia tuh centil tau, yang", "kesel"),

  kesel: p("Aku paling kesel deh lait cewek", "gatel"),
  gatel: p("Udah kegatelan", "cantik"),
  cantik: p("Merasa paling cantik", "choice2"),

  // ---------- Pilihan 2 ----------
  choice2: c(
    o("......", "softlens"),
    o("Ya udah lah orang lain ini", "L1"), // lompat ke L1
    o("Iya, dia suka aku liat begitu", "L2") // lompat ke L2
  ),
  softlens: p("Mana pake softlens lagi", "hitam"),
  hitam: p("Yang warna item", "narasi1"),
  narasi1: n("......", "unyu"),
  unyu: p("Biar dikira unyu kali", "onta"),
  onta: p("Padahal udah kayak burung onta", "choice3"),

  // ---------- Pilihan 3 ----------
  choice3: c(
    o("Ya udah orang lain ini", "L1"),
    o("Iya dia suka liat aku begitu", "L2"),
    o("......", "pernah")
  ),

  // ---------- Jalur L1 ----------
  L1: p("Tapi dia tuh ya", "kebangetan"),
  kebangetan: p("Kebangetan orang nya", "udahjangan"),
  udahjangan: k("Ya udah jangan ngomongin orang terus", "L3"),
  L3: p("Kamu kok g ngerti banget sih", "pengen"),
  pengen: p("Aku kan pengen ngobrol sama kamu", "choice4"),

  choice4: c(
    o("iya tapi jangan ngomongin orang lah", "L4"),
    o("Iya, dia ini bukan kamu", "L4")
  ),
  L4: p("Udah ah!", "gausah"),
  gausah: p("Kita g usah ngobrol lagi", "narasiSad"),
  narasiSad: n("Mereka g ngobrol lagi selamanya...", "sadEnd"),
  sadEnd: end("SAD END 😢"),

  // ---------- Jalur L2 ----------
  L2: p("OOHHH!!", "jadi"),
  jadi: p("Jadi kamu suka liatin dia ??!!!", "loh"),
  loh: k("Loh bukan itu maksudku", "puas"),
  puas: p("Ya udah liatin dia aja sampe puas!", "choice5"),

  choice5: c(
    o("Bener ya, aku liatin", "boleh"),
    o("Iya udah. Jangan ngomongin orang terus", "L3") // lompat ke L3
  ),
  boleh: p("Oh Boleh-boleh. Boleh banget !!", "putus"),
  putus: end("Abis TUh PUTUS 💔"),

  // ---------- Jalur Pilihan 3 (c3 -> "......") ----------
  pernah: p("Aku juga pernah tuh", "iqbal"),
  iqbal: p("Liat dia jalan sama si iqbal ke dufan", "cowok"),
  cowok: p("Cowonya q tau yang!", "gabakal"),
  gabakal: p("Aku mah g bakaln gitu", "yang2"),
  yang2: p("Yang!!", "dengerin"),
  dengerin: p("Kamu dengerin aku ngomong g sih?", "choice6"),

  choice6: c(
    o("....", "L4"),
    o("Kamu ngomongin orang terus", "L4"),
    o("Iya denger kok", "hemm")
  ),
  hemm: p("Hemm...", "pulang"),
  pulang: p("Pulang lah yuk", "ayuk"),
  ayuk: k("Ayukkk", "selamat"),
  selamat: n("Selamat", "happyEnd"),
  happyEnd: end("HAPPY END 🎉"),
};

// ===== Engine =====
function tanyaPilihan(options) {
  const daftar = options.map((opt, i) => `${i + 1}. ${opt.text}`).join("\n");
  while (true) {
    const jawab = prompt(`Pilihan Player:\n\n${daftar}\n\nKetik nomor pilihanmu (1-${options.length}):`);
    const idx = parseInt(jawab, 10);
    if (idx >= 1 && idx <= options.length) return options[idx - 1];
    alert("Pilihan tidak valid, coba lagi ya!");
  }
}

function mulaiGame() {
  let id = "start";
  while (id) {
    const node = story[id];
    if (node.t === "say") {
      alert(`${node.who}:\n${node.text}`);
      id = node.next;
    } else if (node.t === "choice") {
      const pilihan = tanyaPilihan(node.options);
      alert(`${KAMU}:\n${pilihan.text}`);
      id = pilihan.next;
    } else if (node.t === "end") {
      alert(node.text);
      id = null;
    }
  }
  if (confirm("Main lagi?")) mulaiGame();
}

