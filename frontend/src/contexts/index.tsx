import { createContext } from 'react';
import { User } from '../datamodels/user'

export interface IThemeModeContext {
  toggleThemeMode: () => void;
}
export const ThemeModeContext = createContext<IThemeModeContext>({} as IThemeModeContext);

export interface IAppContext {
  user: User;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);