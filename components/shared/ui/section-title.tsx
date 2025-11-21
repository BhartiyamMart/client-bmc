import { ISectionTitleProps } from '@/interfaces/shared.interface';

const SectionTitle: React.FC<ISectionTitleProps> = ({ title }) => {
  return <div className="text-xl font-semibold lg:text-2xl">{title}</div>;
};

export default SectionTitle;
