
interface TutorialArticle {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  excerpt: {
    en: string;
    zh: string;
  };
  content: {
    en: string;
    zh: string;
  };
  prompt: string;
  tags: string[];
  source?: string;
  sourceText?: string;
  imageUrl?: string;
  keyPoints?: {
    en: string;
    zh: string;
  };
  seoKeywords?: {
    en: string[];
    zh: string[];
  };
  seoDescription?: {
    en: string;
    zh: string;
  };
}

// Articles based on https://github.com/jamez-bondos/awesome-gpt4o-images
export const articles: TutorialArticle[] = [
  {
    id: "detailed-character-concept",
    title: {
      en: "Creating Detailed Character Concepts with AI",
      zh: "如何使用AI创建详细的角色概念设计"
    },
    description: {
      en: "Learn how to generate detailed 3D character concepts with specific attributes using AI prompt engineering",
      zh: "学习如何使用AI提示词工程生成具有特定属性的详细3D角色概念设计"
    },
    excerpt: {
      en: "This tutorial shows how to create detailed 3D character concept art with specific attributes like clothing, expressions and poses using AI prompt engineering techniques.",
      zh: "本教程展示了如何使用AI提示词工程技术创建具有特定属性（如服装、表情和姿势）的详细3D角色概念艺术。"
    },
    content: {
      en: "Creating detailed character concepts with AI requires carefully constructed prompts that specify exactly what you want to see in the final image.\n\nThis prompt focuses on generating a stylized 3D character concept with specific attributes. It uses precise descriptors for the character's appearance, clothing style, facial expression, and pose.\n\nThe prompt specifically mentions \"3D character concept art\" which helps the AI understand that you want a polished, professional-looking character design rather than a simple illustration or photograph.\n\nWhen crafting your own character concept prompts, try to include:\n\n1. Character attributes (gender, age, style)\n2. Specific clothing details\n3. Facial expression and emotions\n4. Pose and composition\n5. Art style references\n6. Lighting and mood\n\nExperiment with different combinations to achieve the exact look you want for your character concepts.",
      zh: "使用AI创建详细的角色概念需要精心构建的提示词，明确指定您希望在最终图像中看到的内容。\n\n这个提示词专注于生成具有特定属性的风格化3D角色概念。它为角色的外观、服装风格、面部表情和姿势提供了精确的描述。\n\n提示词特别提到了\"3D角色概念艺术\"，这有助于AI理解您想要的是一个精致、专业的角色设计，而不是简单的插图或照片。\n\n在编写自己的角色概念提示词时，尝试包括：\n\n1. 角色属性（性别、年龄、风格）\n\n2. 特定的服装细节\n\n3. 面部表情和情绪\n\n4. 姿势和构图\n\n5. 艺术风格参考\n\n6. 灯光和氛围\n\n尝试不同的组合，以实现您想要的角色概念的确切外观。"
    },
    prompt: "3D character concept art of a female cyberpunk hacker with neon blue hair, wearing a black leather jacket with circuit patterns, smirking confidently, standing with one hand on her hip in a dark alley lit by neon signs, highly detailed, professional character design, octane render",
    tags: ["Character Design", "3D Art", "Cyberpunk", "Concept Art", "AI Art"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["character design AI", "3D concept art", "AI character generation", "cyberpunk character", "creative prompts", "character visualization", "AI prompt engineering", "digital character concepts"],
      zh: ["AI角色设计", "3D概念艺术", "AI角色生成", "赛博朋克角色", "创意提示词", "角色可视化", "AI提示词工程", "数字角色概念"]
    },
    seoDescription: {
      en: "Learn expert techniques for creating detailed 3D character concepts with AI, including specific prompts for clothing, expressions, poses and styling that yield professional results.",
      zh: "学习使用AI创建详细3D角色概念的专业技术，包括用于服装、表情、姿势和风格的特定提示词，以获得专业效果。"
    }
  },
  {
    id: "isometric-game-environment",
    title: {
      en: "Creating Isometric Game Environments with AI",
      zh: "如何用AI创建等距游戏环境"
    },
    description: {
      en: "Learn how to generate detailed isometric game environments for your gaming projects using AI prompts",
      zh: "学习如何使用AI提示词为您的游戏项目生成详细的等距游戏环境"
    },
    excerpt: {
      en: "This tutorial demonstrates how to create isometric game environments with rich details and specific art styles ideal for game developers and artists using AI generation tools.",
      zh: "本教程演示了如何使用AI生成工具创建具有丰富细节和特定艺术风格的等距游戏环境，非常适合游戏开发人员和艺术家。"
    },
    content: {
      en: "Isometric game environments are popular in many types of games from RPGs to strategy games. Creating these with AI requires specific prompt engineering.\n\nThe sample prompt focuses on generating a detailed isometric environment with specific elements like buildings, nature, and a particular stylistic approach.\n\nNotice how the prompt specifies \"isometric\" which is crucial for getting the correct perspective. It also mentions \"game environment\" which helps the AI understand the intended use case.\n\nThe prompt includes details about the environment's components, the desired artistic style, and even lighting conditions. This level of specificity helps ensure you get a usable result for game development purposes.\n\nWhen creating your own isometric game environment prompts, consider including:\n\n1. The specific perspective (isometric, top-down, etc.)\n2. Environmental elements to include (buildings, nature, characters)\n3. Art style references (cartoon, realistic, pixel art)\n4. Time of day and lighting conditions\n5. Color palette preferences\n6. Level of detail required\n\nExperiment with different combinations to find what works best for your specific game project's visual style.",
      zh: "等距游戏环境在许多类型的游戏中很受欢迎，从RPG到策略游戏。使用AI创建这些环境需要特定的提示词工程。\n\n示例提示词专注于生成具有特定元素（如建筑物、自然环境）和特定风格方法的详细等距环境。\n\n请注意提示词如何指定\"等距\"，这对获得正确的视角至关重要。它还提到了\"游戏环境\"，这有助于AI理解预期的用途。\n\n提示词包括有关环境组件、所需艺术风格甚至照明条件的详细信息。这种细节水平有助于确保您获得可用于游戏开发目的的结果。\n\n在创建自己的等距游戏环境提示词时，考虑包括：\n\n1. 特定视角（等距、俯视等）\n\n2. 要包括的环境元素（建筑物、自然、角色）\n\n3. 艺术风格参考（卡通、写实、像素艺术）\n\n4. 一天中的时间和照明条件\n\n5. 色彩调色板偏好\n\n6. 所需的细节水平\n\n尝试不同的组合，找出最适合您特定游戏项目视觉风格的方法。"
    },
    prompt: "Isometric game environment of a small medieval fantasy village with thatched-roof cottages, a central marketplace with colorful stalls, cobblestone paths winding between buildings, surrounded by lush green trees and small gardens, stylized cartoon art style with vibrant colors, soft lighting, highly detailed for game development, no characters, clean background",
    tags: ["Game Design", "Isometric", "Environment", "Fantasy", "AI Art"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["isometric game design", "AI game environments", "fantasy game art", "isometric art generation", "game asset creation", "AI level design", "game world building", "isometric prompt engineering"],
      zh: ["等距游戏设计", "AI游戏环境", "奇幻游戏艺术", "等距艺术生成", "游戏资产创建", "AI关卡设计", "游戏世界构建", "等距提示词工程"]
    },
    seoDescription: {
      en: "Learn to create detailed isometric game environments with AI, including specific prompts for fantasy villages, cities, and landscapes with the exact art style you need for your game projects.",
      zh: "学习使用AI创建详细的等距游戏环境，包括为奇幻村庄、城市和景观提供特定提示词，以获得游戏项目所需的确切艺术风格。"
    }
  },
  {
    id: "product-visualization",
    title: {
      en: "Professional Product Visualization with AI",
      zh: "使用AI实现专业产品可视化"
    },
    description: {
      en: "Create photorealistic product visualization for marketing and presentations using AI-powered tools",
      zh: "使用AI驱动的工具为营销和演示创建照片般逼真的产品可视化"
    },
    excerpt: {
      en: "Learn how to create professional, photorealistic product visualizations with AI that can be used in marketing materials, presentations, and concept development without expensive photography.",
      zh: "学习如何使用AI创建专业、照片般逼真的产品可视化，无需昂贵的摄影设备即可用于营销材料、演示和概念开发。"
    },
    content: {
      en: "Product visualization is an essential part of marketing and design presentations. With AI, you can quickly generate professional-looking product renders without extensive 3D modeling skills.\n\nThe example prompt focuses on creating a photorealistic smartwatch with specific design elements, displayed in a professional studio setting. This type of prompt is ideal for creating product concepts or marketing materials.\n\nThe prompt specifies several important elements:\n\n- The product type (smartwatch)\n- Specific design features (rounded screen, metal band)\n- The setting (white studio background)\n- The rendering quality (photorealistic product photography)\n- Camera perspective (close-up macro)\n\nThese details help ensure the AI generates a professional-looking product visualization that could be used in presentations or marketing materials.\n\nWhen creating your own product visualization prompts, consider including:\n\n1. Exact product type and category\n2. Material specifications (metal, glass, plastic, etc.)\n3. Color schemes and finishes\n4. Background and environment\n5. Lighting setup (studio lighting, natural lighting, etc.)\n6. Camera angle and perspective\n7. Rendering style (photorealistic, stylized, etc.)\n\nExperiment with different combinations to achieve the perfect product visualization for your specific needs.",
      zh: "产品可视化是营销和设计演示的重要组成部分。通过AI，您可以快速生成专业外观的产品渲染，而无需广泛的3D建模技能。\n\n示例提示词专注于创建具有特定设计元素的照片级真实智能手表，显示在专业工作室环境中。这类提示词非常适合创建产品概念或营销材料。\n\n提示词指定了几个重要元素：\n\n- 产品类型（智能手表）\n\n- 特定设计特征（圆形屏幕，金属表带）\n\n- 环境设置（白色工作室背景）\n\n- 渲染质量（照片级真实产品摄影）\n\n- 相机视角（特写宏观）\n\n这些细节有助于确保AI生成可用于演示或营销材料的专业外观产品可视化。\n\n在创建自己的产品可视化提示词时，考虑包括：\n\n1. 确切的产品类型和类别\n\n2. 材料规格（金属、玻璃、塑料等）\n\n3. 配色方案和表面处理\n\n4. 背景和环境\n\n5. 灯光设置（工作室灯光、自然光等）\n\n6. 相机角度和透视\n\n7. 渲染风格（照片级真实、风格化等）\n\n尝试不同的组合，以实现满足您特定需求的完美产品可视化。"
    },
    prompt: "Photorealistic product photography of a sleek modern smartwatch with a rounded glass screen displaying a fitness tracking interface, titanium metal band and case, on a clean white studio background, close-up macro shot with professional studio lighting, high-end advertisement quality, extreme detail, photorealistic rendering",
    tags: ["Product Design", "Marketing", "Photography", "Gadgets", "AI Visualization"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["product visualization AI", "AI product photography", "virtual product rendering", "digital product mockups", "AI marketing imagery", "product concept visualization", "photorealistic product images", "3D product visualization"],
      zh: ["AI产品可视化", "AI产品摄影", "虚拟产品渲染", "数字产品模型", "AI营销图像", "产品概念可视化", "照片级真实产品图像", "3D产品可视化"]
    },
    seoDescription: {
      en: "Master AI-powered product visualization to create stunning photorealistic renders for marketing, presentations and product development without expensive photography or 3D modeling skills.",
      zh: "掌握AI驱动的产品可视化技术，为营销、演示和产品开发创建令人惊叹的照片级真实渲染，无需昂贵的摄影或3D建模技能。"
    }
  },
  {
    id: "architectural-visualization",
    title: {
      en: "Architectural Visualization Techniques with AI",
      zh: "使用AI的建筑可视化技术"
    },
    description: {
      en: "Learn how to create stunning architectural visualizations using AI prompts for various design projects",
      zh: "学习如何使用AI提示词为各种设计项目创建令人惊叹的建筑可视化"
    },
    excerpt: {
      en: "This tutorial covers techniques for creating professional architectural visualizations including exterior renderings, interior spaces, and conceptual designs using AI generation tools.",
      zh: "本教程涵盖了使用AI生成工具创建专业建筑可视化的技术，包括外部渲染、内部空间和概念设计。"
    },
    content: {
      en: "Architectural visualization is a powerful tool for architects, designers, and real estate professionals. AI can help create stunning visualizations quickly and efficiently.\n\nThe example prompt focuses on generating a modern minimalist house exterior with specific design elements and environmental features. This approach is perfect for creating concept designs or presentation materials.\n\nNotice how the prompt specifies:\n\n- Architectural style (modern minimalist)\n- Building materials (concrete, glass, wood)\n- Environmental setting (hillside with ocean view)\n- Time of day and lighting conditions (sunset with warm lighting)\n- Rendering quality and approach (architectural visualization, professional rendering)\n\nThese specifics help ensure the AI generates a high-quality architectural visualization that meets professional standards.\n\nWhen creating your own architectural visualization prompts, consider including:\n\n1. Specific architectural style or inspiration\n2. Building materials and textures\n3. Environmental context and landscaping\n4. Time of day and lighting conditions\n5. Weather conditions (if relevant)\n6. Perspective (aerial, eye-level, etc.)\n7. Rendering style (photorealistic, conceptual, etc.)\n\nExperiment with different combinations to create visualizations that effectively communicate your architectural concepts.",
      zh: "建筑可视化是建筑师、设计师和房地产专业人士的强大工具。AI可以帮助快速高效地创建令人惊叹的可视化效果。\n\n示例提示词专注于生成具有特定设计元素和环境特征的现代简约住宅外观。这种方法非常适合创建概念设计或演示材料。\n\n请注意提示词如何指定：\n\n- 建筑风格（现代简约）\n\n- 建筑材料（混凝土、玻璃、木材）\n\n- 环境设置（可俯瞰海景的山坡）\n\n- 一天中的时间和照明条件（日落时的温暖光线）\n\n- 渲染质量和方法（建筑可视化，专业渲染）\n\n这些细节有助于确保AI生成符合专业标准的高质量建筑可视化。\n\n在创建自己的建筑可视化提示词时，考虑包括：\n\n1. 特定的建筑风格或灵感来源\n\n2. 建筑材料和纹理\n\n3. 环境背景和景观设计\n\n4. 一天中的时间和照明条件\n\n5. 天气条件（如相关）\n\n6. 视角（航拍、眼平线等）\n\n7. 渲染风格（照片级真实、概念性等）\n\n尝试不同的组合，创建能有效传达您的建筑概念的可视化效果。"
    },
    prompt: "Architectural visualization of a modern minimalist luxury house exterior with clean lines, large glass windows, concrete and wood elements, built on a hillside overlooking the ocean, surrounded by minimal landscaping with native plants, sunset lighting with warm golden hues, professional architectural rendering, ultra-detailed, photorealistic, wide-angle shot showing the complete structure and its relationship to the landscape",
    tags: ["Architecture", "Visualization", "Rendering", "Design", "AI Rendering"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["architectural visualization AI", "AI building renders", "architectural concept art", "AI architecture design", "virtual building visualization", "3D architectural rendering", "AI property visualization", "digital architecture concepts"],
      zh: ["AI建筑可视化", "AI建筑渲染", "建筑概念艺术", "AI建筑设计", "虚拟建筑可视化", "3D建筑渲染", "AI房产可视化", "数字建筑概念"]
    },
    seoDescription: {
      en: "Discover how to create professional architectural visualizations with AI for concept designs, client presentations, and marketing materials without specialized 3D modeling skills.",
      zh: "了解如何使用AI为概念设计、客户演示和营销材料创建专业的建筑可视化，无需专业的3D建模技能。"
    }
  },
  {
    id: "food-photography",
    title: {
      en: "Professional Food Photography with AI",
      zh: "使用AI进行专业美食摄影"
    },
    description: {
      en: "Create mouthwatering food images for menus, blogs, and social media using AI-powered generation tools",
      zh: "使用AI驱动的生成工具为菜单、博客和社交媒体创建令人垂涎的美食图像"
    },
    excerpt: {
      en: "Learn techniques for creating professional food photography with perfect composition, lighting and styling using AI-generated imagery, ideal for restaurants and food bloggers.",
      zh: "学习使用AI生成的图像创建具有完美构图、照明和造型的专业美食摄影的技术，非常适合餐厅和美食博主。"
    },
    content: {
      en: "Food photography is essential for restaurants, food bloggers, and culinary businesses. With AI, you can create appetizing food images without professional photography equipment.\n\nThe example prompt focuses on creating a professional-looking food photograph of a dessert with specific styling elements, lighting conditions, and composition. This type of prompt is perfect for menu images, social media posts, or food blogs.\n\nThe prompt specifies important elements for food photography:\n\n- The specific food item (chocolate lava cake with vanilla ice cream)\n- Food styling details (dripping chocolate, garnish)\n- Background and props (dark wooden table, minimalist setting)\n- Lighting (soft directional lighting)\n- Photography specifications (shallow depth of field, macro detail)\n\nThese details help ensure the AI generates an appetizing, professional-looking food image that highlights the dish's most appealing qualities.\n\nWhen creating your own food photography prompts, consider including:\n\n1. Exact food items and their arrangement\n2. Garnishes and styling elements\n3. Background textures and props\n4. Lighting style and direction\n5. Camera angle and perspective\n6. Depth of field and focus points\n7. Color palette and mood\n\nExperiment with different combinations to create the most appetizing presentation of your food items.",
      zh: "美食摄影对于餐厅、美食博主和烹饪企业至关重要。使用AI，您可以在没有专业摄影设备的情况下创建令人垂涎的美食图像。\n\n示例提示词专注于创建具有特定造型元素、照明条件和构图的专业外观的甜点美食照片。这类提示词非常适合菜单图像、社交媒体帖子或美食博客。\n\n提示词指定了美食摄影的重要元素：\n\n- 特定食品（巧克力熔岩蛋糕配香草冰淇淋）\n\n- 食品造型细节（滴落的巧克力，装饰）\n\n- 背景和道具（深色木桌，简约摆设）\n\n- 照明（柔和的定向光）\n\n- 摄影规格（浅景深，宏观细节）\n\n这些细节有助于确保AI生成令人垂涎、专业外观的美食图像，突出展示菜品最吸引人的品质。\n\n在创建自己的美食摄影提示词时，考虑包括：\n\n1. 确切的食品项目及其排列方式\n\n2. 装饰品和造型元素\n\n3. 背景纹理和道具\n\n4. 照明风格和方向\n\n5. 相机角度和视角\n\n6. 景深和焦点\n\n7. 色彩配置和氛围\n\n尝试不同的组合，创建最令人垂涎的食品展示。"
    },
    prompt: "Professional food photography of a chocolate lava cake with molten chocolate dripping down the sides, served with a scoop of vanilla ice cream dusted with cocoa powder, fresh raspberries as garnish, on a dark wooden table with a minimalist place setting, soft directional lighting highlighting the texture and gloss of the chocolate, shallow depth of field focusing on the dripping chocolate, macro detail, high-end restaurant quality photography",
    tags: ["Food", "Photography", "Culinary", "Marketing", "AI Imaging"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["food photography AI", "restaurant menu images", "culinary photography", "AI food visualization", "food styling AI", "digital food presentation", "food marketing images", "dessert photography"],
      zh: ["AI美食摄影", "餐厅菜单图像", "烹饪摄影", "AI食品可视化", "AI食物造型", "数字食品展示", "食品营销图像", "甜点摄影"]
    },
    seoDescription: {
      en: "Learn how to create professional food photography with AI for restaurants, food blogs and social media that showcases dishes in the most appetizing way possible.",
      zh: "了解如何使用AI为餐厅、美食博客和社交媒体创建专业的美食摄影，以最具吸引力的方式展示菜品。"
    }
  },
  {
    id: "landscape-painting",
    title: {
      en: "Digital Landscape Painting Techniques with AI",
      zh: "使用AI的数字风景画技术"
    },
    description: {
      en: "Create beautiful landscape paintings in various artistic styles using AI-powered generation tools",
      zh: "使用AI驱动的生成工具以各种艺术风格创作美丽的风景画"
    },
    excerpt: {
      en: "This tutorial explores techniques for creating stunning digital landscape paintings in various artistic styles using AI tools, from impressionism to fantasy landscapes.",
      zh: "本教程探讨了使用AI工具以各种艺术风格创建令人惊叹的数字风景画的技术，从印象派到奇幻景观。"
    },
    content: {
      en: "Digital landscape painting is a versatile art form that can capture the beauty of nature in countless styles. AI tools make it possible to explore different artistic approaches without years of traditional art training.\n\nThe example prompt focuses on creating a landscape in a specific artistic style (impressionist) with particular subject matter, lighting conditions, and compositional elements.\n\nNotice how the prompt specifies:\n\n- Artistic style (impressionist painting)\n- Subject matter (autumn forest)\n- Lighting conditions (golden hour sunlight)\n- Compositional elements (winding path, distant mountains)\n- Color palette (warm autumn colors)\n- Artistic techniques (visible brushstrokes, soft edges)\n\nThese specifications help ensure the AI generates a landscape image that authentically captures the intended artistic style and mood.\n\nWhen creating your own digital landscape painting prompts, consider including:\n\n1. Specific artistic style or artist reference\n2. Landscape features and elements\n3. Time of day and lighting conditions\n4. Weather conditions and atmospheric effects\n5. Color palette and mood\n6. Brushwork and technique specifications\n7. Composition guidelines\n\nExperiment with different combinations to create landscape paintings in various artistic styles that evoke different emotional responses.",
      zh: "数字风景绘画是一种多功能的艺术形式，可以通过无数种风格捕捉自然的美丽。AI工具使得在没有多年传统艺术训练的情况下探索不同的艺术方法成为可能。\n\n示例提示词专注于以特定艺术风格（印象派）创作风景画，包括特定的主题、照明条件和构图元素。\n\n请注意提示词如何指定：\n\n- 艺术风格（印象派绘画）\n\n- 主题（秋季森林）\n\n- 照明条件（黄金时段阳光）\n\n- 构图元素（蜿蜒小径，远处山脉）\n\n- 色彩配置（温暖的秋季颜色）\n\n- 艺术技巧（可见的笔触，柔和的边缘）\n\n这些规格有助于确保AI生成的风景图像真实地捕捉预期的艺术风格和氛围。\n\n在创建自己的数字风景画提示词时，考虑包括：\n\n1. 特定的艺术风格或艺术家参考\n\n2. 景观特征和元素\n\n3. 一天中的时间和照明条件\n\n4. 天气条件和大气效果\n\n5. 色彩配置和氛围\n\n6. 笔触和技术规格\n\n7. 构图指南\n\n尝试不同的组合，创建各种艺术风格的风景画，引发不同的情感反应。"
    },
    prompt: "Impressionist painting style landscape of an autumn forest with vibrant red and orange foliage, golden hour sunlight filtering through the trees creating dappled light effects on a winding dirt path, distant misty blue mountains on the horizon, warm color palette with visible brushstrokes and soft edges, artistic digital painting in the style of Monet",
    tags: ["Landscape", "Painting", "Digital Art", "Impressionism", "AI Art"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["AI landscape painting", "digital art generation", "impressionist AI art", "artistic landscape prompts", "AI nature artwork", "digital painting techniques", "stylized landscape art", "AI art styles"],
      zh: ["AI风景画", "数字艺术生成", "印象派AI艺术", "艺术风景提示词", "AI自然艺术作品", "数字绘画技术", "风格化景观艺术", "AI艺术风格"]
    },
    seoDescription: {
      en: "Master digital landscape painting with AI to create stunning nature scenes in various artistic styles from impressionism to fantasy without traditional painting skills.",
      zh: "掌握使用AI进行数字风景绘画，无需传统绘画技能，即可以各种艺术风格从印象派到奇幻创建令人惊叹的自然场景。"
    }
  },
  {
    id: "sci-fi-concept-art",
    title: {
      en: "Creating Sci-Fi Concept Art with AI",
      zh: "使用AI创建科幻概念艺术"
    },
    description: {
      en: "Learn how to design futuristic sci-fi scenes and environments using AI prompts and visualization techniques",
      zh: "学习如何使用AI提示词和可视化技术设计未来主义科幻场景和环境"
    },
    excerpt: {
      en: "This tutorial explores techniques for creating detailed sci-fi concept art with futuristic technology, environments, and atmospheric effects using AI generation tools.",
      zh: "本教程探索了使用AI生成工具创建具有未来科技、环境和大气效果的详细科幻概念艺术的技术。"
    },
    content: {
      en: "Science fiction concept art is a thrilling genre that lets you explore futuristic worlds, technologies, and scenarios. AI makes it possible to quickly generate detailed sci-fi scenes that would otherwise take significant artistic skill and time.\n\nThe example prompt focuses on creating a sprawling futuristic cityscape with specific architectural elements, atmospheric conditions, and technological details.\n\nNotice how the prompt specifies:\n\n- Setting (futuristic megacity)\n- Architectural style (neo-futuristic skyscrapers)\n- Atmospheric conditions (sunset, foggy)\n- Technological elements (flying vehicles, holographic displays)\n- Color palette (neon blues and purples)\n- Mood and feel (cyberpunk aesthetic)\n\nThese specifics help ensure the AI generates a cohesive sci-fi scene with a consistent visual style and believable futuristic details.\n\nWhen creating your own sci-fi concept art prompts, consider including:\n\n1. Time period or era (near future, distant future, alternate timeline)\n2. Technology level and specific technologies\n3. Environmental and atmospheric conditions\n4. Architectural and design aesthetics\n5. Color schemes and lighting\n6. Human or alien presence and activities\n7. References to established sci-fi subgenres (cyberpunk, solarpunk, space opera)\n\nExperiment with different combinations to create compelling sci-fi worlds that tell a visual story about possible futures or alternative realities.",
      zh: "科幻概念艺术是一个令人兴奋的类型，让您探索未来世界、技术和场景。AI使得快速生成原本需要相当艺术技巧和时间的详细科幻场景成为可能。\n\n示例提示词专注于创建具有特定建筑元素、大气条件和技术细节的庞大未来城市景观。\n\n请注意提示词如何指定：\n\n- 场景设置（未来巨型城市）\n\n- 建筑风格（新未来主义摩天大楼）\n\n- 大气条件（日落，雾气）\n\n- 技术元素（飞行车辆，全息显示）\n\n- 色彩搭配（霓虹蓝和紫色）\n\n- 情绪和感觉（赛博朋克美学）\n\n这些细节有助于确保AI生成具有一致视觉风格和可信未来细节的连贯科幻场景。\n\n在创建自己的科幻概念艺术提示词时，考虑包括：\n\n1. 时间段或时代（近未来、远未来、替代时间线）\n\n2. 技术水平和特定技术\n\n3. 环境和大气条件\n\n4. 建筑和设计美学\n\n5. 配色方案和照明\n\n6. 人类或外星人的存在和活动\n\n7. 对已建立的科幻子类型的引用（赛博朋克、太阳朋克、太空歌剧）\n\n尝试不同的组合，创造引人入胜的科幻世界，讲述关于可能未来或替代现实的视觉故事。"
    },
    prompt: "Sci-fi concept art of a futuristic megacity at sunset with neo-futuristic skyscrapers stretching into the clouds, flying vehicles moving between buildings, massive holographic advertisements projected on building facades, elevated transparent transit tubes, glowing energy lines connecting structures, neon-lit streets far below shrouded in light fog, distant space elevator in the background, cyberpunk aesthetic with a color palette dominated by deep blues and purples highlighted by neon accents, ultra-detailed, cinematic wide shot with dramatic lighting",
    tags: ["Sci-Fi", "Concept Art", "Futuristic", "Cityscape", "AI Art"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    seoKeywords: {
      en: ["sci-fi concept art", "futuristic city AI", "cyberpunk visualization", "AI sci-fi environments", "futuristic technology design", "science fiction artwork", "AI cityscape generation", "concept art visualization"],
      zh: ["科幻概念艺术", "未来城市AI", "赛博朋克可视化", "AI科幻环境", "未来技术设计", "科幻艺术作品", "AI城市景观生成", "概念艺术可视化"]
    },
    seoDescription: {
      en: "Learn to create stunning sci-fi concept art with AI prompts, from cyberpunk cityscapes to futuristic technology and environments for film, gaming and illustration projects.",
      zh: "学习使用AI提示词创建令人惊叹的科幻概念艺术，从赛博朋克城市景观到未来技术和环境，用于电影、游戏和插图项目。"
    }
  },
  {
    id: "fantasy-character-design",
    title: {
      en: "Fantasy Character Design Techniques with AI",
      zh: "使用AI的奇幻角色设计技术"
    },
    description: {
      en: "Create compelling fantasy characters with unique attributes and visual storytelling using AI generation tools",
      zh: "使用AI生成工具创建具有独特属性和视觉叙事的引人入胜的奇幻角色"
    },
    excerpt: {
      en: "This tutorial covers techniques for designing memorable fantasy characters with detailed costumes, accessories, and visual storytelling elements using AI-powered image generation.",
      zh: "本教程涵盖了使用AI驱动的图像生成设计具有详细服装、配件和视觉叙事元素的难忘奇幻角色的技术。"
    },
    content: {
      en: "Fantasy character design allows you to create compelling personas that blend human elements with magical or otherworldly qualities. Using AI, you can generate detailed fantasy characters that feel like they belong in richly developed worlds.\n\nThe example prompt focuses on creating a detailed fantasy character with specific traits, costume elements, accessories, and environmental context.\n\nNotice how the prompt specifies:\n\n- Character type and role (elven wizard/scholar)\n- Physical attributes (aged, wise appearance)\n- Costume details (ornate robes with specific embellishments)\n- Accessories and props (specific staff design, magical elements)\n- Environmental context (ancient library setting)\n- Artistic style (detailed fantasy illustration)\n- Lighting and mood (warm ambient lighting)\n\nThese specifics help ensure the AI generates a character that not only looks visually interesting but also tells a story through visual elements alone.\n\nWhen creating your own fantasy character design prompts, consider including:\n\n1. Character race, class, or archetype\n2. Age, physical build, and distinctive features\n3. Detailed clothing and armor descriptions\n4. Magical or special accessories and weapons\n5. Character's emotional state or personality hints\n6. Environmental context or background setting\n7. Art style references or inspirations\n\nExperiment with different combinations to create fantasy characters that feel like they have rich backstories and belong in fully realized fantasy worlds.",
      zh: "奇幻角色设计使您能够创建将人类元素与魔法或超凡特质相结合的引人入胜的角色形象。使用AI，您可以生成感觉像属于丰富发展世界的详细奇幻角色。\n\n示例提示词专注于创建具有特定特征、服装元素、配件和环境背景的详细奇幻角色。\n\n请注意提示词如何指定：\n\n- 角色类型和角色（精灵巫师/学者）\n\n- 身体特征（年长，智慧外表）\n\n- 服装细节（具有特定装饰的华丽长袍）\n\n- 配件和道具（特定的法杖设计，魔法元素）\n\n- 环境背景（古代图书馆设置）\n\n- 艺术风格（详细的奇幻插图）\n\n- 灯光和氛围（温暖的环境照明）\n\n这些细节有助于确保AI生成的角色不仅看起来视觉上有趣，而且仅通过视觉元素就能讲述故事。\n\n在创建自己的奇幻角色设计提示词时，考虑包括：\n\n1. 角色种族、职业或原型\n\n2. 年龄、体格和独特特征\n\n3. 详细的服装和盔甲描述\n\n4. 魔法或特殊配件和武器\n\n5. 角色的情绪状态或性格暗示\n\n6. 环境背景或背景设置\n\n7. 艺术风格参考或灵感来源\n\n尝试不同的组合，创建感觉具有丰富背景故事和属于完全实现的奇幻世界的奇幻角色。"
    },
    prompt: "Fantasy character design of an aged elven wizard-scholar with long silver hair and wise amber eyes, wearing ornate emerald-green robes embroidered with ancient silver runes and constellations, adorned with multiple small crystal vials and pouches containing magical ingredients hanging from a leather belt, holding an intricately carved wooden staff topped with a glowing blue crystal sphere that casts soft illumination on his weathered face, standing in an ancient stone library filled with floating magical tomes and scrolls, warm ambient lighting with dust particles visible in the air, detailed fantasy illustration style with fine attention to textures and magical elements",
    tags: ["Fantasy", "Character Design", "Magic", "Illustration", "AI Art"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository",
    imageUrl: "public/lovable-uploads/a257f5c6-1511-4a1e-a999-3fd071525e5b.png",
    keyPoints: {
      en: "1. Define specific character attributes (race, age, profession)\n2. Include detailed clothing descriptions with colors and materials\n3. Add unique accessories and magical items that tell a story\n4. Describe facial features and expressions to convey personality\n5. Set the character in an appropriate environment\n6. Specify lighting conditions and atmosphere\n7. Reference an art style suitable for fantasy illustration\n8. Include magical elements that enhance the character's role",
      zh: "1. 明确定义角色属性（种族、年龄、职业）\n2. 包含详细的服装描述，包括颜色和材质\n3. 添加能讲述故事的独特配件和魔法物品\n4. 描述面部特征和表情以传达个性\n5. 将角色置于适当的环境中\n6. 指定照明条件和氛围\n7. 引用适合奇幻插图的艺术风格\n8. 包含增强角色角色的魔法元素"
    },
    seoKeywords: {
      en: ["fantasy character design", "AI character creation", "fantasy illustration", "magical character AI", "elven character design", "fantasy art generation", "character concept art", "AI fantasy visualization"],
      zh: ["奇幻角色设计", "AI角色创建", "奇幻插图", "魔法角色AI", "精灵角色设计", "奇幻艺术生成", "角色概念艺术", "AI奇幻可视化"]
    },
    seoDescription: {
      en: "Master fantasy character design with AI to create detailed magical beings with rich visual storytelling elements for games, books, and illustration projects.",
      zh: "掌握使用AI进行奇幻角色设计，为游戏、书籍和插图项目创建具有丰富视觉叙事元素的详细魔法生物。"
    }
  }
];
