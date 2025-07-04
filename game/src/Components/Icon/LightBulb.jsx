export default function Horn({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M3 1H2V2H3V1Z"/>
            <path d="M4 2H3V3H4V2Z"/>
            <path d="M5 3H4V4H5V3Z"/>
            <path d="M2 16H1V17H2V16Z"/>
            <path d="M3 15H2V16H3V15Z"/>
            <path d="M4 14H3V15H4V14Z"/>
            <path d="M23 16H22V17H23V16Z"/>
            <path d="M22 15H21V16H22V15Z"/>
            <path d="M21 14H20V15H21V14Z"/>
            <path d="M22 1H21V2H22V1Z"/>
            <path d="M21 2H20V3H21V2Z"/>
            <path d="M20 3H19V4H20V3Z"/>
            <path d="M3 8H1V9H3V8Z"/>
            <path d="M15 18V21H14V22H13V23H11V22H10V21H9V18H15Z"/>
            <path d="M19 5H18V4H17V3H16V2H14V1H10V2H8V3H7V4H6V5H5V7H4V11H5V13H6V14H7V15H8V16H9V17H15V16H16V15H17V14H18V13H19V11H20V7H19V5ZM7 7H8V6H9V5H10V4H13V5H10V6H9V7H8V9H7V7Z"/>
            <path d="M23 8H21V9H23V8Z"/>
        </svg>
    );
}
