export default function Loading() {
  return (
    <>
      <div className="absolute min-h-screen w-full flex justify-center items-center top-0 left-0 bg-slate-500/70 z-10">
        <p className="font-bold text-2xl text-slate-700">
          Fetching data. Please wait...
        </p>
      </div>
    </>
  );
}
