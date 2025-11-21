'use client';

interface ShopByCategoryProps {
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
}

const ShopByCategory = ({ onToggle, isOpen }: ShopByCategoryProps) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(!isOpen)}
      className={`flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded bg-[#EE7C00] px-3 text-sm font-semibold text-white transition-colors`}
      aria-expanded={isOpen}
      aria-controls="category-sidebar"
    >
      <span className="whitespace-nowrap">Shop by Category</span>
      <svg
        width="10"
        height="7"
        viewBox="0 0 16 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        aria-hidden="true"
      >
        <path d="M8 8L0 0H16L8 8Z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ShopByCategory;
