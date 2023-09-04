
import './index.less';
import { marked } from "marked";
import "highlight.js/styles/paraiso-light.css";
import javascript from "highlight.js/lib/languages/javascript";
import hljs from "highlight.js/lib/core";


hljs.registerLanguage("javascript", javascript);

interface GptModalType {
    menuPos: { x: number, y: number },
    gptContentVisible: boolean,
    updateGptModal: any,
    curGptType: string,
    sourceText: string,
    gptContent: string,
}

export default ({ menuPos, gptContentVisible, updateGptModal, curGptType, sourceText, gptContent }: GptModalType) => {
    return (
        <div className={`gptContent ${gptContentVisible ? 'content-show' : 'content-noShow'}`} style={{ left: `${menuPos.x}px`, top: `${menuPos.y}px` }}>
            <div className="content-head">
                <span>{curGptType}</span>
                <span className="content-close" onClick={() => updateGptModal(false)}>X</span></div>
            <div className="content-main">
                <div className="source">
                    <div className="content">{sourceText}</div>
                </div>
                <div className="answer">
                    <div className="content" id='content-text' dangerouslySetInnerHTML={{
                        __html: marked(gptContent, {
                            highlight: function (code, language) {
                                // 当前时间加随机数生成唯一的id标识
                                const codeIndex =
                                    parseInt(Date.now() + "") +
                                    Math.floor(Math.random() * 10000000);
                                // 复制功能主要使用的是 clipboard.js
                                let html: any = ` <div class=${["code-block-header"]}>
                                                                    <span>${language}</span>
                                                                    <span
                                                                    class=${["copy"]}
                                                                    id='copy-btn'
                                                                    data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"
                                                                    >复制代码</span>
                                                                </div>
                                                                `;
                                const linesLength = code.split(/\n/).length - 1;
                                // 生成行号
                                // let linesNum =
                                //   '<span aria-hidden="true" class="line-numbers-rows">';
                                // for (let index = 0; index < linesLength; index++) {
                                //   linesNum = linesNum + "<span></span>";
                                // }
                                // linesNum += "</span>";
                                if (code) {
                                    try {
                                        // highlight.js 高亮代码
                                        const preCode = hljs.highlightAuto(code).value;
                                        // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "&lt;" 代替，不影响复制功能
                                        return `<pre class='${["hljs-customer"]
                                            } hljs' >
                                                                                    ${html}
                                                                                    <code>${preCode}</code>
                                                                        </pre>
                              <textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${code.replace(
                                                /<\/textarea>/g,
                                                "&lt;/textarea>"
                                            )}</textarea>`;
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            },
                        })
                    }} />
                </div>
            </div>
        </div>
    )
}