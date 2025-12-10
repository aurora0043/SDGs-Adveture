import { SDGIsland } from './types';

export const SDG_DATA: SDGIsland[] = [
  {
    id: 1,
    title: "SDG 1 貧窮消除島",
    location_name: "希望之丘",
    tasks: ["選擇 1 天生活挑戰：今天不買飲料，捐省下的 30 元"],
    knowledge: "全球貧窮現況：世界上仍有許多人每天生活費低於 1.9 美元。",
    color: "bg-red-500"
  },
  {
    id: 2,
    title: "SDG 2 零飢餓島",
    location_name: "黃金麥田",
    tasks: ["拍下你今天吃光光的餐盤照片"],
    knowledge: "全球有約 8.28 億人面臨飢餓問題。",
    color: "bg-yellow-500"
  },
  {
    id: 3,
    title: "SDG 3 健康與福祉島",
    location_name: "生命之泉",
    tasks: ["今天喝滿 1500–2000ml 水", "完成 10 分鐘步行"],
    knowledge: "健康的生活方式能顯著降低慢性病風險。",
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "SDG 4 優質教育島",
    location_name: "智慧森林",
    tasks: ["分享你最近學到的一件新知（文字輸入）"],
    knowledge: "教育是打破貧窮循環的關鍵。",
    color: "bg-red-700"
  },
  {
    id: 5,
    title: "SDG 5 性別平等島",
    location_name: "和諧之原",
    tasks: ["小故事選擇題：你會如何應對性別刻板印象？"],
    knowledge: "性別平等不僅是基本人權，也是世界和平的基礎。",
    color: "bg-orange-500"
  },
  {
    id: 6,
    title: "SDG 6 淨水與衛生島",
    location_name: "清流之境",
    tasks: ["今天紀錄自己喝水量", "觀看一張水資源冷知識卡"],
    knowledge: "全球仍有 22 億人缺乏安全的飲用水。",
    color: "bg-blue-400"
  },
  {
    id: 7,
    title: "SDG 7 可負擔能源島",
    location_name: "光之高地",
    tasks: ["完成 1 項節電行為"],
    knowledge: "能源是氣候變遷的主要因素，佔全球溫室氣體排放量約 60%。",
    color: "bg-yellow-400"
  },
  {
    id: 8,
    title: "SDG 8 合適工作島",
    location_name: "繁榮城鎮",
    tasks: ["小故事：選擇你認為公平的勞動方式", "列出你希望擁有的職涯技能"],
    knowledge: "失業率在年輕人中通常是成年人的三倍。",
    color: "bg-red-800"
  },
  {
    id: 9,
    title: "SDG 9 工業創新基礎設施島",
    location_name: "創新塔",
    tasks: ["寫下你認為生活中需要改善的一個科技點子"],
    knowledge: "工業化帶動了經濟增長，但也需要考慮環境永續。",
    color: "bg-orange-600"
  },
  {
    id: 10,
    title: "SDG 10 減少不平等島",
    location_name: "平等峽谷",
    tasks: ["生活任務：今天對一位陌生人說鼓勵話"],
    knowledge: "收入不平等正在加劇，最富有的 10% 賺取了全球 40% 的收入。",
    color: "bg-pink-500"
  },
  {
    id: 11,
    title: "SDG 11 永續城市島",
    location_name: "綠光都市",
    tasks: ["拍一張「你今天最環保的移動方式」照片"],
    knowledge: "城市佔據了地球土地面積的 3%，卻消耗了 60-80% 的能源。",
    color: "bg-yellow-600"
  },
  {
    id: 12,
    title: "SDG 12 負責任消費島",
    location_name: "循環之地",
    tasks: ["今天至少拒絕一樣一次性塑膠", "拍一張你的環保杯或環保袋"],
    knowledge: "如果全球人口都像已開發國家一樣消費，我們需要三個地球。",
    color: "bg-yellow-700"
  },
  {
    id: 13,
    title: "SDG 13 氣候行動島",
    location_name: "風暴前線",
    tasks: ["拍一張天空照（紀錄今日天氣）", "選擇今天完成的節能行為"],
    knowledge: "2010-2019 是有紀錄以來最熱的十年。",
    color: "bg-green-700"
  },
  {
    id: 14,
    title: "SDG 14 海洋生命島",
    location_name: "藍潮海域",
    tasks: ["今天不使用塑膠吸管一次", "看一張海洋知識卡"],
    knowledge: "海洋吸收了人類產生的約 30% 二氧化碳，減緩了全球暖化。",
    color: "bg-blue-600"
  },
  {
    id: 15,
    title: "SDG 15 陸域生態島",
    location_name: "生命綠洲",
    tasks: ["拍一張植物照片（今日觀察植物）", "完成生態冷知識卡"],
    knowledge: "森林覆蓋了地球 30% 的表面積，是生物多樣性的關鍵。",
    color: "bg-green-600"
  },
  {
    id: 16,
    title: "SDG 16 和平正義島",
    location_name: "寧靜堡壘",
    tasks: ["生活任務：今天只說「非暴力語言」"],
    knowledge: "法治和人權是和平、穩定和繁榮社會的基礎。",
    color: "bg-blue-800"
  },
  {
    id: 17,
    title: "SDG 17 夥伴關係島",
    location_name: "連結之橋",
    tasks: ["邀請一位朋友加入冒險"],
    knowledge: "只有透過全球合作，我們才能實現這些目標。",
    color: "bg-indigo-900"
  }
];

export const TOTAL_ISLANDS = SDG_DATA.length;
export const MAX_LEVEL = 6; // Roughly islands / 3