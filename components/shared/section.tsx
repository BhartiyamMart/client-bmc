import React from 'react';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

const Section = ({ children, className = '', ...rest }: SectionProps) => {
  return (
    <section className={`flex w-full items-center justify-center p-3 md:p-4 lg:p-5 ${className}`} {...rest}>
      {children}
    </section>
  );
};

export default Section;
