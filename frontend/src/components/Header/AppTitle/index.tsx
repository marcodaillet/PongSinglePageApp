import { styled, Typography } from "@mui/material";
import { APP_TITLE } from "../../../utils/constants";
import { Link } from "react-router-dom";

export const AppTitle = () => (
        <StyledAppTitle >
            <StyledLink to="/home">
                {APP_TITLE}
            </StyledLink>
        </StyledAppTitle>
    
);

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
`

const StyledAppTitle = styled(Typography)`
    display: { // Pas displaying quand l'ecran est tout petit
        xs: none;
        sm: block;
    }
    margin-left: 20px;
    font-style: oblique;
    cursor: default;
    letter-spacing: 0.2rem;
    font-size: 23px;
    text-decoration: none;
`;