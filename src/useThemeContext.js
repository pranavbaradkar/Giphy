import { useEffect, useState } from "react"
import { darkThemeColor, lightThemeColor } from "./constant"

export const useThemeContext = () => {
    const [isDark, setIsDark] = useState(false);
    const [themeColorScheme, setThemeColorScheme] = useState(isDark ? darkThemeColor : lightThemeColor);

    useEffect(() => {
        setThemeColorScheme(isDark ? darkThemeColor : lightThemeColor);
    }, [isDark]);

    const handleTheme = () => {
        setIsDark((isDark) => !isDark);
    }

    return {
        themeColorScheme,
        isDark,
        handleTheme,
        setIsDark,
    }
}