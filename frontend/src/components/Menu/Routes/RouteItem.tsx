import React, { ComponentType } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Route } from '../../../datamodels/route';
import { Icon, IconButton, lighten, ListItemButton, ListItemIcon, ListItemText, styled, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface RouteItemProps {
    route: Route;
    nested?: boolean;
    hasChildren?: boolean;
    handleMenuClick?: (route: Route) => void;
}

export const RouteItem = ({ route, nested = false, hasChildren = false, handleMenuClick = () => {} }: RouteItemProps) => {
    const location = useLocation();
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!route.isEnabled)
            e.preventDefault();
    };
    const selected = location.pathname === route.path || (hasChildren && route.subRoutes?.some((e) => location.pathname === e.path));
    const item = (
        <ListItemButton
            sx={{
                pl: nested ? 3 : 1
            }}
            onClick={() =>handleMenuClick(route)} >
                <ListItemIcon>
                    <CustomIconButton size="small" selected={location.pathname === route.path}>
                        {route.icon && <CustomIcon component={route.icon} selected={selected || false} />}
                    </CustomIconButton>
                </ListItemIcon>
                <ListItemText primary={route.title} />
                 {hasChildren && (route.expanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
    )

    return (
        <CustomNavLink to={`${route.path}`} key={route.key} onClick={handleNavigate}>
            {route.description ? (
                <Tooltip title={`${route.description}`} placement="right">
                    {item}
                </Tooltip>
            ) : ( 
                item
            )}
        </CustomNavLink>
    );
};

const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
`;

const CustomIcon = styled(Icon)<{ selected: boolean; component: ComponentType<{}> }>`
    ${({ selected, theme }) => selected && `color: ${theme.palette.primary.main};`}
`;

const CustomIconButton = styled(IconButton)<{selected: boolean }>(({ selected, theme }) => ({
    boxShadow: selected ? `0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`: 'default',
    transition: 'box-shadow 0.1s',
}));