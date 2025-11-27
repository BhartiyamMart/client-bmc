import OptimizedImage from '@/components/shared/optimizeImage';

interface CategoryItemProps {
  name: string;
  icon: string;
}

const CategoryItem = ({ name, icon }: CategoryItemProps) => {
  return (
    <button
      type="button"
      className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#EE7C00] hover:text-white"
      aria-label={`View ${name} category`}
    >
      <div className="relative h-5 w-5 shrink-0">
        <OptimizedImage src={icon} alt="" fill className="object-contain" sizes="20px" />
      </div>
      <span className="whitespace-nowrap">{name}</span>
    </button>
  );
};

export default CategoryItem;
