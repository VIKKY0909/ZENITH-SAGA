'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationLoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced minimum loading time

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <NavigationLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-zenith-orange z-50">
          <div className="h-full bg-zenith-orange animate-[loading_1s_ease-in-out_infinite]" />
        </div>
      )}
    </NavigationLoadingContext.Provider>
  );
}

export const useNavigationLoading = () => useContext(NavigationLoadingContext); 