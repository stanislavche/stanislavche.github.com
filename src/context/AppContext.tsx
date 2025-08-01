import { createContext } from 'react';
import type { AppData } from '@/types/appData';

export const AppContext = createContext<AppData | null>(null);
