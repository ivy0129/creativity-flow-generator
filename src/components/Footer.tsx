
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-4 sm:px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI提示优化助手. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
