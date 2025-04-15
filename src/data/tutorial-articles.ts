
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
}

// Sample articles from https://github.com/jamez-bondos/awesome-gpt4o-images
export const articles: TutorialArticle[] = [
  {
    id: "detailed-character-concept",
    title: {
      en: "Creating Detailed Character Concepts",
      zh: "创建详细的角色概念设计"
    },
    description: {
      en: "Learn how to generate detailed 3D character concepts with specific attributes",
      zh: "学习如何生成具有特定属性的详细3D角色概念设计"
    },
    excerpt: {
      en: "This tutorial shows how to create detailed 3D character concept art with specific attributes like clothing, expressions and poses.",
      zh: "本教程展示了如何创建具有特定属性（如服装、表情和姿势）的详细3D角色概念艺术。"
    },
    content: {
      en: "Creating detailed character concepts with AI requires carefully constructed prompts that specify exactly what you want to see in the final image.\n\nThis prompt focuses on generating a stylized 3D character concept with specific attributes. It uses precise descriptors for the character's appearance, clothing style, facial expression, and pose.\n\nThe prompt specifically mentions \"3D character concept art\" which helps the AI understand that you want a polished, professional-looking character design rather than a simple illustration or photograph.\n\nWhen crafting your own character concept prompts, try to include:\n\n1. Character attributes (gender, age, style)\n2. Specific clothing details\n3. Facial expression and emotions\n4. Pose and composition\n5. Art style references\n6. Lighting and mood\n\nExperiment with different combinations to achieve the exact look you want for your character concepts.",
      zh: "使用AI创建详细的角色概念需要精心构建的提示词，明确指定您希望在最终图像中看到的内容。\n\n这个提示词专注于生成具有特定属性的风格化3D角色概念。它为角色的外观、服装风格、面部表情和姿势提供了精确的描述。\n\n提示词特别提到了\"3D角色概念艺术\"，这有助于AI理解您想要的是一个精致、专业的角色设计，而不是简单的插图或照片。\n\n在编写自己的角色概念提示词时，尝试包括：\n\n1. 角色属性（性别、年龄、风格）\n\n2. 特定的服装细节\n\n3. 面部表情和情绪\n\n4. 姿势和构图\n\n5. 艺术风格参考\n\n6. 灯光和氛围\n\n尝试不同的组合，以实现您想要的角色概念的确切外观。"
    },
    prompt: "3D character concept art of a female cyberpunk hacker with neon blue hair, wearing a black leather jacket with circuit patterns, smirking confidently, standing with one hand on her hip in a dark alley lit by neon signs, highly detailed, professional character design, octane render",
    tags: ["Character Design", "3D Art", "Cyberpunk", "Concept Art"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository"
  },
  {
    id: "isometric-game-environment",
    title: {
      en: "Creating Isometric Game Environments",
      zh: "创建等距游戏环境"
    },
    description: {
      en: "Learn how to generate detailed isometric game environments for your gaming projects",
      zh: "学习如何为您的游戏项目生成详细的等距游戏环境"
    },
    excerpt: {
      en: "This tutorial demonstrates how to create isometric game environments with rich details and specific art styles ideal for game developers and artists.",
      zh: "本教程演示了如何创建具有丰富细节和特定艺术风格的等距游戏环境，非常适合游戏开发人员和艺术家。"
    },
    content: {
      en: "Isometric game environments are popular in many types of games from RPGs to strategy games. Creating these with AI requires specific prompt engineering.\n\nThe sample prompt focuses on generating a detailed isometric environment with specific elements like buildings, nature, and a particular stylistic approach.\n\nNotice how the prompt specifies \"isometric\" which is crucial for getting the correct perspective. It also mentions \"game environment\" which helps the AI understand the intended use case.\n\nThe prompt includes details about the environment's components, the desired artistic style, and even lighting conditions. This level of specificity helps ensure you get a usable result for game development purposes.\n\nWhen creating your own isometric game environment prompts, consider including:\n\n1. The specific perspective (isometric, top-down, etc.)\n2. Environmental elements to include (buildings, nature, characters)\n3. Art style references (cartoon, realistic, pixel art)\n4. Time of day and lighting conditions\n5. Color palette preferences\n6. Level of detail required\n\nExperiment with different combinations to find what works best for your specific game project's visual style.",
      zh: "等距游戏环境在许多类型的游戏中很受欢迎，从RPG到策略游戏。使用AI创建这些环境需要特定的提示词工程。\n\n示例提示词专注于生成具有特定元素（如建筑物、自然环境）和特定风格方法的详细等距环境。\n\n请注意提示词如何指定\"等距\"，这对获得正确的视角至关重要。它还提到了\"游戏环境\"，这有助于AI理解预期的用途。\n\n提示词包括有关环境组件、所需艺术风格甚至照明条件的详细信息。这种细节水平有助于确保您获得可用于游戏开发目的的结果。\n\n在创建自己的等距游戏环境提示词时，考虑包括：\n\n1. 特定视角（等距、俯视等）\n\n2. 要包括的环境元素（建筑物、自然、角色）\n\n3. 艺术风格参考（卡通、写实、像素艺术）\n\n4. 一天中的时间和照明条件\n\n5. 色彩调色板偏好\n\n6. 所需的细节水平\n\n尝试不同的组合，找出最适合您特定游戏项目视觉风格的方法。"
    },
    prompt: "Isometric game environment of a small medieval fantasy village with thatched-roof cottages, a central marketplace with colorful stalls, cobblestone paths winding between buildings, surrounded by lush green trees and small gardens, stylized cartoon art style with vibrant colors, soft lighting, highly detailed for game development, no characters, clean background",
    tags: ["Game Design", "Isometric", "Environment", "Fantasy"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository"
  },
  {
    id: "product-visualization",
    title: {
      en: "Professional Product Visualization",
      zh: "专业产品可视化"
    },
    description: {
      en: "Create photorealistic product visualization for marketing and presentations",
      zh: "为营销和演示创建照片般逼真的产品可视化"
    },
    excerpt: {
      en: "Learn how to create professional, photorealistic product visualizations that can be used in marketing materials, presentations, and concept development.",
      zh: "学习如何创建专业、照片般逼真的产品可视化，可用于营销材料、演示和概念开发。"
    },
    content: {
      en: "Product visualization is an essential part of marketing and design presentations. With AI, you can quickly generate professional-looking product renders without extensive 3D modeling skills.\n\nThe example prompt focuses on creating a photorealistic smartwatch with specific design elements, displayed in a professional studio setting. This type of prompt is ideal for creating product concepts or marketing materials.\n\nThe prompt specifies several important elements:\n\n- The product type (smartwatch)\n- Specific design features (rounded screen, metal band)\n- The setting (white studio background)\n- The rendering quality (photorealistic product photography)\n- Camera perspective (close-up macro)\n\nThese details help ensure the AI generates a professional-looking product visualization that could be used in presentations or marketing materials.\n\nWhen creating your own product visualization prompts, consider including:\n\n1. Exact product type and category\n2. Material specifications (metal, glass, plastic, etc.)\n3. Color schemes and finishes\n4. Background and environment\n5. Lighting setup (studio lighting, natural lighting, etc.)\n6. Camera angle and perspective\n7. Rendering style (photorealistic, stylized, etc.)\n\nExperiment with different combinations to achieve the perfect product visualization for your specific needs.",
      zh: "产品可视化是营销和设计演示的重要组成部分。通过AI，您可以快速生成专业外观的产品渲染，而无需广泛的3D建模技能。\n\n示例提示词专注于创建具有特定设计元素的照片级真实智能手表，显示在专业工作室环境中。这类提示词非常适合创建产品概念或营销材料。\n\n提示词指定了几个重要元素：\n\n- 产品类型（智能手表）\n\n- 特定设计特征（圆形屏幕，金属表带）\n\n- 环境设置（白色工作室背景）\n\n- 渲染质量（照片级真实产品摄影）\n\n- 相机视角（特写宏观）\n\n这些细节有助于确保AI生成可用于演示或营销材料的专业外观产品可视化。\n\n在创建自己的产品可视化提示词时，考虑包括：\n\n1. 确切的产品类型和类别\n\n2. 材料规格（金属、玻璃、塑料等）\n\n3. 配色方案和表面处理\n\n4. 背景和环境\n\n5. 灯光设置（工作室灯光、自然光等）\n\n6. 相机角度和透视\n\n7. 渲染风格（照片级真实、风格化等）\n\n尝试不同的组合，以实现满足您特定需求的完美产品可视化。"
    },
    prompt: "Photorealistic product photography of a sleek modern smartwatch with a rounded glass screen displaying a fitness tracking interface, titanium metal band and case, on a clean white studio background, close-up macro shot with professional studio lighting, high-end advertisement quality, extreme detail, photorealistic rendering",
    tags: ["Product Design", "Marketing", "Photography", "Gadgets"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository"
  },
  {
    id: "architectural-visualization",
    title: {
      en: "Architectural Visualization Techniques",
      zh: "建筑可视化技术"
    },
    description: {
      en: "Learn how to create stunning architectural visualizations using AI",
      zh: "学习如何使用AI创建令人惊叹的建筑可视化"
    },
    excerpt: {
      en: "This tutorial covers techniques for creating professional architectural visualizations including exterior renderings, interior spaces, and conceptual designs.",
      zh: "本教程涵盖了创建专业建筑可视化的技术，包括外部渲染、内部空间和概念设计。"
    },
    content: {
      en: "Architectural visualization is a powerful tool for architects, designers, and real estate professionals. AI can help create stunning visualizations quickly and efficiently.\n\nThe example prompt focuses on generating a modern minimalist house exterior with specific design elements and environmental features. This approach is perfect for creating concept designs or presentation materials.\n\nNotice how the prompt specifies:\n\n- Architectural style (modern minimalist)\n- Building materials (concrete, glass, wood)\n- Environmental setting (hillside with ocean view)\n- Time of day and lighting conditions (sunset with warm lighting)\n- Rendering quality and approach (architectural visualization, professional rendering)\n\nThese specifics help ensure the AI generates a high-quality architectural visualization that meets professional standards.\n\nWhen creating your own architectural visualization prompts, consider including:\n\n1. Specific architectural style or inspiration\n2. Building materials and textures\n3. Environmental context and landscaping\n4. Time of day and lighting conditions\n5. Weather conditions (if relevant)\n6. Perspective (aerial, eye-level, etc.)\n7. Rendering style (photorealistic, conceptual, etc.)\n\nExperiment with different combinations to create visualizations that effectively communicate your architectural concepts.",
      zh: "建筑可视化是建筑师、设计师和房地产专业人士的强大工具。AI可以帮助快速高效地创建令人惊叹的可视化效果。\n\n示例提示词专注于生成具有特定设计元素和环境特征的现代简约住宅外观。这种方法非常适合创建概念设计或演示材料。\n\n请注意提示词如何指定：\n\n- 建筑风格（现代简约）\n\n- 建筑材料（混凝土、玻璃、木材）\n\n- 环境设置（可俯瞰海景的山坡）\n\n- 一天中的时间和照明条件（日落时的温暖光线）\n\n- 渲染质量和方法（建筑可视化，专业渲染）\n\n这些细节有助于确保AI生成符合专业标准的高质量建筑可视化。\n\n在创建自己的建筑可视化提示词时，考虑包括：\n\n1. 特定的建筑风格或灵感来源\n\n2. 建筑材料和纹理\n\n3. 环境背景和景观设计\n\n4. 一天中的时间和照明条件\n\n5. 天气条件（如相关）\n\n6. 视角（航拍、眼平线等）\n\n7. 渲染风格（照片级真实、概念性等）\n\n尝试不同的组合，创建能有效传达您的建筑概念的可视化效果。"
    },
    prompt: "Architectural visualization of a modern minimalist luxury house exterior with clean lines, large glass windows, concrete and wood elements, built on a hillside overlooking the ocean, surrounded by minimal landscaping with native plants, sunset lighting with warm golden hues, professional architectural rendering, ultra-detailed, photorealistic, wide-angle shot showing the complete structure and its relationship to the landscape",
    tags: ["Architecture", "Visualization", "Rendering", "Design"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository"
  },
  {
    id: "food-photography",
    title: {
      en: "Professional Food Photography",
      zh: "专业美食摄影"
    },
    description: {
      en: "Create mouthwatering food images for menus, blogs, and social media",
      zh: "创建令人垂涎的美食图像，用于菜单、博客和社交媒体"
    },
    excerpt: {
      en: "Learn techniques for creating professional food photography with perfect composition, lighting and styling using AI-generated imagery.",
      zh: "学习使用AI生成的图像创建专业美食摄影的技术，包括完美的构图、照明和造型。"
    },
    content: {
      en: "Food photography is essential for restaurants, food bloggers, and culinary businesses. With AI, you can create appetizing food images without professional photography equipment.\n\nThe example prompt focuses on creating a professional-looking food photograph of a dessert with specific styling elements, lighting conditions, and composition. This type of prompt is perfect for menu images, social media posts, or food blogs.\n\nThe prompt specifies important elements for food photography:\n\n- The specific food item (chocolate lava cake with vanilla ice cream)\n- Food styling details (dripping chocolate, garnish)\n- Background and props (dark wooden table, minimalist setting)\n- Lighting (soft directional lighting)\n- Photography specifications (shallow depth of field, macro detail)\n\nThese details help ensure the AI generates an appetizing, professional-looking food image that highlights the dish's most appealing qualities.\n\nWhen creating your own food photography prompts, consider including:\n\n1. Exact food items and their arrangement\n2. Garnishes and styling elements\n3. Background textures and props\n4. Lighting style and direction\n5. Camera angle and perspective\n6. Depth of field and focus points\n7. Color palette and mood\n\nExperiment with different combinations to create the most appetizing presentation of your food items.",
      zh: "美食摄影对于餐厅、美食博主和烹饪企业至关重要。使用AI，您可以在没有专业摄影设备的情况下创建令人垂涎的美食图像。\n\n示例提示词专注于创建具有特定造型元素、照明条件和构图的专业外观的甜点美食照片。这类提示词非常适合菜单图像、社交媒体帖子或美食博客。\n\n提示词指定了美食摄影的重要元素：\n\n- 特定食品（巧克力熔岩蛋糕配香草冰淇淋）\n\n- 食品造型细节（滴落的巧克力，装饰）\n\n- 背景和道具（深色木桌，简约摆设）\n\n- 照明（柔和的定向光）\n\n- 摄影规格（浅景深，宏观细节）\n\n这些细节有助于确保AI生成令人垂涎、专业外观的美食图像，突出展示菜品最吸引人的品质。\n\n在创建自己的美食摄影提示词时，考虑包括：\n\n1. 确切的食品项目及其排列方式\n\n2. 装饰品和造型元素\n\n3. 背景纹理和道具\n\n4. 照明风格和方向\n\n5. 相机角度和视角\n\n6. 景深和焦点\n\n7. 色彩配置和氛围\n\n尝试不同的组合，创建最令人垂涎的食品展示。"
    },
    prompt: "Professional food photography of a chocolate lava cake with molten chocolate dripping down the sides, served with a scoop of vanilla ice cream dusted with cocoa powder, fresh raspberries as garnish, on a dark wooden table with a minimalist place setting, soft directional lighting highlighting the texture and gloss of the chocolate, shallow depth of field focusing on the dripping chocolate, macro detail, high-end restaurant quality photography",
    tags: ["Food", "Photography", "Culinary", "Marketing"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository"
  },
  {
    id: "landscape-painting",
    title: {
      en: "Digital Landscape Painting Techniques",
      zh: "数字风景画技术"
    },
    description: {
      en: "Create beautiful landscape paintings in various artistic styles",
      zh: "以各种艺术风格创作美丽的风景画"
    },
    excerpt: {
      en: "This tutorial explores techniques for creating stunning digital landscape paintings in various artistic styles using AI tools.",
      zh: "本教程探讨了使用AI工具以各种艺术风格创建令人惊叹的数字风景画的技术。"
    },
    content: {
      en: "Digital landscape painting is a versatile art form that can capture the beauty of nature in countless styles. AI tools make it possible to explore different artistic approaches without years of traditional art training.\n\nThe example prompt focuses on creating a landscape in a specific artistic style (impressionist) with particular subject matter, lighting conditions, and compositional elements.\n\nNotice how the prompt specifies:\n\n- Artistic style (impressionist painting)\n- Subject matter (autumn forest)\n- Lighting conditions (golden hour sunlight)\n- Compositional elements (winding path, distant mountains)\n- Color palette (warm autumn colors)\n- Artistic techniques (visible brushstrokes, soft edges)\n\nThese specifications help ensure the AI generates a landscape image that authentically captures the intended artistic style and mood.\n\nWhen creating your own digital landscape painting prompts, consider including:\n\n1. Specific artistic style or artist reference\n2. Landscape features and elements\n3. Time of day and lighting conditions\n4. Weather conditions and atmospheric effects\n5. Color palette and mood\n6. Brushwork and technique specifications\n7. Composition guidelines\n\nExperiment with different combinations to create landscape paintings in various artistic styles that evoke different emotional responses.",
      zh: "数字风景绘画是一种多功能的艺术形式，可以通过无数种风格捕捉自然的美丽。AI工具使得在没有多年传统艺术训练的情况下探索不同的艺术方法成为可能。\n\n示例提示词专注于以特定艺术风格（印象派）创作风景画，包括特定的主题、照明条件和构图元素。\n\n请注意提示词如何指定：\n\n- 艺术风格（印象派绘画）\n\n- 主题（秋季森林）\n\n- 照明条件（黄金时段阳光）\n\n- 构图元素（蜿蜒小径，远处山脉）\n\n- 色彩配置（温暖的秋季颜色）\n\n- 艺术技巧（可见的笔触，柔和的边缘）\n\n这些规格有助于确保AI生成的风景图像真实地捕捉预期的艺术风格和氛围。\n\n在创建自己的数字风景画提示词时，考虑包括：\n\n1. 特定的艺术风格或艺术家参考\n\n2. 景观特征和元素\n\n3. 一天中的时间和照明条件\n\n4. 天气条件和大气效果\n\n5. 色彩配置和氛围\n\n6. 笔触和技术规格\n\n7. 构图指南\n\n尝试不同的组合，创建各种艺术风格的风景画，引发不同的情感反应。"
    },
    prompt: "Impressionist painting style landscape of an autumn forest with vibrant red and orange foliage, golden hour sunlight filtering through the trees creating dappled light effects on a winding dirt path, distant misty blue mountains on the horizon, warm color palette with visible brushstrokes and soft edges, artistic digital painting in the style of Monet",
    tags: ["Landscape", "Painting", "Digital Art", "Impressionism"],
    source: "https://github.com/jamez-bondos/awesome-gpt4o-images",
    sourceText: "awesome-gpt4o-images GitHub Repository"
  }
];
