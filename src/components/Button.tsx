export interface ButtonProps {
    text: React.ReactNode;
    type: string;
    onClick: () => void;
    className?: string;
    usePortal?: boolean;
} 

const Button: React.FC<ButtonProps> = ({ text, type, onClick, className }) => {
    return (
        <button 
        onClick={onClick} 
        className={`Button Button_${type}${className ? ` ${className}` : ''}`}
        >
            {text}
            {type === "POINT" && (
                <span className="point-arrow">{'>'}</span>
            )}
        </button>
    );
}

export default Button;