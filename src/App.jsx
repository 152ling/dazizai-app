import React, { useState, useMemo , useEffect} from 'react';
import { 
  ChevronLeft, Info, ShoppingCart, Tag, Zap, 
  Target, MapPin, Phone, Clock, ExternalLink, HelpCircle, 
  BookOpen, Plus, Trash2, Scale, X, Search, Trophy, AlertCircle, Timer,
  Store,DollarSign,ShieldCheck, Star
} from 'lucide-react';
import { GiShuttlecock } from "react-icons/gi";
import { FaLine } from "react-icons/fa";
import './App.css';



// 顏色視覺定義表
const COLOR_THEMES = {
  // 白色系
  '白': 'bg-white text-slate-800 border border-gray-200',
  // 黃色系
  '黃': 'bg-yellow-400 text-slate-900',
  '黃色': 'bg-yellow-400 text-slate-900',
  '螢光黃': 'bg-yellow-300 text-slate-900',
  '金黃': 'bg-amber-400 text-slate-900',
  // 橘色系
  '橘': 'bg-orange-500 text-white',
  '橘色': 'bg-orange-500 text-white',
  '亮橙': 'bg-orange-400 text-white',
  '閃亮橘': 'bg-orange-600 text-white',
  // 紅色系
  '紅': 'bg-red-600 text-white',
  '紅色': 'bg-red-600 text-white',
  '桃紅':'bg-red-400 text-white',
  // 藍色系
  '藍': 'bg-blue-600 text-white',
  '藍色': 'bg-blue-600 text-white',
  '寶藍': 'bg-blue-800 text-white',
  '淺藍': 'bg-blue-300 text-slate-900',
  '深藍': 'bg-blue-900 text-white',
  '紫藍': 'bg-indigo-400 text-white',
  '青藍': 'bg-cyan-500 text-white',
  '土耳其藍': 'bg-cyan-600 text-white',
  // 綠色系
  '綠': 'bg-green-500 text-white',
  '冷綠': 'bg-teal-500 text-white',
  '青綠': 'bg-teal-400 text-white',
  '螢光綠': 'bg-lime-400 text-slate-900',
  // 粉色系
  '粉': 'bg-pink-400 text-white',
  '粉色': 'bg-pink-400 text-white',
  '螢光粉': 'bg-pink-500 text-white',
  '霓虹粉': 'bg-fuchsia-500 text-white',
  '玫瑰粉': 'bg-rose-400 text-white',
  '櫻花粉': 'bg-red-300 text-white',
  // 紫色系
  '薰衣草紫': 'bg-purple-300 text-slate-900',
  '粉紫': 'bg-purple-400 text-white',
  // 黑色系
  '黑': 'bg-slate-900 text-white',
  '黑色': 'bg-slate-900 text-white',
  '冷黑': 'bg-slate-800 text-white',
};

const getTagColor = (colorName) => {
  return COLOR_THEMES[colorName] || 'bg-gray-100 text-gray-600'; // 預設灰色
};

