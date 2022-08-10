import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { ActionItem } from './ActionItem';

interface ActionProps {
    total?: number;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    disableTooltip?: boolean;
}

export const UserAccount = ({ onClick, disableTooltip = false }: ActionProps) => (
    <ActionItem title="My Account" icon={PersonIcon} onClick={onClick} disableTooltip={disableTooltip} />
);
  
export const SignOut = ({ onClick, disableTooltip = false }: ActionProps) => (
    <ActionItem title="Sign Out" icon={LogoutIcon} onClick={onClick} disableTooltip={disableTooltip} />
);
  
export const Settings = ({ onClick, disableTooltip = false }: ActionProps) => (
    <ActionItem title="Settings" icon={SettingsIcon} onClick={onClick} disableTooltip={disableTooltip} />
);