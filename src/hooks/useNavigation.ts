import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useNavigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return {
    currentPath: pathname,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    isSidebarVisible,
    setIsSidebarVisible,
  };
};
