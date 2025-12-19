import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowUpRight, ArrowRight, Sparkles, Search, X, Menu, Loader, ChevronLeft } from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';

/* ========================================
  配置区域
  ========================================
*/

const SITE_CONFIG = {
  name: "BLANC ORANGE", 
  
  // 🔴【重要】请在此处替换您的真实 Logo Base64 编码
  // 下面是一个临时的安全占位符(黑色 BO 文字)，确保网页不报错。请替换为您自己的 data:image... 字符串
  logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMzAiPjx0ZXh0IHg9IjAiIHk9IjIyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSI5MDAwIiBmaWxsPSIjMDAwMDAwIj5ibGFuYyBvcmFuZ2U8L3RleHQ+PC9zdmc+", 
  
  logoSize: "h-10 md:h-14", 

  heroText: "BLANC ORANGE", 
  email: "hello@sebastianwolf.design", 
  socials: [
    { name: "INSTAGRAM", url: "#" },
    { name: "LINKEDIN", url: "#" }
  ],
  accentColor: "#7FFF00" // 亮绿色
};

/* 辅助函数 */
const getMockDetailImages = (category, id) => {
  const pool = [
    "1497366216548-37526070297c", "1470071459604-3b5ec3a7fe05", 
    "1518640467707-6811f4a6ab73", "1507003211169-e69fe25477dd",
    "1549490167-27e1f413a948", "1464822759023-fed622ff2c3b"
  ];
  return [
    `https://images.unsplash.com/photo-${pool[(id + 0) % pool.length]}?q=80&w=1200&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${pool[(id + 1) % pool.length]}?q=80&w=800&auto=format&fit=crop`, 
    `https://images.unsplash.com/photo-${pool[(id + 2) % pool.length]}?q=80&w=1600&auto=format&fit=crop`, 
    `https://images.unsplash.com/photo-${pool[(id + 3) % pool.length]}?q=80&w=1200&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${pool[(id + 4) % pool.length]}?q=80&w=1000&auto=format&fit=crop`,
  ];
};

