import { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { getCustomDarkTheme, getCustomLightTheme } from './utils/theme';
import { ThemeProvider } from '@mui/material';
import { ThemeModeContext } from './contexts';
import { Layout } from './components/Layout/index';
import { Home } from './components/Pages/Home';
import { Game } from './components/Pages/PlayGame';
import { About } from './components/Pages/About/about';
import SignIn from './components/Pages/User/SignIn/SignIn';
import { Register } from './components/Pages/User/SignIn/Register';
import { UpdateProfile } from './components/Pages/User/Settings/UpdateProfile';
import { Profile } from './components/Pages/User/MyProfile/Profile';
import { PublicProfiles } from './components/Pages/Social/PublicProfiles/PublicProfiles';
import { PublicProfile } from './components/Pages/Social/PublicProfiles/PublicProfile';
import { SignIn2FA } from './components/Pages/User/SignIn/SignIn2Fa';
import { Pong } from './components/Pages/Game/index'
import { PongLayout } from './components/Layout/pongLayout' 
import EnableTwoFactor from './components/Pages/User/Settings/EnableTwoFa';
import DisableTwoFactor from './components/Pages/User/Settings/DisableTwoFactor';
import TwoFactor from './components/Pages/User/Settings/TwoFactor';
import { Waiting } from './components/Pages/Game/Waiting';
import { Chat } from './components/Pages/Social/Chat/Chat';
import { CreateConv } from './components/Pages/Social/Chat/CreateConv/CreateConv';
import { CreateDirectConv } from './components/Pages/Social/Chat/CreateConv/CreateDirectConv';
import { CreateGroupConv } from './components/Pages/Social/Chat/CreateConv/CreateGroupConv';
import { AdminPanel } from './components/Pages/Social/Chat/ChatFeed/AdminPanel';
import { JoinConversation } from './components/Pages/Social/Chat/CreateConv/JoinConversation';

function App() {
  const [mode, setMode] = useState(false); // Create a variable so we can define the mode on being either light or dark
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((mode) => (mode ? false : true));
      },
    }),
    []
  );
  const theme = (mode ? getCustomDarkTheme() : getCustomLightTheme());

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/2fasignin" element={<SignIn2FA/>} />
            <Route path="/home" element={<Layout children={<Home/>} /> } />
            <Route path="/game" element={<Layout children={<Game/>} /> } />
            <Route path="/game/waiting" element={<Layout children={<Waiting/>} /> } />
            <Route path="/game/playing" element={<PongLayout children={<Pong/>} /> } />
            <Route path="/game/spectate" element={<Layout children={<Home/>} /> } />  
            <Route path="/social/chat" element={<Layout children={<Chat/>} /> } />
            <Route path="/social/chat/createConv" element={<Layout children={<CreateConv/>} /> } />
            <Route path="/social/chat/createDirectConv" element={<Layout children={<CreateDirectConv/>} /> } />
            <Route path="/social/chat/createGroupConv" element={<Layout children={<CreateGroupConv/>} /> } />
            <Route path="/social/chat/joinConversation" element={<Layout children={<JoinConversation/>} /> } />
            <Route path="/social/chat/adminpanel" element={<Layout children={<AdminPanel/>} /> } />
            <Route path="/social/publicprofiles" element={<Layout children={<PublicProfiles/>} /> } />
            <Route path="/social/publicprofile" element={<Layout children={<PublicProfile/>} /> } />
            <Route path="/user/profile" element={<Layout children={<Profile/>} /> } />
            <Route path="/user/updateprofile" element={<Layout children={<UpdateProfile/>} /> } />
            <Route path="/user/twofactor" element={<Layout children={<TwoFactor/>} /> } />
            <Route path="/user/enabletwofactor" element={<Layout children={<EnableTwoFactor/>} /> } />
            <Route path="/user/disabletwofactor" element={<Layout children={<DisableTwoFactor/>} /> } />
            <Route path="/about" element={<Layout children={<About/>} /> } />
          </Routes>
        </Router>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default App;
