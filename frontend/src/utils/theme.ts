import { createTheme, responsiveFontSizes, Theme} from '@mui/material/styles'
import { DRAWER_WIDTH } from './constants';
import { CSSObject} from '@mui/material';

export const getCustomDarkTheme = () => {
    let darkTheme = createTheme({
    palette: {
            mode: 'dark',
            primary: {
                main: '#6281ca',
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
        }
    });
    darkTheme = responsiveFontSizes(darkTheme);
    return darkTheme;
};

export const getCustomLightTheme = () => {
    let lightTheme = createTheme({
    palette: {
            mode: 'light',
            primary: {
                main: '#6281ca',
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
        }
    });
    lightTheme = responsiveFontSizes(lightTheme);
    return lightTheme;
};


export const navOpeningStyle = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

export const navClosingStyle = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});