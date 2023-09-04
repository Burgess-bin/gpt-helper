import './index.less';

interface menuType {
    menuVisible: boolean,
    menuPos: { x: number, y: number },
    updateGptConten: any,
    updateGptModal: any,
    sourceText: string,
    gptContent: string,
    updateGptType: any,
    closeModal: any
}

export default ({ menuVisible, menuPos, updateGptConten, updateGptModal, sourceText, gptContent, updateGptType, closeModal }: menuType) => {

    //处理value
    function formatVal(val: string) {
        let res = "";
        if (!val || !val.trim()) {
            return "";
        }
        const dataList = val.split("data: ");
        dataList.forEach((item) => {
            if (item && item.trim() && item.includes("delta")) {
                console.log("123", item);
                const data = JSON.parse(item);
                console.log(data);
                res += data.choices[0].delta.content || "";
            }
        });
        return res;
    }

    //gpt问答；
    const gptAnswer = async (queryVal: string) => {
        //   const prompt = `Translate this into Simplified Chinese:\n\n${text}\n\n`;
        //   const translate = `java知识体系`;
        const body = {
            model: "gpt-3.5-turbo-0301",
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
                "User-Agent": "Apifox/1.0.0 (https://apifox.com)",

                Authorization:
                    "Bearer " + "sk-MSkF51kARCq5u9QrX76wuxZQpPSszrBSg0vkZ3bPY9HqDZZt",
            },
            body: JSON.stringify(body),
            redirect: "follow",
        };
        const response: any = await fetch(
            "https://api.chatanywhere.com.cn/v1/chat/completions",
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
                content += formatVal(res);
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
        const translate =
            type == '翻译' ? `Translate this into Simplified Chinese:\n\n${sourceText}\n\n` :
                type == '解释' ? `解释: ${sourceText}` :
                    `Summarize the following text in Simplified Chinese:\n\n${sourceText}\n\n`
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