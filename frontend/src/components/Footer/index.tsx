import { styled, Typography } from '@mui/material';
import { FOOTER_TEXT, FOOTER_HEIGHT } from '../../utils/constants';

export const Footer = () => (
    <FooterWrapper>
        <FooterText variant="caption" color="textSecondary">
            {FOOTER_TEXT}
        </FooterText>
    </FooterWrapper>
);

const FooterWrapper = styled('div')(
    ({ theme }) => `
      flex: 1;
      display: flex;
      justify-content: center;
      margin-left: 70px;
      background: ${theme.palette.background.paper};
      minHeight: ${FOOTER_HEIGHT};
  `
  );

const FooterText = styled(Typography)`
    word-spacing: 0.5rem;
    text-transform: uppercase;
`;