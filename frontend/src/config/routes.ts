import { Route } from "../datamodels/route";
import HomeIcon from '@mui/icons-material/Home';
import GamepadIcon from '@mui/icons-material/Gamepad';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { Game } from "../components/Pages/PlayGame";

const routes: Array<Route> = [
    {
        key: 'router-home',
        title: 'Home',
        description: 'Home page',
        isEnabled: true,
        path: '/home',
        icon: HomeIcon,
        appendDivider: true,
    },
    {
        key: 'router-playgame',
        title: 'Play Game',
        description: 'Play Game',
        isEnabled: true,
        path: '/game',
        icon: GamepadIcon,
    },
    {
        key: 'router-social',
        title: 'Social',
        description: 'Social',
        isEnabled: false,
        path: '/social',
        icon: GroupIcon,
        subRoutes: [
            {
                key: 'router-chat',
                title: 'Chat',
                description: 'Chat page',
                isEnabled: true,
                path: '/social/chat',
                icon: ChatIcon,
            },
            {
                key: 'router-publicprofiles',
                title: 'Public Profiles',
                description: 'The Players',
                isEnabled: true,
                path: '/social/publicprofiles',
                icon: EqualizerIcon,
            },
        ]
    },
    {
        key: 'router-account',
        title: 'Account',
        description: 'Account',
        isEnabled: false,
        path: '/user',
        icon: AccountCircleIcon,
        subRoutes: [
            {
                key: 'router-profile',
                title: 'My profile',
                description: 'My profile',
                isEnabled: true,
                path: '/user/profile',
                icon: AccountCircleIcon,
            },

            {
                key: 'router-updateprofile',
                title: 'Update Profile',
                description: 'Update Profile',
                isEnabled: true,
                path: '/user/updateprofile',
                icon: SettingsIcon,
            },
            {
                key: 'router-twofact',
                title: 'Two Factor',
                description: 'Activate or Deactivate the 2FA',
                isEnabled: true,
                path: '/user/twofactor',
                icon: LockIcon,
            },
        ]
    },
    {
        key: 'router-about',
        title: 'About',
        description: 'About',
        isEnabled: true,
        path: '/about',
        icon: HelpIcon,
    },
];

export default routes;