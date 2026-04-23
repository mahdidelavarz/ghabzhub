export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={className}>
      <span className="font-extrabold select-none">قبض هـابــ</span>
    </a>
  );
}

export function ColorfulLogo({
  colors = "from-cyan-200 via-blue-200 to-cyan-200",
}: {
  colors?: string;
}) {
  return (
    <span
      className={`bg-linear-to-r ${colors} bg-clip-text text-transparent font-black`}
    >
      قبض هـابــ
    </span>
  );
}
