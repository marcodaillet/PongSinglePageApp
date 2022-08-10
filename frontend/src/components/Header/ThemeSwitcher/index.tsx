import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { ThemeModeContext } from '../../../contexts';
import { LIGHT_MODE_THEME } from '../../../utils/constants';
import { ActionItem } from "../../ActionsHandler/ActionItem";

export const ThemeSwitcher = ({ disableTooltip = false }: {disableTooltip?: boolean }) => {
    const theme = useTheme();
    const { toggleThemeMode } = useContext(ThemeModeContext);

    return (
        <ActionItem
        title="Toggle Theme"
        icon={theme.palette.mode === LIGHT_MODE_THEME ? LightModeIcon : ModeNightIcon}
        onClick={toggleThemeMode}
        disableTooltip={disableTooltip}
        />
    );
};