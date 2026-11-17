/* =========================================================
   Rakshitha Kalkura — interactive zsh portfolio
   ========================================================= */

const LINKS = {
  blog: "https://www.blogger.com/profile/13762794379781336873",
  github: "https://github.com/RakshithaKalkura",
  linkedin: "https://linkedin.com/in/rakshitha-k",
  email: "rakshithakalkura837@gmail.com",
};

const a = (href, text) =>
  `<a href="${href}" target="_blank" rel="noopener">${text || href}</a>`;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

/* ---------------- content ---------------- */

// one-liners for the terminal — the full details live in the simple view (type `gui`)
const MORE = ' <span class="d">· details:</span> <span class="g">gui</span>';
const CONTENT = {
  about: `<span class="k b">Rakshitha Kalkura</span> — MS (CS) @ IIT Madras, researching robust &amp; efficient <span class="g">Spiking Neural Networks</span>.`,
  research: `<span class="g">IIT Madras</span> (GLARA, SNN attacks) · <span class="g">IIT Jodhpur</span> (flight trajectories) · <span class="g">NIT Calicut</span> (RL traffic signals)` + MORE,
  publications: `<span class="k b">GLARA</span>: parameter-space attack on quantized SNNs, <span class="y">22× fewer bit flips</span> — under review, ECCV 2026` + MORE,
  education: `MS CS @ <span class="g">IIT Madras</span> (ongoing) · B.Tech CSE @ <span class="g">NIT Goa</span>, <span class="y">9.65</span> CGPA, Dept. Rank 1`,
  contact: `${a("mailto:" + LINKS.email, LINKS.email)} · ${a(LINKS.blog, "blog")} · ${a(LINKS.github, "github")} · ${a(LINKS.linkedin, "linkedin")}`,
};

const FILES = {
  "about.txt": CONTENT.about,
  "research.md": CONTENT.research,
  "publications.md": CONTENT.publications,
  "education.md": CONTENT.education,
  "contact.txt": CONTENT.contact,
};

const BANNER = String.raw`
 ____       _        _     _ _   _
|  _ \ __ _| | _____| |__ (_) |_| |__   __ _
| |_) / _' | |/ / __| '_ \| | __| '_ \ / _' |
|  _ < (_| |   <\__ \ | | | | |_| | | | (_| |
|_| \_\__,_|_|\_\___/_| |_|_|\__|_| |_|\__,_|
`;

const WELCOME = `<span class="k banner">${escapeHtml(BANNER)}</span>
Welcome! I'm <span class="k b">Rakshitha Kalkura</span>, MS (CS) student at IIT Madras
working on Spiking Neural Networks.

Type <span class="g b">help</span> for commands, <span class="g b">gui</span> for a simple portfolio view.
<span class="d">psst: drag &amp; throw the cats, click to boop, or type </span><span class="g">play</span>
`;

/* ---------------- commands ---------------- */

const HELP = [
  ["hello", "say hi"],
  ["about", "who I am"],
  ["research", "research experience"],
  ["publications", "papers"],
  ["education", "degrees"],
  ["contact", "how to reach me"],
  ["blog / github / linkedin", "open a link"],
  ["gui", "switch to the simple (detailed) portfolio"],
  ["ls, cat <file>", "browse files"],
  ["neofetch", "system info, but me"],
  ["play", "how to play with the cats"],
  ["meow · yarn · laser", "more cats · a yarn ball · laser pointer"],
  ["zoomies · nap · cats", "cat chaos · nap time · who's who"],
  ["history, clear", "the usual"],
];

const history = [];
let histIdx = 0;

const openLink = (url, label) => {
  window.open(url, "_blank", "noopener");
  return `Opening ${label}… ${a(url)}`;
};

