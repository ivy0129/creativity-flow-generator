
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/hooks/useLanguage';

const Privacy = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'en' ? "Privacy Policy" : "隐私政策"}</h1>
        
        <Card className="p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-4">
            {language === 'en' 
              ? "Last Updated: May 15, 2024" 
              : "最后更新日期：2024年5月15日"}
          </p>
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Introduction" : "引言"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Welcome to MyPrompt.ai ('we', 'our', or 'us'). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you."
              : "欢迎访问MyPrompt.ai（以下简称"我们"）。我们尊重您的隐私并致力于保护您的个人数据。本隐私政策将告知您我们如何在您访问我们的网站时（无论您从何处访问）保护您的个人数据，并告知您的隐私权以及法律如何保护您。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Data We Collect" : "我们收集的数据"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:" 
              : "我们可能收集、使用、存储和传输有关您的不同类型的个人数据，我们将其分组如下："}
          </p>
          <ul className="list-disc pl-6 mb-4 text-base text-muted-foreground space-y-2">
            <li>
              {language === 'en' 
                ? "Identity Data includes first name, last name, username or similar identifier." 
                : "身份数据包括名字、姓氏、用户名或类似的标识符。"}
            </li>
            <li>
              {language === 'en' 
                ? "Contact Data includes email address and any other contact information you provide to us." 
                : "联系数据包括电子邮件地址和您提供给我们的任何其他联系信息。"}
            </li>
            <li>
              {language === 'en' 
                ? "Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website." 
                : "技术数据包括互联网协议（IP）地址、您的登录数据、浏览器类型和版本、时区设置和位置、浏览器插件类型和版本、操作系统和平台，以及您用于访问本网站的设备上的其他技术。"}
            </li>
            <li>
              {language === 'en' 
                ? "Usage Data includes information about how you use our website, products and services." 
                : "使用数据包括有关您如何使用我们的网站、产品和服务的信息。"}
            </li>
            <li>
              {language === 'en' 
                ? "Content Data includes the information and content that you input when using our prompt optimization services." 
                : "内容数据包括您在使用我们的提示词优化服务时输入的信息和内容。"}
            </li>
          </ul>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "How We Use Your Data" : "我们如何使用您的数据"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:" 
              : "我们只会在法律允许的情况下使用您的个人数据。最常见的是，我们将在以下情况下使用您的个人数据："}
          </p>
          <ul className="list-disc pl-6 mb-4 text-base text-muted-foreground space-y-2">
            <li>
              {language === 'en' 
                ? "To provide and improve our prompt optimization services." 
                : "提供和改进我们的提示词优化服务。"}
            </li>
            <li>
              {language === 'en' 
                ? "To manage your account and relationship with us." 
                : "管理您的账户和与我们的关系。"}
            </li>
            <li>
              {language === 'en' 
                ? "To personalize your experience on our website." 
                : "个性化您在我们网站上的体验。"}
            </li>
            <li>
              {language === 'en' 
                ? "To communicate with you, including responding to your inquiries and requests." 
                : "与您沟通，包括回应您的询问和请求。"}
            </li>
          </ul>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Data Security" : "数据安全"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know." 
              : "我们已采取适当的安全措施，防止您的个人数据意外丢失、被未经授权使用或访问、更改或披露。此外，我们限制只有那些出于业务需要而必须知道的员工、代理、承包商和其他第三方才能访问您的个人数据。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Your Rights" : "您的权利"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:" 
              : "在某些情况下，您根据数据保护法律对您的个人数据拥有权利，包括："}
          </p>
          <ul className="list-disc pl-6 mb-4 text-base text-muted-foreground space-y-2">
            <li>
              {language === 'en' 
                ? "Request access to your personal data." 
                : "请求访问您的个人数据。"}
            </li>
            <li>
              {language === 'en' 
                ? "Request correction of your personal data." 
                : "请求更正您的个人数据。"}
            </li>
            <li>
              {language === 'en' 
                ? "Request erasure of your personal data." 
                : "请求删除您的个人数据。"}
            </li>
            <li>
              {language === 'en' 
                ? "Object to processing of your personal data." 
                : "反对处理您的个人数据。"}
            </li>
            <li>
              {language === 'en' 
                ? "Request restriction of processing your personal data." 
                : "请求限制处理您的个人数据。"}
            </li>
            <li>
              {language === 'en' 
                ? "Request transfer of your personal data." 
                : "请求传输您的个人数据。"}
            </li>
            <li>
              {language === 'en' 
                ? "Right to withdraw consent." 
                : "撤回同意的权利。"}
            </li>
          </ul>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Changes to This Privacy Policy" : "本隐私政策的变更"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'last updated' date at the top of this privacy policy." 
              : "我们可能会不时更新我们的隐私政策。我们将通过在本页面上发布新的隐私政策并更新本隐私政策顶部的"最后更新日期"来通知您任何更改。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Contact Us" : "联系我们"}
          </h2>
          <p className="text-base text-muted-foreground">
            {language === 'en' 
              ? "If you have any questions about this privacy policy or our privacy practices, please contact us at: contact@myprompt.ai" 
              : "如果您对本隐私政策或我们的隐私实践有任何疑问，请通过以下方式联系我们：contact@myprompt.ai"}
          </p>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
