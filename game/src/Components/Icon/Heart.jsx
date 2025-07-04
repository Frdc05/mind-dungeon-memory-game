export default function Heart({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M11 1V4H10V5H9V6H8V7H7V8H6V9H5V8H4V7H3V6H2V5H1V4H0V1H1V0H4V1H5V2H6V1H7V0H10V1H11Z"/>
        </svg>
    );
}
