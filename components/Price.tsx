export default function Price({
  price,
  was,
  note,
  className = "",
}: {
  price: string;
  was?: string;
  note?: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {was && (
        <s className="mr-2 text-[0.7em] font-normal">
          <span className="sr-only">Regular price </span>
          {was}
        </s>
      )}
      <span>
        {was && <span className="sr-only">Launch price </span>}
        {price}
      </span>
      {was && (
        <span
          aria-hidden="true"
          className="ml-2 align-middle rounded-full bg-magenta px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-white"
        >
          Launch price
        </span>
      )}
      {note && <span className="mt-1 block text-xs font-normal opacity-80">{note}</span>}
    </p>
  );
}
