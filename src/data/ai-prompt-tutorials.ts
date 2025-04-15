import { StaticImageData } from "next/image";

export interface AIPromptTutorial {
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
  promptEn?: string;
  promptZh?: string;
  tags: string[];
  source?: string;
  sourceText?: string;
  authorName?: string;
  authorUrl?: string;
  imageUrl?: string;
  requiresReferenceImage?: boolean;
  keyPoints?: {
    en: string;
    zh: string;
  };
}

export const aiPromptTutorials: AIPromptTutorial[] = [
  {
    id: "photorealistic-portrait",
    title: {
      en: "Photorealistic Portrait",
      zh: "照片级逼真肖像"
    },
    description: {
      en: "Create stunningly realistic portraits with AI",
      zh: "使用AI创造令人惊艳的逼真肖像"
    },
    excerpt: {
      en: "Learn how to craft AI prompts that generate photorealistic portraits, capturing every detail from skin texture to lighting.",
      zh: "学习如何编写AI提示词来生成照片级逼真的肖像，捕捉从皮肤纹理到光线的每一个细节。"
    },
    content: {
      en: "This tutorial guides you through creating AI prompts that result in photorealistic portraits. The key is to specify details like lighting, camera settings, and the subject's features. Experiment with different combinations to achieve the desired realism.",
      zh: "本教程指导您创建能够生成照片级逼真肖像的AI提示词。关键在于指定细节，如光线、相机设置和拍摄对象的特征。尝试不同的组合以达到所需的真实感。"
    },
    prompt: "photorealistic portrait of a woman, 35mm, f1.8, natural lighting, sharp focus, detailed skin texture",
    promptEn: "photorealistic portrait of a woman, 35mm, f1.8, natural lighting, sharp focus, detailed skin texture",
    promptZh: "照片级逼真的女性肖像，35mm，f1.8，自然光，清晰对焦，细致的皮肤纹理",
    tags: ["肖像", "逼真", "摄影", "人像"],
    source: "https://example.com/photorealistic-portrait",
    sourceText: "example.com",
    authorName: "AI Learning",
    authorUrl: "https://example.com",
    imageUrl: "public/lovable-uploads/01a5e4a5-8415-499c-a944-77e774dd29c4.png",
    requiresReferenceImage: false,
    keyPoints: {
      en: "1. Specify camera settings like focal length and aperture\n2. Use natural lighting for realism\n3. Focus on detailed skin texture",
      zh: "1. 指定相机设置，如焦距和光圈\n2. 使用自然光以获得真实感\n3. 关注细致的皮肤纹理"
    }
  },
  {
    id: "architectural-visualization",
    title: {
      en: "Architectural Visualization",
      zh: "建筑可视化"
    },
    description: {
      en: "Visualize architectural designs with stunning realism",
      zh: "以惊人的真实感可视化建筑设计"
    },
    excerpt: {
      en: "Explore how to use AI prompts to create detailed and realistic architectural visualizations, showcasing designs in their best light.",
      zh: "探索如何使用AI提示词来创建详细和真实的建筑可视化，以最佳的光线展示设计。"
    },
    content: {
      en: "This tutorial focuses on generating architectural visualizations using AI. Specify the type of building, materials, lighting conditions, and surrounding environment to create a realistic and appealing visualization.",
      zh: "本教程重点介绍使用AI生成建筑可视化。指定建筑物类型、材料、光照条件和周围环境，以创建逼真且吸引人的可视化效果。"
    },
    prompt: "modern house, glass facade, sunset lighting, surrounded by trees, 4k resolution",
    promptEn: "modern house, glass facade, sunset lighting, surrounded by trees, 4k resolution",
    promptZh: "现代住宅，玻璃幕墙，日落光照，树木环绕，4k分辨率",
    tags: ["建筑", "可视化", "设计", "渲染"],
    source: "https://example.com/architectural-visualization",
    sourceText: "example.com",
    authorName: "AI Design",
    authorUrl: "https://example.com",
    imageUrl: "public/lovable-uploads/99a98e59-a9a9-4497-890a-80f5644c1a8d.png",
    requiresReferenceImage: false,
    keyPoints: {
      en: "1. Specify the type of building and materials\n2. Define lighting conditions for the scene\n3. Include surrounding environment details",
      zh: "1. 指定建筑物类型和材料\n2. 定义场景的光照条件\n3. 包括周围环境的细节"
    }
  },
  {
    id: "product-photography",
    title: {
      en: "Product Photography",
      zh: "产品摄影"
    },
    description: {
      en: "Create professional-grade product photos with AI",
      zh: "使用AI创建专业级的产品照片"
    },
    excerpt: {
      en: "Learn how to use AI prompts to generate high-quality product photos, perfect for e-commerce and marketing materials.",
      zh: "学习如何使用AI提示词来生成高质量的产品照片，非常适合电子商务和营销材料。"
    },
    content: {
      en: "This tutorial guides you in creating AI prompts for product photography. Focus on details like the product's features, background, lighting, and camera angle to achieve professional-grade results.",
      zh: "本教程指导您创建产品摄影的AI提示词。关注产品特征、背景、光照和相机角度等细节，以获得专业级效果。"
    },
    prompt: "close-up of a watch, white background, studio lighting, high resolution, focus on details",
    promptEn: "close-up of a watch, white background, studio lighting, high resolution, focus on details",
    promptZh: "手表的特写，白色背景，工作室照明，高分辨率，注重细节",
    tags: ["产品", "摄影", "电商", "营销"],
    source: "https://example.com/product-photography",
    sourceText: "example.com",
    authorName: "AI Marketing",
    authorUrl: "https://example.com",
    imageUrl: "public/lovable-uploads/69a9f719-7449-4919-b945-a956989c8619.png",
    requiresReferenceImage: false,
    keyPoints: {
      en: "1. Focus on the product's features\n2. Use appropriate background and lighting\n3. Specify camera angle and resolution",
      zh: "1. 关注产品的特征\n2. 使用适当的背景和光照\n3. 指定相机角度和分辨率"
    }
  },
  {
    id: "ghibli-style-transformation",
    title: {
      en: "Ghibli Studio Style Transformation",
      zh: "吉卜力风格转换"
    },
    description: {
      en: "Transform any photo into a charming Ghibli-style illustration",
      zh: "使用简单的提示词将照片转换成吉卜力工作室风格的插画"
    },
    excerpt: {
      en: "Create a magical transformation of your photo into the enchanting art style of Studio Ghibli, reminiscent of classic films like 'Spirited Away' and 'My Neighbor Totoro'.",
      zh: "将您的照片转换成充满魔法的吉卜力工作室风格，重现《千与千寻》和《龙猫》等经典电影的手绘美学风格。"
    },
    content: {
      en: "This prompt transforms your photo into a stunning Ghibli-style illustration, capturing the magical and nostalgic essence of Studio Ghibli's iconic animation style.\n\nThe transformation emphasizes soft, watercolor-like textures, delicate line work, and a dreamy color palette that is characteristic of Hayao Miyazaki's renowned animation studio.\n\nTo use this prompt effectively, upload a clear photo. The AI will reinterpret your image through the lens of Ghibli's unique artistic style, maintaining the core elements of your original image while infusing it with a whimsical, hand-drawn quality.\n\nThis prompt is perfect for creating unique artistic renditions, personalized artwork, or simply experiencing your photo through the magical world of Ghibli animation.",
      zh: "这个提示词将您的照片转换成令人惊叹的吉卜力风格插画，捕捉吉卜力工作室标志性动画风格的魔幻和怀旧本质。\n\n转换强调柔和的、水彩般的纹理，精细的线条和梦幻的色彩调色板，这些都是宫崎骏著名动画工作室的特征。\n\n要有效使用这个提示词，请上传一张清晰的照片。AI将通过吉卜力独特的艺术风格重新诠释您的图像，同时保持原始图像的核心元素，并赋予其异想天开的手绘品质。\n\n这个提示词非常适合创建独特的艺术作品、个性化艺术品，或者简单地体验通过吉卜力动画世界呈现的照片。"
    },
    prompt: "以吉卜力风格重绘这张照片。如果背景里有不合适（敏感）的内容，可以进行修改或删除。",
    promptEn: "Redraw this photo in Ghibli style. If there are inappropriate (sensitive) contents in the background, they can be modified or deleted.",
    promptZh: "以吉卜力风格重绘这张照片。如果背景里有不合适（敏感）的内容，可以进行修改或删除。",
    tags: ["动画", "吉卜力", "宫骏", "手绘", "风格转换"],
    source: "https://animeai.online/#demo-gallery",
    sourceText: "AnimeAI",
    authorName: "AnimeAI",
    authorUrl: "https://animeai.online",
    imageUrl: "public/lovable-uploads/d1b5f413-7b77-4f2a-aa75-9485deb632f3.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear, high-quality photo\n2. The image will be transformed into a Ghibli-style illustration\n3. Works best with photos that have good lighting and clear subjects\n4. The AI can modify inappropriate backgrounds if needed",
      zh: "1. 上传一张清晰、高质量的照片\n2. 图像将被转换为吉卜力风格的插画\n3. 对光线好、主体清晰的照片效果最佳\n4. AI可以在需要时修改不适当的背景"
    }
  }
];