const COMMANDS = {
  help: () =>
    "<span class=\"y b\">Available commands</span>\n\n" +
    HELP.map(([c, d]) => `  <span class="g">${c.padEnd(26)}</span><span class="d">${d}</span>`).join("\n") +
    "\n\n<span class=\"d\">Tip: Tab autocompletes, ↑/↓ browse history.</span>",
  hello: () => `👋 hello there! I'm <span class="k b">Rakshitha</span> — try <span class="g">about</span>, <span class="g">research</span> or <span class="g">gui</span>.`,
  hi: () => COMMANDS.hello(),
  hey: () => COMMANDS.hello(),
  gui: () => { setTimeout(() => setView("simple"), 250); return "opening simple view…"; },
  simple: () => COMMANDS.gui(),
  portfolio: () => COMMANDS.gui(),
  about: () => CONTENT.about,
  whoami: () => CONTENT.about,
  research: () => CONTENT.research,
  experience: () => CONTENT.research,
  publications: () => CONTENT.publications,
  papers: () => CONTENT.publications,
  education: () => CONTENT.education,
  contact: () => CONTENT.contact,
  socials: () => CONTENT.contact,
  blog: () => openLink(LINKS.blog, "blog"),
  github: () => openLink(LINKS.github, "GitHub"),
  linkedin: () => openLink(LINKS.linkedin, "LinkedIn"),
  email: () => openLink("mailto:" + LINKS.email, "mail client"),
  ls: (args) => {
    if (args.includes("-a") || args.includes("-la")) {
      return "<span class=\"d\">.secret_cat</span>  " + lsLine();
    }
    return lsLine();
  },
  cat: (args) => {
    if (!args.length) return "<span class=\"d\">usage: cat &lt;file&gt;  — try </span><span class=\"g\">ls</span>";
    return args.map((f) => {
      if (FILES[f]) return FILES[f];
      if (f === ".secret_cat") { const c = spawnCat(); return c ? `a wild ${c.name} appeared! 🐈` : "the cats are hiding."; }
      return `<span class="r">cat: ${escapeHtml(f)}: No such file or directory</span>`;
    }).join("\n\n");
  },
  pwd: () => "/home/raksh",
  cd: (args) => (!args.length || args[0] === "~" ? "" :
    `<span class="r">cd: no such file or directory: ${escapeHtml(args[0])}</span>`),
  echo: (args) => escapeHtml(args.join(" ")),
  date: () => new Date().toString(),
  history: () => history.map((h, i) => `  ${String(i + 1).padStart(3)}  ${escapeHtml(h)}`).join("\n"),
  clear: () => { output.innerHTML = ""; return null; },
  neofetch: () => neofetch(),
  meow: () => {
    const c = spawnCat();
    return c ? `<span class="k">${c.name}</span> dropped in 🐈  <span class="d">(drag, throw or click them)</span>`
             : `that's enough cats for now (${MAX_CATS}) 😼`;
  },
  play: () => `<span class="y b">## Cat playground</span>

  <span class="g">drag</span> a cat        pick it up — let go mid-swing to <span class="k">throw</span> it
  <span class="g">click</span> a cat       boop! it hops
  <span class="g">double-click</span>      zoomies
  <span class="g">hover</span> a cat       pet it (purr~)

  <span class="g">yarn</span>              toss in a ball of yarn (drag &amp; throw it too)
  <span class="g">laser</span>             toggle a laser pointer that follows your cursor
  <span class="g">zoomies</span>           everybody runs
  <span class="g">nap</span>               everybody sleeps
  <span class="g">meow</span>              another cat (max ${MAX_CATS})
  <span class="g">cats</span>              roll call

<span class="d">Cats can climb onto the terminal window — and fall off it.</span>`,
  yarn: () => (spawnYarn() ? "🧶 a ball of yarn drops in… the cats have noticed."
                           : `that's plenty of yarn (${MAX_YARN}).`),
  laser: () => (toggleLaser()
    ? "<span class=\"r\">●</span> laser pointer <span class=\"g\">ON</span> — move your cursor around. type <span class=\"g\">laser</span> again to stop."
    : "laser pointer <span class=\"d\">OFF</span>. the cats are disappointed."),
  zoomies: () => { cats.forEach((c) => c.zoomies()); return "🐈💨 ZOOMIES"; },
  nap: () => { cats.forEach((c) => c.nap()); return "shhh… nap time. 💤"; },
  cats: () => cats.length
    ? cats.map((c) => `  <span class="k">${c.name.padEnd(8)}</span> <span class="d">${
        c.held ? "being held" : { air: "flying", crouch: "about to jump", sit: "sitting", walk: "strolling",
          run: "running", zoom: "having the zoomies", chase: "playing", sleep: "napping" }[c.state] || c.state
      }</span>`).join("\n")
    : "no cats?! type <span class=\"g\">meow</span>",
  sudo: () => "<span class=\"r\">raksh is not in the sudoers file. This incident will be reported to the cats.</span>",
  exit: () => "There is no escape. Try <span class=\"g\">contact</span> instead :)",
  vim: () => "you're stuck now. just kidding — this isn't a real shell.",
};

