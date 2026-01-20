import { useState, useMemo } from 'react';
import districtData from '@/shared/assets/data/korea_districts.json';


type DistrictData = string[];

export const useLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];


    const data = districtData as DistrictData;

    return data
      .filter((location) => location.includes(searchTerm))
      .slice(0, 50);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isFocused,
    setIsFocused
  };
};