import React, { ComponentType } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Badge, Icon, useTheme } from '@mui/material';
import { LIGHT_MODE_THEME } from '../../utils/constants';

interface ActionIconProps {
  badgeContent?: number;
  icon: ComponentType;
}

export const ActionIcon = ({ badgeContent, icon }: ActionIconProps) => {
  const theme = useTheme();
  return badgeContent ? (
    <Badge badgeContent={badgeContent} color={theme.palette.mode === LIGHT_MODE_THEME ? 'error' : 'primary'}>
      <Icon component={icon} />
    </Badge>
  ) : (
    <Icon component={icon} />
  );
};

interface ActionItemProps {
  title: string;
  icon: ComponentType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  badgeContent?: number;
  disableTooltip?: boolean;
}

export const ActionItem = ({ title, icon, onClick, badgeContent, disableTooltip = false }: ActionItemProps) => {
  const buttonIcon = (
    <IconButton size="large" color="inherit" onClick={onClick}>
      <ActionIcon badgeContent={badgeContent} icon={icon} />
    </IconButton>
  );

  return disableTooltip ? (
    buttonIcon
  ) : (
    <Tooltip title={title} placement="bottom" arrow>
      {buttonIcon}
    </Tooltip>
  );
};