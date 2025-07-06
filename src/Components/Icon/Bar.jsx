export default function Bar({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M22 11H23V13H22V14H2V13H1V11H2V10H22V11Z" />
            <path d="M22 19H23V21H22V22H2V21H1V19H2V18H22V19Z" />
            <path d="M23 3V5H22V6H2V5H1V3H2V2H22V3H23Z" />
        </svg>
    );
}