function lsLine() {
  return Object.keys(FILES)
    .map((f) => `<span class="${f.endsWith(".md") ? "c" : "g"}">${f}</span>`)
    .join("  ");
}

function neofetch() {
  const art = String.raw`   /\_/\
  ( o.o )
   > ^ <
  /     \
 (_______)`.split("\n");
  const info = [
    `<span class="k b">raksh</span>@<span class="k b">iitm</span>`,
    "<span class=\"d\">-----------</span>",
    "<span class=\"c\">OS</span>:       MS (CS) @ IIT Madras",
    "<span class=\"c\">Kernel</span>:   Spiking Neural Networks",
    "<span class=\"c\">Focus</span>:    robustness · quantization · pruning",
    "<span class=\"c\">Shell</span>:    zsh (sort of)",
    "<span class=\"c\">Uptime</span>:   B.Tech NIT Goa · 9.65 CGPA",
    "<span class=\"c\">Packages</span>: PyTorch, Python, C++",
    "<span class=\"c\">Pets</span>:     " + cats.length + " ascii cats",
  ];
  const rows = Math.max(art.length, info.length);
  let out = "";
  for (let i = 0; i < rows; i++) {
    out += `<span class="k">${escapeHtml((art[i] || "").padEnd(14))}</span>${info[i] || ""}\n`;
  }
  return out;
}

/* ---------------- terminal plumbing ---------------- */

const output = document.getElementById("output");
const input = document.getElementById("cmd");
const terminal = document.getElementById("terminal");
const promptEl = document.getElementById("prompt");

const PROMPT_HTML =
  '<span class="p-arrow">➜</span>  <span class="p-user">raksh@raksh</span> <span class="p-dir">~</span>';
promptEl.innerHTML = PROMPT_HTML;

function print(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  output.appendChild(div);
}

function run(raw) {
  const line = raw.trim();
  print(`${PROMPT_HTML} ${escapeHtml(raw)}`);
  if (!line) return;
  history.push(line);
  histIdx = history.length;

  const [name, ...args] = line.split(/\s+/);
  const fn = COMMANDS[name.toLowerCase()];
  if (!fn) {
    print(`<span class="r">zsh: command not found: ${escapeHtml(name)}</span>  <span class="d">(try </span><span class="g">help</span><span class="d">)</span>`);
  } else {
    const res = fn(args);
    if (res) print(res);
  }
  print("");
}

function complete(value) {
  const parts = value.split(/\s+/);
  if (parts.length === 1) {
    const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(parts[0]));
    if (matches.length === 1) return matches[0] + " ";
    if (matches.length > 1) { print(`${PROMPT_HTML} ${escapeHtml(value)}\n${matches.join("  ")}`); }
  } else if (parts[0] === "cat") {
    const last = parts[parts.length - 1];
    const matches = Object.keys(FILES).filter((f) => f.startsWith(last));
    if (matches.length === 1) { parts[parts.length - 1] = matches[0]; return parts.join(" "); }
    if (matches.length > 1) print(`${PROMPT_HTML} ${escapeHtml(value)}\n${matches.join("  ")}`);
  }
  return value;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    run(input.value);
    input.value = "";
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (histIdx > 0) input.value = history[--histIdx];
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    histIdx = Math.min(history.length, histIdx + 1);
    input.value = history[histIdx] || "";
  } else if (e.key === "Tab") {
    e.preventDefault();
    input.value = complete(input.value);
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    output.innerHTML = "";
  } else {
    return;
  }
  terminal.scrollTop = terminal.scrollHeight;
});

// clicking anywhere in the terminal focuses the prompt (unless selecting text / clicking a link)
terminal.addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  if (window.getSelection().toString()) return;
  input.focus();
});

/* ---------------- ASCII cat playground ---------------- */
/*  Cats walk, run, jump, nap, chase each other and the yarn,
    and can stand on top of the terminal window.
    Visitors can drag & throw cats/yarn, click to boop (double-click = zoomies),
    hover to pet, and turn on a laser pointer.                               */

