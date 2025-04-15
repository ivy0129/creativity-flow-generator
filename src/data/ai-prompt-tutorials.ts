
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
    id: "chinese-wedding-style",
    title: {
      en: "Q-Version Chinese Wedding Style",
      zh: "Q版中式婚礼图"
    },
    description: {
      en: "Transform a couple's photo into Q-version 3D characters with traditional Chinese wedding attire and background",
      zh: "将情侣照片转换为Q版3D人物，穿着传统中式婚礼服装，配上喜庆背景"
    },
    excerpt: {
      en: "Create an elegant Q-version 3D Chinese wedding scene featuring characters in traditional red attire with golden embroidery against a backdrop of auspicious 'Double Happiness' paper-cut patterns.",
      zh: "创建一个优雅的Q版3D中式婚礼场景，人物穿着传统红色服装并饰有金色刺绣，背景为喜庆的'囍'字剪纸图案。"
    },
    content: {
      en: "This prompt transforms a couple's photo into charming Q-version 3D characters dressed in traditional Chinese wedding attire, set against a backdrop of auspicious 'Double Happiness' paper-cut patterns.\n\nThe male character is depicted wearing a red long gown (changpao) and formal outer jacket (magua) embroidered with golden dragon patterns, symbolizing nobility and prosperity. He sports a traditional red scholar's hat (zhuangyuan hat) adorned with golden patterns and an ornate gold embellishment on top, representing wisdom and honor. A large red flower is pinned to his chest, symbolizing joy and celebration.\n\nThe female character is dressed in an exquisite red xiuhe outfit (traditional Chinese bridal attire), embellished with intricate golden patterns and phoenix embroidery, representing grace and elegance. Her headdress features a phoenix crown adorned with red flowers, golden three-dimensional decorations, and hanging tassels, embodying beauty and nobility in classical Chinese aesthetics.\n\nThe background showcases the Chinese character for 'Double Happiness' (囍) in a traditional paper-cut style, creating a festive atmosphere that's essential for Chinese wedding celebrations.\n\nTo use this prompt effectively, upload a clear photo of a couple. The AI will transform them into Q-version 3D characters while maintaining their recognizable features, dressing them in traditional Chinese wedding attire against a festive backdrop.\n\nThis prompt is perfect for creating unique wedding announcements, anniversary gifts, or cultural celebration art that honors traditional Chinese wedding customs.",
      zh: "这个提示词将情侣照片转换为穿着传统中式婚礼服装的Q版3D人物角色，背景是喜庆的'囍'字剪纸图案。\n\n男性角色身着红色长袍马褂，上面饰有金色龙纹刺绣，象征尊贵和繁荣。他戴着传统的红色状元帽，帽子上饰有金色图案和顶部精致的金色装饰，代表智慧和荣誉。胸前别着一朵大红花，寓意喜庆和庆祝。\n\n女性角色穿着精美的红色秀禾服（传统中式新娘礼服），上面装饰有复杂的金色图案和凤凰刺绣，展现优雅和典雅。她的头饰是一顶凤冠，上面点缀着红色花朵、金色立体装饰和垂坠流苏，体现了中国古典美学中的美丽和高贵。\n\n背景展示了传统剪纸风格的中国'囍'字，营造出中式婚礼庆典不可或缺的喜庆氛围。\n\n要有效使用这个提示词，请上传一张清晰的情侣照片。AI将把他们转换为Q版3D角色，同时保持他们的可识别特征，为他们穿上传统中式婚礼服装，配以喜庆背景。\n\n这个提示词非常适合创建独特的婚礼通知、周年纪念礼物或尊重传统中式婚礼习俗的文化庆祝艺术品。"
    },
    prompt: "将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景\"囍\"字剪纸风格图案。 服饰要求：写实，男士身着长袍马褂，主体为红色，上面以金色绣龙纹图案，彰显尊贵大气 ，胸前系着大红花，寓意喜庆吉祥。女士所穿是秀禾服，同样以红色为基调，饰有精美的金色花纹与凤凰刺绣，展现出典雅华丽之感 ，头上搭配花朵发饰，增添柔美温婉气质。二者皆为中式婚礼中经典着装，蕴含着对新人婚姻美满的祝福。 头饰要求： 男士：中式状元帽，主体红色，饰有金色纹样，帽顶有精致金饰，尽显传统儒雅庄重。 女士：凤冠造型，以红色花朵为中心，搭配金色立体装饰与垂坠流苏，华丽富贵，古典韵味十足。",
    promptEn: "Transform the two people in the photo into Q-version 3D characters, in a traditional Chinese wedding style with bright red colors and a background of 'Double Happiness' character in paper-cut style. Attire requirements: realistic, the man wearing a long gown (changpao) and formal outer jacket (magua), primarily red with golden dragon embroidery patterns showcasing nobility, with a large red flower on his chest symbolizing celebration. The woman wearing a xiuhe outfit (traditional Chinese bridal dress), also in red with exquisite golden patterns and phoenix embroidery, displaying elegant splendor, with floral headpieces adding gentle feminine charm. Both are classic attire in Chinese weddings, containing blessings for the couple's happy marriage. Headwear requirements: Man: traditional scholar's hat (zhuangyuan hat), primarily red with golden patterns and an ornate gold embellishment on top, displaying traditional scholarly dignity. Woman: phoenix crown style, centered with red flowers, complemented by golden three-dimensional decorations and hanging tassels, luxurious and rich in classical charm.",
    promptZh: "将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景\"囍\"字剪纸风格图案。 服饰要求：写实，男士身着长袍马褂，主体为红色，上面以金色绣龙纹图案，彰显尊贵大气 ，胸前系着大红花，寓意喜庆吉祥。女士所穿是秀禾服，同样以红色为基调，饰有精美的金色花纹与凤凰刺绣，展现出典雅华丽之感 ，头上搭配花朵发饰，增添柔美温婉气质。二者皆为中式婚礼中经典着装，蕴含着对新人婚姻美满的祝福。 头饰要求： 男士：中式状元帽，主体红色，饰有金色纹样，帽顶有精致金饰，尽显传统儒雅庄重。 女士：凤冠造型，以红色花朵为中心，搭配金色立体装饰与垂坠流苏，华丽富贵，古典韵味十足。",
    tags: ["Q版", "3D", "中式婚礼", "情侣", "传统服装"],
    source: "https://x.com/balconychy/status/1909418699150237917",
    sourceText: "@balconychy on X",
    authorName: "@balconychy",
    authorUrl: "https://x.com/balconychy",
    imageUrl: "public/lovable-uploads/385d92f3-850a-42b8-b24a-10a83ddcc76b.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear couple's photo\n2. Characters will be rendered in Q-version 3D style with traditional Chinese wedding attire\n3. The prompt creates a festive atmosphere with traditional Chinese wedding elements\n4. Photos with both faces clearly visible work best for this transformation",
      zh: "1. 上传一张清晰的情侣照片\n2. 角色将以Q版3D风格呈现，穿着传统中式婚礼服装\n3. 提示词会创建带有传统中式婚礼元素的喜庆氛围\n4. 两个人脸部清晰可见的照片最适合这种转换"
    }
  },
  {
    id: "3d-polaroid-frame",
    title: {
      en: "3D Character in Polaroid Frame",
      zh: "立体相框"
    },
    description: {
      en: "Transform a person into a 3D Q-version character stepping out of a Polaroid photo",
      zh: "将人物转换成从拍立得照片中走出的3D Q版角色"
    },
    excerpt: {
      en: "Create a visually stunning effect of a 3D Q-version character stepping out of a Polaroid photo held by a hand, blending 2D and 3D elements for a magical dimensional breakthrough.",
      zh: "创建一个视觉震撼效果，将角色转化为从拍立得照片中走出的3D Q版人物，照片被一只手拿着，呈现出突破二维相片边框的立体效果。"
    },
    content: {
      en: "This prompt creates a unique and visually captivating dimensional effect where your subject is transformed into a 3D Q-version character that appears to be stepping out of a Polaroid photo.\n\nThe character is rendered in a cute, cartoon-like 3D style with exaggerated features while maintaining recognizable characteristics of the original subject. The Polaroid frame provides a perfect contrast between the 2D medium and the 3D character that's breaking through its boundaries.\n\nA hand holding the Polaroid photo adds a sense of scale and reality to the composition, enhancing the illusion of the character crossing dimensions from the flat photo into the real world.\n\nTo use this prompt effectively, upload a clear photo of a person, preferably a half-body or full-body shot. The AI will transform the subject into a 3D Q-version character while creating the dimensional breakthrough effect with the Polaroid frame.\n\nThis prompt is perfect for creating unique profile pictures, social media posts, or fun digital art pieces that play with the concept of dimensions.",
      zh: "这个提示词创建了一个独特且视觉上引人注目的立体效果，将您的主体转变为一个3D Q版角色，看起来正从拍立得照片中走出来。\n\n角色以可爱的卡通风格3D渲染，具有夸张的特征，同时保持原始主体的可识别特点。拍立得相框在二维媒介和突破边界的3D角色之间提供了完美的对比。\n\n一只手拿着拍立得照片，为构图增添了比例感和现实感，增强了角色从平面照片跨越维度进入现实世界的错觉。\n\n要有效地使用这个提示词，请上传一张清晰的人物照片，最好是半身或全身照。AI将把主体转变为3D Q版角色，同时创建带有拍立得相框的维度突破效果。\n\n这个提示词非常适合创建独特的头像、社交媒体帖子或有趣的数字艺术作品，玩转维度概念。"
    },
    prompt: "将场景中的角色转化为3D Q版风格，放在一张拍立得照片上，相纸被一只手拿着，照片中的角色正从拍立得照片中走出，呈现出突破二维相片边框、进入二维现实空间的视觉效果。",
    promptEn: "Transform the character in the scene into a 3D Q-version style, place them on a Polaroid photo being held by a hand, with the character stepping out of the photo, creating a visual effect of breaking through the 2D photo frame and entering the real world.",
    promptZh: "将场景中的角色转化为3D Q版风格，放在一张拍立得照片上，相纸被一只手拿着，照片中的角色正从拍立得照片中走出，呈现出突破二维相片边框、进入二维现实空间的视觉效果。",
    tags: ["Q版", "3D", "拍立得", "立体效果", "照片"],
    source: "https://x.com/dotey/status/1908238003169903060",
    sourceText: "@dotey on X",
    authorName: "@dotey",
    authorUrl: "https://x.com/dotey",
    imageUrl: "public/lovable-uploads/f7bdb0b4-f88f-4e3e-ba9f-046cc0575c52.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear half-body or full-body person photo\n2. The character will be rendered in 3D Q-version style while maintaining recognizable features\n3. The effect works best with photos that have good lighting and a clear subject\n4. Photos with simple backgrounds work better for this transformation",
      zh: "1. 上传一张清晰的半身或全身人物照片\n2. 角色将以3D Q版风格呈现，同时保持可识别的特征\n3. 此效果在光线良好且主体清晰的照片上效果最佳\n4. 背景简单的照片更适合此类转换"
    }
  },
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
