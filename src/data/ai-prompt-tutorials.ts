
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
    tags: ["Q版", "3D", "求婚场景", "情侣", "浪漫"],
    source: "https://x.com/balconychy/status/1909417750587486469",
    sourceText: "@balconychy on X",
    authorName: "@balconychy",
    authorUrl: "https://x.com/balconychy",
    imageUrl: "public/lovable-uploads/example_proposal_scene_q_realistic.jpeg",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear couple's photo\n2. The characters will be rendered in Q-version 3D style while the environment remains realistic\n3. The prompt works best with photos showing both faces clearly\n4. For best results, use a photo with good lighting and clear faces",
      zh: "1. 上传一张清晰的情侣照片\n2. 角色将以Q版3D风格呈现，而环境保持真实写实风格\n3. 使用能清晰显示两个人脸部的照片效果最佳\n4. 为获得最佳效果，请使用光线良好且面部清晰的照片"
    }
  },
  {
    id: "polaroid-breakout",
    title: {
      en: "3D Character Breaking Out of Polaroid",
      zh: "3D角色从拍立得照片中走出"
    },
    description: {
      en: "Transform a person into a 3D Q-version character breaking out of a Polaroid photo",
      zh: "将一个人转变为从拍立得照片中走出的3D Q版角色"
    },
    excerpt: {
      en: "Create a dynamic scene where your photo is transformed into a 3D Q-version character breaking through the borders of a Polaroid photo held in someone's hand.",
      zh: "创建一个动态场景，您的照片被转换成一个3D Q版角色，正从有人手持的拍立得照片边框中走出。"
    },
    content: {
      en: "This creative prompt transforms a person from a photo into a cute 3D Q-version character that appears to be breaking out of a Polaroid photograph. The character is depicted mid-action, crossing the boundary between the 2D photo and the 3D world.\n\nThe scene shows a hand holding a Polaroid photo, with the transformed character stepping out or breaking through the borders of the photo, creating a striking visual effect that plays with dimensionality.\n\nTo use this prompt effectively, upload a clear full-body or half-body photo of a person. The AI will transform them into a Q-version 3D character while maintaining their key characteristics like clothing style, hair color, and general appearance.\n\nThis prompt is perfect for creating unique profile pictures, social media posts, or creative digital art that plays with the concept of breaking the fourth wall between different dimensions.",
      zh: "这个创意提示词将照片中的人物转变为一个可爱的3D Q版角色，该角色看起来正在从拍立得照片中走出来。角色被描绘成正在行动中，跨越2D照片和3D世界之间的界限。\n\n场景展示了一只手拿着拍立得照片，转换后的角色正在走出或突破照片的边框，创造出一种引人注目的视觉效果，巧妙地玩弄了维度感。\n\n要有效地使用这个提示词，请上传一张清晰的人物全身或半身照片。AI会将其转换为Q版3D角色，同时保持他们的关键特征，如服装风格、发色和整体外观。\n\n这个提示词非常适合创建独特的个人资料图片、社交媒体帖子或创意数字艺术，巧妙地表现了不同维度之间的第四面墙被打破的概念。"
    },
    prompt: "将场景中的角色转化为3D Q版风格，放在一张拍立得照片上，相纸被一只手拿着，照片中的角色正从拍立得照片中走出，呈现出突破二维相片边框、进入二维现实空间的视觉效果。",
    tags: ["3D", "Q版", "拍立得", "创意", "角色"],
    source: "https://x.com/dotey/status/1908238003169903060",
    sourceText: "@dotey on X",
    authorName: "@dotey",
    authorUrl: "https://x.com/dotey",
    imageUrl: "public/lovable-uploads/example_polaroid_breakout.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear half-body or full-body photo\n2. The character will maintain key features from the original photo\n3. Works best with photos that have good lighting and clear subject separation\n4. For best visual effect, choose photos with dynamic poses that suggest movement",
      zh: "1. 上传一张清晰的半身或全身照片\n2. 角色将保留原始照片中的关键特征\n3. 使用光线良好且主体分离清晰的照片效果最佳\n4. 为获得最佳视觉效果，选择有动态姿势暗示动作的照片"
    }
  },
  {
    id: "vintage-chinese-ad-poster",
    title: {
      en: "Vintage Chinese Promotional Poster",
      zh: "复古中文宣传海报"
    },
    description: {
      en: "Create a vintage-style promotional poster with Chinese text and retro visual elements",
      zh: "创建带有中文文字和复古视觉元素的复古风格宣传海报"
    },
    excerpt: {
      en: "Generate a visually striking vintage promotional poster featuring Chinese text, red and yellow radial background patterns, and a beautifully illustrated young woman in retro style.",
      zh: "生成一张视觉冲击力强的复古宣传海报，特色是中文文字、红黄放射状背景图案和一位以复古风格精致绘制的年轻女性。"
    },
    content: {
      en: "This prompt creates a visually striking vintage-style promotional poster with strong Chinese aesthetics. The design features a central female figure illustrated in a detailed retro style, exuding elegance and approachability with a gentle smile.\n\nThe background uses classic red and yellow radial patterns typical of vintage Chinese promotional materials. Chinese text is prominently featured throughout the poster, with special emphasis on the advertised offer: \"Shock price 9.9/image\" for GPT's latest AI painting service.\n\nThe poster includes additional marketing points about the service's versatility, image fusion capabilities, local retouching options, ability to submit three revisions per image, and the direct AI output that requires no modifications.\n\nCalls-to-action are strategically placed, with a prominent note at the bottom saying \"If interested, click 'I want this' in the bottom right,\" accompanied by an illustrated finger pointing to a button. The OpenAI logo is displayed in the bottom left corner for brand recognition.\n\nThis design effectively combines nostalgic visual elements with modern marketing techniques to create a compelling promotional poster.",
      zh: "这个提示词创建了一个具有强烈中国美学的视觉冲击力强的复古风格宣传海报。设计以中央女性人物为特色，以详细的复古风格绘制，通过温柔的微笑展现优雅和亲和力。\n\n背景使用了典型的复古中国宣传材料中常见的经典红黄放射状图案。海报中突出显示中文文字，特别强调所宣传的优惠：GPT最新AI绘画服务的\"惊爆价9.9/张\"。\n\n海报包含关于服务的额外营销点，如多功能性、图像融合能力、局部修饰选项、每张图像可提交三次修改的能力，以及无需修改的直接AI输出。\n\n行动呼吁策略性地放置在海报上，底部显著标注\"有意向点右下\"我想要\"，配有指向按钮的手指插图。左下角显示OpenAI标志以增强品牌识别度。\n\n这种设计有效地将怀旧的视觉元素与现代营销技术相结合，创造了一个引人注目的宣传海报。"
    },
    prompt: "复古宣传海报风格，突出中文文字，背景为红黄放射状图案。画面中心位置有一位美丽的年轻女性，以精致复古风格绘制，面带微笑，气质优雅，具有亲和力。主题是GPT最新AI绘画服务的广告促销，强调'惊爆价9.9/张'、'适用各种场景、图像融合、局部重绘'、'每张提交3次修改'、'AI直出效果，无需修改'，底部醒目标注'有意向点右下\"我想要\"'，右下角绘制一个手指点击按钮动作，左下角展示OpenAI标志。",
    tags: ["海报", "复古", "中文", "广告", "设计"],
    source: "https://x.com/dotey/status/1905251524248248650", 
    sourceText: "@dotey on X",
    authorName: "@dotey",
    authorUrl: "https://x.com/dotey",
    imageUrl: "public/lovable-uploads/example_vintage_poster.jpeg",
    keyPoints: {
      en: "1. The poster combines traditional Chinese design elements with modern marketing messaging\n2. Text elements should be in Chinese characters for best results\n3. The vintage style is enhanced by the radial background pattern in red and yellow\n4. The central figure is key to capturing attention - she should appear elegant and approachable",
      zh: "1. 海报结合了传统中国设计元素和现代营销信息\n2. 文本元素应使用中文字符以获得最佳效果\n3. 复古风格通过红黄放射状背景图案得到增强\n4. 中央人物是吸引注意力的关键 - 她应该看起来优雅且平易近人"
    }
  },
  {
    id: "q-chinese-wedding",
    title: {
      en: "Q-Version Traditional Chinese Wedding",
      zh: "Q版中式婚礼图"
    },
    description: {
      en: "Transform a couple's photo into a Q-version 3D traditional Chinese wedding scene",
      zh: "将情侣照片转换为Q版3D传统中式婚礼场景"
    },
    excerpt: {
      en: "Create a festive Q-version 3D Chinese traditional wedding scene featuring characters from your photo wearing detailed traditional wedding attire with rich symbolic elements.",
      zh: "创建一个喜庆的Q版3D中国传统婚礼场景，照片中的角色身着详细的传统婚礼服饰，富含象征意义的元素。"
    },
    content: {
      en: "This prompt transforms a couple's photo into a charming Q-version 3D Chinese traditional wedding scene. The characters are rendered in an adorable chibi 3D style while wearing elaborately detailed traditional Chinese wedding attire.\n\nThe groom is dressed in a red changpao (长袍) and magua (马褂) adorned with golden dragon embroidery patterns symbolizing nobility and elegance. He wears a traditional red flower on his chest representing joy and celebration, and is topped with a traditional scholar's hat (状元帽) in red with gold decorative elements.\n\nThe bride wears a stunning xiuhe (秀禾服) in predominant red with intricate gold phoenix embroidery patterns. Her headdress is an elaborate fengguan (凤冠) style with red floral centerpieces, gold three-dimensional decorations, and hanging tassels that embody classical Chinese beauty.\n\nThe background features the traditional Chinese double-happiness character \"囍\" in paper-cutting style, creating a perfect festive backdrop for this celebration of love. The overall scene captures the rich cultural traditions of a Chinese wedding while presenting the couple in an endearing Q-version style.\n\nTo use this prompt effectively, upload a clear photo of a couple. The AI will transform them into Q-version 3D characters while maintaining their recognizable features and placing them in this culturally rich wedding setting.",
      zh: "这个提示词将情侣照片转换为迷人的Q版3D中国传统婚礼场景。角色以可爱的Q版3D风格呈现，同时身着精细详尽的中国传统婚礼服饰。\n\n新郎身着红色长袍马褂，上面绣有金色龙纹图案，象征高贵与优雅。他胸前佩戴传统的大红花，代表喜庆与庆祝，头戴传统的红色状元帽，帽上有金色装饰元素。\n\n新娘穿着以红色为主的秀禾服，有着精细的金色凤凰刺绣图案。她的头饰是精致的凤冠造型，中央有红色花朵，配以金色立体装饰和垂坠流苏，体现了中国古典美。\n\n背景是传统中国剪纸风格的双喜字\"囍\"，为这场爱的庆典创造了完美的喜庆背景。整个场景捕捉了中国婚礼的丰富文化传统，同时以可爱的Q版风格呈现情侣。\n\n要有效地使用这个提示词，请上传一张清晰的情侣照片。AI将把他们转换为Q版3D角色，同时保持他们可辨识的特征，并将他们置于这个文化丰富的婚礼场景中。"
    },
    prompt: "将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景\"囍\"字剪纸风格图案。 服饰要求：写实，男士身着长袍马褂，主体为红色，上面以金色绣龙纹图案，彰显尊贵大气 ，胸前系着大红花，寓意喜庆吉祥。女士所穿是秀禾服，同样以红色为基调，饰有精美的金色花纹与凤凰刺绣，展现出典雅华丽之感 ，头上搭配花朵发饰，增添柔美温婉气质。二者皆为中式婚礼中经典着装，蕴含着对新人婚姻美满的祝福。 头饰要求： 男士：中式状元帽，主体红色，饰有金色纹样，帽顶有精致金饰，尽显传统儒雅庄重。 女士：凤冠造型，以红色花朵为中心，搭配金色立体装饰与垂坠流苏，华丽富贵，古典韵味十足。",
    tags: ["Q版", "3D", "中式婚礼", "情侣", "传统文化"],
    source: "https://x.com/balconychy/status/1909418699150237917",
    sourceText: "@balconychy on X",
    authorName: "@balconychy",
    authorUrl: "https://x.com/balconychy",
    imageUrl: "public/lovable-uploads/example_q_chinese_wedding.jpeg",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear couple's photo\n2. The characters will be rendered in Q-version 3D style with detailed traditional Chinese wedding attire\n3. The prompt works best with photos showing both faces clearly\n4. The cultural elements (dragon for groom, phoenix for bride) are important symbolic aspects of traditional Chinese weddings",
      zh: "1. 上传一张清晰的情侣照片\n2. 角色将以Q版3D风格呈现，身着详细的中国传统婚礼服饰\n3. 使用能清晰显示两个人脸部的照片效果最佳\n4. 文化元素（新郎的龙纹、新娘的凤凰）是中国传统婚礼的重要象征元素"
    }
  },
  {
    id: "ghibli-style",
    title: {
      en: "Studio Ghibli Style Transformation",
      zh: "吉卜力风格转换"
    },
    description: {
      en: "Transform any photo into the distinctive artistic style of Studio Ghibli animations",
      zh: "将任何照片转换为吉卜力工作室动画的独特艺术风格"
    },
    excerpt: {
      en: "Transform your photos into the charming, whimsical style of Studio Ghibli animations with this simple yet effective prompt that captures the essence of Miyazaki's distinctive artistic vision.",
      zh: "使用这个简单而有效的提示词，将您的照片转换为吉卜力工作室动画的迷人、奇幻风格，捕捉宫崎骏独特艺术视觉的精髓。"
    },
    content: {
      en: "This remarkably simple prompt transforms any photo into the distinctive artistic style of Studio Ghibli animations. Despite its brevity, the prompt is highly effective at capturing the signature elements of the famed Japanese animation studio's visual aesthetic.\n\nThe Ghibli style is characterized by soft, painterly backgrounds, vibrant but natural color palettes, expressive character features, and a sense of wonder and whimsy that permeates even ordinary scenes. The AI recognizes these stylistic elements and applies them to your input image, whether it's a portrait, landscape, or any other subject.\n\nThe transformation maintains the core elements and composition of your original photo while rendering it as if it were a frame from a Studio Ghibli film like \"Spirited Away,\" \"My Neighbor Totoro,\" or \"Howl's Moving Castle.\" The result often has a hand-painted quality with the characteristic Ghibli attention to natural details and emotional resonance.\n\nTo use this prompt effectively, you can upload any clear photo - people, landscapes, cities, or objects all work well. The simplicity of the prompt allows the AI to focus solely on applying the distinctive Ghibli aesthetic to your image.\n\nIf your photo contains potentially sensitive content, you can add the suggested disclaimer to ensure appropriate modifications are made during the transformation process.",
      zh: "这个非常简单的提示词可以将任何照片转换为吉卜力工作室动画的独特艺术风格。尽管简短，但这个提示词非常有效地捕捉了这家著名日本动画工作室视觉美学的标志性元素。\n\n吉卜力风格的特点是柔和的绘画背景、鲜艳但自然的色彩搭配、富有表现力的角色特征，以及一种即使在普通场景中也充满的奇妙感和异想天开。AI能识别这些风格元素并应用到您的输入图像上，无论是肖像、风景还是任何其他主题。\n\n转换过程保留了原始照片的核心元素和构图，同时将其渲染得像是来自《千与千寻》、《龙猫》或《哈尔的移动城堡》等吉卜力电影的一帧。结果通常具有手绘质感，带有吉卜力特有的对自然细节和情感共鸣的关注。\n\n要有效地使用这个提示词，您可以上传任何清晰的照片 - 人物、风景、城市或物体都能很好地工作。提示词的简单性使AI能够专注于将独特的吉卜力美学应用到您的图像上。\n\n如果您的照片包含潜在的敏感内容，您可以添加建议的免责声明，以确保在转换过程中进行适当的修改。"
    },
    prompt: "以吉卜力风格重绘这张照片",
    tags: ["吉卜力", "动画", "风格转换", "艺术", "宫崎骏"],
    source: "https://animeai.online/#demo-gallery",
    sourceText: "AnimeAI Gallery",
    authorName: "AnimeAI",
    authorUrl: "https://animeai.online",
    imageUrl: "https://animeai.online/demo/ghibli-style-mona-lisa.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. This prompt works with virtually any clear photo\n2. The transformation maintains the core composition while applying Ghibli's distinctive artistic style\n3. For best results, choose images with good lighting and clear subjects\n4. If your photo contains potentially sensitive content, add: 'If there is any inappropriate (sensitive) content in the background, please modify or remove it.'",
      zh: "1. 这个提示词几乎适用于任何清晰的照片\n2. 转换过程保留了核心构图，同时应用吉卜力独特的艺术风格\n3. 为获得最佳效果，选择光线良好且主体清晰的图像\n4. 如果您的照片包含潜在的敏感内容，请添加：\"如果背景里有不合适（敏感）的内容，可以进行修改或删除。\""
    }
  },
  {
    id: "portal-crossing",
    title: {
      en: "Character Crossing Portal Holding Hand",
      zh: "角色穿越传送门牵手"
    },
    description: {
      en: "Transform a person into a 3D Q-version character crossing through a portal while holding the viewer's hand",
      zh: "将一个人转变为穿越传送门同时牵着观众手的3D Q版角色"
    },
    excerpt: {
      en: "Create an immersive scene where your photo becomes a 3D Q-version character crossing through a magical portal between worlds, reaching back to hold the viewer's hand in a dynamic third-person perspective.",
      zh: "创建一个身临其境的场景，您的照片变成一个3D Q版角色，穿越世界之间的魔法传送门，伸手回头牵着观众的手，以动态第三人称视角呈现。"
    },
    content: {
      en: "This creative prompt transforms a person from a photo into a cute 3D Q-version character engaging in a dynamic cross-dimensional scene. The character is captured mid-action, crossing through a magical portal while reaching back to hold the viewer's hand.\n\nThe scene is set up with two distinct worlds separated by an oval-shaped portal with mystical blue and purple energy. Outside the portal is the viewer's world, depicted as a typical programmer's study with a desk, monitors, and laptop. Inside the portal is the character's 3D Q-version world, which takes on a predominantly blue tone that contrasts sharply with the reality outside.\n\nThe perspective is third-person, showing both the character and the viewer's hand being pulled toward the fantasy world. This creates an immersive, interactive feeling as if the viewer is being invited to join the adventure.\n\nTo use this prompt effectively, upload a clear full-body or half-body photo of a person. The AI will transform them into a Q-version 3D character while maintaining their key characteristics like clothing style, hair color, and general appearance.\n\nThis prompt is perfect for creating unique, engaging digital art that breaks the fourth wall and creates a sense of connection between the character and the viewer.",
      zh: "这个创意提示词将照片中的人物转变为一个可爱的3D Q版角色，参与一个动态的跨维度场景。角色被捕捉在动作中，穿越魔法传送门的同时回头牵着观众的手。\n\n场景设置有两个由椭圆形传送门分隔的不同世界，传送门散发着神秘的蓝色和紫色能量。传送门外是观众的世界，描绘为典型的程序员书房，有书桌、显示器和笔记本电脑。传送门内是角色的3D Q版世界，呈现出以蓝色为主的色调，与外面的现实形成鲜明对比。\n\n视角是第三人称，同时显示角色和被拉向奇幻世界的观众的手。这创造了一种身临其境、互动的感觉，仿佛观众被邀请加入冒险。\n\n要有效地使用这个提示词，请上传一张清晰的人物全身或半身照片。AI会将其转换为Q版3D角色，同时保持他们的关键特征，如服装风格、发色和整体外观。\n\n这个提示词非常适合创建独特、引人入胜的数字艺术，打破第四面墙并在角色与观众之间创造连接感。"
    },
    prompt: "照片中的角色的 3D Q 版形象穿过传送门，牵着观众的手，在将观众拉向前时动态地回头一看。传送门外的背景是观众的现实世界，一个典型的程序员的书房，有书桌，显示器和笔记本电脑，传送门内是角色所处的3D Q 版世界，细节可以参考照片，整体呈蓝色调，和现实世界形成鲜明对比。传送门散发着神秘的蓝色和紫色色调，是两个世界之间的完美椭圆形框架处在画面中间。从第三人称视角拍摄的摄像机角度，显示观看者的手被拉入角色世界。3：2 的宽高比。",
    tags: ["3D", "Q版", "传送门", "创意", "互动"],
    source: "https://x.com/dotey/status/1908910838636765204",
    sourceText: "@dotey on X",
    authorName: "@dotey",
    authorUrl: "https://x.com/dotey",
    imageUrl: "public/lovable-uploads/example_portal_crossing_handhold.jpeg",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear half-body or full-body photo\n2. The character will maintain key features from the original photo\n3. The prompt creates a dramatic contrast between the real world (programmer's study) and the character's world (blue-toned fantasy)\n4. The portal effect is enhanced by the mystical blue and purple energy that frames it",
      zh: "1. 上传一张清晰的半身或全身照片\n2. 角色将保留原始照片中的关键特征\n3. 提示词创建了现实世界（程序员的书房）和角色世界（蓝色调幻想）之间的戏剧性对比\n4. 传送门效果通过框住它的神秘蓝色和紫色能量得到增强"
    }
  },
  {
    id: "personalized-room-design",
    title: {
      en: "Personalized Room Design in Cute 3D Style",
      zh: "可爱3D风格的个性化房间设计"
    },
    description: {
      en: "Create a customized room design in cute 3D style with specific furniture and cityscape view",
      zh: "以可爱3D风格创建定制房间设计，包含特定家具和城市景观"
    },
    excerpt: {
      en: "Generate a personalized room design in cute 3D style featuring key furniture elements like a bed, bookshelf, sofa, computer desk, wall art, plants, and a city night view outside the window.",
      zh: "生成可爱3D风格的个性化房间设计，包含关键家具元素如床、书架、沙发、电脑桌、墙上艺术品、绿植，以及窗外的城市夜景。"
    },
    content: {
      en: "This prompt creates a charming personalized room design in a cute 3D style, rendered with Cinema 4D for a polished, visually appealing result. The image is presented as an isometric view, which provides a clear perspective of the entire room layout and its contents.\n\nThe room includes several key furniture elements that create a cozy, lived-in space: a bed for sleeping, bookshelves for storage and display, a comfortable sofa for relaxation, a computer desk with computer setup for work, and decorative paintings hanging on the walls. These elements are complemented by indoor plants that add a touch of nature and freshness to the environment.\n\nA standout feature of this design is the window view, which reveals a city night scene outside, creating a dramatic contrast between the warm interior and the twinkling cityscape beyond. This adds depth and visual interest to the overall composition.\n\nThe cute 3D style gives everything a slightly stylized, playful appearance while maintaining enough realism to feel like a practical, habitable space. The Cinema 4D rendering provides smooth textures, subtle lighting effects, and polished surfaces that enhance the overall aesthetic appeal.\n\nThis prompt is perfect for creating personalized room concepts, interior design visualizations, or charming digital art representing an idealized living space.",
      zh: "这个提示词以可爱的3D风格创建一个迷人的个性化房间设计，通过Cinema 4D渲染，呈现出精致、视觉吸引力强的效果。图像以等轴测视图呈现，提供了整个房间布局及其内容的清晰视角。\n\n房间包含几个关键家具元素，创造了一个舒适、充满生活气息的空间：供睡眠的床、用于储存和展示的书架、供放松的舒适沙发、配有电脑设置的工作桌，以及挂在墙上的装饰画。这些元素与室内植物相互补充，为环境增添了一丝自然和清新。\n\n这个设计的一个突出特点是窗户视图，它展示了外面的城市夜景，在温暖的室内和闪烁的城市景观之间创造了戏剧性的对比。这为整体构图增添了深度和视觉趣味。\n\n可爱的3D风格让一切都有一种稍微程式化、俏皮的外观，同时保持足够的现实感，让人感觉像是一个实用、宜居的空间。Cinema 4D渲染提供了平滑的纹理、微妙的光效和精致的表面，增强了整体美感。\n\n这个提示词非常适合创建个性化房间概念、室内设计可视化或代表理想生活空间的迷人数字艺术。"
    },
    prompt: "为我生成我的房间设计（床、书架、沙发、电脑桌和电脑、墙上挂着绘画、绿植，窗外是城市夜景。可爱 3d 风格，c4d 渲染，轴测图。",
    tags: ["3D", "室内设计", "可爱", "房间", "C4D"],
    source: "https://x.com/ZHO_ZHO_ZHO/status/1910698005193515370",
    sourceText: "@ZHO_ZHO_ZHO on X",
    authorName: "@ZHO_ZHO_ZHO",
    authorUrl: "https://x.com/ZHO_ZHO_ZHO",
    imageUrl: "public/lovable-uploads/example_personalized_room.png",
    keyPoints: {
      en: "1. The isometric (axonometric) view provides a comprehensive look at the entire room\n2. The cute 3D style gives a stylized but still practical appearance to the space\n3. Including specific furniture elements helps create a personalized feel\n4. The contrast between the indoor space and city view through the window adds depth\n5. C4D rendering style provides smooth textures and appealing lighting effects",
      zh: "1. 等轴测（轴测）视图提供了对整个房间的全面观察\n2. 可爱3D风格为空间提供了风格化但仍实用的外观\n3. 包含特定家具元素有助于创造个性化感觉\n4. 室内空间与窗外城市景观之间的对比增添了深度\n5. C4D渲染风格提供平滑纹理和吸引人的光效"
    }
  },
  {
    id: "lego-collectible",
    title: {
      en: "Custom LEGO Minifigure Collectible",
      zh: "定制乐高人偶收藏品"
    },
    description: {
      en: "Create a personalized LEGO minifigure collectible display with a matching animal companion",
      zh: "创建带有匹配动物伙伴的个性化乐高人偶收藏品展示"
    },
    excerpt: {
      en: "Transform your photo into a classic LEGO minifigure displayed in an elegant glass cube alongside a matching animal companion, with scientific classification details and a premium museum-quality presentation.",
      zh: "将您的照片转换为经典乐高人偶，与匹配的动物伙伴一起展示在优雅的玻璃立方体中，配有科学分类详情和高级博物馆品质的呈现方式。"
    },
    content: {
      en: "This sophisticated prompt creates a personalized LEGO minifigure collectible display based on a person's photo. The image shows a classic LEGO minifigure styled after the person's appearance and personality, paired with an animal companion that complements their characteristics.\n\nThe scene is set within a clear glass cube display case, creating a premium collectible presentation. The minimalist setting inside the cube enhances focus on the figures without distraction. The base is matte black with silver accents, providing an elegant, contemporary foundation for the display.\n\nA distinguishing feature is the elegantly engraved nameplate in serif font displaying the animal's name. Below this, the design incorporates scientific classification details similar to natural history museum exhibits, subtly etched into the base.\n\nThe overall composition is presented as a high-end collectible art piece with careful lighting that highlights the figures while creating a balanced visual effect. The background features a gradient from dark to light based on the main color theme.\n\nThis prompt is particularly effective at capturing personality through small details, creating a unique personalized collectible that feels both playful (in the LEGO aesthetic) and sophisticated (in the museum-quality presentation).\n\nTo use this prompt effectively, upload a clear photo of a person. The AI will analyze their features and personality to create a matching LEGO minifigure and complementary animal companion.",
      zh: "这个精巧的提示词根据一个人的照片创建个性化乐高人偶收藏品展示。图像展示了一个经典乐高人偶，风格化为该人的外观和个性，搭配与其特征相辅相成的动物伙伴。\n\n场景设置在一个透明玻璃立方体展示盒中，创造了高级收藏品的呈现方式。立方体内的极简设计增强了对人偶的关注，没有干扰。底座是哑光黑色配以银色装饰，为展示提供了优雅、现代的基础。\n\n一个显著特点是用衬线字体优雅雕刻的铭牌，显示动物的名称。在此下方，设计融入了类似自然历史博物馆展品的科学分类详情，精细地蚀刻在底座上。\n\n整体构图呈现为高端收藏艺术品，精心的灯光突出了人偶，同时创造了平衡的视觉效果。背景特色是基于主色调的从深到浅的渐变。\n\n这个提示词特别擅长通过小细节捕捉个性，创造独特的个性化收藏品，既有趣（乐高美学）又精致（博物馆品质的呈现）。\n\n要有效地使用这个提示词，请上传一张清晰的人物照片。AI将分析他们的特征和个性，创建匹配的乐高人偶和互补的动物伙伴。"
    },
    prompt: "根据我上传的照片，生成一张纵向比例的照片，使用以下提示词：\n\n经典乐高人偶风格，一个微缩场景 —— 一只动物站在我身旁。这只动物的配色与我相匹配。\n\n请根据你对我的理解来创造这只动物（你可以选择任何你认为适合我的动物，不论是真实存在的，还是超现实的、幻想的，只要你觉得符合我的气质即可）。\n\n整个场景设定在一个透明玻璃立方体内，布景极简。\n\n微缩场景的底座是哑光黑色，配以银色装饰，风格简约且时尚。\n\n底座上有一块优雅雕刻的标签牌，字体为精致的衬线体，上面写着该动物的名称。\n\n底部设计中还巧妙融入了类似自然历史博物馆展示的生物学分类信息，以精细蚀刻的方式呈现。\n\n整体构图像是一件高端收藏艺术品：精心打造、策展般呈现、灯光细致。\n\n构图重在平衡。背景为渐变色，从深色到浅色过渡（颜色基于主色调进行选择）。",
    tags: ["乐高", "收藏品", "人偶", "动物", "展示"],
    source: "https://x.com/ZHO_ZHO_ZHO/status/1910644499354968091",
    sourceText: "@ZHO_ZHO_ZHO on X",
    authorName: "@ZHO_ZHO_ZHO",
    authorUrl: "https://x.com/ZHO_ZHO_ZHO",
    imageUrl: "public/lovable-uploads/example_lego_collectible.jpeg",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear photo of a person for best results\n2. The AI will analyze the person's appearance and create a matching LEGO minifigure\n3. The animal companion will be chosen based on perceived personality traits\n4. The museum-quality presentation enhances the collectible appeal\n5. Portrait orientation works best for this display style",
      zh: "1. 上传一张清晰的人物照片以获得最佳效果\n2. AI将分析人物的外观并创建匹配的乐高人偶\n3. 动物伙伴将根据感知到的个性特征选择\n4. 博物馆品质的呈现方式增强了收藏品的吸引力\n5. 纵向比例最适合这种展示风格"
    }
  },
  {
    id: "balloon-character",
    title: {
      en: "Helium Balloon Character Transformation",
      zh: "氦气球角色转换"
    },
    description: {
      en: "Transform a person in a photo into a charming toy-shaped helium balloon",
      zh: "将照片中的人物转变为迷人的玩偶形状氦气球"
    },
    excerpt: {
      en: "Transform any portrait into a whimsical toy-shaped helium balloon character that maintains the subject's key features while giving them a playful, inflated appearance.",
      zh: "将任何肖像转换为异想天开的玩偶形状氦气球角色，保留主体的关键特征，同时赋予他们有趣的充气外观。"
    },
    content: {
      en: "This deceptively simple prompt transforms a portrait photo into a charming helium balloon character in the shape of a toy or doll version of the subject. The transformation maintains key recognizable features of the person while reimagining them in this playful new form.\n\nThe resulting image shows the subject as if they've been made into a custom character balloon, the kind you might see in a parade or special event. The balloon retains distinctive elements like hairstyle, clothing colors, facial features, and overall look of the person, but with the smooth, inflated appearance characteristic of helium balloons.\n\nThe balloon effect creates rounded edges and simplified features while still keeping the character recognizable. The surface has that characteristic shiny, slightly reflective quality that real balloons have, often with subtle highlights that suggest the material's texture.\n\nThis prompt works particularly well with clear portrait photos where the subject's features are easily visible. The transformation is both whimsical and charming, creating a unique stylized version of the person that feels playful and festive.\n\nTo use this prompt effectively, upload a clear portrait photo. The AI will maintain the subject's key characteristics while reimagining them in this inflated, toy-like balloon form.",
      zh: "这个看似简单的提示词将肖像照片转换为以主体玩具或娃娃版本形状呈现的迷人氦气球角色。这种转换保留了人物的关键可识别特征，同时在这种有趣的新形式中重新想象他们。\n\n生成的图像显示主体仿佛被制作成了定制角色气球，就像您可能在游行或特殊活动中看到的那种。气球保留了独特的元素，如发型、服装颜色、面部特征和人物的整体外观，但具有氦气球特有的平滑、充气外观。\n\n气球效果创造了圆润的边缘和简化的特征，同时仍保持角色的可识别性。表面具有真实气球所具有的特征性光亮、略微反光的质量，通常带有暗示材料纹理的微妙高光。\n\n这个提示词对于主体特征清晰可见的肖像照片特别有效。这种转换既异想天开又迷人，创造了人物独特的风格化版本，感觉有趣而喜庆。\n\n要有效地使用这个提示词，请上传一张清晰的肖像照片。AI将保持主体的关键特征，同时在这种充气的、玩具般的气球形式中重新想象他们。"
    },
    prompt: "将图片中的人物变成玩偶形状的氦气球",
    tags: ["气球", "角色", "转换", "玩偶", "创意"],
    source: "https://x.com/ZHO_ZHO_ZHO/status/1910976632141267237",
    sourceText: "@ZHO_ZHO_ZHO on X",
    authorName: "@ZHO_ZHO_ZHO",
    authorUrl: "https://x.com/ZHO_ZHO_ZHO",
    imageUrl: "public/lovable-uploads/example_pearl_earring_balloon.jpeg",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear portrait photo where facial features are visible\n2. The balloon character will maintain key recognizable features of the subject\n3. The transformation adds the characteristic shiny, inflated appearance of helium balloons\n4. The prompt works with both realistic photos and artistic portraits\n5. Simple backgrounds will help the balloon character stand out better",
      zh: "1. 上传一张面部特征清晰可见的肖像照片\n2. 气球角色将保持主体的关键可识别特征\n3. 这种转换添加了氦气球特有的光亮、充气外观\n4. 提示词适用于真实照片和艺术肖像\n5. 简单的背景将有助于气球角色更好地突出"
    }
  },
  {
    id: "political-satire-cartoon",
    title: {
      en: "Political Satire Cartoon Generation",
      zh: "政治讽刺漫画生成"
    },
    description: {
      en: "Create a detailed political satire cartoon in vintage American comic style with specific social commentary",
      zh: "以复古美式漫画风格创建带有特定社会评论的详细政治讽刺漫画"
    },
    excerpt: {
      en: "Generate a powerful political satire cartoon in vintage American comic style featuring MAGA hats on store shelves with ironic 'Made in China' tags and marked-up prices, all rendered in nostalgic yellow and red tones.",
      zh: "生成一幅强有力的政治讽刺漫画，以复古美式漫画风格呈现，特色是商店货架上的MAGA帽子，具有讽刺性的\"中国制造\"标签和标高的价格，全部以怀旧的黄色和红色调呈现。"
    },
    content: {
      en: "This prompt creates a detailed political satire cartoon in a vintage American comic style. The scene depicts a store shelf filled with identical red \"Make America Great Again\" (MAGA) baseball caps, with a close-up view highlighting one particular hat.\n\nThe satirical elements are strategically incorporated: each hat prominently displays \"MAKE AMERICA GREAT AGAIN\" on the front, while inconspicuously bearing \"MADE IN CHINA\" tags on the side. This juxtaposition creates a pointed commentary on the disconnect between nationalistic messaging and global manufacturing realities.\n\nAdding to the satirical narrative, a price tag shows the original price of \"$50.00\" crossed out with a thick black X and replaced with \"$77.00\" - suggesting price inflation or markup that further comments on commercialization of political merchandise.\n\nThe visual style employs a nostalgic color palette dominated by earthy yellows and dark reds, with shadows rendered in a distinctive 90s vintage print style that adds to the retro aesthetic. The overall composition and exaggerated style clearly identifies the image as political satire, offering commentary on political consumerism and potential contradictions in nationalist messaging.\n\nThis prompt demonstrates how specific visual elements, careful arrangement, and stylistic choices can be combined to create effective political commentary through cartoon imagery.",
      zh: "这个提示词创建了一幅以复古美式漫画风格呈现的详细政治讽刺漫画。场景描绘了一个货架，上面摆满了相同的红色\"让美国再次伟大\"（MAGA）棒球帽，特写视角突出了一顶特定的帽子。\n\n讽刺元素被战略性地融入：每顶帽子在正面醒目地展示\"MAKE AMERICA GREAT AGAIN\"，而在侧面不显眼地带有\"MADE IN CHINA\"标签。这种并置创造了对民族主义信息与全球制造现实之间脱节的尖锐评论。\n\n进一步增强讽刺叙事的是，价格标签显示原价\"$50.00\"被粗黑线X划掉，改为\"$77.00\" - 暗示价格通货膨胀或加价，进一步评论了政治商品的商业化。\n\n视觉风格采用了以土黄色和深红色为主的怀旧色调，阴影以独特的90年代复古印刷风格呈现，增添了复古美学。整体构图和夸张风格清晰地将图像识别为政治讽刺，对政治消费主义和民族主义信息中潜在的矛盾提供了评论。\n\n这个提示词展示了特定视觉元素、精心安排和风格选择如何结合起来，通过漫画图像创造有效的政治评论。"
    },
    prompt: "一幅讽刺漫画风格的插画，采用复古美式漫画风格，背景是一个多层货架，货架上都是一样的红色棒球帽，帽子正面印有大字标语\"MAKE AMERICA GREAT AGAIN\"，帽侧贴着白色标签写着\"MADE IN CHINA\"，特写视角聚焦其中一顶红色棒球帽。画面下方有价格牌，原价\"$50.00\"被粗黑线X划掉，改为\"$77.00\"，色调为怀旧的土黄与暗红色调，阴影处理带有90年代复古印刷质感。整体构图风格夸张讽刺，具讽刺政治消费主义的意味。",
    tags: ["政治", "讽刺", "漫画", "MAGA", "评论"],
    source: "https://x.com/dotey/status/1910514811756065159",
    sourceText: "@dotey on X",
    authorName: "@dotey",
    authorUrl: "https://x.com/dotey",
    imageUrl: "public/lovable-uploads/example_maga_hat_cartoon.jpeg",
    keyPoints: {
      en: "1. The effectiveness of this satire comes from the juxtaposition of nationalist messaging ('MAKE AMERICA GREAT AGAIN') with global manufacturing reality ('MADE IN CHINA')\n2. The vintage comic style adds a layer of nostalgia that reinforces the commentary on traditional American values versus current realities\n3. The price markup element adds economic commentary to the political message\n4. The specific color palette (yellows and reds) enhances the vintage aesthetic while also reflecting the subject matter",
      zh: "1. 这种讽刺的效果来自于民族主义信息（'让美国再次伟大'）与全球制造现实（'中国制造'）的并置\n2. 复古漫画风格增添了一层怀旧感，强化了对传统美国价值观与当前现实的评论\n3. 价格加价元素为政治信息增加了经济评论\n4. 特定的色调（黄色和红色）增强了复古美感，同时也反映了主题内容"
    }
  }
];
