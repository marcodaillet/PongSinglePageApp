import React, { useState } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Squash as MenuButton } from 'hamburger-react';
import { AppTitle } from './AppTitle';
import { ThemeSwitcher } from './ThemeSwitcher';
import { UserAccount } from '../ActionsHandler/index'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { HEADER_HEIGHT } from '../../utils/constants';

// import { DefaultMenu, MobileMenu } from './Menu';

interface MenuButtonProps {
  toggleMenu: () => void;
}
export const Menu = ({ toggleMenu }: MenuButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen(!isOpen);
      toggleMenu();
    };
  
    return <MenuButton size={24} onToggle={toggle} toggled={isOpen} />;
};

interface HeaderProps {
  toggleMenu: () => void;
}
export const Header = ({ toggleMenu }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
        <>
            <AppBar position="fixed" sx = {{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              height: HEADER_HEIGHT,
              }}>
                <Toolbar disableGutters variant="dense">
                    <Menu toggleMenu={toggleMenu} />
                    <Box sx={{ flexGrow: 1 }} />
                    <VideogameAssetIcon fontSize='large' />
                    <Box sx={{ flexGrow: 1 }}>
                      <AppTitle />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                    <ThemeSwitcher />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
  )
}