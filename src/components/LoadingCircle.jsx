export default function LoadingCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      height="1.5em"
      className="animate-spin mx-auto"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#ccc"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="black"
        strokeWidth="10"
        strokeDasharray="240"
        strokeDashoffset="0"
      ></circle>
    </svg>
  );
}
