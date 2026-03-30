function GrayLine({ className }: { className?: string }) {
  return (
    <div className={`w-full h-6 flex justify-center items-center ${className}`}>
      <span className="w-13 h-1.5 rounded-full bg-gray-300"></span>
    </div>
  );
}

export default GrayLine;
