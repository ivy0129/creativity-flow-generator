
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/hooks/useLanguage';

const Terms = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'en' ? "Terms of Service" : "服务条款"}</h1>
        
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
              ? "Welcome to MyPrompt.ai. These Terms of Service ('Terms') govern your access to and use of the MyPrompt.ai website and services (the 'Service'). By accessing or using the Service, you agree to be bound by these Terms."
              : "欢迎使用MyPrompt.ai。这些服务条款（\"条款\"）管理您对MyPrompt.ai网站和服务（\"服务\"）的访问和使用。通过访问或使用本服务，您同意受这些条款的约束。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "User Accounts" : "用户账户"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service." 
              : "当您创建账户时，您保证您提供给我们的信息始终是准确、完整和最新的。不准确、不完整或过时的信息可能导致您在服务上的账户被立即终止。"}
          </p>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "You are responsible for maintaining the confidentiality of your account and password, including but not limited to restricting access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password." 
              : "您负责维护账户和密码的机密性，包括但不限于限制对您的计算机和/或账户的访问。您同意接受在您的账户和/或密码下发生的任何和所有活动或行为的责任。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Service Usage" : "服务使用"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Our Service allows you to input prompts and receive optimized versions of these prompts for AI interactions. You retain all rights to the content you submit through our Service. However, by submitting content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with providing and improving our Service." 
              : "我们的服务允许您输入提示词并接收这些提示词的优化版本，以用于AI交互。您保留通过我们的服务提交的内容的所有权利。但是，通过向我们的服务提交内容，您授予我们全球范围内非独占的、免版税的许可，允许我们使用、复制和显示此类内容，以便提供和改进我们的服务。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Usage Limits" : "使用限制"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Free users can use our prompt optimization service up to 10 times per day. Premium users can use the service up to 100 times per day. These limits help us maintain service quality and availability for all users." 
              : "免费用户每天最多可以使用我们的提示词优化服务10次。高级用户每天最多可以使用服务100次。这些限制帮助我们为所有用户维持服务质量和可用性。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Prohibited Uses" : "禁止使用"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You may not use the Service in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party's use of the Service." 
              : "您同意不将本服务用于这些条款所禁止的或违法的任何目的。您不得以任何可能损害、禁用、过度负担或损害本服务或干扰任何其他方使用本服务的方式使用本服务。"}
          </p>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Specifically, you agree not to use the Service to:" 
              : "特别是，您同意不使用本服务："}
          </p>
          <ul className="list-disc pl-6 mb-4 text-base text-muted-foreground space-y-2">
            <li>
              {language === 'en' 
                ? "Generate or promote illegal, harmful, or discriminatory content." 
                : "生成或促进非法、有害或歧视性内容。"}
            </li>
            <li>
              {language === 'en' 
                ? "Harass, abuse, or harm another person or entity." 
                : "骚扰、虐待或伤害另一个人或实体。"}
            </li>
            <li>
              {language === 'en' 
                ? "Impersonate another user, person, or entity." 
                : "冒充另一个用户、人或实体。"}
            </li>
            <li>
              {language === 'en' 
                ? "Collect or track the personal information of others." 
                : "收集或跟踪他人的个人信息。"}
            </li>
            <li>
              {language === 'en' 
                ? "Engage in any automated use of the system." 
                : "从事系统的任何自动化使用。"}
            </li>
            <li>
              {language === 'en' 
                ? "Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service." 
                : "尝试干扰、损害系统完整性或安全性，或破译与运行服务的服务器之间的任何传输。"}
            </li>
          </ul>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Intellectual Property" : "知识产权"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of MyPrompt.ai and its licensors. The Service is protected by copyright, trademark, and other laws of both the country you reside in and foreign countries." 
              : "本服务及其原创内容（不包括用户提供的内容）、特性和功能是并将继续是MyPrompt.ai及其许可方的专有财产。本服务受您居住国家和外国的版权、商标和其他法律保护。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Termination" : "终止"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms." 
              : "我们可以根据我们的自行决定，因任何原因和无限制地立即终止或暂停您的账户并禁止访问服务，恕不另行通知或承担责任，包括但不限于违反条款。"}
          </p>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion." 
              : "如果您希望终止您的账户，您可以简单地停止使用本服务或联系我们请求删除账户。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Limitation of Liability" : "责任限制"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "In no event shall MyPrompt.ai, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage." 
              : "在任何情况下，MyPrompt.ai及其董事、员工、合作伙伴、代理、供应商或附属机构均不对任何间接、附带、特殊、后果性或惩罚性损害承担责任，包括但不限于，利润损失、数据、使用、商誉或其他无形损失，由于(i)您访问或使用服务的能力，或无法访问或使用服务；(ii)服务上任何第三方的任何行为或内容；(iii)从服务中获得的任何内容；以及(iv)未经授权访问、使用或更改您的传输或内容，无论是基于保证、合同、侵权（包括疏忽）或任何其他法律理论，不论我们是否被告知此类损害的可能性。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Changes to Terms" : "条款变更"}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion." 
              : "我们保留自行决定随时修改或替换这些条款的权利。如果修改是重大的，我们将在任何新条款生效前至少提前30天通知。什么构成重大变更将由我们自行决定。"}
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "Contact Us" : "联系我们"}
          </h2>
          <p className="text-base text-muted-foreground">
            {language === 'en' 
              ? "If you have any questions about these Terms, please contact us at: contact@myprompt.ai" 
              : "如果您对这些条款有任何疑问，请通过以下方式联系我们：contact@myprompt.ai"}
          </p>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
