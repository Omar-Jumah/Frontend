import Result from "../models/Result.js";
import CreditTransaction from "../models/CreditTransaction.js";

export const generateResult = async (req, res) => {
  try {
    const { productName = "Smart Watch", category = "Accessories" } = req.body;

    const score = Math.floor(Math.random() * 16) + 84;

    const savedResult = await Result.create({
      title: productName,
      description: `منتج ${productName} من فئة ${category} يتميز بتصميم عملي وجودة مناسبة للمتاجر الإلكترونية الحديثة، مع وصف تسويقي ذكي يساعد على جذب العملاء وزيادة التفاعل.`,
      socialAd: `اكتشف ${productName} الآن! خيار مثالي يجمع بين الجودة، الأناقة، والقيمة العالية لعملائك.`,
      caption: `${productName} — اختيار ذكي لمتجرك الإلكتروني.`,
      hashtags: `#SmartShopAI #Ecommerce #${category.replace(/\s+/g, "")}`,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      score,
    });

    await CreditTransaction.create({
      type: "usage",
      amount: 10,
      description: `AI mock generation for ${productName}`,
    });

    res.status(200).json({
      success: true,
      result: savedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};