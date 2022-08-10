import { useEffect, useState } from "react";
import styled from "styled-components";
// import { CustomVideo } from "./video";
import { Typography, styled as StyledM, Box } from "@mui/material";
import axios from "axios";

export const PageTitle = ({ title }: {title: string}) => (
    <StyledPageTitle variant="h2" component="h3" color="textSecondary" align="center">
      {title}
    </StyledPageTitle>
);

const StyledPageTitle = StyledM(Typography)<{ component: string }>`
  text-transform: uppercase;
`;

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
`;

export const Home = () =>
{
    const [username, setUsername] = useState('');
    useEffect(() => {
        let bool = true;
        const getUsername = async () => {
            try {
                const data = await axios.get('userData');
                if (bool)
                    setUsername(data.data.username);
            }
            catch (error) {
                console.log("error while fetching user data")
            }
        }
        getUsername();
        return () =>{bool = false};
    }, []);

    return (
        <HeroContainer>
            {/* <CustomVideo/> */}
            <HeroContent>
                <PageTitle title={"Welcome"} />
                <Typography fontSize={32} color="textSecondary"> {username} ! </Typography>
                <Box sx = {{ flexGrow: 1, p: 5 }} /> 
            </HeroContent>
        </HeroContainer>
    )
}