/* ========================================
  作品集数据 (保留您的修改)
  ========================================
*/
const PORTFOLIO_DATA = [
  {
    id: 1,
    title: "VIVID BOX", 
    category: "品牌设计", 
    year: "2025",
    span: 2, 
    image: "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01BC52JM1GnzgAtnxvW_!!2216999100668.jpg",
    description: `VIVID BOX诞生于2023，致力于为家居用品品牌带来现代性和趣味性。以极具现代的美学视角，探索新的城市生活方式。在冰冷的城市之下，年轻的人们寻找着自我。
vivid box也在持续挖掘与探索设计美学与高品质面料的完美结合。vivid box是一种趣味、舒适和自由，概念是打造全天候的可外穿家居系列，融合睡衣与成衣的舒适生活愿景。我们相信，无论你身在何处都可以穿着，带来打破常规的生活方式，让生活有趣一点。定期推出环保产品，采用可降解和低碳材质，可持续发展的理念是我们坚定不移的方向。`, // ⬅️ 修复：在这里添加了逗号
    // 【瀑布流图片配置项】
    // 🔴 步骤 1：您可以在这里为每个作品添加 'detailImages' 数组。
    // 数组中的每个字符串都应该替换成您真实的高清图片 URL。
    // 如果不设置这个字段，系统会使用上方 getMockDetailImages 生成占位图。
    detailImages: [
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01n0wBHZ1GnzgE1hTBB_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01g7oeyF1GnzgDvMPJK_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01zcawTh1GnzgDD8TZX_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01xdHiX71GnzgEORLzp_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01UgQngC1GnzgSOAgyA_!!2216999100668.jpg",
    ]
  },
  {
    id: 2,
    title: "SHUKU 2025SS",
    category: "品牌设计",
    year: "2025",
    span: 1,
    image: "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01l1owXk1GnzgE3C353_!!2216999100668.jpg",
    description: "Shuku 品牌以“自然科技的舒适美学”为核心价值，围绕“疗愈、简约、天然、永续”四大关键词展开。整体视觉表达兼顾理性与情感，借助柔和的色彩体系、极简的字体系统与有机图形元素，共同建立一种“静谧而有张力”的品牌感知。", // ⬅️ 修复：在这里添加了逗号
    // 【瀑布流图片配置项】
    // 🔴 步骤 1：您可以在这里为每个作品添加 'detailImages' 数组。
    // 数组中的每个字符串都应该替换成您真实的高清图片 URL。
    // 如果不设置这个字段，系统会使用上方 getMockDetailImages 生成占位图。
    detailImages: [
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01U1LWWn1GnzgEXDAuQ_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01ogQ05e1GnzgEIF6Ti_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01umXkYA1GnzgE3a14H_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01RmKG3V1GnzgEXBEME_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01SMTUuI1GnzgDxLrgT_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01GNVizE1GnzgEgXGBg_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN0107KPe91GnzgDxJaIi_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01QUb8vU1GnzgEXfqD0_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01MV4lug1GnzgRt4tG9_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01eh34Ye1GnzgQtZYEy_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN010C6Eri1GnzgRt5pTa_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01RH07mj1GnzgSE8fIs_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01iDH23m1GnzgRyDAAY_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01kAVvXw1GnzgRyAgNW_!!2216999100668.jpg",
    ]
  },
  {
    id: 3,
    title: "balabala 323",
    category: "企划拍摄",
    year: "2023",
    span: 1,
    image: "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01i7zzB51GnzgSepA9H_!!2216999100668.jpg",
    description: "Minimalist art direction for a high-end furniture brand, focusing on materials and light.",
    detailImages: [
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01aOCZ571GnzgSerNOD_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01HyNifw1GnzgNhVSG5_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01x9BFsj1GnzgTZ7VHe_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN017Wzv241GnzgSyzt8q_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01dfygWb1GnzgT09qZf_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01i7zzB51GnzgSepA9H_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN013SdBNr1GnzgU24lpV_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01fULCEV1GnzgSJHEYs_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01xQejLo1GnzgS0pKBq_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01B0bW4V1GnzgS0qndz_!!2216999100668.jpg",
    ]
  },
  {
    id: 4,
    title: "月球档案",
    category: "Project",
    year: "2023",
    span: 2, 
    image: "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01gRcZ7i1GnzgEJwGmD_!!2216999100668.jpg", 
    description: "获奖作品名称：月球档案中秋礼盒英文名称：Moon Archives Mid Autumn Gift Box Packaging所获奖项：2022 靳埭强设计奖 入围奖（Jin Daiqiang Global Chinese Design Award 2022）CGDA2023 视觉传达 优秀奖（CGDA Visual Communication Design Award 2023）2023 ICVA 国际视觉艺术 优秀奖（2023 International Council of Visual Arts Awards）", // ⬅️ 修复：在这里添加了逗号
    // 【瀑布流图片配置项】
    // 🔴 步骤 1：您可以在这里为每个作品添加 'detailImages' 数组。
    // 数组中的每个字符串都应该替换成您真实的高清图片 URL。
    // 如果不设置这个字段，系统会使用上方 getMockDetailImages 生成占位图。
    detailImages: [
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01gRcZ7i1GnzgEJwGmD_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01Q58DW11GnzgF0JJwH_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01fFEfkU1GnzgG0S9P2_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01xirLms1GnzgFelHu7_!!2216999100668.jpg",
    ]
  },
  {
    id: 5,
    title: "AIRWISH",
    category: "品牌设计",
    year: "2025",
    span: 2,
    image: "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01XpV4oh1GnzgRahgNx_!!2216999100668.jpg",
    description: "品牌定位：自由 × 呼吸 × 去标签化AIRWISH 坚持以 “Breathe freely, grow without boundaries” 为理念，赋予女性自在穿着与真实表达的权利。我们相信，每一位女性都值得被尊重、被看见、被理解。品牌主张打破标签、摆脱束缚，以服饰作为语言，传递真实而多元的自己。每一件 AIRWISH 的作品，不仅是衣物，更是一份支持女性自我认同的 “第二层肌肤”。", // ⬅️ 修复：在这里添加了逗号
    // 【瀑布流图片配置项】
    // 🔴 步骤 1：您可以在这里为每个作品添加 'detailImages' 数组。
    // 数组中的每个字符串都应该替换成您真实的高清图片 URL。
    // 如果不设置这个字段，系统会使用上方 getMockDetailImages 生成占位图。
    detailImages: [
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01ro5xt81GnzgQuM9hn_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01augNNY1GnzgRaJQmm_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01KWk1xA1GnzgQyG6d8_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01ATlsiL1GnzgRo4GDL_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01xrafHJ1GnzgSAV9ft_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN0184jytq1GnzgRb7Sfm_!!2216999100668.jpg",
    ]
  },
  {
    id: 6,
    title: "AIKEN",
    category: "品牌设计",
    year: "2025",
    span: 1,
    image: "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01je3Quw1GnzgRvH2Uk_!!2216999100668.jpg",
    description: "品牌定位：自由 × 呼吸 × 去标签化AIRWISH 坚持以 “Breathe freely, grow without boundaries” 为理念，赋予女性自在穿着与真实表达的权利。我们相信，每一位女性都值得被尊重、被看见、被理解。品牌主张打破标签、摆脱束缚，以服饰作为语言，传递真实而多元的自己。每一件 AIRWISH 的作品，不仅是衣物，更是一份支持女性自我认同的 “第二层肌肤”。", // ⬅️ 修复：在这里添加了逗号
    // 【瀑布流图片配置项】
    // 🔴 步骤 1：您可以在这里为每个作品添加 'detailImages' 数组。
    // 数组中的每个字符串都应该替换成您真实的高清图片 URL。
    // 如果不设置这个字段，系统会使用上方 getMockDetailImages 生成占位图。
    detailImages: [
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01oX2cAa1GnzgRvHZlY_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01UosOgY1GnzgSC2Heq_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN018D0PD61GnzgSC25Bv_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01i0i1mt1GnzgRvHEzO_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01rkTOgG1GnzgSeB03a_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01JomwFS1GnzgRmIWw1_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01FSgV2r1GnzgS0hVWh_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01JHS3K61GnzgSGdD1o_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN012XAjK71GnzgRd6AvS_!!2216999100668.jpg",
    ]
  },
  {
    id: 7,
    title: "活动晚宴",
    category: "Project",
    year: "2025",
    span: 1,
    image: "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01zGgs711GnzgMd6Hy7_!!2216999100668.jpg",
    description: "Identity design for a creative co-working space in Berlin.", // ⬅️ 修复：在这里添加了逗号
    // 【瀑布流图片配置项】
    // 🔴 步骤 1：您可以在这里为每个作品添加 'detailImages' 数组。
    // 数组中的每个字符串都应该替换成您真实的高清图片 URL。
    // 如果不设置这个字段，系统会使用上方 getMockDetailImages 生成占位图。
    detailImages: [
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01Bbmuxg1GnzgMgsupG_!!2216999100668.png",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01zGgs711GnzgMd6Hy7_!!2216999100668.jpg",
    ]
  },
  {
    id: 8,
    title: "AIGC",
    category: "企划拍摄",
    year: "2025",
    span: 2, 
    image: "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01GyvuOX1GnzgSD75Kp_!!2216999100668.png",
    description: "运用最新的ai技术，结合产品与活动视觉需求，产出真实经验的效果",
    detailImages: [
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01gjsKTu1GnzgQwyp5P_!!2216999100668.png",
      "https://img.alicdn.com/imgextra/i4/2216999100668/O1CN01EN8Svo1GnzgRQDGEI_!!2216999100668.png",
      "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN017JFlf21GnzgRwXvB6_!!2216999100668.png",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN013R7xjf1GnzgQx81NR_!!2216999100668.png",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01LG9ZIz1GnzgRe47n6_!!2216999100668.png",
      "https://img.alicdn.com/imgextra/i2/2216999100668/O1CN01uW2Txs1GnzgRQIADz_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01nOPSfT1GnzgSfTtYC_!!2216999100668.jpg",
      "https://img.alicdn.com/imgextra/i3/2216999100668/O1CN01PWytey1GnzgRe22j8_!!2216999100668.jpg",
    ]
  }
];

