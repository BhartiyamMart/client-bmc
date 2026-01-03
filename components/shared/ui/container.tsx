import React from 'react';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Container = ({ children, className = '', ...rest }: ContainerProps) => {
  return (
    <div className={`w-full max-w-382.5 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Container;
