import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { PageTitle } from "../Home";
import logo from "../../../images/svg-5.svg"

const HeroContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 650px;
    position: relative;
    z-index: 1;
`;

const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

const LogoWrapper = styled('div')`
  text-align: center;
  margin-top: 6rem;
`;

const StyledLogo = styled('img')`
  height: 34vmin;
  pointer-events: none;
`;

export const About = () =>
{
    return (
        <HeroContainer>
            <HeroContent>
                <PageTitle title={"About the game"} />
                <Typography color="textSecondary" align="center" marginTop="30px" fontStyle={"italic"} >How to play: arrow up to move the paddle up, and down to move it down. Nothing more. </Typography>
                <Box sx = {{ flexGrow: 1, p: 3 }} /> 
                <PageTitle title={"About the Project"} />
                <Typography color="textSecondary" align="center" marginTop="20px" marginBottom="20px" fontStyle={"italic"}>Project realised in TypeScrip React and NestJS with a PostGreSQL database by Arthur Tinseau, Marc-Etienne Bonnet and Marc-Eloi Daillet.</Typography>
                <LogoWrapper>
                    <StyledLogo src={logo} alt="logo" />
                </LogoWrapper>
            </HeroContent>
        </HeroContainer>
    )
}