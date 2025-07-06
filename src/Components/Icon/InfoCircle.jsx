export default function Horn({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <g clip-path="url(#clip0_354_3517)">
            <path d="M22 9V7H21V5H20V4H19V3H17V2H15V1H9V2H7V3H5V4H4V5H3V7H2V9H1V15H2V17H3V19H4V20H5V21H7V22H9V23H15V22H17V21H19V20H20V19H21V17H22V15H23V9H22ZM11 6H13V8H11V6ZM10 15H11V10H10V9H13V15H14V17H10V15Z"/>
            </g>
            <defs>
            <clipPath id="clip0_354_3517">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    );
}

