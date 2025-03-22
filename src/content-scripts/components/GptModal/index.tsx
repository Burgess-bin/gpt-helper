
import './index.less';
import { marked } from "marked";
import "highlight.js/styles/paraiso-light.css";
import javascript from "highlight.js/lib/languages/javascript";
import hljs from "highlight.js/lib/core";
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';

hljs.registerLanguage("javascript", javascript);

interface GptModalType {
    modalPos: { x: number, y: number },
    gptContentVisible: boolean,
    updateGptModal: any,
    curGptType: string,
    sourceText: string,
    gptContent: string,
    bingAnswerList: any
}

export default ({ modalPos, gptContentVisible, bingAnswerList, updateGptModal, curGptType, sourceText, gptContent }: GptModalType) => {

    // 继续聊天
    const continueChat = () => {
        // 发送消息给 background script
        chrome.runtime.sendMessage({ info: 'continueChat' }, (res: any) => {
            console.log('123', res)
        });
    }

    return (
        <Draggable
            defaultPosition={{ x: modalPos.x, y: modalPos.y }}
            handle={'#handleDrag'}
            bounds="#dragBorder"
        >
            <Resizable
                defaultSize={{
                    width: 500,
                    height: 400,
                }}
                enable={{
                    right: true,  // 允许右边框拖动
                    bottom: true, // 允许下边框拖动
                }}
                minWidth={500}
                minHeight={400}
                className={`gptContent ${gptContentVisible ? 'content-show' : 'content-noShow'}`}
                style={{ left: `${modalPos.x}px`, top: `${modalPos.y}px` }}
            >
                {/* <div className={`gptContent ${gptContentVisible ? 'content-show' : 'content-noShow'}`} style={{ left: `${modalPos.x}px`, top: `${modalPos.y}px` }}> */}
                <div id='handleDrag' className="content-head">
                    <span>{curGptType}</span>
                    {/* <span id='handleDrag' /> */}
                    <span className="content-close" onClick={() => updateGptModal(false)}>×</span>
                </div>
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

                <div className='content-bing'>
                    {bingAnswerList.slice(0, 3).map((item: any) => {
                        return <div key={item.title}><a target="_blank" href={item.url}>{item.title}</a></div>
                    })}
                </div>

                {/* footer */}
                <div className='content-footer'>
                    <span onClick={() => continueChat()}>继续聊天</span>
                    <span>@zhaob1017</span>
                    <span>复制</span>
                </div>
                {/* </div> */}
            </Resizable>
        </Draggable>
    )
}