const catLayer = document.getElementById("cat-layer");
const termWindow = document.getElementById("window");
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const G = 1500;            // gravity, px/s²
const MAX_CATS = 12;
const MAX_YARN = 3;
const CAT_NAMES = ["Mochi", "Biscuit", "Tofu", "Pixel", "Byte", "Neko",
                   "Pepper", "Kernel", "Tensor", "Spike", "Noodle", "Ziggy"];
const CAT_COLORS = ["#8b949e", "#d29b62", "#c9b99a", "#a5a9c9", "#b58db6", "#7fa7a3"];

const rand = (lo, hi) => lo + Math.random() * (hi - lo);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ----- sprites (side views face right; mirrored for left) ----- */

const SIDE_R = {
  walk: [
String.raw`  _     /\_/\
 ( \___/ o.o )
  \_   __  _/
   /_/   \_\ `,
String.raw`  _     /\_/\
 ( \___/ o.o )
  \_   __  _/
   \_\   /_/ `],
  run: [
String.raw`  _      /\_/\
 ( \____/ o.o )
  \_    __  _/
  /_/      \_\ `,
String.raw`  _      /\_/\
 ( \____/ o.o )
  \_    __  _/
     \_\/_/ `],
  jump: [
String.raw`  _     /\_/\
 ( \___/ O.O )
  \_   __  _/
  //       \\ `],
  crouch: [
String.raw`
  _        /\_/\
 ( \______/ >.< )
  \_\_\__/_/_/ `],
};

const SWAP = { "/": "\\", "\\": "/", "(": ")", ")": "(", "<": ">", ">": "<" };
function mirror(art) {
  const lines = art.split("\n");
  const w = Math.max(...lines.map((l) => l.length));
  return lines
    .map((l) => [...l.padEnd(w)].reverse().map((c) => SWAP[c] || c).join("").replace(/\s+$/, ""))
    .join("\n");
}
const SIDE_L = Object.fromEntries(Object.entries(SIDE_R).map(([k, fr]) => [k, fr.map(mirror)]));

const SIT = (face) => String.raw`  /\_/\
 ( ${face} )
  > ^ <
 (")_(")`;

const SLEEP = [
String.raw`        z
  /\_/\
 ( -.- )__
  (")(")__)`,
String.raw`       Z
  /\_/\ z
 ( -.- )__
  (")(")__)`];

const HELD = [
String.raw`  /\_/\
 ( O.O )
  /| |\
   U U`,
String.raw`  /\_/\
 ( O.O )
  \| |/
   U U`];

/* ----- world ----- */

const cats = [];
const yarns = [];
const laser = { on: false, x: innerWidth / 2, y: innerHeight / 2, el: null };

function surfaces() {
  const r = termWindow.getBoundingClientRect();
  return { floor: innerHeight - 2, win: { x1: r.left + 6, x2: r.right - 6, y: r.top } };
}

// gravity + walls + landing on floor / top of the terminal window
function integrate(b, dt, S, bounce) {
  const prevY = b.y;
  b.vy += G * dt;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  const half = b.w / 2;
  if (b.x < half) { b.x = half; b.vx = Math.abs(b.vx) * bounce; }
  if (b.x > innerWidth - half) { b.x = innerWidth - half; b.vx = -Math.abs(b.vx) * bounce; }
  if (b.y - b.h < 0 && b.vy < 0) { b.y = b.h; b.vy = Math.abs(b.vy) * 0.3; }
  if (b.vy >= 0 && prevY <= S.win.y + 1 && b.y >= S.win.y && b.x > S.win.x1 && b.x < S.win.x2) {
    const impact = b.vy; b.y = S.win.y; return { on: "win", y: S.win.y, impact };
  }
  if (b.y >= S.floor) {
    const impact = b.vy; b.y = S.floor; return { on: "floor", y: S.floor, impact };
  }
  return null;
}

function supported(b, S) {
  if (b.on === "win") {
    if (b.x <= S.win.x1 || b.x >= S.win.x2) return false;
    b.y = S.win.y;
    return true;
  }
  if (b.on === "floor") { b.y = S.floor; return true; }
  return false;
}