const APP_DATA = {
  brands: [
    { id: 'yonex', name: 'YONEX (YY)', logo: 'YY', color: 'bg-blue-700',imgSrc:'/images/yonex_logo.png' },
    { id: 'victor', name: 'VICTOR (勝利)', logo: 'V', color: 'bg-indigo-900' ,imgSrc:'/images/victor_logo.png' },
    { id: 'kizuna', name: 'KIZUNA', logo: 'K', color: 'bg-black' ,imgSrc:'/images/kizuna_logo.png' },
    { id: 'toalson', name: 'TOALSON', logo: 'T', color: 'bg-black',imgSrc:'/images/toalson_logo.png'  },
  ],
  products: [
  {
    "id": 1,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/BG65.jpg",
    "name": "BG65",
    "price": 380,
    "colors": ["白", "黃", "橘", "寶藍", "土耳其藍"],
    "characteristics": "高展延、極佳耐用性",
    "gauge": "0.70mm",
    "description": "0.70mm 線徑及外表特殊的編織結構，降低線的磨損提供優越的耐用度，是全方位性能與耐用度的基準，深受全球頂級球員青睞。",
    "category": "耐用型"
  },
  {
    "id": 2,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/BG80.jpg",
    "name": "BG80",
    "price": 430,
    "colors": ["白"],
    "characteristics": "硬實感、高威力、強大進攻性",
    "gauge": "0.68mm",
    "description": "高模量向量纖維與橢圓形細絲結構，提供極佳的硬實感與爆發力，適合追求強力進攻與扎實手感的專業球員。",
    "category": "威力型",
    "tag": "周天成指定拍線",
  },
  {
    "id": 3,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/BG66 ULTIMAX.jpg",
    "name": "BG66 Ultimax",
    "price": 400,
    "colors": ["白", "黃", "深藍","粉", "紅"],
    "characteristics": "極致彈性、擊球音清脆、高速度",
    "gauge": "0.65mm",
    "description": "結合極細線徑與高強度尼龍，在彈性、控制力與擊球音之間達到完美平衡，是追求速度感的選手之首選。",
    "category": "高彈性"
  },
  {
    "id": 4,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/BG65 Titanium.jpg",
    "name": "BG65 Titanium",
    "price": 380,
    "colors": ["白色", "紅色"],
    "characteristics": "脆彈手感、擊球音亮、加強耐用",
    "gauge": "0.70mm",
    "description": "在 BG65 的核心上增加氫化鈦塗層，提供更堅硬的擊球感與更響亮的擊球聲，同時維持了極佳的耐用度。",
    "category": "耐用硬彈型"
  },
  {
    "id": 5,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/EXBOLT 63.jpg",
    "name": "EXBOLT 63",
    "price": 370,
    "colors": ["白", "黃","薰衣草紫"],
    "characteristics": "極速回彈、鍛造纖維、高擊球音",
    "gauge": "0.63mm",
    "description": "採用全新 Forge Fiber 鍛造纖維，實現了極細線徑下的高強度，提供驚人的回彈速度與清脆的擊球音效。",
    "category": "極致速度型"
  },
  {
    "id": 6,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/EXBOLT 65.jpg",
    "name": "EXBOLT 65",
    "price": 370,
    "colors": ["白", "黃","綠","黑"],
    "characteristics": "全能回彈、控制力優、平衡性高",
    "gauge": "0.65mm",
    "description": "使用鍛造纖維提升耐用性，在快速反彈的基礎上增加了更好的持球感與控制力，適合尋求全能表現的球員。",
    "category": "全能速度型"
  },
  {
    "id": 7,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/EXBOLT 68.jpg",
    "name": "EXBOLT 68",
    "price": 370,
    "colors": ["白色", "閃亮橘"],
    "characteristics": "耐磨性強、擊球扎實、長效性能",
    "gauge": "0.68mm",
    "description": "鍛造纖維系列中的耐用擔當，通過特殊的塗層與纖維結構，提供極高的抗磨損能力與穩定的擊球手感。",
    "category": "耐用速度型"
  },
  {
    "id": 8,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/NANOGY 98.jpg",
    "name": "Nanogy 98",
    "price": 400,
    "colors": ["白色", "金黃"],
    "characteristics": "高回彈、納米塗層、控球細膩",
    "gauge": "0.66mm",
    "description": "表面採用碳納米管鍍膜，增加了線的彈性與切球時的摩擦手感，適合喜愛拉吊控球與追求高反彈的細膩型球員。",
    "category": "高反彈型"
  },
  {
    "id": 9,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VBS-70.webp",
    "name": "VBS-70",
    "price": 300,
    "colors": ["白", "冷綠", "螢光黃", "紅","淺藍","寶藍"],
    "characteristics": "高耐用、優異控球、手感扎實",
    "gauge": "0.70mm",
    "description": "採用高強度尼龍複絲為芯層，特殊的編織技術提升耐用性，並在擊球時提供穩定的控制感，是專為追求極致耐用度的選手所設計。",
    "category": "耐用型"
  },
  {
    "id": 10,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VBS-68.webp",
    "name": "VBS-68",
    "price": 350,
    "colors": ["白", "螢光黃", "藍色", "黑色"],
    "characteristics": "強大進攻、擊球音清亮、高彈性",
    "gauge": "0.68mm",
    "description": "以高強度的尼龍複絲為核心，結合特殊塗層技術，在保持優異耐用性的同時，展現出極具侵略性的擊球音與紮實的反彈手感。",
    "category": "攻擊型"
  },
  {
  "id": 11,
  "brandId": "victor",
  "brandName": "VICTOR",
  "imgSrc": "/images/VBS-68 POWER.webp",
  "name": "VBS-68 POWER",
  "price": 350,
  "colors": ["白色", "螢光綠", "冷黑"],
  "characteristics": "高韌性、紮實進攻、力量傳導優",
  "gauge": "0.68mm",
  "description": "以高強度熱穩定尼龍多絲為芯層，並在外部包覆高韌性纖維。相較於一般版本，POWER 版提供了更厚實的撞擊手感與強大的能量釋放，適合熱愛重殺的進攻型選手。",
  "category": "進攻型"
},
  {
    "id": 12,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VBS-66.webp",
    "name": "VBS-66 Nano",
    "price": 350,
    "colors": ["白", "橘", "黃","綠","淺藍","寶藍", "玫瑰粉","櫻花粉"],
    "characteristics": "極致手感、卓越反彈、納米塗層",
    "gauge": "0.66mm",
    "description": "核心採用高強度多絲纖維，外部包覆納米材料塗層。0.66mm 的線徑帶來優異的反彈力與細膩的控球手感，適合技術型選手。",
    "category": "高彈性",
    "tag": "戴資穎指定拍線",
  },
  {
    "id": 13,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VBS-63.webp",
    "name": "VBS-63",
    "price": 350,
    "colors": ["白色", "螢光黃", "粉色", "青藍"],
    "characteristics": "極速回彈、靈敏控制、輕快響亮",
    "gauge": "0.63mm",
    "description": "超細線徑設計，提供令人驚豔的反彈性能與清脆的擊球音。高韌性的纖維材料確保了擊球瞬間的靈敏反應，適合追求速度的球友。",
    "category": "極速型"
  },
  {
    "id": 14,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VBS-61.webp",
    "name": "VBS-61",
    "price": 350,
    "colors": ["白色", "黃色", "藍色","綠色","紫色"],
    "characteristics": "頂尖彈性、極速反應、極細線徑",
    "gauge": "0.61mm",
    "description": "VICTOR 最細的羽球線，極小阻力帶來巔峰的回彈表現，每一拍都能激發出清亮的爆破音，適合手感細膩且追求極致速度的選手。",
    "category": "極致彈力型"
  },
  {
    "id": 15,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VBS-58.webp",
    "name": "VBS-58",
    "price": 350,
    "colors": ["粉色"],
    "characteristics": "巔峰回彈、高強韌性、極致細線",
    "gauge": "0.58mm",
    "description": "VICTOR 技術結晶，僅 0.58mm 的超極細線徑，挑戰物理極限。提供前所未有的回彈速度與敏銳度，適合進階且手感極度靈敏的專業選手。",
    "category": "巔峰速度型"
  },{
    "id": 16,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VS-61.webp",
    "name": "VS-61",
    "price": 280,
    "colors": ["白色", "螢光黃"],
    "characteristics": "極細線徑、極速反彈、清脆音效",
    "gauge": "0.61mm",
    "description": "擁有極細的 0.61mm 線徑，將空氣阻力降至最低。其卓越的反彈性能與震耳欲聾的擊球音，是追求極限速度感選手的夢幻逸品。",
    "category": "極致彈力型"
  },
  {
    "id": 17,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VS-65.webp",
    "name": "VS-65",
    "price": 280,
    "colors": ["白", "黃", "橘","藍","綠","金黃"],
    "characteristics": "手感柔韌、精準控制、全能表現",
    "gauge": "0.65mm",
    "description": "具備高度韌性的芯層，提供極佳的持球感。在擊球瞬間能感受到細膩的反饋，適合著重控球技巧與變換球路的拉吊型球友。",
    "category": "全能控球型"
  },
  {
    "id": 18,
    "brandId": "kizuna",
    "brandName": "KIZUNA",
    "imgSrc": "/images/Z66.webp",
    "name": "Z66 Lusty",
    "price": 430,
    "colors": ["白", "黃", "紅"],
    "characteristics": "W Power 雙重動力、超高彈性、PPS纖維",
    "gauge": "0.66mm",
    "description": "業界首創使用新型超耐熱塑料 (PPS) 纖維交織，創造出「有點硬又不會太硬」的獨特打感。擁有極高回彈力，讓力量較小的球員也能殺出具有貫穿力的球質。",
    "category": "攻擊型"
  },
  {
    "id": 19,
    "brandId": "kizuna",
    "brandName": "KIZUNA",
    "imgSrc": "/images/Z63X.webp",
    "name": "Z63X Premium",
    "price": 430,
    "colors": ["白", "黃", "粉", "青綠"],
    "characteristics": "極速回彈、清脆擊球音、極細耐用平衡",
    "gauge": "0.63mm",
    "description": "追求 Z58 的極致輕彈感卻又希望能有更好的耐用度。0.63mm 的極幼設計大幅降低空氣阻力，提供響亮的擊球聲與尖銳的手感，在東南亞被譽為「熱帶神線」。",
    "category": "極速型"
  },
  {
    "id": 20,
    "brandId": "kizuna",
    "brandName": "KIZUNA",
    "imgSrc": "/images/Z65.webp",
    "name": "Z65 Premium",
    "price": 350,
    "colors": ["白","螢光黃","桃紅"],
    "characteristics": "耐久控制、剛柔並濟、傳統手感",
    "gauge": "0.65mm",
    "description": "針對厭倦傳統粗線枯燥打感的球友設計。0.65mm 線徑結合全新技術，在維持高水準耐用度的同時，保留了極佳的擊球樂趣與高彈性表現。",
    "category": "全能型"
  },
  {
    "id": 21,
    "brandId": "kizuna",
    "brandName": "KIZUNA",
    "imgSrc": "/images/Z69.webp",
    "name": "Z69 Premium",
    "price": 350,
    "colors": ["白色", "紅色","黑色"],
    "characteristics": "極致耐用、柔和手感、穩定控球",
    "gauge": "0.69mm",
    "description": "0.69mm 的厚實線徑提供最高水平的抗磨損性能。特殊調校的製程讓它即便在粗線徑下，依然保留了柔和的擊球回饋與精準的控球性能，適合重視經濟效益的球員。",
    "category": "耐用型"
  },
  {
    "id": 22,
    "brandId": "kizuna",
    "brandName": "KIZUNA",
    "imgSrc": "/images/Z69T.webp",
    "name": "Z69T Titanium",
    "price": 360,
    "colors": ["白", "黃色", "紅色"],
    "characteristics": "鈦金屬塗層、強力擊球感、長效耐用",
    "gauge": "0.69mm",
    "description": "在 Z69 的基礎上加入 KIZUNA 獨家鈦塗層。大幅提升擊球時的扎實感與金屬音，讓粗線也能擁有超越想像的威力與彈性，是強攻型球員的耐用首選。",
    "category": "進攻耐用型"
  },
  {
    "id": 23,
    "brandId": "toalson",
    "brandName": "TOALSON",
    "imgSrc": "/images/ION65.jpg",
    "name": "ION 65",
    "price": 340,
    "colors": ["白", "黃", "寶藍", "淺藍", "綠","桃紅","黑"],
    "characteristics": "全方位滿格、高彈力、清脆金屬音",
    "gauge": "0.65mm",
    "description": "被廣大球友譽為「神線」。採用高彈力超薄尼龍複絲中心芯與特殊編織工藝，在 0.65mm 的極細線徑下，達成彈性、控制力與擊球音的完美平衡，手感極佳且具爆發力。",
    "category": "高彈性全能型"
  },
  {
    "id": 24,
    "brandId": "toalson",
    "brandName": "TOALSON",
    "imgSrc": "/images/ION68.jpg",
    "name": "ION 68",
    "price": 340,
    "colors": ["白", "黃"],
    "characteristics": "極速回彈、耐用提升、響亮鞭擊音",
    "gauge": "0.68mm",
    "description": "ION 系列中兼顧耐用與手感的經典之作。擊球時會發出強烈的響亮鞭擊聲，增加擊球快感。其出色的張力維持能力與穩定的控球表現，是許多進階選手長期的首選線材。",
    "category": "耐用攻擊型"
  },{
    "id": 25,
    "brandId": "yonex",
    "brandName": "YONEX",
    "imgSrc": "/images/AEROBITE.jpg",
    "name": "AEROBITE",
    "price": 410,
    "colors": ["藍", "綠"],
    "characteristics": "強烈旋轉、極致控制、子母線系統",
    "gauge": "直 0.67mm / 橫 0.61mm",
    "description": "YONEX 首款子母線設計，直線採用高摩擦力的聚氨酯塗層增加抓球感，橫線則使用極細線徑提升彈性。這種組合能產生強烈的切球旋轉並提供精準的落點控制，是技術型選手的最佳武器。",
    "category": "控制型"
  },
  {
    "id": 26,
    "brandId": "victor",
    "brandName": "VICTOR",
    "imgSrc": "/images/VS-69.webp",
    "name": "VS-69",
    "price": 280,
    "colors": ["白","粉", "橘", "紫藍","淺藍"],
    "characteristics": "高耐用性、穩定控制、經濟實惠",
    "gauge": "0.69mm",
    "description": "採用高強度多絲纖維搭配特殊的耐磨塗層技術。0.69mm 的均衡線徑在維持良好耐用度的同時，提供了柔和且紮實的擊球感受。其優異的保磅性與穩定的控球表現，是追求高性價比球友的理想選擇。",
    "category": "耐用型"
  }
],
  knowledge: [
    {
      id: 'k1',
      title: '如何選擇適合的磅數？',
      summary: '磅數不是越高越好，發力方式是關鍵。',
      content: '初學者建議從 20-23 磅開始，手感較軟且彈性好；中階球友可嘗試 24-26 磅，控制力提升但需要更好的發力技巧；高階或專業選手常打 27 磅以上。過高的磅數若發力不當，容易造成手肘或肩膀受傷。'
    },
    {
      id: 'k2',
      title: '細線 vs 粗線的差異',
      summary: '線徑大小影響耐用度與彈性。',
      content: '細線（如 0.63mm-0.66mm）反彈力強、擊球音清脆、手感細膩，但耐用度較低。粗線（如 0.68mm-0.70mm）耐用度極佳、保磅性好，適合大力扣殺與不希望頻繁斷線的球友。'
    },
    {
      id: 'k3',
      title: '何時該重新穿線？',
      summary: '除了斷線，掉磅也是換線的時機。',
      content: '即使線沒斷，隨著時間與擊球，線材會失去彈性（掉磅）。如果你感覺擊球聲音變悶、或是需要花更多力氣才能擊球到後場，那就代表該重新穿線了。通常建議頻繁打球者 1-2 個月更換一次。'
    }
  ],
  pricing: {
    express: [
      { time: '30 分鐘內取拍', price: 250 },
      { time: '1 小時內取拍', price: 200 },
      { time: '3 小時內取拍', price: 150 },
      { time: '5 小時 ~ 隔日取拍', price: 100 },
    ],
    bringOwn: 250
  },
  shop: {
    name: "大自在體育用品",
    address: "桃園市中壢區新中北路223號",
    phone: "03-4372287",
    businessHours: "12:00 - 21:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.2075890349006!2d121.23933969999999!3d24.959050899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468223dfdd6ce23%3A0x43fd165be5bddc9c!2z5aSn6Ieq5Zyo6YGL5YuV57K-5ZOB5bCI6LOj5bqX!5e0!3m2!1szh-TW!2stw!4v1771232828273!5m2!1szh-TW!2stw"
  }
};

