
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
  promptEn?: string; // Optional English prompt
  promptZh?: string; // Optional Chinese prompt
  tags: string[];
  source?: string;
  sourceText?: string;
  authorName?: string;
  authorUrl?: string;
  imageUrl?: string;
  sampleImages?: string[];
  requiresReferenceImage?: boolean;
  keyPoints?: {
    en: string;
    zh: string;
  };
}

export const aiPromptTutorials: AIPromptTutorial[] = [
  {
    id: "q-version-proposal-scene",
    title: {
      en: "Q-Version Proposal Scene",
      zh: "Q版求婚场景"
    },
    description: {
      en: "Transform a couple's photo into a Q-version 3D proposal scene with romantic elements",
      zh: "将情侣照片转换成浪漫的Q版3D求婚场景"
    },
    excerpt: {
      en: "Create a charming Q-version 3D proposal scene with characters from your photo, featuring a romantic arch made of colorful petals and rose petals scattered on the ground.",
      zh: "创建一个迷人的Q版3D求婚场景，角色来自您的照片，特色是由彩色花瓣制成的浪漫拱门，地上散落着玫瑰花瓣。"
    },
    content: {
      en: "This prompt creates a romantic Q-version 3D proposal scene from a couple's photo. The characters are rendered in a cute, chibi 3D style while the environment is realistic.\n\nThe scene features a beautiful arch made of colorful petals in delicate hues, creating a romantic backdrop for the proposal. Rose petals are scattered on the ground, enhancing the romantic atmosphere.\n\nTo use this prompt effectively, upload a clear photo of a couple. The AI will transform them into Q-version 3D characters while maintaining their recognizable features. The background will shift to a romantic setting with a petal arch and rose petals on the ground.\n\nThis prompt is perfect for creating unique engagement announcements, anniversary gifts, or romantic keepsakes.",
      zh: "这个提示词创建了一个从情侣照片生成的浪漫Q版3D求婚场景。角色以可爱的Q版3D风格呈现，而环境则保持真实写实风格。\n\n场景特色是由彩色花瓣制成的美丽拱门，色调淡雅，为求婚场景创造了浪漫的背景。地面上散落着玫瑰花瓣，增强了浪漫的氛围。\n\n要有效地使用这个提示词，请上传一张清晰的情侣照片。AI将把他们转换为Q版3D角色，同时保持他们可辨识的特征。背景将变成一个浪漫的场景，有花瓣拱门和地面上的玫瑰花瓣。\n\n这个提示词非常适合创建独特的订婚通知、周年纪念礼物或浪漫纪念品。"
    },
    prompt: "将照片里的两个人转换成Q版 3D人物，场景换成求婚，背景换成淡雅五彩花瓣做的拱门，背景换成浪漫颜色，地上散落着玫瑰花瓣。除了人物采用Q版 3D人物风格，其他环境采用真实写实风格。",
    promptEn: "Transform the two people in the photo into Q-version 3D characters, change the scene to a proposal, replace the background with an elegant colorful petal arch, change the background to romantic colors, and scatter rose petals on the ground. Apart from the characters being in Q-version 3D style, the environment uses realistic style.",
    promptZh: "将照片里的两个人转换成Q版 3D人物，场景换成求婚，背景换成淡雅五彩花瓣做的拱门，背景换成浪漫颜色，地上散落着玫瑰花瓣。除了人物采用Q版 3D人物风格，其他环境采用真实写实风格。",
    tags: ["Q版", "3D", "求婚场景", "情侣", "浪漫"],
    source: "https://x.com/balconychy/status/1909417750587486469",
    sourceText: "@balconychy on X",
    authorName: "@balconychy",
    authorUrl: "https://x.com/balconychy",
    imageUrl: "public/lovable-uploads/87a1132a-1e06-4ddd-be0e-933b88f6fc05.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear couple's photo\n2. The characters will be rendered in Q-version 3D style while the environment remains realistic\n3. The prompt works best with photos showing both faces clearly\n4. For best results, use a photo with good lighting and clear faces",
      zh: "1. 上传一张清晰的情侣照片\n2. 角色将以Q版3D风格呈现，而环境保持真实写实风格\n3. 使用能清晰显示两个人脸部的照片效果最佳\n4. 为获得最佳效果，请使用光线良好且面部清晰的照片"
    }
  }
];
