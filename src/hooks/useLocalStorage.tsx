function useLocalStorage() {
  const getValue = (key: string) => {
    localStorage.getItem(key);
  }

  const setValue = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  return { getValue, setValue } as const;
}

export default useLocalStorage;
