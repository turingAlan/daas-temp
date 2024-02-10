
export default function Background() {
  return (
    <div className="fixed top-0 left-0 overflow-hidden inset-0 flex justify-center items-center gap-20 background_square -z-10 bg-pattern">
      <div className="mb-20 mr-40 rounded-full w-72 h-72 bg-gradient-to-b from-green-500 to-sky-600 opacity-30 blur-3xl"></div>
      <div className="mt-20 rounded-full w-52 h-52 bg-gradient-to-b from-cyan-500 to-purple-500 opacity-30 blur-3xl"></div>
    </div>
  );
}