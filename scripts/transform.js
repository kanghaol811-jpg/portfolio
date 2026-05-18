const fs = require("fs");
const path = require("path");

const HOME_PAGE = path.join(__dirname, "..", "public", "601-source.html");
const PAGES_DIR = path.join(__dirname, "..", "public", "601-pages");

const files = [
  HOME_PAGE,
  ...fs.readdirSync(PAGES_DIR).map((f) => path.join(PAGES_DIR, f)),
];

const NEW_TAGLINE =
  '<span class="o" data-hm><div class="t js-c" data-d="0">李康豪</div></span><span class="o"><div class="t js-c" data-d="0">AI产品经理</div></span><span class="o"><div class="t js-c" data-d="0">×</div></span><span class="o"><div class="t js-c" data-d="0">视觉设计师</div></span><span class="o"><div class="t js-c" data-d="0">陕理工</div></span><span class="o"><div class="t js-c" data-d="1">全栈开发</div></span><span class="o"><div class="t js-c" data-d="1">AI视频</div></span><span class="o"><div class="t js-c" data-d="1">3D建模</div></span><span class="o"><div class="t js-c flag-o" data-d="1"><div class="flag-h">创业中</div></div>';

const PARADOX_ENTRY =
  '{"fetcher" : {}, "id" : "2", "post_id" : "43", "title" : "PARADOX", "link" : "/floor/paradox/", "w" : "1920", "h" : "1080", "thumb" : {"src" : {"d2x":"https://dumbpev7e8nb6.cloudfront.net/uploads/20220418195234/2-1.jpg", "d1x":"https://dumbpev7e8nb6.cloudfront.net/uploads/20220418195234/2-1-1280x720.jpg", "mob":"https://dumbpev7e8nb6.cloudfront.net/uploads/20220418195234/2-1-1280x720.jpg"} }, "video" : {"src" : {"desktop":"https://dumbpev7e8nb6.cloudfront.net/uploads/20220418200502/PARADOX_2x.mp4", "mobile":"https://dumbpev7e8nb6.cloudfront.net/uploads/20220418200454/PARADOX_1x.mp4"}}}';

const NEW_ENTRY =
  '{"fetcher" : {}, "id" : "2", "post_id" : "43", "title" : "关于我", "link" : "/floor/paradox/", "w" : "1920", "h" : "1080", "thumb" : {"src" : {"d2x":"", "d1x":"", "mob":""} }, "video" : {"src" : {"desktop":"", "mobile":""}}}';

