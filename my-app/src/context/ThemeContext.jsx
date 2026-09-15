import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [dark, setDark] = useLocalStorage('theme_dark', false)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
    }, [dark])

    return (
        <ThemeContext.Provider value={{ dark, toggle: () => setDark(!dark) }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}

