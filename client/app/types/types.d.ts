export interface NavbarList {
    label: string,
    to: string,
    disabled?: boolean,
    onClick?: any,
    icon?: string,
    children?: boolean,
}

// Button
interface UiButton {
    size?: 'sm' | 'md' | 'lg' | 'xl',
    color?: 'blue' | 'whitesmoke' | 'orange' | 'orange' | 'green' | 'white' | 'neutral',
    label: string,
    loading?: boolean,
    type?: 'button' | 'submit' | 'reset',
    link?: string
}