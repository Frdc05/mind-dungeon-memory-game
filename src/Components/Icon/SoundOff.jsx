export default function SoundOff({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M14 2V22H11V21H10V20H9V19H8V18H7V17H6V16H1V8H6V7H7V6H8V5H9V4H10V3H11V2H14Z"/>
            <path d="M22 8V10H21V11H20V13H21V14H22V16H20V15H19V14H18V15H17V16H15V14H16V13H17V11H16V10H15V8H17V9H18V10H19V9H20V8H22Z"/>
        </svg>
    );
}