// drag / throw / click, shared by cats and yarn
function bindPointer(body) {
  const el = body.el;
  let start = null, samples = [], offX = 0, offY = 0;

  el.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    start = { x: e.clientX, y: e.clientY, t: performance.now() };
    samples = [start];
    offX = e.clientX - body.x;
    offY = e.clientY - body.y;
  });

  el.addEventListener("pointermove", (e) => {
    if (!start) return;
    const p = { x: e.clientX, y: e.clientY, t: performance.now() };
    if (!body.held && Math.hypot(p.x - start.x, p.y - start.y) > 5) {
      body.grab();
      el.classList.add("dragging");
    }
    if (!body.held) return;
    body.x = clamp(p.x - offX, body.w / 2, innerWidth - body.w / 2);
    body.y = clamp(p.y - offY, body.h, innerHeight);
    samples.push(p);
    while (samples.length > 2 && p.t - samples[0].t > 100) samples.shift();
  });

  const up = () => {
    if (!start) return;
    if (body.held) {
      el.classList.remove("dragging");
      const a = samples[0], b = samples[samples.length - 1];
      const dt = Math.max(16, b.t - a.t) / 1000;
      let vx = (b.x - a.x) / dt, vy = (b.y - a.y) / dt;
      const sp = Math.hypot(vx, vy);
      if (sp > 1800) { vx *= 1800 / sp; vy *= 1800 / sp; }
      body.release(vx, vy);
    } else {
      body.click();
    }
    start = null;
  };
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
}

/* ----- cats ----- */

class Cat {
  constructor(x, y) {
    this.name = CAT_NAMES[cats.length % CAT_NAMES.length];
    this.el = document.createElement("div");
    this.el.className = "cat";
    this.el.style.color = CAT_COLORS[cats.length % CAT_COLORS.length];
    this.el.title = this.name;
    this.bubble = document.createElement("span");
    this.bubble.className = "bubble";
    this.pre = document.createElement("pre");
    this.el.append(this.bubble, this.pre);
    catLayer.appendChild(this.el);

    this.x = x; this.y = y; this.vx = 0; this.vy = 0;
    this.w = 0; this.h = 0; this.on = null;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    this.state = "air"; this.timer = 0; this.frameT = 0;
    this.cool = 0; this.blinkT = 0; this.petted = false; this.lastPurr = 0;
    this.playmate = null; this.held = false; this.lastClick = 0;
    this.jumpVx = 0; this.jumpVy = 0; this.sprite = "";
    this.offset = rand(-45, 45);
    this.attention = rand(4, 10);          // personal spot so cats don't stack
    this.bored = 0; this.yarnT = 0;

    bindPointer(this);
    this.el.addEventListener("pointerenter", () => this.pet(true));
    this.el.addEventListener("pointerleave", () => this.pet(false));
    this.render();
  }

  say(text, ms = 1400) {
    this.bubble.textContent = text;
    this.bubble.classList.add("show");
    clearTimeout(this.sayT);
    this.sayT = setTimeout(() => this.bubble.classList.remove("show"), ms);
  }

  setState(s, t = 0) { this.state = s; this.timer = t; this.frameT = 0; }
  get grounded() { return this.on && !this.held && this.state !== "air"; }

  /* --- reactions to the visitor --- */
  grab() { this.held = true; this.state = "held"; this.on = null; this.say(pick(["!!", "hey!", "mrrp?!", "put me down"])); }
  release(vx, vy) {
    this.held = false; this.state = "air"; this.vx = vx; this.vy = vy;
    if (Math.hypot(vx, vy) > 900) this.say(pick(["wheee!", "aaaa!", "yeet"]));
  }
  click() {
    const now = performance.now();
    if (now - this.lastClick < 350) this.zoomies();
    else if (this.state === "sleep") { this.say("?!"); this.hop(380); }
    else { this.say(pick(["mrrp!", "meow", "boop!", this.name, "purr~"])); this.hop(rand(450, 600)); }
    this.lastClick = now;
  }
  pet(on) {
    this.petted = on;
    if (!on || this.held) return;
    if (this.state === "walk" || this.state === "run") this.setState("sit", 2.5);
    const now = performance.now();
    if (now - this.lastPurr > 2500) { this.say(this.state === "sleep" ? "zzz… purr" : "purr~"); this.lastPurr = now; }
  }
  zoomies() {
    if (!this.grounded) return;
    this.playmate = null;
    this.setState("zoom", rand(2.5, 4.5));
    this.say("zoomies!!");
  }
  hop(vy, vx = 0) {
    if (!this.grounded) return;
    this.jumpVy = -vy; this.jumpVx = vx;
    this.setState("crouch", 0.12);
  }
  nap() { if (this.grounded) { this.playmate = null; this.setState("sleep", rand(8, 14)); } }

