import './index.less';

interface menuType {
    menuVisible: boolean,
    menuPos: { x: number, y: number },
    updateGptConten: any,
    updateGptModal: any,
    sourceText: string,
    gptContent: string,
    updateGptType: any,
    closeModal: any,
    updateBing: any,
    gptContentVisible: boolean
}

export default ({ menuVisible, menuPos, gptContentVisible, updateGptConten, updateGptModal, sourceText, gptContent, updateGptType, closeModal, updateBing }: menuType) => {

    //处理value
    function formatVal(val: string) {
        try {
            let res = "";
            if (!val || !val.trim()) {
                return "";
            }
            const dataList = val.split("data: ");
            dataList.forEach((item) => {
                if (item && item.trim() && item.includes("delta")) {
                    // console.log("123", item);
                    const data = JSON.parse?.(item);
                    // console.log(data);
                    res += data?.choices?.[0]?.delta?.content || "";
                }
            });
            return res || "";
        } catch (error) {
            console.log(error);
        }
    };

    //gpt问答；
    const gptAnswer = async (queryVal: string) => {
        console.log('Sending message to background script');
        // 发送消息
        chrome.runtime.sendMessage({ info: 'bingSearch', query: sourceText }, (res: any) => {
            console.log('Received response from background script', res);
            try {
                if (res && res.list) {
                    const resList = JSON.parse(res.list);
                    console.log('bingSearch', resList);
                    updateBing(resList);
                }
            } catch (error) {
                console.error('JSON parse error:', error);
            }
        });
        //   const prompt = `Translate this into Simplified Chinese:\n\n${text}\n\n`;
        //   const translate = `java知识体系`;
        const body = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: queryVal }],
            stream: true,
            // prompt: prompt,
            // max_tokens: 100,
            // temperature: 0,
        };
        const options: any = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
                Authorization:
                    "Bearer " + "you key",
            },
            body: JSON.stringify(body),
            redirect: "follow",
        };
        const response: any = await fetch(
            "https://api.example.com",
            options
        );
        const reader = await response.body.getReader();
        let content = '';
        pump();

        function pump() {
            return reader.read().then(({ done, value }: any) => {
                if (done) {
                    return;
                }
                let res = new TextDecoder("utf-8").decode(value);
                const formData = formatVal(res);
                content += formData || "";
                updateGptConten(content);
                return pump();
            });
        }
    }

    //点击 menus;
    const clickMenus = (type: string) => {
        closeModal(false);
        updateGptType(type);
        updateGptModal(true);
        updateBing([]);
        const translate =
            type == '翻译' ? `Translate this into Simplified Chinese:\n\n${sourceText}\n\n` :
                type == '解释' ? `解释: ${sourceText}` :
                    `总结以下文本，输出内容长度小于100字符:\n\n${sourceText}\n\n`
            ;
        updateGptConten('');
        gptAnswer(translate);
    }

    return (
        <div className={`menu ${menuVisible ? 'menu-show' : 'menu-noShow'}`} style={{ left: `${menuPos.x}px`, top: `${menuPos.y}px` }}>
            <span id='gpt_translate' onClick={() => clickMenus('翻译')}>翻译</span>
            <span id='gpt_explain' onClick={() => clickMenus('解释')}>解释</span>
            <span id='gpt_summary' onClick={() => clickMenus('总结')}>总结</span>
        </div>
    )
}