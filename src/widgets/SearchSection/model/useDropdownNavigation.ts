import { useEffect, useRef, useState } from 'react';

type Params<T> = {
  items: T[];
  isFocused: boolean;
  setIsFocused: (v: boolean) => void;
  searchTerm: string;
  onSelect: (item: T) => void;
};

export function useDropdownNavigation<T>({
  items,
  isFocused,
  setIsFocused,
  searchTerm,
  onSelect,
}: Params<T>) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm, items.length]);

  const scrollIntoView = (index: number) => {
    const ul = listRef.current;
    if (!ul) return;
    const el = ul.querySelector<HTMLLIElement>(`li[data-idx="${index}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchTerm) return;
    if (!items.length) return;

    if (!isFocused && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsFocused(true);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      setActiveIndex(next);
      scrollIntoView(next);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      setActiveIndex(prev);
      scrollIntoView(prev);
      return;
    }

    if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        onSelect(items[activeIndex]);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  return { activeIndex, setActiveIndex, listRef, onKeyDown };
}
