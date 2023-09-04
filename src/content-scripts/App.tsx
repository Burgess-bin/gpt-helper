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
  //当前 选择 模式；
  const [curGptType, setCurGptType] = useState('')
  //当前 选中 文本；
  const [sourceText, setSourceText] = useState('');
  // gpt 回答;
  const [gptContent, setGptContent] = useState('');
  // gpt 弹窗 显示隐藏；
  const [gptContentVisible, setGptContentVisible] = useState(false);

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

  //鼠标左键弹起事件；
  const onMouseUp = (e: any) => {
    console.log('123356789', e);
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

    setMenuPos({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
    setSourceText(text);
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
      <Menu
        menuVisible={menuVisible}
        menuPos={menuPos}
        updateGptConten={updateGptConten}
        updateGptModal={updateGptModal}
        updateGptType={updateGptType}
        sourceText={sourceText}
        gptContent={gptContent}
        closeModal={closeModal}
      />
      <GptModal
        menuPos={menuPos}
        gptContentVisible={gptContentVisible}
        updateGptModal={updateGptModal}
        curGptType={curGptType}
        sourceText={sourceText}
        gptContent={gptContent}
      />
    </div>
  )
}