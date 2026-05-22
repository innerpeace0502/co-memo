'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cm_author_name';

export function useAuthorName() {
  const [authorName, setAuthorNameState] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) ?? '';
    setAuthorNameState(stored);
    setIsLoaded(true);
  }, []);

  const setAuthorName = (name: string) => {
    localStorage.setItem(STORAGE_KEY, name);
    setAuthorNameState(name);
  };

  return { authorName, setAuthorName, isLoaded };
}
