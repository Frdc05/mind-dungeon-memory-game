export default function Play({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M22 11V13H21V14H20V15H18V16H16V17H15V18H13V19H11V20H10V21H8V22H6V23H3V22H2V2H3V1H6V2H8V3H10V4H11V5H13V6H15V7H16V8H18V9H20V10H21V11H22Z" />
        </svg>
    );
}