  /* --- brain --- */
  decide() {
    this.playmate = null;
    const r = Math.random();
    if (REDUCED) return r < 0.6 ? this.setState("sit", rand(3, 7)) : this.setState("sleep", rand(6, 12));
    if (r < 0.26) this.setState("sit", rand(1.5, 4));
    else if (r < 0.52) { if (Math.random() < 0.5) this.dir *= -1; this.setState("walk", rand(2, 5)); }
    else if (r < 0.66) { if (Math.random() < 0.5) this.dir *= -1; this.setState("run", rand(1, 2.5)); }
    else if (r < 0.80) this.hop(rand(420, 680), this.dir * rand(100, 260));
    else if (r < 0.88) this.setState("sleep", rand(5, 12));
    else this.startPlay();
  }

  startPlay() {
    const others = cats.filter((c) => c !== this && c.grounded && c.state !== "sleep");
    if (!others.length) return this.setState("sit", 2);
    const mate = pick(others);
    this.playmate = mate;
    this.setState("chase", rand(3, 5));
    this.say(pick(["tag!", "play?", "gotcha"]));
    mate.dir = Math.sign(mate.x - this.x) || 1;
    mate.setState("run", rand(1.5, 3));
  }

  target() {
    if (laser.on) return { x: laser.x, y: laser.y, kind: "laser" };
    if (this.state === "sleep" || this.state === "zoom" || this.bored > 0) return null;
    let best = null, bestD = Infinity;
    for (const y of yarns) {
      const d = Math.abs(y.x - this.x);
      const interesting = y.held || Math.abs(y.vx) > 40 || Math.abs(y.vy) > 40 || d < 220;
      if (interesting && d < bestD) { best = y; bestD = d; }
    }
    if (best) return { x: best.x, y: best.y - best.h / 2, kind: "yarn", ref: best };
    if (this.playmate && this.state === "chase") {
      const m = this.playmate;
      return { x: m.x, y: m.y, kind: "cat", ref: m };
    }
    return null;
  }

  chase(t) {
    if (this.state !== "chase") this.setState("chase", t.kind === "cat" ? this.timer : 99);
    const dx = t.x + (t.kind === "laser" ? this.offset : 0) - this.x;
    const above = this.y - t.y; // > 0 when target is above our feet
    if (Math.abs(dx) > 10) this.dir = Math.sign(dx);
    this.chaseSpeed = Math.abs(dx) < 12 ? 0 : t.kind === "laser" ? 280 : 220;

    if (this.cool > 0) return;
    if (above > 55 && Math.abs(dx) < 160) {                 // pounce upward
      const vy = Math.sqrt(2 * G * Math.min(above + 25, 600));
      this.hop(vy, clamp(dx / (vy / G), -420, 420));
      this.cool = 0.9;
    } else if (t.kind === "yarn" && Math.abs(dx) < 28 && above < 40 && !t.ref.held) {   // bat the yarn
      t.ref.kick(this.dir * rand(220, 520), -rand(180, 480));
      if (Math.random() < 0.25) this.say(pick(["mine!", "*bat*", "hehe"]));
      this.cool = 0.5;
    } else if (t.kind === "cat" && Math.abs(dx) < 34) {    // pounce on playmate
      this.hop(rand(350, 480), this.dir * 140);
      t.ref.say("!");
      t.ref.hop(rand(300, 420), -this.dir * 120);
      this.playmate = null;
      this.cool = 1.2;
    }
  }

