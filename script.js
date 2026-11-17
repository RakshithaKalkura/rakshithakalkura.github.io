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

const CONTENT = {
  about: `<span class="k b">Rakshitha Kalkura</span>
<span class="d">MS (Computer Science) @ IIT Madras</span>

I work on the <span class="g">robustness and efficiency of Spiking Neural Networks</span>
with Prof. Gopalakrishnan Srinivasan at IIT Madras — adversarial attacks
on quantized models, pruning, and quantization for SNNs.

Try <span class="c">research</span>, <span class="c">publications</span> or <span class="c">contact</span>.`,

  research: `<span class="y b">## Research Experience</span>

<span class="g">▸ IIT Madras</span> — Research Intern            <span class="d">May 2025 – Present</span>
  <span class="d">Supervisor: Prof. Gopalakrishnan Srinivasan</span>
  • Developed <span class="k b">GLARA</span>, a parameter-space attack on quantized SNNs —
    up to <span class="y">22× fewer bit flips</span> than prior attacks on ImageNet-scale models.
  • Large-scale robustness experiments on ResNet/VGG SNNs across
    CIFAR-10, CIFAR-100, DVS-CIFAR10 and ImageNet.
  • Pruning and quantization algorithms for SNNs.

<span class="g">▸ IIT Jodhpur</span> — Research Intern            <span class="d">Feb 2025 – Apr 2025</span>
  <span class="d">Supervisor: Dr. Debasis Das</span>
  • Non-autoregressive multi-horizon flight trajectory prediction
    using Gray Code representation.
  • DNN / GNN / autoencoder models for engine fault detection.

<span class="g">▸ NIT Calicut</span> — Research Intern            <span class="d">May 2024 – Jul 2024</span>
  <span class="d">Supervisor: Dr. M Prabhu</span>
  • Dynamic traffic signal controller: YOLOv8 vehicle-density estimation
    + Deep Q-Network scheduling → <span class="y">30% less waiting time</span>.`,

  publications: `<span class="y b">## Publications</span>

[1] <span class="k b">GLARA: A Parameter-Space Attack on Quantized Spiking Neural Networks</span>
    <span class="d">Under review — European Conference on Computer Vision (ECCV) 2026</span>`,

  education: `<span class="y b">## Education</span>

<span class="g">▸ MS, Computer Science</span>
  Indian Institute of Technology Madras                 <span class="d">ongoing</span>

<span class="g">▸ B.Tech, Computer Science & Engineering</span>
  National Institute of Technology Goa       CGPA <span class="y">9.65/10</span>
  <span class="d">Department Rank 1 · final year as exchange student at IIT Madras (9.5/10)</span>`,

  contact: `<span class="y b">## Contact</span>

  email     ${a("mailto:" + LINKS.email, LINKS.email)}
  blog      ${a(LINKS.blog, "blogger.com/profile/13762794379781336873")}
  github    ${a(LINKS.github, "github.com/RakshithaKalkura")}
  linkedin  ${a(LINKS.linkedin, "linkedin.com/in/rakshitha-k")}`,
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

Type <span class="g b">help</span> to see available commands.
`;

/* ---------------- commands ---------------- */

const HELP = [
  ["about", "who I am"],
  ["research", "research experience"],
  ["publications", "papers"],
  ["education", "degrees"],
  ["contact", "how to reach me"],
  ["blog / github / linkedin", "open a link"],
  ["ls, cat <file>", "browse files"],
  ["neofetch", "system info, but me"],
  ["meow", "spawn another cat"],
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
      if (f === ".secret_cat") { spawnCat(); return "a wild cat appeared! 🐈"; }
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
  meow: () => { spawnCat(); return "meow 🐈 (drag me around)"; },
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
    "<span class=\"c\">Pets</span>:     " + document.querySelectorAll(".cat").length + " ascii cats",
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
  '<span class="p-arrow">➜</span>  <span class="p-user">raksh@iitm</span> <span class="p-dir">~</span>';
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

/* ---------------- ASCII cats ---------------- */

const CAT_SPRITES = [
  [String.raw` /\_/\
( o.o )
 > ^ <`, String.raw` /\_/\
( -.- )
 > ^ <`],
  [String.raw`  |\__/,|   ('\
  |_ _  |.--.) )
  ( T   )     /
 (((^_(((/(((_/`, String.raw`  |\__/,|    /)
  |o o  |.--.) )
  ( T   )     /
 (((^_(((/(((_/`],
  [String.raw`  /\_/\
 ( -.- ) zzz
  o_(")(")`, String.raw`  /\_/\
 ( -.- )  z
  o_(")(")`],
  [String.raw`    /\_____/\
   /  o   o  \
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)`, String.raw`    /\_____/\
   /  -   -  \
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)`],
  [String.raw`   _
  / )      /\_/\
 ( (      ( ^.^ )
  \ \_____/     )
   \           /
    |_|_| |_|_|`, String.raw`     _
    ( \    /\_/\
     ) )  ( ^.^ )
  __/ /___/     )
   \           /
    |_|_| |_|_|`],
];

const catLayer = document.getElementById("cat-layer");
let spriteCursor = 0;

function spawnCat(x, y) {
  const frames = CAT_SPRITES[spriteCursor++ % CAT_SPRITES.length];
  const el = document.createElement("pre");
  el.className = "cat";
  el.textContent = frames[0];
  catLayer.appendChild(el);

  const w = el.offsetWidth, h = el.offsetHeight;
  const px = x ?? Math.random() * Math.max(0, innerWidth - w);
  const py = y ?? Math.random() * Math.max(0, innerHeight - h);
  el.style.left = Math.min(Math.max(0, innerWidth - w), px) + "px";
  el.style.top = Math.min(Math.max(0, innerHeight - h), py) + "px";

  // idle animation: occasionally swap to the second frame (blink / tail flick)
  let frame = 0;
  setInterval(() => {
    if (el.classList.contains("dragging")) return;
    if (frame === 0 && Math.random() < 0.3) {
      frame = 1; el.textContent = frames[1];
    } else if (frame === 1) {
      frame = 0; el.textContent = frames[0];
    }
  }, 600 + Math.random() * 600);

  makeDraggable(el);
  return el;
}

function makeDraggable(el) {
  let offX = 0, offY = 0;

  el.addEventListener("pointerdown", (e) => {
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
    catLayer.appendChild(el); // bring to front among cats
    const r = el.getBoundingClientRect();
    offX = e.clientX - r.left;
    offY = e.clientY - r.top;
    e.preventDefault();
  });

  el.addEventListener("pointermove", (e) => {
    if (!el.classList.contains("dragging")) return;
    const maxX = innerWidth - el.offsetWidth;
    const maxY = innerHeight - el.offsetHeight;
    el.style.left = Math.min(maxX, Math.max(0, e.clientX - offX)) + "px";
    el.style.top = Math.min(maxY, Math.max(0, e.clientY - offY)) + "px";
  });

  const drop = () => el.classList.remove("dragging");
  el.addEventListener("pointerup", drop);
  el.addEventListener("pointercancel", drop);
}

// initial cats, placed near the edges so they peek out around the terminal
function initialCats() {
  const spots = innerWidth < 700
    ? [[0.02, 0.01], [0.55, 0.88]]
    : [[0.02, 0.05], [0.80, 0.04], [0.03, 0.70], [0.82, 0.72], [0.40, 0.88]];
  spots.forEach(([fx, fy]) => spawnCat(fx * innerWidth, fy * innerHeight));
}

/* ---------------- boot ---------------- */

initialCats();
print(WELCOME);
input.focus();
