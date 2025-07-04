export default function SoundOn({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M14 2V22H11V21H10V20H9V19H8V18H7V17H6V16H1V8H6V7H7V6H8V5H9V4H10V3H11V2H14Z"/>
            <path d="M17 15V14H16V13H17V11H16V10H17V9H18V10H19V14H18V15H17Z"/>
            <path d="M23 10V14H22V16H21V17H20V18H19V17H18V16H19V15H20V14H21V10H20V9H19V8H18V7H19V6H20V7H21V8H22V10H23Z"/>
        </svg>
    );
}

