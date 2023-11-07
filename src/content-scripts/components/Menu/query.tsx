// const puppeteer = require("puppeteer");
// import * as puppeteer from 'puppeteer';

async function bingSearch(query: string) {
  try {
    const res = await fetch(`https://www.bing.com/search?form=QBRE&q=${encodeURIComponent(query)}&cc=US`, {
      method: 'GET'
    })
    console.log('bingSearch', res)
  } catch (error) {
  }
}

export {
  bingSearch,
};