const ABOUT_CONTENT = `<div class="c-wrap c-credit" data-post-id="43"><div class="c-scroll"><div class="body">
<div class="c-before" data-vh></div>
<div data-vh></div>
<div class="c-header"><div>
<h1 class="h0-3 _cl-inline _cl-auto w6"><div class="o"><div class="t js-c" data-d="0">李康豪</div></div></h1>
<h2 class="h2-0 _cl-inline _cl-auto w6"><div class="o"><div class="t js-c" data-d="1">AI产品经理 × 视觉设计师</div></div></h2>
</div></div>
<div data-n="6"></div>
<div class="c-body"><ul>
<li>
<div class="h _cl-inline _cl-auto w3"><div class="o"><div class="t js-c" data-d="0">教育背景</div></div></div>
<div class="p _cl-inline _cl-auto h2-0"><div class="o"><div class="t js-c" data-d="1">陕西理工大学 · 视觉传达设计（本科）<br/>GPA前30% · 考取NPDP认证中</div></div></div>
</li>
<li>
<div class="h _cl-inline _cl-auto w3"><div class="o"><div class="t js-c" data-d="0">核心能力</div></div></div>
<div class="p _cl-inline _cl-auto h2-0"><div class="o"><div class="t js-c" data-d="1">AI产品PRD撰写 · 数据驱动迭代<br/>全栈小程序开发（AI辅助）<br/>AI视频全流程制作<br/>3D建模与渲染（UE5/ZBrush/Maya）<br/>UI/UX &amp; 品牌VI设计</div></div></div>
</li>
<li>
<div class="h _cl-inline _cl-auto w3"><div class="o"><div class="t js-c" data-d="0">项目经历</div></div></div>
<div class="p _cl-inline _cl-auto h2-0"><div class="o"><div class="t js-c" data-d="1">▸ 接单配送小程序 — 独立全栈开发<br/>Claude+Hermes AI辅助覆盖用户端/商家端/配送员端全链路<br/><br/>▸ AI视频标准化工作流 — 独立制作人<br/>从创意脚本到成片全流程AI驱动，3部代表作品<br/><br/>▸ AIGC游戏美术工作流 — 产品设计<br/>AI建模效率提升30%，沉淀可复用模板</div></div></div>
</li>
<li>
<div class="h _cl-inline _cl-auto w3"><div class="o"><div class="t js-c" data-d="0">技术栈</div></div></div>
<div class="p _cl-inline _cl-auto h2-0"><div class="o"><div class="t js-c" data-d="1">AI开发：Gemini / Claude / Hermes Agent / OpenAI Codex<br/>设计工具：UE5 / ZBrush / Maya / Figma<br/>AI视频：Seedance / ChatGPT Image / DeepWhite<br/>产品能力：PRD撰写 / 业务流程设计 / 数据分析</div></div></div>
</li>
</ul></div>
<div data-n="8"></div>
</div></div>`;

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${path.basename(filePath)}`);
    continue;
  }

  let html = fs.readFileSync(filePath, "utf-8");

  // 1. Title & site name changes
  html = html.split("601 Inc.").join("李康豪 | AI产品经理 × 视觉设计师");
  html = html.split('content="601 is an independent film studio based in Tokyo."')
    .join('content="李康豪 — AI产品经理 × 视觉设计师。陕理工视觉传达，全栈开发、AI视频、3D建模。创业做智慧渔业AI平台。"');
  html = html.split('property="og:title" content="601 Inc.').join('property="og:title" content="李康豪');
  html = html.split('name="twitter:title" content="601 Inc.').join('name="twitter:title" content="李康豪');
  html = html.split('property="og:site_name" content="601 Inc.').join('property="og:site_name" content="李康豪');

  // 2. Navigation labels
  html = html.split(">About</div>").join(">关于我</div>");
  html = html.split(">Archive</div>").join(">作品集</div>");

  // 7. Tagline replacement
  // Find the tagline by looking for the unique "data-hm" marker
  const hmIdx = html.indexOf('data-hm"');
  if (hmIdx > 0) {
    const tagStart = html.lastIndexOf("<", hmIdx - 1);
    // The tagline spans from opening span.o to closing </div> of the tagline section
    // Find the matching closing div for the outer structure
    let depth = 0;
    let tagEnd = tagStart;
    for (let i = tagStart; i < html.length; i++) {
      if (html[i] === "<") {
        const next3 = html.slice(i + 1, i + 4);
        if (next3 === "div") {
          const close = html.indexOf(">", i);
          if (close > i && html[close - 1] !== "/") depth++;
        } else if (next3 === "/di") {
          depth--;
          if (depth === 0) {
            tagEnd = html.indexOf(">", i) + 1;
            break;
          }
        } else if (html.slice(i + 1, i + 6) === "span ") {
          depth++;
        } else if (html.slice(i + 1, i + 7) === "/span>") {
          depth--;
          if (depth === 0) {
            tagEnd = i + 7;
            break;
          }
        }
      }
    }
    const oldTag = html.slice(tagStart, tagEnd);
    html = html.replace(oldTag, NEW_TAGLINE);
  }

  // 8. Replace PARADOX project entry
  html = html.split(PARADOX_ENTRY).join(NEW_ENTRY);

  // 9. For floor-paradox.html, replace content
  if (filePath.includes("floor-paradox")) {
    // Find c-wrap
    const cwIdx = html.indexOf('class="c-wrap');
    if (cwIdx > 0) {
      const divStart = html.lastIndexOf("<div", cwIdx);
      // Find matching closing </div>
      let depth = 0;
      let inTag = false;
      let cwEnd = divStart;
      for (let i = divStart; i < html.length; i++) {
        if (html[i] === "<") inTag = true;
        else if (html[i] === ">" && inTag) {
          inTag = false;
          // Check if this is a div
          const tagContent = html.slice(
            Math.max(0, i - 50),
            i + 1
          );
          if (tagContent.includes("<div") && !tagContent.includes("/>")) {
            // Check if it has data-post-id which is on the c-wrap
            depth++;
          }
        }
        // track closing divs
        if (html.slice(i, i + 6) === "</div>") {
          depth--;
          if (depth === 0) {
            cwEnd = i + 6;
            break;
          }
        }
      }

      const oldCwrap = html.slice(divStart, cwEnd);
      if (oldCwrap.length > 100) {
        html = html.replace(oldCwrap, ABOUT_CONTENT);
        console.log(`  Replaced c-wrap in floor-paradox.html`);
      }
    }
  }

  fs.writeFileSync(filePath, html, "utf-8");
  console.log(`  OK: ${path.basename(filePath)} (${html.length} bytes)`);
}

console.log("\nAll transformations complete!");
