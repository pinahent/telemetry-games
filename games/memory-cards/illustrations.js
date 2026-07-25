"use strict";

(function exposeIllustrations(global) {
  let renderSerial = 0;

  const palettes = Object.freeze({
    herring: ["#5d8792", "#d9e6e5", "#f8f1dc", "#789ba4"],
    sprat: ["#547b87", "#cfdddc", "#f4ecd8", "#718f97"],
    mackerel: ["#1f5664", "#76aeb5", "#e8efe6", "#4f8289"],
    cod: ["#5c604b", "#a59b72", "#e6d8b6", "#7f8064"],
    haddock: ["#4f6669", "#b8c8c5", "#eff1e5", "#81999a"],
    plaice: ["#6c563d", "#a88b5d", "#d6bc87", "#8b704c"],
    salmon: ["#3f6f76", "#b8d0cc", "#f2e6d0", "#7f9fa0"],
    eel: ["#424a32", "#79805a", "#b3aa76", "#5e6848"],
    seabass: ["#526d73", "#c2d2d0", "#eff0df", "#7f989b"],
    dogfish: ["#506c72", "#9bb0b0", "#e8e7d8", "#718c90"],
    catshark: ["#655d4c", "#a79b7d", "#ddd2b8", "#847960"],
    tope: ["#506a70", "#94a9aa", "#e5e6dc", "#70878a"],
    thornback: ["#65503f", "#a68262", "#d7c09a", "#80664f"],
    spottedRay: ["#6b5b46", "#ae9472", "#dac7a4", "#88745a"],
    pollack: ["#425e5b", "#93a49a", "#d9d9bd", "#6e8178"]
  });

  function renderFishIllustration(visualKey) {
    const builder = drawings[visualKey] || drawings.herring;
    return builder();
  }

  function makeSvg(key, viewBox, palette, contentBuilder) {
    renderSerial += 1;
    const prefix = `fish-${key}-${renderSerial}`;
    const ids = {
      body: `${prefix}-body`,
      fin: `${prefix}-fin`,
      pale: `${prefix}-pale`,
      water: `${prefix}-water`,
      shadow: `${prefix}-shadow`
    };
    const [dark, mid, light, fin] = palette;
    const content = contentBuilder(ids);
    return `<svg class="species-svg species-svg--${key}" viewBox="${viewBox}" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${ids.body}" x1="0" y1="0" x2="0.18" y2="1">
          <stop offset="0" stop-color="${dark}"/>
          <stop offset="0.42" stop-color="${mid}"/>
          <stop offset="0.78" stop-color="${light}"/>
          <stop offset="1" stop-color="${mid}"/>
        </linearGradient>
        <linearGradient id="${ids.fin}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${fin}" stop-opacity="0.95"/>
          <stop offset="1" stop-color="${dark}" stop-opacity="0.62"/>
        </linearGradient>
        <linearGradient id="${ids.pale}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fffdf7" stop-opacity="0.85"/>
          <stop offset="1" stop-color="${light}" stop-opacity="0.12"/>
        </linearGradient>
        <linearGradient id="${ids.water}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#d8eff0" stop-opacity="0"/>
          <stop offset="0.55" stop-color="#d8eff0" stop-opacity="0.65"/>
          <stop offset="1" stop-color="#d8eff0" stop-opacity="0"/>
        </linearGradient>
        <filter id="${ids.shadow}" x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="2.2"/>
        </filter>
      </defs>
      <ellipse class="art-shadow" cx="112" cy="108" rx="78" ry="7" filter="url(#${ids.shadow})"/>
      ${content}
    </svg>`;
  }

  function eye(x, y, scale = 1) {
    return `<ellipse class="art-eye-white" cx="${x}" cy="${y}" rx="${5.2 * scale}" ry="${4.5 * scale}"/>
      <circle class="art-pupil" cx="${x + 0.9 * scale}" cy="${y + 0.4 * scale}" r="${2.45 * scale}"/>
      <circle class="art-eye-glint" cx="${x + 1.7 * scale}" cy="${y - 0.8 * scale}" r="${0.8 * scale}"/>`;
  }

  function smallScales(rows) {
    return rows.map(([startX, y, count, spacing]) => Array.from({ length: count }, (_, i) => {
      const x = startX + i * spacing;
      return `<path class="art-scale" d="M${x} ${y} q${spacing / 2} ${spacing / 2.5} ${spacing} 0"/>`;
    }).join("")).join("");
  }

  const drawings = {
    herring: () => makeSvg("herring", "0 0 230 128", palettes.herring, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M173 52 L218 26 L207 62 L220 98 L173 79 Q181 66 173 52 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M18 65 C35 31 91 21 146 37 C164 42 179 51 185 62 C177 76 160 87 139 94 C88 108 35 96 18 69 Q15 67 18 65 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M94 34 L111 10 L128 37 Q111 34 94 34 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M104 94 L120 115 L137 91 Q120 96 104 94 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M74 86 L82 105 L96 89 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M58 64 Q80 70 90 88 Q65 81 58 64 Z"/>
      <path class="art-line-light" d="M39 58 C74 43 131 43 165 57"/>
      <path class="art-line" d="M52 47 Q45 64 53 80"/>
      <path class="art-line" d="M19 67 Q31 69 39 66"/>
      ${smallScales([[66, 57, 8, 10], [61, 68, 9, 10], [70, 79, 7, 10]])}
      ${eye(40, 55)}
    `),

    sprat: () => makeSvg("sprat", "0 0 230 128", palettes.sprat, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M174 55 L218 34 L205 64 L219 94 L173 76 Q179 65 174 55 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M23 66 C47 40 102 33 151 43 C170 47 184 55 190 64 C181 74 164 81 143 86 C94 96 45 87 23 70 L16 68 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M107 41 L122 19 L136 43 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M116 85 L130 103 L143 83 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M59 65 Q77 70 87 84 Q68 80 59 65 Z"/>
      <path class="art-line-light" d="M43 59 C84 48 132 50 169 59"/>
      <path class="art-line" d="M54 50 Q48 65 55 78"/>
      <path class="art-line" d="M18 68 L38 70"/>
      <g>${Array.from({length: 10}, (_, i) => `<path class="art-spine" d="M${65 + i * 8} ${84 + (i % 2)} l4 7 l4 -7 Z"/>`).join("")}</g>
      ${eye(42, 57, 0.9)}
    `),

    mackerel: () => makeSvg("mackerel", "0 0 236 128", palettes.mackerel, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M180 48 L227 16 L211 61 L228 108 L180 79 Q190 64 180 48 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M15 65 C38 30 101 20 157 35 C179 41 194 51 200 62 C191 77 171 87 148 93 C94 107 38 95 15 69 L9 67 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M79 34 L91 7 L101 35 L111 10 L121 38 Q100 34 79 34 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M126 38 L141 17 L155 41 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M124 91 L139 111 L153 87 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M55 64 Q78 69 90 88 Q66 82 55 64 Z"/>
      <g fill="url(#${id.fin})" stroke="#18313b" stroke-width="1.5">
        ${Array.from({length: 5}, (_, i) => `<path d="M${151 + i * 7} ${43 + i * 1.7} l5 -9 l4 11 Z"/>`).join("")}
        ${Array.from({length: 5}, (_, i) => `<path d="M${151 + i * 7} ${84 - i * 1.6} l5 9 l4 -11 Z"/>`).join("")}
      </g>
      <path class="art-line-light" d="M31 63 C76 55 129 56 181 62"/>
      <path class="art-line-dark" d="M48 38 l10 15 l9 -17 l11 16 l10 -18 l12 17 l10 -17 l12 15 l10 -13 l12 11"/>
      <path class="art-line" d="M45 50 Q40 65 47 78"/>
      <path class="art-line" d="M10 67 L33 68"/>
      ${eye(34, 55)}
    `),

    cod: () => makeSvg("cod", "0 0 236 132", palettes.cod, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M181 48 Q211 39 225 45 L215 64 L226 86 Q209 93 180 81 Q189 65 181 48 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M16 67 C31 34 82 21 143 34 C166 39 185 49 194 62 C187 79 164 92 137 99 C82 111 31 98 16 72 L8 69 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M59 37 L70 11 L89 36 Z M91 34 L106 7 L125 38 Z M128 39 L145 16 L161 44 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M91 99 L106 119 L125 96 Z M129 96 L148 116 L165 90 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M54 63 Q81 67 94 91 Q67 83 54 63 Z"/>
      <path class="art-line-light" d="M43 57 Q102 44 174 61"/>
      <path class="art-line" d="M48 46 Q40 66 49 84"/>
      <path class="art-line" d="M10 69 Q28 71 37 67"/>
      <path class="art-line" d="M34 78 Q39 91 34 103"/>
      <g class="art-spot-dark">
        ${[[71,51,3],[84,74,2.4],[99,43,2.6],[116,67,3],[134,49,2.5],[151,76,2.8],[65,83,2]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}
      </g>
      ${eye(37, 54)}
    `),

    haddock: () => makeSvg("haddock", "0 0 236 132", palettes.haddock, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M181 49 Q211 39 226 47 L215 64 L226 84 Q210 92 180 80 Q188 65 181 49 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M17 67 C34 36 85 24 144 36 C168 40 187 50 195 63 C187 78 164 90 138 96 C83 107 33 96 17 71 L9 69 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M61 39 L73 10 L92 38 Z M95 36 L109 12 L126 40 Z M130 41 L147 20 L162 46 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M93 96 L108 116 L127 94 Z M131 93 L149 112 L165 88 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M55 63 Q80 68 94 89 Q68 82 55 63 Z"/>
      <path class="art-line-dark" d="M43 57 Q107 49 177 61"/>
      <path class="art-line" d="M48 47 Q41 66 50 82"/>
      <path class="art-line" d="M35 77 Q39 89 35 98"/>
      <circle class="art-spot-dark" cx="68" cy="57" r="8.5"/>
      <path class="art-line-light" d="M83 72 C114 81 147 78 170 68"/>
      ${eye(38, 54)}
    `),

    plaice: () => makeSvg("plaice", "0 0 236 132", palettes.plaice, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M178 49 Q211 39 226 51 L213 65 L226 81 Q208 94 177 80 Q185 65 178 49 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M31 68 C35 29 78 13 132 22 C164 27 188 43 195 62 C187 84 159 101 125 107 C75 116 36 97 31 72 L18 69 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M40 46 Q94 5 170 32 Q114 17 45 55 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M42 90 Q101 126 172 93 Q113 110 45 82 Z"/>
      <path class="art-line" d="M63 37 Q54 61 62 91"/>
      <path class="art-line" d="M20 69 L43 70"/>
      <path class="art-line-light" d="M71 54 Q119 39 168 57"/>
      ${eye(61, 49, 0.95)}${eye(73, 43, 0.9)}
      <g>${[[91,44,5],[120,60,5],[149,46,4],[83,79,4],[132,88,4.5],[158,75,3.5],[105,95,3]].map(([x,y,r])=>`<circle class="art-spot-orange" cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
      <g>${[[99,69,2],[137,39,1.8],[70,68,1.8],[153,91,2]].map(([x,y,r])=>`<circle class="art-spot-dark" cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
    `),

    salmon: () => makeSvg("salmon", "0 0 238 130", palettes.salmon, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M182 49 L226 26 L213 63 L227 101 L181 79 Q191 65 182 49 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M15 66 C37 31 96 21 151 35 C174 41 192 51 199 63 C190 78 170 88 145 95 C91 108 37 96 15 70 L8 68 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M91 35 L108 9 L125 39 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M142 44 Q151 27 159 46 Q151 41 142 44 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M117 93 L133 115 L149 89 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M71 88 L82 106 L98 89 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M56 63 Q81 69 93 89 Q67 82 56 63 Z"/>
      <path class="art-line-light" d="M34 61 Q99 50 177 62"/>
      <path class="art-line" d="M47 48 Q40 65 48 80"/>
      <path class="art-line" d="M9 68 L34 69"/>
      <g>${[[67,43],[83,48],[98,39],[111,49],[128,43],[145,51],[78,57],[118,58]].map(([x,y])=>`<circle class="art-spot-dark" cx="${x}" cy="${y}" r="2.2"/>`).join("")}</g>
      ${eye(36, 54)}
    `),

    eel: () => makeSvg("eel", "0 0 240 132", palettes.eel, (id) => `
      <path class="art-body" fill="url(#${id.body})" d="M13 73 C28 38 57 31 86 44 C113 56 128 75 155 77 C184 80 202 63 224 39 C213 73 188 102 154 101 C121 101 99 74 77 65 C56 56 45 68 35 84 C27 98 12 94 13 73 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M48 47 C79 19 118 37 146 59 C168 77 192 66 218 43 C197 73 177 88 153 86 C123 83 103 55 78 49 C64 46 56 49 48 47 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M44 84 C75 71 104 86 132 99 C158 111 188 93 213 65 C196 99 167 119 137 111 C104 102 77 79 44 92 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M47 72 Q68 76 78 93 Q57 87 47 72 Z"/>
      <path class="art-line-light" d="M37 62 C76 47 103 71 133 84 C162 97 190 79 211 58"/>
      <path class="art-line" d="M45 58 Q40 70 46 81"/>
      <path class="art-line" d="M14 73 Q28 75 36 72"/>
      ${eye(31, 61, 0.85)}
    `),

    seabass: () => makeSvg("seabass", "0 0 238 130", palettes.seabass, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M181 50 L224 32 L212 64 L225 96 L181 79 Q190 65 181 50 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M13 66 C33 31 91 23 151 36 C175 41 193 51 201 63 C193 78 170 89 143 96 C87 108 32 96 13 70 L6 68 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M76 37 L82 10 L89 34 L96 9 L103 35 L110 13 L119 39 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M124 40 L141 17 L158 44 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M125 92 L141 114 L157 88 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M59 63 Q84 68 98 90 Q70 83 59 63 Z"/>
      <path class="art-line-light" d="M36 61 Q102 50 181 62"/>
      <path class="art-line" d="M48 46 Q39 65 48 84"/>
      <path class="art-line" d="M7 68 L36 70 Q31 64 23 62"/>
      <path class="art-spine" d="M49 74 l-6 8 l9 -3 Z M52 78 l-4 7 l8 -3 Z"/>
      ${eye(36, 53)}
    `),

    dogfish: () => makeSvg("dogfish", "0 0 242 132", palettes.dogfish, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M180 48 L229 14 L213 60 L231 91 L195 79 L184 99 L180 78 Q190 65 180 48 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M10 67 C35 38 96 29 154 42 C177 47 194 55 202 64 C192 76 171 85 147 91 C91 103 34 92 10 71 L3 68 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M76 42 L92 13 L109 45 Z M132 49 L145 29 L158 52 Z"/>
      <path class="art-spine" d="M78 41 L84 18 L86 42 Z M134 48 L139 33 L141 50 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M76 76 L99 111 L121 78 Q100 84 76 76 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M130 88 L143 105 L155 86 Z"/>
      <path class="art-line-light" d="M35 66 Q105 57 184 64"/>
      <path class="art-line" d="M48 54 l-2 14 M54 53 l-2 15 M60 53 l-2 15 M66 54 l-2 14 M72 55 l-2 13"/>
      <path class="art-line" d="M4 68 Q27 69 38 65"/>
      <g>${[[58,45],[82,57],[104,44],[127,62],[151,50],[71,76],[114,78],[157,72]].map(([x,y])=>`<circle class="art-spot-light" cx="${x}" cy="${y}" r="2.5"/>`).join("")}</g>
      ${eye(35, 55, 0.9)}
    `),

    catshark: () => makeSvg("catshark", "0 0 244 132", palettes.catshark, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M176 52 L232 27 L217 61 L235 82 L194 76 L180 101 L176 78 Q185 65 176 52 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M10 68 C38 43 98 36 151 46 C176 51 193 57 203 64 C191 75 169 83 143 88 C88 98 34 89 10 72 L3 69 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M122 49 L137 25 L151 51 Z M150 52 L162 35 L174 54 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M86 80 L105 106 L121 79 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M137 85 L149 101 L161 83 Z"/>
      <path class="art-line-light" d="M34 67 Q105 59 184 64"/>
      <path class="art-line" d="M49 57 l-1 12 M55 56 l-1 13 M61 56 l-1 13 M67 57 l-1 12 M73 58 l-1 11"/>
      <path class="art-line" d="M4 69 Q26 70 37 67"/>
      <g>${[[53,49,2],[65,67,2],[78,53,2.2],[91,75,1.8],[103,50,2],[118,66,2.3],[134,54,1.8],[148,70,2],[163,60,1.8],[72,80,1.6],[113,81,1.6]].map(([x,y,r])=>`<circle class="art-spot-dark" cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
      ${eye(35, 57, 0.9)}
    `),

    tope: () => makeSvg("tope", "0 0 244 132", palettes.tope, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M181 47 L232 10 L215 59 L234 99 L197 78 L184 103 L181 77 Q191 64 181 47 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M5 68 C32 34 99 27 157 41 C181 46 198 54 206 63 C196 77 173 87 148 93 C91 105 32 94 5 72 L0 69 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M82 40 L101 6 L119 44 Z M143 48 L156 29 L169 51 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M79 76 L104 112 L126 78 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M128 88 L142 108 L156 86 Z M151 84 L164 99 L176 81 Z"/>
      <path class="art-line-light" d="M30 65 Q106 56 187 64"/>
      <path class="art-line" d="M47 53 l-1 15 M53 52 l-1 16 M59 52 l-1 16 M65 53 l-1 15 M71 54 l-1 14"/>
      <path class="art-line" d="M1 69 Q24 69 41 60"/>
      ${eye(31, 53, 0.9)}
    `),

    thornback: () => makeSvg("thornback", "0 0 230 166", palettes.thornback, (id) => `
      <path class="art-tail-stem" fill="url(#${id.fin})" d="M111 112 C116 128 117 145 111 162 C105 146 105 128 111 112 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M108 139 l-11 12 l14 -4 Z M114 139 l12 11 l-15 -3 Z"/>
      <path class="art-disc" fill="url(#${id.body})" d="M111 13 C82 15 47 36 18 77 C46 110 79 124 111 128 C144 123 176 108 205 77 C178 39 143 17 111 13 Z"/>
      <path class="art-line-light" d="M111 27 C87 52 62 67 31 77 M111 27 C135 52 160 67 192 77"/>
      <path class="art-line" d="M111 36 Q104 74 111 114"/>
      ${eye(95, 55, 0.95)}${eye(127, 55, 0.95)}
      <ellipse class="art-line" cx="94" cy="65" rx="5" ry="2.5"/><ellipse class="art-line" cx="128" cy="65" rx="5" ry="2.5"/>
      <g>${Array.from({length: 9}, (_, i) => `<path class="art-thorn" d="M111 ${65 + i * 6} l-4 5 l4 -1 l4 1 Z"/>`).join("")}</g>
      <g>${[[59,70,3],[72,92,2.5],[85,45,2],[145,69,3],[158,91,2.5],[137,44,2],[91,101,2],[132,101,2]].map(([x,y,r])=>`<circle class="art-spot-dark" cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
      <g>${[[73,61],[151,61],[82,84],[141,84]].map(([x,y])=>`<path class="art-thorn" d="M${x} ${y} l-4 6 l4 -1 l4 1 Z"/>`).join("")}</g>
    `),

    "spotted-ray": () => makeSvg("spotted-ray", "0 0 230 166", palettes.spottedRay, (id) => `
      <path class="art-tail-stem" fill="url(#${id.fin})" d="M111 110 C116 128 117 147 111 163 C105 146 105 128 111 110 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M107 140 l-10 10 l14 -3 Z M115 140 l11 10 l-15 -3 Z"/>
      <path class="art-disc" fill="url(#${id.body})" d="M111 17 C80 18 47 39 24 77 C48 105 79 119 111 123 C143 119 174 105 198 77 C175 40 143 19 111 17 Z"/>
      <path class="art-line-light" d="M111 31 C87 51 65 66 36 76 M111 31 C135 51 157 66 186 76"/>
      <path class="art-line" d="M111 41 Q106 76 111 109"/>
      ${eye(96, 55, 0.95)}${eye(126, 55, 0.95)}
      <ellipse class="art-line" cx="95" cy="65" rx="5" ry="2.5"/><ellipse class="art-line" cx="127" cy="65" rx="5" ry="2.5"/>
      <g>${[[56,69,2],[66,83,2.3],[78,56,1.8],[86,93,1.8],[145,56,1.8],[157,69,2],[149,86,2.3],[135,96,1.8],[93,77,1.6],[128,79,1.6]].map(([x,y,r])=>`<circle class="art-spot-dark" cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
      <g><circle class="art-spot-light" cx="72" cy="87" r="5"/><circle class="art-spot-dark" cx="72" cy="87" r="2"/><circle class="art-spot-light" cx="150" cy="87" r="5"/><circle class="art-spot-dark" cx="150" cy="87" r="2"/></g>
      <g>${Array.from({length: 6}, (_, i) => `<path class="art-thorn" d="M111 ${77 + i * 6} l-3 4 l3 -1 l3 1 Z"/>`).join("")}</g>
    `),

    pollack: () => makeSvg("pollack", "0 0 238 132", palettes.pollack, (id) => `
      <path class="art-tail" fill="url(#${id.fin})" d="M181 49 L224 33 L212 64 L225 96 L180 80 Q189 65 181 49 Z"/>
      <path class="art-body" fill="url(#${id.body})" d="M11 67 C34 32 94 24 151 36 C176 41 194 51 201 63 C193 78 171 89 144 96 C88 108 32 96 11 71 L3 69 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M62 39 L75 12 L94 39 Z M97 36 L111 12 L128 40 Z M132 41 L149 19 L164 46 Z"/>
      <path class="art-fin" fill="url(#${id.fin})" d="M95 96 L111 117 L129 94 Z M133 93 L151 112 L166 88 Z"/>
      <path class="art-fin art-soft" fill="url(#${id.fin})" d="M55 62 Q81 67 96 88 Q69 82 55 62 Z"/>
      <path class="art-line-dark" d="M39 56 Q78 39 114 53 Q141 66 181 61"/>
      <path class="art-line" d="M47 46 Q40 66 49 83"/>
      <path class="art-line" d="M4 69 L35 73 L28 65"/>
      <path class="art-line-light" d="M71 72 Q122 84 171 69"/>
      ${eye(36, 53)}
    `)
  };

  global.FishIllustrations = Object.freeze({ renderFishIllustration });
})(globalThis);