  update(dt, S) {
    this.cool = Math.max(0, this.cool - dt);
    this.bored = Math.max(0, this.bored - dt);
    if (this.held) { this.frameT += dt * 6; return; }

    if (this.state === "air") {
      const hit = integrate(this, dt, S, 0.5);
      this.frameT += dt;
      if (hit) {
        this.on = hit.on; this.vx = 0; this.vy = 0;
        if (hit.impact > 1100) this.say(pick(["oof", "mrow!", "nailed it", "10/10 landing"]));
        if (this.zoomLeft > 0) { this.setState("zoom", this.zoomLeft); this.zoomLeft = 0; }
        else this.setState("sit", rand(0.3, 1.2));
      }
      return;
    }

    if (!supported(this, S)) {          // walked off the edge of the window
      this.on = null; this.vy = 0;
      this.state = "air";
      return;
    }

    this.timer -= dt;
    const t = this.target();
    if (t && t.kind === "laser" && this.state === "sleep") { this.say("!"); this.setState("sit", 0.2); }

    if (this.state === "crouch") {
      if (this.timer <= 0) { this.on = null; this.vx = this.jumpVx; this.vy = this.jumpVy; this.state = "air"; }
    } else if (t && this.state !== "sleep") {
      this.chase(t);
      if (t.kind === "cat" && this.timer <= 0) this.decide();
      if (t.kind === "yarn" && (this.yarnT += dt) > this.attention) {   // lose interest for a bit
        this.yarnT = 0; this.attention = rand(4, 10);
        this.bored = rand(5, 12);
        if (Math.random() < 0.4) this.say(pick(["meh", "*yawn*", "bored now"]));
        this.decide();
      }
    } else if (this.state === "chase" || this.timer <= 0) {
      this.decide();
    }

    // personal space
    for (const o of cats) {
      if (o === this || o.on !== this.on || !o.grounded) continue;
      const d = this.x - o.x;
      if (Math.abs(d) < 28) this.x += (d >= 0 ? 1 : -1) * 40 * dt;
    }

    // locomotion
    const speed = { walk: 45, run: 175, zoom: 330, chase: this.chaseSpeed || 0 }[this.state] || 0;
    this.x += speed * this.dir * dt;
    const half = this.w / 2;
    if (this.x < half) { this.x = half; this.dir = 1; }
    if (this.x > innerWidth - half) { this.x = innerWidth - half; this.dir = -1; }
    if (this.state === "zoom" && Math.random() < dt * 1.5) {
      const keep = this.timer;
      this.hop(rand(350, 600), this.dir * 300);
      this.cool = 0.3;
      this.zoomLeft = keep;
    }

    // animation clocks
    this.frameT += dt * ({ walk: 5, run: 11, zoom: 16, chase: speed ? 12 : 0, sleep: 0.8 }[this.state] || 0);
    if (this.blinkT > 0) this.blinkT -= dt;
    else if (Math.random() < dt * 0.35) this.blinkT = 0.15;
  }

  spriteText() {
    const f = Math.floor(this.frameT);
    const side = this.dir > 0 ? SIDE_R : SIDE_L;
    switch (this.state) {
      case "held": return HELD[f % 2];
      case "air": return side.jump[0];
      case "crouch": return side.crouch[0];
      case "walk": return side.walk[f % 2];
      case "run": case "zoom": return side.run[f % 2];
      case "chase": return this.chaseSpeed ? side.run[f % 2] : SIT("o.o");
      case "sleep": return this.petted ? SIT("^.^") : SLEEP[f % 2];
      default: return SIT(this.petted ? "^.^" : this.blinkT > 0 ? "-.-" : "o.o");
    }
  }

  render() {
    const s = this.spriteText();
    if (s !== this.sprite) {
      this.sprite = s;
      this.pre.textContent = s;
      this.w = this.pre.offsetWidth;
      this.h = this.pre.offsetHeight;
    }
    this.el.style.transform = `translate(${this.x - this.w / 2}px, ${this.y - this.h}px)`;
    const front = this.held || this.state === "air" || this.state === "crouch";
    if (front !== this.front) { this.front = front; this.el.classList.toggle("front", front); }
  }
}

/* ----- yarn ----- */

