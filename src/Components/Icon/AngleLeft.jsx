export default function AngleLeft({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` }}
            className={className}
        >
            <path d="M17 5V7H16V8H15V9H14V10H13V11H12V13H13V14H14V15H15V16H16V17H17V19H16V20H14V19H13V18H12V17H11V16H10V15H9V14H8V13H7V11H8V10H9V9H10V8H11V7H12V6H13V5H14V4H16V5H17Z"/>
        </svg>
    );
}