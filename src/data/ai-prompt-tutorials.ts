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
    id: "simple-line-drawing-emojis",
    title: {
      en: "Simple Line Drawing Emoji Set",
      zh: "简笔画表情包"
    },
    description: {
      en: "Transform a portrait photo into a set of simple line drawing emojis with different expressions",
      zh: "将肖像照片转换成一系列不同表情的简笔画表情包"
    },
    excerpt: {
      en: "Create a charming set of minimalist line drawing emojis from your photo, featuring various expressions like smiling, frowning, surprised, thinking, winking, and sticking out tongue.",
      zh: "从您的照片创建一系列极简主义风格的简笔画表情包，包含微笑、皱眉、惊讶、思考、眨眼和吐舌头等多种表情。"
    },
    content: {
      en: "This prompt transforms a portrait photo into a set of simple, elegant line drawing emojis with various expressions, perfect for personal use in chats or social media.\n\nThe process happens in two distinct steps. First, the AI converts your photo into a clean line drawing style, capturing the essential features and personality of the subject while simplifying details. Then, it creates multiple versions with different expressions: sticking out tongue, smiling, frowning, surprised, thinking, and winking.\n\nThe resulting style is minimalist and charming - using only thin black lines on a white background with occasionally small filled areas for emphasis. The drawings maintain the subject's key characteristics while removing unnecessary details, creating an instantly recognizable yet simplified representation.\n\nTo use this prompt effectively, upload a clear frontal portrait photo with good lighting and a neutral expression. The AI will then generate a cohesive set of expressions based on this reference image.\n\nThese line drawing emojis make perfect custom stickers for messaging apps, social media profile pictures, or personalized digital assets. They offer a unique way to express yourself online with a consistent artistic style across multiple emotions.",
      zh: "这个提示词将肖像照片转换成一系列简洁、优雅的简笔画表情包，带有各种表情，非常适合在聊天或社交媒体中个人使用。\n\n这个过程分为两个明确的步骤。首先，AI将您的照片转换为干净的线条画风格，捕捉主体的基本特征和个性，同时简化细节。然后，它创建带有不同表情的多个版本：吐舌头、微笑、皱眉、惊讶、思考和眨眼。\n\n最终的风格简约而迷人——仅使用白色背景上的细黑线，偶尔有小面积填充以增强效果。这些画作保留了主体的关键特征，同时去除了不必要的细节，创造出即时可识别且简化的表现形式。\n\n要有效地使用这个提示词，请上传一张清晰的正面肖像照片，光线良好，表情自然。然后AI将基于这张参考图片生成一套连贯的表情。\n\n这些线条画表情包可以作为消息应用的自定义贴纸、社交媒体头像或个性化数字资产。它们提供了一种独特的方式，让您能够在线上以一致的艺术风格表达多种情绪。"
    },
    prompt: "(分为两步)\n先把图片人物变成手绘简笔画风格\n然后把简笔画按照吐舌头、微笑、皱眉、惊讶、思考、眨眼生成一系列表情包",
    promptEn: "(Two steps)\nFirst transform the person in the image into a hand-drawn simple line art style\nThen create a series of emoji expressions using the line drawing: sticking out tongue, smiling, frowning, surprised, thinking, and winking",
    promptZh: "(分为两步)\n先把图片人物变成手绘简笔画风格\n然后把简笔画按照吐舌头、微笑、皱眉、惊讶、思考、眨眼生成一系列表情包",
    tags: ["简笔画", "表情包", "线条画", "肖像", "个性化"],
    source: "https://x.com/ZHO_ZHO_ZHO/status/1909907741948399873",
    sourceText: "@ZHO_ZHO_ZHO on X",
    authorName: "@ZHO_ZHO_ZHO",
    authorUrl: "https://x.com/ZHO_ZHO_ZHO",
    imageUrl: "public/lovable-uploads/60513158-ead7-4f8b-86fb-8920bc58b721.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear frontal portrait photo with good lighting\n2. The process has two steps: first converting to line drawing, then creating multiple expressions\n3. For best results, start with a neutral expression in your reference photo\n4. The style is minimalist with only black lines on white background\n5. These emojis can be used as custom stickers for messaging apps",
      zh: "1. 上传一张光线良好的清晰正面肖像照片\n2. 处理分为两个步骤：首先转换为线条画，然后创建多种表情\n3. 为获得最佳效果，参考照片中表情应保持自然\n4. 风格极简，仅使用白色背景上的黑色线条\n5. 这些表情包可用作消息应用的自定义贴纸"
    }
  },
  {
    id: "japanese-two-panel-manga",
    title: {
      en: "Japanese Two-Panel Manga Style",
      zh: "日系双格漫画风格"
    },
    description: {
      en: "Create a cute Japanese-style two-panel manga featuring a character from your photo",
      zh: "创建以您的照片为基础的可爱日系双格漫画"
    },
    excerpt: {
      en: "Transform any portrait into a cute Japanese-style two-panel manga with sequential storytelling, expressive emotions, and speech bubbles in a visually appealing comic format.",
      zh: "将任何人像转换成可爱的日系双格漫画，包含连续叙事、生动的表情和对话气泡，呈现视觉吸引力的漫画格式。"
    },
    content: {
      en: "This prompt creates a charming Japanese-style two-panel manga featuring a character based on your reference photo. It's ideal for storytelling through sequential art with a cute, expressive style.\n\nThe result is a vertically arranged two-panel comic that captures a mini-story with changing emotions and actions. Your reference person is transformed into a cute anime-style character while maintaining recognizable features like hairstyle, clothing, and facial characteristics.\n\nEach panel shows different emotions and actions, creating a sequential narrative. The first panel typically shows one emotional state or situation, while the second panel displays a reaction or consequence, often with a humorous contrast. Speech bubbles with cute handwritten-style text enhance the storytelling.\n\nThe art style features bright colors, expressive faces with large eyes, simplified backgrounds that focus attention on the character, and clean black panel borders. Characters are drawn in a chibi or super-deformed style with exaggerated proportions (larger head, smaller body) for maximum cuteness.\n\nTo use this prompt effectively, upload a clear photo showing the person's face and upper body. The AI will transform them into a cute manga character while maintaining recognizable features. You can customize the scenario, emotions, and dialogue to create a personalized mini-story.\n\nThis style is perfect for creating personalized comic gifts, social media content, or simply exploring how you or your friends would appear as characters in a Japanese manga. The prompt allows for creative storytelling in a visually appealing format that's instantly recognizable as part of Japanese pop culture.",
      zh: "这个提示词创建了一个迷人的日系双格漫画，特点是以您的参考照片为基础的角色。它非常适合通过连续的艺术表现来讲述故事，采用可爱、富有表现力的风格。\n\n结果是一个垂直排列的双格漫画，捕捉了一个小故事，展现出变化的情绪和动作。您的参考人物被转换成可爱的动漫风格角色，同时保留可识别的特征，如发型、服装和面部特征。\n\n每个格子展示不同的情绪和动作，创造了连续的叙事。第一格通常展示一种情绪状态或情况，而第二格则展示一个反应或后果，通常带有幽默的对比。带有可爱手写风格文字的对话气泡增强了故事性。\n\n艺术风格特点是明亮的颜色，带有大眼睛的富有表现力的面孔，简化的背景使注意力集中在角色上，以及干净的黑色面板边框。角色以Q版或超变形风格绘制，比例夸张（头部较大，身体较小）以达到最大的可爱度。\n\n要有效地使用这个提示词，请上传一张清晰地显示人物面部和上半身的照片。AI将把他们转变为可爱的漫画角色，同时保持可识别的特征。您可以自定义场景、情绪和对话，以创建个性化的迷你故事。\n\n这种风格非常适合创建个性化的漫画礼物、社交媒体内容，或者只是探索您或您的朋友作为日本漫画中的角色会是什么样子。这个提示词允许通过视觉上吸引人的格式进行创造性讲述，这种格式在日本流行文化中立即可以被识别出来。"
    },
    prompt: "创建一张日系萌系双格漫画，上下排列，主题：少女总统的工作日常。\n\n角色形象: 将上传的附件转换为日系萌系卡通女生形象的风格，保留原图所有细节，如服饰（西装）、发型（明亮的金黄色）、五官等。 \n\n第一格: \n- 表情: 委屈巴巴，沮丧的表情，单手托腮 \n- 文字框: \"肿么办嘛！他不跟我通话！(；´д｀)\" \n- 场景: 暖色调办公室，背后美国国旗，桌上放着一堆汉堡，一个复古红色转盘电话，人物在画面左边，电话在右边。  \n\n第二格:  \n- 表情: 咬牙切齿，暴怒，脸涨红 \n- 动作: 猛拍桌子，汉堡震得跳起来 \n- 文字泡: \"哼！关税加倍！不理我是他们的损失！( `д´ )\" - 场景: 和第一格相同，但一片狼藉。  \n\n其他说明:  \n- 文字采用简洁可爱的手写体，整体风格可爱而有趣。 \n- 构图饱满生动，请保留足够空间用于文字显示，适当留白。 \n- 图片比例 2:3。 \n- 画面整体色彩鲜艳，突出卡通风格。",
    promptEn: "Create a Japanese-style cute two-panel manga arranged vertically with the theme: daily work life of a girl president.\n\nCharacter: Transform the uploaded reference into a Japanese cute cartoon girl style, keeping all details from the original image such as outfit (suit), hairstyle (bright blonde), facial features, etc.\n\nFirst panel:\n- Expression: Pouting, dejected expression, resting one cheek on hand\n- Text bubble: \"What should I do! He won't talk to me on the phone! (；´д｀)\"\n- Scene: Warm-toned office, American flag in the background, pile of hamburgers on the desk, a vintage red rotary phone, character on the left side of the frame, phone on the right.\n\nSecond panel:\n- Expression: Gritting teeth, furious, face turned red\n- Action: Slamming the desk, hamburgers jumping from the impact\n- Text bubble: \"Hmph! Double the tariffs! It's their loss for ignoring me! ( `д´ )\"\n- Scene: Same as the first panel, but messy.\n\nAdditional notes:\n- Text should use simple cute handwritten font, overall style should be cute and fun.\n- Composition should be full and lively, please leave enough space for text display with appropriate white space.\n- Image ratio 2:3.\n- Overall colors should be bright, emphasizing cartoon style.",
    promptZh: "创建一张日系萌系双格漫画，上下排列，主题：少女总统的工作日常。\n\n角色形象: 将上传的附件转换为日系萌系卡通女生形象的风格，保留原图所有细节，如服饰（西装）、发型（明亮的金黄色）、五官等。 \n\n第一格: \n- 表情: 委屈巴巴，沮丧的表情，单手托腮 \n- 文字框: \"肿么办嘛！他不跟我通话！(；´д｀)\" \n- 场景: 暖色调办公室，背后美国国旗，桌上放着一堆汉堡，一个复古红色转盘电话，人物在画面左边，电话在右边。  \n\n第二格:  \n- 表情: 咬牙切齿，暴怒，脸涨红 \n- 动作: 猛拍桌子，汉堡震得跳起来 \n- 文字泡: \"哼！关税加倍！不理我是他们的损失！( `д´ )\" - 场景: 和第一格相同，但一片狼藉。  \n\n其他说明:  \n- 文字采用简洁可爱的手写体，整体风格可爱而有趣。 \n- 构图饱满生动，请保留足够空间用于文字显示，适当留白。 \n- 图片比例 2:3。 \n- 画面整体色彩鲜艳，突出卡通风格。",
    tags: ["漫画", "双格", "日系", "Q版", "角色"],
    source: "https://x.com/hellokaton/status/1910900979194646959",
    sourceText: "@hellokaton on X",
    authorName: "@hellokaton",
    authorUrl: "https://x.com/hellokaton",
    imageUrl: "public/lovable-uploads/659ad24c-3e42-49cb-a848-72aa266f59c4.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear photo showing the person's face and upper body\n2. The AI will maintain recognizable features while transforming the subject into manga style\n3. Each panel shows different emotions and actions to create a sequential narrative\n4. This style works best when showing emotional contrasts between the two panels\n5. For best results, include specific details about the scene, expressions, and dialogue",
      zh: "1. 上传清晰显示人物面部和上半身的照片\n2. AI将保持可识别的特征，同时将主体转换为漫画风格\n3. 每个格子展示不同的情绪和动作，创造连续叙事\n4. 这种风格在展示两个格子之间的情绪对比时效果最佳\n5. 为获得最佳效果，请包含关于场景、表情和对话的具体细节"
    }
  },
  {
    id: "pixar-3d-style",
    title: {
      en: "Pixar 3D Style Transformation",
      zh: "皮克斯3D风格转换"
    },
    description: {
      en: "Transform photos into the iconic Pixar 3D animation style with expressive features",
      zh: "将照片转换成标志性的皮克斯3D动画风格，具有夸张的特征"
    },
    excerpt: {
      en: "Transform your photos into Pixar's signature 3D animation style, characterized by exaggerated facial features, smooth textures, and expressive emotions that bring characters to life.",
      zh: "将您的照片转换成皮克斯标志性的3D动画风格，特点是夸张的面部特征、平滑的纹理和生动的表情，让角色栩栩如生。"
    },
    content: {
      en: "This prompt transforms ordinary photos into the distinctive Pixar 3D animation style, known for its exaggerated yet appealing character design, smooth textures, and emotionally expressive features.\n\nPixar Animation Studios has defined modern 3D animation with its unique aesthetic that balances caricature with believability. Characters typically feature slightly oversized heads, exaggerated facial features (especially noses, eyes, and eyebrows), and incredibly detailed texturing that creates a sense of both stylization and realism.\n\nWhen applied to photos, this transformation recreates subjects with Pixar's signature look: slightly cartoonish proportions, enhanced emotional expressiveness, and a polished, rendered 3D quality. Skin textures are smoothed yet retain subtle details, hair is simplified into flowing shapes, and features are exaggerated while maintaining the subject's recognizable traits.\n\nTo use this prompt effectively, upload a clear photo with good lighting. The AI works particularly well with portraits that show facial expressions, as the Pixar style excels at conveying emotion. Both close-up faces and full-body shots can be transformed effectively.\n\nThis prompt is remarkably simple yet produces consistent results due to the widespread recognition of the Pixar aesthetic developed through films like Toy Story, Up, and The Incredibles. The transformation is perfect for creating unique profile pictures, family portraits with a playful twist, or reimagining yourself as a character who might appear in a Pixar film.",
      zh: "这个提示词将普通照片转换成独特的皮克斯3D动画风格，该风格以其夸张但吸引人的角色设计、平滑的纹理和富有表现力的特征而闻名。\n\n皮克斯动画工作室以其独特的美学定义了现代3D动画，这种美学在漫画风格和可信度之间取得了平衡。角色通常具有略微过大的头部、夸张的面部特征（尤其是鼻子、眼睛和眉毛），以及令人难以置信的细节纹理，创造出既风格化又写实的感觉。\n\n当应用于照片时，这种转换会以皮克斯的标志性外观重新创造主体：略带卡通化的比例、增强的情感表现力，以及经过抛光的3D渲染质感。皮肤纹理被平滑处理，但保留了微妙的细节，头发被简化为流动的形状，特征被夸大，同时保持主体可识别的特点。\n\n要有效地使用这个提示词，请上传光线良好的清晰照片。AI特别适合处理展示面部表情的人像，因为皮克斯风格擅长传达情感。特写脸部和全身照片都可以有效转换。\n\n这个提示词非常简单，但由于《玩具总动员》、《飞屋环游记》和《超人总动员》等电影所发展的皮克斯美学广受认可，因此能够产生一致的效果。这种转换非常适合创建独特的个人头像、带有俏皮转折的家庭照片，或者重新想象自己成为可能出现在皮克斯电影中的角色。"
    },
    prompt: "以皮克斯 3D 风格重绘这张照片",
    promptEn: "Redraw this photo in Pixar 3D style",
    promptZh: "以皮克斯 3D 风格重绘这张照片",
    tags: ["动画", "皮克斯", "3D", "风格转换", "人像"],
    source: "https://animeai.online/#demo-gallery",
    sourceText: "AnimeAI",
    authorName: "AnimeAI",
    authorUrl: "https://animeai.online",
    imageUrl: "public/lovable-uploads/ea3ddada-d7f3-468e-a753-9c2a86c0beaf.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear photo with good lighting\n2. Photos showing facial expressions work best for capturing Pixar's emotional style\n3. Both close-up portraits and full-body shots can be transformed effectively\n4. If there's inappropriate or sensitive content in the background, add \"please modify or remove it\" to the prompt\n5. The transformation works well for both individuals and group photos",
      zh: "1. 上传光线良好的清晰照片\n2. 展示面部表情的照片最能捕捉皮克斯的情感风格\n3. 特写肖像和全身照片都能有效转换\n4. 如果背景中有不合适或敏感的内容，可以在提示词中添加\"请修改或删除\"\n5. 这种转换对个人照片和合影都有很好的效果"
    }
  },
  {
    id: "ghibli-style-transformation",
    title: {
      en: "Studio Ghibli Style Transformation",
      zh: "吉卜力风格转换"
    },
    description: {
      en: "Transform any photo into the charming animated style of Studio Ghibli films",
      zh: "将任何照片转换成吉卜力工作室电影中迷人的动画风格"
    },
    excerpt: {
      en: "Transform your photos into the enchanting world of Studio Ghibli with this simple prompt, recreating the iconic hand-drawn aesthetic made famous by films like 'Spirited Away' and 'My Neighbor Totoro'.",
      zh: "使用这个简单的提示词将您的照片转换成吉卜力工作室的魅力世界，重现《千与千寻》和《龙猫》等电影中著名的手绘美学风格。"
    },
    content: {
      en: "This prompt transforms ordinary photos into the distinctive Studio Ghibli animation style, characterized by soft colors, expressive characters, and dreamy, painterly backgrounds.\n\nStudio Ghibli, founded by legendary animator Hayao Miyazaki, is renowned for its unique artistic approach that blends whimsical characters with detailed natural environments. The studio's hand-drawn animation style has a characteristic warmth and charm that is instantly recognizable.\n\nWhen applied to photos, this transformation recreates subjects with the large, expressive eyes typical of Ghibli characters, simplifies features while maintaining recognizability, and adds the studio's signature soft color palette. Backgrounds are reimagined with the studio's distinctive painterly quality, often featuring fluffy clouds, lush vegetation, and atmospheric lighting that creates a sense of wonder.\n\nTo use this prompt effectively, upload a clear photo with good lighting. The AI works particularly well with portraits, landscapes, or photos containing both people and natural settings. While the prompt is remarkably simple, it produces consistent results due to the widespread recognition of the Ghibli aesthetic.\n\nIf your uploaded image contains potentially inappropriate or sensitive content in the background, you can add an additional line to the prompt requesting the AI to modify or remove such elements.\n\nThis transformation is perfect for creating unique profile pictures, commemorating special moments in an artistic style, or simply exploring how you or your surroundings might appear in the enchanting world of a Ghibli film.",
      zh: "这个提示词将普通照片转换成独特的吉卜力工作室动画风格，特点是柔和的色彩、富有表现力的角色和梦幻般的绘画背景。\n\n由传奇动画师宫崎骏创立的吉卜力工作室，因其独特的艺术方法而闻名，这种方法将奇幻角色与详细的自然环境融合在一起。工作室的手绘动画风格具有特有的温暖和魅力，让人一眼就能辨认出来。\n\n当应用于照片时，这种转换会重新创造主体，赋予其吉卜力角色典型的大而富有表现力的眼睛，简化特征的同时保持可识别性，并添加工作室标志性的柔和色彩调色板。背景则以工作室独特的绘画质感重新构想，通常包括蓬松的云朵、茂盛的植被和营造出奇妙感的大气光照效果。\n\n要有效使用这个提示词，请上传一张光线良好的清晰照片。AI特别适合处理人像、风景或同时包含人物和自然环境的照片。虽然提示词非常简单，但由于吉卜力美学的广泛认知度，它能产生一致的效果。\n\n如果您上传的图像背景中包含潜在不适当或敏感的内容，您可以在提示词中添加一行额外的请求，要求AI修改或删除这些元素。\n\n这种转换非常适合创建独特的个人头像、以艺术风格纪念特殊时刻，或者只是探索您或您周围的环境在吉卜力电影的迷人世界中会是什么样子。"
    },
    prompt: "以吉卜力风格重绘这张照片",
    promptEn: "Redraw this photo in Studio Ghibli style",
    promptZh: "以吉卜力风格重绘这张照片",
    tags: ["动画", "吉卜力", "宫崎骏", "风格转换", "人像"],
    source: "https://animeai.online/#demo-gallery",
    sourceText: "AnimeAI",
    authorName: "AnimeAI",
    authorUrl: "https://animeai.online",
    imageUrl: "public/lovable-uploads/d577697f-b452-4a90-b045-7ccd687ab337.png",
    requiresReferenceImage: true,
    keyPoints: {
      en: "1. Upload a clear photo with good lighting\n2. For best results, use portraits or scenes with both people and landscapes\n3. The transformation works well with both close-up portraits and full-body shots\n4. Add \"If there's inappropriate or sensitive content in the background, please modify or remove it\" if needed\n5. The AI will maintain recognizable features while applying the Ghibli aesthetic",
      zh: "1. 上传光线良好的清晰照片\n2. 为获得最佳效果，使用人像或同时包含人物和风景的场景\n3. 该转换对特写肖像和全身照片均有良好效果\n4. 如有需要，添加\"如果背景里有不合适（敏感）的内容，可以进行修改或删除\"\n5. AI会在应用吉卜力美学的同时保持可识别的特征"
    }
  },
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
      en: "This prompt transforms a couple's photo into charming Q-version 3D characters dressed in traditional Chinese wedding attire, set against a backdrop of auspicious 'Double Happiness' paper-cut patterns.\n\nThe male character is depicted wearing a red long gown (changpao) and formal outer jacket (magua) embroidered with golden dragon patterns, symbolizing nobility and prosperity. He sports a traditional red scholar's hat (zhuangyuan hat) adorned with golden patterns and an ornate gold embellishment on top, representing wisdom and honor. A large red flower is pinned to his chest, symbolizing joy and celebration.\\n\nThe female character is dressed in an exquisite red xiuhe outfit (traditional Chinese bridal attire), embellished with intricate golden patterns and phoenix embroidery, representing grace and elegance. Her headdress features a phoenix crown adorned with red flowers, golden three-dimensional decorations, and hanging tassels, embodying beauty and nobility in classical Chinese aesthetics.\\n\nThe background showcases the Chinese character for 'Double Happiness' (囍) in a traditional paper-cut style, creating a festive atmosphere that's essential for Chinese wedding celebrations.\\n\nTo use this prompt effectively, upload a clear photo of a couple. The AI will transform them into Q-version 3D characters while maintaining their recognizable features, dressing them in traditional Chinese wedding attire against a festive backdrop.\\n\nThis prompt is perfect for creating unique wedding announcements, anniversary gifts, or cultural celebration art that honors traditional Chinese wedding customs.",
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
      zh: "这个提示词创建了一个独特且视觉上引人注目的立体效果，将您的主体转变为一个3D Q版角色，看起来正从拍立得照片中走出来。\n\n角色以可爱的
