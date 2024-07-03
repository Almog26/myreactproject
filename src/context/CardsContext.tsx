import React, { createContext, useContext, useState } from 'react';
import { CardData } from '../@types/cardsData';

interface CardContextType {
    cards: CardData[];
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
    const value = useContext(CardContext);
    if (value === undefined) {
        throw new Error('Cant use outside of context')
    }
    return value;
}

const CardProvider = ({ children }: { children: React.ReactNode }) => {
    const [cards, setCards] = useState<CardData[]>([]);

    return (
        <CardContext.Provider value={{ cards, setCards }}>
            {children}
        </CardContext.Provider>
    );
};

export default CardProvider;