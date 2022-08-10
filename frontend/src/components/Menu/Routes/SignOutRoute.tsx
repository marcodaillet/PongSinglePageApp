import { ListItemButton, ListItemIcon, IconButton, styled } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const SignOutRoute = () => {
    const handleSignOutClick = async () => {
        await axios.post('logout', {})
    };
    
    return (
        <StyledListItemButton onClick={handleSignOutClick}>
            <ListItemIcon>
                <Link to={"/"}>
                <IconButton size="small">
                    <ExitToApp />
                </IconButton>
                </Link>
            </ListItemIcon>
        </StyledListItemButton>
    );
};

const StyledListItemButton = styled(ListItemButton)`
    position: absolute;
    bottom: 0;
    width: 100%;
 `;