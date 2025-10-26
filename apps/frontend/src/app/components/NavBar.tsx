export const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [quickMenuOpen, setQuickMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const dropdownRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const quickMenuButtonRef = React.useRef<HTMLButtonElement | null>(null);

  // ... all your handlers

  // ✅ Moved inside the component
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quickMenuOpen &&
        quickMenuButtonRef.current &&
        !quickMenuButtonRef.current.contains(event.target as Node)
      ) {
        setQuickMenuOpen(false);
      }
    };

    if (quickMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [quickMenuOpen]);

  // ... your return (
};