class Yarn {
  constructor(x, y) {
    this.el = document.createElement("div");
    this.el.className = "yarn";
    this.el.textContent = "@";
    this.el.title = "yarn — drag & throw me";
    catLayer.appendChild(this.el);
    this.w = this.el.offsetWidth; this.h = this.el.offsetHeight;
    this.x = x; this.y = y; this.vx = rand(-200, 200); this.vy = 0;
    this.on = null; this.held = false; this.rot = 0;
    bindPointer(this);
  }
  grab() { this.held = true; this.on = null; }
  release(vx, vy) { this.held = false; this.vx = vx; this.vy = vy; }
  click() { this.kick(rand(-300, 300), -rand(350, 550)); }
  kick(vx, vy) { this.on = null; this.vx = vx; this.vy = vy; }

  update(dt, S) {
    if (this.held) return;
    if (this.on && supported(this, S)) {
      this.vx *= Math.pow(0.3, dt);           // rolling friction
      if (Math.abs(this.vx) < 4) this.vx = 0;
      this.x += this.vx * dt;
      const half = this.w / 2;
      if (this.x < half) { this.x = half; this.vx = Math.abs(this.vx) * 0.6; }
      if (this.x > innerWidth - half) { this.x = innerWidth - half; this.vx = -Math.abs(this.vx) * 0.6; }
    } else {
      this.on = null;
      const hit = integrate(this, dt, S, 0.7);
      if (hit) {
        if (hit.impact > 160) { this.vy = -hit.impact * 0.5; this.y -= 0.5; }
        else { this.on = hit.on; this.vy = 0; }
      }
    }
    this.rot += (this.vx * dt) / (this.w / 2);
  }
  render() {
    this.el.style.transform =
      `translate(${this.x - this.w / 2}px, ${this.y - this.h}px) rotate(${this.rot}rad)`;
    this.el.classList.toggle("front", this.held || !this.on);
  }
}

/* ----- spawning, laser, main loop ----- */

function spawnCat(x, y) {
  if (cats.length >= MAX_CATS) return null;
  const c = new Cat(x ?? rand(60, innerWidth - 60), y ?? -10);
  cats.push(c);
  return c;
}

function spawnYarn() {
  if (yarns.length >= MAX_YARN) return null;
  const y = new Yarn(rand(80, innerWidth - 80), 20);
  yarns.push(y);
  return y;
}

function toggleLaser() {
  laser.on = !laser.on;
  if (!laser.el) {
    laser.el = document.createElement("div");
    laser.el.className = "laser";
    document.body.appendChild(laser.el);
  }
  laser.el.style.display = laser.on ? "block" : "none";
  return laser.on;
}

addEventListener("pointermove", (e) => {
  laser.x = e.clientX; laser.y = e.clientY;
  if (laser.on) laser.el.style.transform = `translate(${laser.x - 5}px, ${laser.y - 5}px)`;
});

let lastTick = performance.now();
function tick(now) {
  const dt = clamp((now - lastTick) / 1000, 0, 0.05);
  lastTick = Math.max(lastTick, now);
  const S = surfaces();
  for (const c of cats) { c.update(dt, S); c.render(); }
  for (const y of yarns) { y.update(dt, S); y.render(); }
  requestAnimationFrame(tick);
}

function initialCats() {
  const n = innerWidth < 700 ? 2 : 4;
  for (let i = 0; i < n; i++) setTimeout(() => spawnCat(), 300 + i * 700);
  if (innerWidth >= 700) setTimeout(spawnYarn, 3500);
  requestAnimationFrame(tick);
}

/* ---------------- views: terminal <-> simple ---------------- */

function setView(view) {
  document.body.className = "view-" + view;
  document.querySelectorAll(".menu [data-view]").forEach((b) =>
    b.classList.toggle("active", b.dataset.view === view));
  if (view === "simple") {
    if (laser.on) toggleLaser();
    window.history.replaceState(null, "", "#portfolio");
    document.getElementById("simple").scrollTop = 0;
  } else {
    window.history.replaceState(null, "", location.pathname + location.search);
    input.focus();
  }
}

document.querySelectorAll(".menu [data-view]").forEach((b) =>
  b.addEventListener("click", () => setView(b.dataset.view)));

document.getElementById("help-btn").addEventListener("click", () => {
  setView("terminal");
  run("help");
  terminal.scrollTop = terminal.scrollHeight;
});

/* ---------------- boot ---------------- */

initialCats();
print(WELCOME);
if (location.hash === "#portfolio") setView("simple");
else input.focus();
