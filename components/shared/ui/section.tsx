import { forwardRef, HTMLAttributes, ReactNode } from 'react';

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(({ children, className = '', ...rest }, ref) => {
  return (
    <section ref={ref} className={`flex w-full items-center justify-center p-3 md:p-4 lg:p-5 ${className}`} {...rest}>
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