const ProductImage = ({ src, alt, className = "h-48" , specialTag = null}) => (
  <div className={`${className} bg-white flex items-center justify-center rounded-lg overflow-hidden border border-gray-100 shadow-inner relative`}>
    {src ? (
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-contain"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/400x400?text=No+Image"; 
        }}
      />
    ) : (
      <div className="text-gray-300 flex flex-col items-center">
        <Zap size={32} className="mb-2 opacity-20" />
        <span className="text-[10px] px-2 text-center">{alt}</span>
      </div>
    )}
    {specialTag && (
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-indigo-900/90 text-white px-2 py-1 rounded-lg shadow-lg backdrop-blur-sm border border-indigo-400/30 animate-in fade-in zoom-in duration-500">
        <Star size={10} className="text-yellow-400 fill-yellow-400" />
        <span className="text-[9px] font-black tracking-tight">{specialTag}</span>
      </div>
    )}
  </div>
);

const App = () => {
  const [view, setView] = useState('home'); // home, list, detail, knowledge, about, compare
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comparisonCart, setComparisonCart] = useState([]);

    // PWA 安裝相關 State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  // 功能：切換頁面時自動回到最上方
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // PWA 註冊與安裝偵測
  useEffect(() => {
    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {
          console.log('SW registered', reg);
        }).catch(err => {
          console.log('SW registration failed', err);
        });
      });
    }

    // 監聽安裝事件
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const filteredProducts = useMemo(() => {
    return APP_DATA.products.filter(p => p.brandId === selectedBrand?.id);
  }, [selectedBrand]);

  const toggleCompare = (product) => {
    setComparisonCart(prev => {
      const isExist = prev.find(p => p.id === product.id);
      if (isExist) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 3) return prev; // Limit to 3 for mobile view
        return [...prev, product];
      }
    });
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setView('list');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const goBack = () => {
    if (view === 'detail') setView('list');
    else if (view === 'list') setView('home');
    else setView('home');
  };
  

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          {(view !== 'home' && view !== 'knowledge' && view !== 'about' && view !== 'compare') ? (
            <button onClick={goBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-8"></div>
          )}
          <h1 className="text-lg font-bold flex-1 text-center">
            {view === 'home' || view === 'list' || view === 'detail' ? '精選拍線' : 
             view === 'knowledge' ? '穿線趕拍收費' : 
             view === 'compare' ? '拍線比較清單' :
             '關於大自在'}
          </h1>
          <button 
            className="relative p-2"
            onClick={() => setView('compare')}
          >
            <Scale size={24} className={comparisonCart.length > 0 ? 'text-blue-600' : 'text-gray-300'} />
            {comparisonCart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {comparisonCart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6">
        
        {/* VIEW: HOME */}
        {view === 'home' && (
          <div className="space-y-4">
            <div className="rounded-2xl p-6 text-white shadow-lg overflow-hidden relative h-40">
              <img src="/images/2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_70%]"/>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div> */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 mt-8">
                <h2 className="text-2xl font-bold mb-1">大自在體育用品店</h2>
                <p className="text-slate-300 text-lg">中壢最細膩的球拍守護者</p>
              </div>
              <GiShuttlecock className="absolute right-[10px] bottom-[10px] text-white/50 w-25 h-25 -rotate-45 hover-swing"/>

              {/* <Zap className="absolute right-[-10px] bottom-[-10px] text-white/50 w-32 h-32" /> */}
            </div>

            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">品牌分類</h3>
            <div className="grid grid-cols-2 gap-4">
              {APP_DATA.brands.map(brand => (
                <button 
                  key={brand.id}
                  onClick={() => handleBrandClick(brand)}
                  className="group relative h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  {/* 背景圖片 */}
                  <img 
                    src={brand.imgSrc} 
                    alt={brand.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = `https://placehold.co/600x400?text=${brand.logo}`; }}
                  />
                  {/* 漸層遮罩 */}

                  <div className="absolute inset-0 flex items-end pb-4 justify-center text-white">
                    <span className="font-medium text-sm bg-white/20 px-3 py-1 rounded-full">{brand.name}</span>
                  </div>
                </button>
              ))}
            </div>
                        {/* Price Warning Hint */}
            <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex gap-3 shadow-sm">
              <Info className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div className="text-xs text-amber-800 leading-relaxed">
                <p className="font-bold mb-1">💡 穿線服務提醒：</p>
                    本價格為拍線含換線工資，若需趕拍服務將另酌收<button onClick={() => setView('knowledge')} className="mx-1 font-black underline  hover:text-amber-600 transition-colors cursor-pointer">NT$100-250</button>不等。
                    <br/>若單購買拍線不穿線，價格減NT$190。
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PRODUCT LIST 商品頁*/}
        {view === 'list' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group"
              >
                <div onClick={() => handleProductClick(product)}>
                  <ProductImage src={product.imgSrc} alt={product.name} specialTag={product.tag}  className="h-40" />
                  <div className="p-3">
                    <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-blue-600 font-bold">NT$ {product.price}</span>
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
                  className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-all ${comparisonCart.find(p => p.id === product.id) ? 'bg-blue-600 text-white' : 'bg-white text-gray-400'}`}
                >
                  {comparisonCart.find(p => p.id === product.id) ? <Scale size={16} /> : <Plus size={16} />}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: PRODUCT DETAIL */}
        {view === 'detail' && selectedProduct && (
          <div className="space-y-6">
            <ProductImage src={selectedProduct.imgSrc} alt={selectedProduct.name}  specialTag={selectedProduct.tag} className="h-40" />
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedProduct.name}</h2>
                  <div className="flex gap-2 items-center">
                    <span className="text-2xl font-black text-blue-600">NT$ {selectedProduct.price}</span>
                    <span className="text-sm text-gray-400">/ 包</span>

                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleCompare(selectedProduct); }}
                  className={` p-1.5 rounded-full ring-2 ring-blue-100 transition-all ${comparisonCart.find(p => p.id === selectedProduct.id) ? 'bg-blue-600 text-white' : 'bg-white text-gray-400'}`}
                >
                  {comparisonCart.find(p => p.id === selectedProduct.id) ? <Scale size={25} /> : <Plus size={25} />}
                </button>
              </div>
              
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <Target size={18} className="text-gray-400" />
                  <div>
                    <p className="text-[14px] text-gray-500 uppercase tracking-wider">線徑</p>
                    <p className="text-sm font-bold">{selectedProduct.gauge}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <ShieldCheck size={18} className="text-gray-400" />
                  <div>
                    <p className="text-[14px] text-gray-500 uppercase tracking-wider">定位</p>
                    <p className="text-sm font-bold">{selectedProduct.category}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">特性介紹</h4>
                  <p className="font-black text-slate-800 leading-relaxed text-lg italic">
                    「{selectedProduct.characteristics}」
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">提供顏色<span className='text-xs'>(顏色請依現場為主)</span></h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map(color => (
                      <span key={color} className={`inline-flex items-center justify-center  px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${getTagColor(color)}`}>
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">詳細介紹</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>
              
                <button 
                  onClick={() => toggleCompare(selectedProduct)}
                  className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center transition-all ${comparisonCart.find(p => p.id === selectedProduct.id) ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
                > 
                  <Scale size={20} />加入比較清單
                </button>

              
            </div>

            {/* Price Warning Hint */}
            <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex gap-3 shadow-sm">
              <Info className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div className="text-xs text-amber-800 leading-relaxed">
                <p className="font-bold mb-1">💡 穿線服務提醒：</p>
                  本價格為拍線含換線工資，若需趕拍服務將另酌收<button onClick={() => setView('knowledge')} className="mx-1 font-black underline  hover:text-amber-600 transition-colors cursor-pointer">NT$100-250</button>不等。
                    <br/>若單購買拍線不穿線，價格減NT$190。
                </div>
            </div>
          </div>
        )}

        {/* VIEW: 比較 */}
        {view === 'compare' && (
          <div className="space-y-6">
            {comparisonCart.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                <Scale size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400">尚未加入任何拍線</p>
                <button 
                  onClick={() => setView('home')}
                  className="mt-4 text-blue-600 font-bold text-sm"
                >
                  去逛逛精選拍線
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <p className="text-sm text-gray-400 font-bold uppercase">比較清單 ({comparisonCart.length}/3)</p>
                  <button onClick={() => setComparisonCart([])} className="text-sm text-red-500 flex items-center gap-1 font-bold">
                    <Trash2 size={14} /> 清空
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {comparisonCart.map(p => (
                    <div key={p.id} className="relative bg-white rounded-2xl relative ">
                      <ProductImage src={p.imgSrc} alt={p.name} className="h-32" />
                      <p className="text-[15px] font-bold mt-1 line-clamp-1 text-center">{p.name}</p>
                      <button onClick={() => toggleCompare(p)} className="absolute -top-1 -right-1 bg-black text-white rounded-full p-1"><X size={8} /></button>
                    </div>
                  ))}
                  {Array.from({ length: 3 - comparisonCart.length }).map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-2 border border-dashed border-gray-200 h-28 flex items-center justify-center">
                      <Plus size={16} className="text-gray-300" />
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <h4 className="text-sm font-bold text-gray-400 uppercase">規格比對表</h4>
                  </div>
                  <div className="divide-y divide-gray-50">
                    <CompareRow label="價格" items={comparisonCart} field="price" prefix="NT$ " bold />
                    <CompareRow label="線徑" items={comparisonCart} field="gauge"  />
                    <CompareRow label="類型" items={comparisonCart} field="category" />
                    <div className="p-4">
                      <p className="text-sm text-gray-400 font-bold uppercase mb-2">主打特性</p>
                      <div className="grid grid-cols-3 gap-4">
                        {comparisonCart.map(item => (
                          <p key={item.id} className="text-[12px] font-black italic leading-tight text-blue-700">{item.characteristics}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: KNOWLEDGE (工資表格重點) */}
        {view === 'knowledge' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* 趕拍價表格 */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-slate-900 p-5 text-white flex items-center gap-3">
                <Timer className="text-blue-400" size={24} />
                <div>
                  <h3 className="font-bold text-lg leading-tight">羽拍穿線趕拍價</h3>
                  <p className="text-[10px] opacity-70 tracking-widest uppercase">Express Stringing Service</p>
                </div>
              </div>
              
              <div className="divide-y divide-gray-50">
                {APP_DATA.pricing.express.map((item, index) => (
                  <div key={index} className={`flex justify-between items-center p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm font-bold text-slate-700">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">NT$</span>
                      <span className="text-lg font-black text-blue-600">{item.price}</span>
                    </div>
                  </div>
                ))}
                  <div className={`flex justify-between items-center p-4 bg-white`}>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm font-bold text-slate-700">正常約3~4天</span>
                    </div>
            
                  </div>
              </div>

              <div className="p-4 bg-amber-50/50 border-t border-amber-100/50">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertCircle size={16} />
                  <span className="text-xs font-black">★ 依現場穿線量為主 ★</span>
                </div>
              </div>
            </div>

            {/* 自帶線說明 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">羽球拍自帶線</h4>
                  <p className="text-xs text-gray-400">自備線材委託穿線工資</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-400 mr-1">NT.</span>
                <span className="text-2xl font-black text-slate-800">{APP_DATA.pricing.bringOwn}</span>
              </div>
            </div>

            {/* 常見知識問答 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">更多穿線知識</h4>
              {APP_DATA.knowledge.map(item => (
                <details key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="list-none p-5 flex items-center justify-between cursor-pointer font-bold text-sm">
                    {item.title} <HelpCircle size={18} className="text-blue-400" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {item.content}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
        {view === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-32 bg-slate-900 flex items-center justify-center relative">
                 <h2 className="text-white text-2xl font-black italic tracking-tighter relative z-10">大自在體育用品</h2>
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{APP_DATA.shop.name}</h3>
                <button 
                  onClick={() => window.open("https://lin.ee/q79JRRpK", "_blank")}
                  className="cursor-pointer flex text-sm font-bold p-3 rounded-2xl transition-all bg-[#06C755] hover:bg-[#05b34d] text-white "
                > 
                 <FaLine className="w-5 h-5" />
                  加入官方LINE
                </button>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">門市地址</p>
                      <p className="text-sm font-medium">{APP_DATA.shop.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">聯絡電話</p>
                      <p className="text-sm font-medium">{APP_DATA.shop.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">營業時間</p>
                      <p className="text-sm font-medium">{APP_DATA.shop.businessHours}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                    <MapPin size={14} /> 門市位置圖
                  </h4>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 h-64 bg-gray-100 relative">
                    <iframe 
                      src={APP_DATA.shop.mapUrl} 
                      className="w-full h-full border-0" 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 py-3 rounded-xl border border-blue-100 bg-blue-50/50 cursor-pointer"  
                    onClick={() => window.open(`https://maps.app.goo.gl/WvdHWzPsh35y7mov8`, '_blank')}>
                    <ExternalLink size={16} /> 用 Google 地圖開啟導航
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-6 rounded-3xl text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                大自在體育用品深耕桃園中壢多年，擁有最專業的穿線師團隊與最齊全的羽球裝備。無論您是新手還是職業球友，我們都能提供您最貼心的建議。
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-3 flex justify-around items-center max-w-2xl mx-auto shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40">
        <FooterItem active={view === 'home' || view === 'list' || view === 'detail'} icon={Zap} label="精選拍線" onClick={() => setView('home')} />
        <FooterItem active={view === 'compare'} icon={Scale} label="拍線比較" onClick={() => setView('compare')} />
        <FooterItem active={view === 'knowledge'} icon={DollarSign} label="穿線趕拍價格" onClick={() => setView('knowledge')} />
        <FooterItem active={view === 'about'} icon={Store} label="關於大自在" onClick={() => setView('about')} />
      </nav>
    </div>
  );
};

const CompareRow = ({ label, items, field, prefix = "", bold = false }) => (
  <div className="p-4">
    <p className="text-[15px] text-gray-400 font-bold uppercase mb-2">{label}</p>
    <div className="grid grid-cols-3 gap-4 text-center">
      {items.map(item => (
        <p key={item.id} className={`text-lg ${bold ? 'font-bold text-blue-600' : 'text-slate-600'}`}>
          {prefix}{item[field]}
        </p>
      ))}
    </div>
  </div>
);

const FooterItem = ({ active, icon: Icon, label, onClick }) => (
  <button className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-600' : 'text-gray-400'}`} onClick={onClick}>
    <Icon size={22} fill="none" />
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default App;