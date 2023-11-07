import React, { useRef, useState } from "react";
import { useEffect } from "react"
import Menu from "./components/Menu";
import GptModal from "./components/GptModal";

export default function ContentScriptApp() {
  //menu显示隐藏；
  const [menuVisible, setMenuVisible] = useState(false);
  const menuVisibleRef = useRef<any>();
  menuVisibleRef.current = menuVisible;
  //menu位置；
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
  //modal位置
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 })
  //当前 选择 模式；
  const [curGptType, setCurGptType] = useState('')
  //当前 选中 文本；
  const [sourceText, setSourceText] = useState('');
  // gpt 回答;
  const [gptContent, setGptContent] = useState('');
  // bing 搜索结果;
  const [bingAnswerList, setBingAnswerList] = useState([]);
  // gpt 弹窗 显示隐藏；
  const [gptContentVisible, setGptContentVisible] = useState(false);
  const gptContentVisibleRef = useRef<any>();
  gptContentVisibleRef.current = gptContentVisible

  //更新 gpt 弹窗 状态;
  const updateGptModal = (visible: boolean) => {
    setGptContentVisible(visible);
  }

  //更新gptConten；
  const updateGptConten = (content: string) => {
    setGptContent(content);
  }

  //更新gptConten；
  const updateGptType = (type: string) => {
    setCurGptType(type);
  }
  //更新gptConten；
  const updateBing = (list: any) => {
    setBingAnswerList(list);
  }

  //鼠标左键弹起事件；
  const onMouseUp = (e: any) => {
    if (gptContentVisibleRef.current) {
      return;
    }
    //点击当前menu，不处理
    if (e.target.id && e.target.id.includes('gpt_')) {
      return;
    }

    if (e.button != 0) {
      // 非左键，不处理
      return;
    }

    // 未选中文本，不处理
    let text = (window.getSelection() || '').toString().trim();
    if (!text) {
      return;
    }
    let pagex = e.pageX + 10;
    let pagey = e.pageY + 10;
    if (e.pageX + 230 >= window.innerWidth) {
      pagex = e.pageX - 240;
    }
    if (e.y + 40 >= window.innerHeight) {
      pagey = e.pageY - 50;
    }
    setMenuPos({ x: pagex, y: pagey });
    setMenuVisible(true);
    setSourceText(text);


    // console.log('123356789', e, e.pageY, window.innerHeight);

    let modalx = e.pageX + 10;
    let modaly = e.y + 10;
    if (e.pageX + 500 >= window.innerWidth) {
      modalx = window.innerWidth - 520;
    }
    if (e.y + 400 >= window.innerHeight) {
      modaly = window.innerHeight - 410;
    }
    setModalPos({ x: modalx, y: modaly })
    console.log('567788', e.y, window.innerHeight);
  };

  //关闭弹窗；
  const closeModal = () => {
    if (menuVisibleRef.current) {
      setMenuVisible(false);
    }
  }

  useEffect(() => {
    window.document.addEventListener("mouseup", onMouseUp);
    // 监听 selectionchange 事件来取消选中
    window.document.addEventListener("selectionchange", closeModal);
    return () => {
      window.document.removeEventListener("mouseup", onMouseUp);
      window.document.removeEventListener("selectionchange", closeModal);
    };
  }, [])

  return (
    <div>
      <div id="dragBorder" style={{ width: 'calc(100vw - 30px)', height: 'calc(100vh - 20px)', position: 'fixed', left: '0', top: '0', pointerEvents: 'none', padding: '10px' }} />
      <Menu
        menuVisible={menuVisible}
        menuPos={menuPos}
        updateGptConten={updateGptConten}
        updateGptModal={updateGptModal}
        updateGptType={updateGptType}
        sourceText={sourceText}
        gptContent={gptContent}
        closeModal={closeModal}
        updateBing={updateBing}
        gptContentVisible={gptContentVisibleRef.current}
      />
      <GptModal
        modalPos={modalPos}
        gptContentVisible={gptContentVisible}
        updateGptModal={updateGptModal}
        curGptType={curGptType}
        sourceText={sourceText}
        gptContent={gptContent}
        bingAnswerList={bingAnswerList}
      />
    </div>
  )
}