export default function Horn({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M23 10V13H22V14H21V9H22V10H23Z"/>
            <path d="M2 7H8V22H6V21H5V16H2V15H1V8H2V7Z"/>
            <path d="M20 2V21H19V20H18V19H16V18H14V17H12V16H10V7H12V6H14V5H16V4H18V3H19V2H20Z"/>
        </svg>
    );
}