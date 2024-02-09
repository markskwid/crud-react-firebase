export default function Toast({ isError, message, icon }) {
  return (
    <div
      className={`p-2 ${
        isError ? "bg-red-400" : "bg-green-400"
      } absolute bottom-5 right-5 rounded-lg `}
    >
      <p className="text-base text-slate-900">
        <span className="inline-block text-lg translate-y-1 mr-1">
          <ion-icon name={icon}></ion-icon>
        </span>
        {message}
      </p>
    </div>
  );
}