const CONTACT_PAGE_CONTENT = {
  heroImage: "https://img.alicdn.com/imgextra/i1/2216999100668/O1CN01iryRLk1GnzgBIEJnH_!!2216999100668.jpg", 
  title: "LET'S CREATE THE UNSEEN.",
  subtitle: "REACH OUT / COLLABORATE / CONNECT"
}

/* ========================================
  Gemini AI API Integration
  ========================================
*/
const apiKey = ""; 

const callGemini = async (prompt, systemInstruction = "") => {
  const maxRetries = 3;
  let delay = 1000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
          })
        }
      );

      if (response.status === 429 && attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; 
        continue;
      }

      if (!response.ok) throw new Error(`AI Service Unavailable: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error("Gemini Error:", error);
      if (attempt === maxRetries - 1) return null;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; 
    }
  }
  return null;
};

/* ========================================
  Utils & Hooks
  ========================================
*/

const ScrollToTop = () => {
  const { pathname } = useLocation();
  // 使用 useEffect 替代 useLayoutEffect 以避免部分环境下的警告，效果相同
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* ========================================
  Components
  ========================================
*/

const Header = ({ onCategoryChange, activeCategory, categories }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isHome = currentPath === '/';

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    if (currentPath !== '/') {
      navigate('/');
    }
  };
  
  const isAllWorkActive = isHome && activeCategory === 'All';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white mix-blend-normal border-b border-black h-16 md:h-20 flex items-center justify-between px-4 md:px-10 transition-all duration-300">
      <Link to="/" className="flex-shrink-0 flex items-center gap-4 z-20 mr-4">
        <img src={SITE_CONFIG.logo} alt="Logo" className={`${SITE_CONFIG.logoSize} object-contain`} />
      </Link>

      {/* pb-3: 增加底部内边距，给下划线留出空间，防止 overflow:hidden 导致不可见 */}
      <nav className="flex-1 flex items-center justify-end gap-6 md:gap-8 text-xs md:text-sm font-bold tracking-widest overflow-x-auto no-scrollbar whitespace-nowrap mask-fade-left pb-3 pt-3">
        
        <button 
          onClick={() => handleCategoryClick('All')} 
          className={`relative hover:text-black hover-underline-effect ${isAllWorkActive ? 'active' : ''}`} 
          style={{'--accent-color': SITE_CONFIG.accentColor}}
        >
          ALL WORK
        </button>
        
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => handleCategoryClick(cat)} 
            className={`relative uppercase hover:text-black hover-underline-effect ${isHome && activeCategory === cat ? 'active' : ''}`}
            style={{'--accent-color': SITE_CONFIG.accentColor}}
          >
            {cat}
          </button>
        ))}
        
        <Link to="/contact" className={`relative hover:text-black hover-underline-effect ${currentPath === '/contact' ? 'active' : ''}`} style={{'--accent-color': SITE_CONFIG.accentColor}}>
          CONTACT
        </Link>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="w-full pt-32 pb-20 px-6 md:px-10 bg-white">
      <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-black uppercase max-w-7xl">
        {SITE_CONFIG.heroText}
      </h2>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAiStory = async (e) => {
    e.stopPropagation(); 
    if (story) return setStory(null);
    setLoading(true);
    const prompt = `Write a bold, 1-sentence, conceptual design statement for a project named "${project.title}" (${project.category}). Style: Industrial, Swiss Design, Intellectual. No fluff.`;
    const text = await callGemini(prompt);
    if (text) setStory(text);
    setLoading(false);
  };

  const handleCardClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative w-full bg-gray-100 overflow-hidden cursor-pointer ${project.span === 2 ? 'md:col-span-2' : 'md:col-span-1'} h-[60vh] md:h-[80vh]`}
    >
      <img 
        src={project.image} 
        alt={project.title}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out filter grayscale-[20%] ${story ? 'scale-110 blur-sm brightness-75' : 'group-hover:scale-105 group-hover:grayscale-0'}`}
      />
      
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between transition-opacity duration-300 bg-black/20">
        <div className="flex justify-end">
          <button 
            onClick={handleAiStory}
            className="bg-white text-black px-4 py-2 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors flex items-center gap-2 border border-black z-10"
          >
            {loading ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {loading ? "THINKING..." : "AI INSIGHT"}
          </button>
        </div>

        <div>
          {story ? (
            <p className="bg-black text-white p-4 text-sm md:text-lg font-medium leading-tight animate-fade-in max-w-md border-l-4" style={{borderColor: SITE_CONFIG.accentColor}}>
              {story}
            </p>
          ) : (
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-lg">
                {project.title}
              </h3>
              <div className="mt-2 flex items-center gap-4 text-white font-bold tracking-widest text-xs md:text-sm">
                <span>{project.category}</span>
                <span className="w-8 h-[2px] bg-white"></span>
                <span>{project.year}</span>
                <span className="ml-auto flex items-center gap-1 border-b border-white pb-0.5">VIEW PROJECT <ArrowRight size={14}/></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-20 px-6 md:px-10 bg-black text-white mt-0 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
            LET'S BUILD<br/>THE FUTURE.
          </h3>
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-xl hover:underline decoration-2 underline-offset-4" style={{textDecorationColor: SITE_CONFIG.accentColor}}>
            {SITE_CONFIG.email}
          </a>
        </div>
        
        <div className="flex flex-col justify-end items-start md:items-end gap-6">
          <div className="flex gap-6">
            {SITE_CONFIG.socials.map(s => (
              <a key={s.name} href={s.url} className="text-sm font-bold tracking-widest hover:text-gray-400 transition-colors uppercase">
                {s.name}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            © {new Date().getFullYear()} {SITE_CONFIG.name} / LONDON
          </p>
        </div>
      </div>
    </footer>
  );
};

/* --- Pages --- */

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = PORTFOLIO_DATA.find(p => p.id === parseInt(id));
  const navigate = useNavigate();

  if (!project) return <div className="h-screen flex items-center justify-center">PROJECT NOT FOUND</div>;

  // 🔴 步骤 2：这里的逻辑会检查 project.detailImages 是否存在。
  // 如果存在（例如 VIVID BOX），则使用您配置的数组；如果不存在，则使用 getMockDetailImages 生成占位图。
  const detailImages = project.detailImages || getMockDetailImages(project.category, project.id);
  const nextProjectId = project.id < PORTFOLIO_DATA.length ? project.id + 1 : 1;

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="px-6 md:px-10 pt-10 pb-20 max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold tracking-widest mb-8 hover:text-gray-500 transition-colors">
          <ChevronLeft size={16} /> BACK
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
            {project.title}
          </h1>
          <div className="text-sm md:text-base font-medium leading-relaxed max-w-md lg:ml-auto">
            {/* whitespace-pre-line 用于保留描述中的换行符 */}
            <p className="mb-6 whitespace-pre-line">{project.description || "A deep dive into the creative process, exploring form, function, and the subtle interplay of light and shadow."}</p>
            <div className="grid grid-cols-2 gap-4 text-xs tracking-widest text-gray-500 uppercase border-t border-black pt-4">
              <div><span className="block text-black font-bold mb-1">Category</span>{project.category}</div>
              <div><span className="block text-black font-bold mb-1">Year</span>{project.year}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-4 px-0">
        <img src={project.image} alt="Main View" className="w-full h-auto max-h-[90vh] object-cover" />
      </div>

      <div className="px-4 md:px-6 mb-20">
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          {detailImages.map((imgUrl, index) => (
            <div key={index} className="break-inside-avoid animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <img src={imgUrl} alt={`Detail ${index}`} className="w-full h-auto object-cover bg-gray-100 hover:opacity-95 transition-opacity"/>
              <p className="text-[10px] tracking-widest text-gray-400 mt-2 uppercase">Figure 0{index + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-20 border-t border-black bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-black hover:text-white transition-colors group" onClick={() => navigate(`/project/${nextProjectId}`)}>
        <span className="text-sm font-bold tracking-widest">NEXT PROJECT</span>
        <ArrowRight size={32} className="transform group-hover:translate-x-4 transition-transform" />
      </div>
      <Footer />
    </div>
  );
};

const HomePage = ({ activeCategory, onCategoryChange, filteredProjects }) => {
  return (
    <>
      <Hero />
      <main className="pb-0 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white border-t border-black">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="w-full h-[50vh] flex flex-col items-center justify-center text-black gap-4 border-t border-black">
             <span className="text-sm font-bold tracking-widest">NO RESULTS</span>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-16 md:pt-20 bg-white">
      <div className="relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] bg-cover bg-center flex items-center justify-center text-white p-6" style={{ backgroundImage: `url(${CONTACT_PAGE_CONTENT.heroImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase animate-fade-in-up">
            {CONTACT_PAGE_CONTENT.title}
          </h2>
          <p className="mt-4 md:mt-8 text-lg md:text-xl font-bold tracking-widest uppercase animate-fade-in-up delay-200">
            {CONTACT_PAGE_CONTENT.subtitle}
          </p>
          <a 
            href={`mailto:${SITE_CONFIG.email}`} 
            className="mt-10 inline-flex items-center gap-4 text-xl md:text-2xl font-bold tracking-widest uppercase border-2 border-white px-8 py-4 hover:bg-white hover:text-black transition-all animate-fade-in-up delay-400"
          >
            SAY HELLO <ArrowRight size={24} />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Main App component with Router
export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [...new Set(PORTFOLIO_DATA.map(item => item.category))];

  const filteredProjects = activeCategory === 'All' 
      ? PORTFOLIO_DATA 
      : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  useEffect(() => {
    // Simulate loading for the first time
    const timer = setTimeout(() => setIsLoading(false), 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-black">
        <img src={SITE_CONFIG.logo} alt="Logo" className={`${SITE_CONFIG.logoSize} object-contain mb-8 animate-pulse-color`} style={{'--accent-color': SITE_CONFIG.accentColor}} />
        <div className="text-base md:text-xl font-black tracking-tighter uppercase animate-fade-in">Loading Vision...</div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white overflow-x-hidden">
        
        <Header 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={categories}
        />

        <Routes>
          <Route path="/" element={
            <HomePage 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
              filteredProjects={filteredProjects}
            />
          } />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </div>

      <style>{`
        html { scroll-behavior: smooth; } 

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        
        @keyframes pulse-color {
          0%, 100% { opacity: 1; filter: grayscale(0%); }
          50% { opacity: 0.7; filter: grayscale(100%) hue-rotate(180deg) brightness(0.8); }
        }
        .animate-pulse-color {
          animation: pulse-color 2s infinite ease-in-out;
          filter: grayscale(0%);
          transition: filter 0.5s;
        }

        .hover-underline-effect {
          position: relative;
          color: black; 
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-block; /* 修复: 允许 ::after 正常定位 */
        }
        
        /* 核心修复：下划线样式调整，移除 bottom 负值过大导致的切除 */
        .hover-underline-effect::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px; /* 稍微细一点，更精致 */
          left: 0;
          bottom: 0px; /* 贴紧文字底部 */
          background-color: var(--accent-color, #7FFF00); 
          transition: width 0.3s ease;
        }
        
        /* 强制 active 状态宽度为 100% */
        .hover-underline-effect:hover::after,
        .hover-underline-effect.active::after {
          width: 100% !important;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }

        ::-webkit-scrollbar {
          width: 8px;
          background-color: #f5f5f5;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #000;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          background-color: #f5f5f5;
        }
      `}</style>
    </Router>
  );
} 
