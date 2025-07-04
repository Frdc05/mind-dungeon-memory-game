export default function Gear({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M21 10V9H20V7H21V5H20V4H19V3H17V4H15V3H14V1H10V3H9V4H7V3H5V4H4V5H3V7H4V9H3V10H1V14H3V15H4V17H3V19H4V20H5V21H7V20H9V21H10V23H14V21H15V20H17V21H19V20H20V19H21V17H20V15H21V14H23V10H21ZM10 10V9H14V10H15V14H14V15H10V14H9V10H10Z"/>
        </svg>
    );
}

