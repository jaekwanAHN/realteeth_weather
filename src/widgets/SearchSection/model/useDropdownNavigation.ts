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
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm, items.length]);

  const ensureVisible = (index: number) => {
    const container = scrollRef.current;
    const ul = listRef.current;
    if (!container || !ul) return;

    const item = ul.querySelector<HTMLLIElement>(`li[data-idx="${index}"]`);
    if (!item) return;

    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;

    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    if (itemTop < viewTop) {
      container.scrollTop = itemTop;
      return;
    }
    if (itemBottom > viewBottom) {
      container.scrollTop = itemBottom - container.clientHeight;
    }
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
      requestAnimationFrame(() => ensureVisible(next));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      setActiveIndex(prev);
      requestAnimationFrame(() => ensureVisible(prev));
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

  return { activeIndex, setActiveIndex, listRef, onKeyDown, scrollRef };
}
