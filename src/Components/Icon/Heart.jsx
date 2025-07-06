export default function Heart({ w , h , className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: `${w}px`, height: `${h}px` ,imageRendering: 'pixelated'}}
            className={className}
        >
            <path d="M22 3V8H21V9H20V10H19V11H18V12H17V13H16V14H15V15H14V16H13V17H12V18H10V17H9V16H8V15H7V14H6V13H5V12H4V11H3V10H2V9H1V8H0V3H1V2H2V1H3V0H9V1H10V2H12V1H13V0H19V1H20V2H21V3H22Z"/>
        </svg>
    );
}