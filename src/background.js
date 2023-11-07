import * as cheerio from "cheerio";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

//监听 继续聊天 点击事件
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("back", req, sender);
  if (req.info === "continueChat") {
    // 在这里执行你想要的操作
    console.log("按钮被点击了！");
    chrome.sidePanel.open({ tabId: sender.tab.id });
  }
  if (req.info == "bingSearch") {
    bingSearch(req.query, sendResponse);
    // sendResponse(JSON.stringify(resList));
    return true;
  }
});

// 正则提取摘要和链接
const titlePattern = /<h2><a.*?href=".*?">(.*?)<\/a><\/h2>/g;

//处理bing搜索结果;
async function bingSearch(queryText, sendResponse) {
  try {
    const res = await fetch(
      `https://cn.bing.com/search?q=${encodeURIComponent(queryText)}`,
      {
        method: "GET",
      }
    );
    const resText = await res.text();
    const $ = cheerio.load(resText);
    const titleMatches = $.html().match(titlePattern);
    // console.log("bing 123", titleMatches);

    // title 数据清洗
    const resList = [];
    const hrefPattern = /href="([^"]+)"/;
    titleMatches.forEach((title) => {
      const match = title.match(hrefPattern);
      const resTitle = title
        .replace(/<[^<]+?>/g, "")
        .replace(/\n/g, "")
        .trim();
      if (!match || match.length < 2) {
        return;
      }
      if (!resTitle) {
        return;
      }
      resList.push({
        title: resTitle,
        url: match[1],
      });
    });

    console.log("resList", resList);
    sendResponse({ list: JSON.stringify(resList) });
  } catch (error) {
    console.log("bingSearch error", error);
  }
}
