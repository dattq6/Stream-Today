import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface TournamentContextType {
    tournament: string;
    setTournament: (value: string) => void;
}

// Create the context with default values
const AppContext = createContext<TournamentContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tournament, setTournament] = useState<string>('nfl');

    return (
        <AppContext.Provider value={{ tournament, setTournament }}>
            {children}
        </AppContext.Provider>
    );
};


export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};


export const useTournament = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useTournament must be used within a AppProvider');
    }
    return context.tournament;
};
