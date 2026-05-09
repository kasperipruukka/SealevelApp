import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { SEARCH_DEBOUNCE_MS } from '@/utils/constants';

interface CitySearchProps {
  onSearch: (query: string) => void;
}

/** Hakukenttä debounce-tuella */
export const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      onSearch(value.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sea-400 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Hae kaupunkia tai aluetta..."
        className="w-full pl-12 pr-12 py-3.5 bg-sea-800/60 dark:bg-sea-800/60
          border border-sea-600/30 rounded-2xl
          text-sea-50 placeholder:text-sea-500
          focus:outline-none focus:ring-2 focus:ring-foam-500/50 focus:border-foam-500
          transition-all duration-150 text-base min-h-[48px]"
        aria-label="Hae kaupunkia"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-sea-700/50 transition-colors"
          aria-label="Tyhjennä haku"
        >
          <XMarkIcon className="w-5 h-5 text-sea-400" />
        </button>
      )}
    </div>
  );
};
