import { useSidebarWidth } from '@/components/app-sidebar';

export const useContentExpansion = () => {
  const { isContentExpanded, setIsContentExpanded, toggleContentExpansion, sidebarWidth } = useSidebarWidth();
  
  return {
    isContentExpanded,
    setIsContentExpanded,
    toggleContentExpansion,
    sidebarWidth,
  };
};