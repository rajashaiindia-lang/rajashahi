'use client';

function Row({ label, win }: { label: string; win?: number | null }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-sm text-gray-600">{label}</span>
      <div className="grid grid-cols-10 gap-1 flex-1">
        {Array.from({ length: 10 }, (_, i) => i).map((n) => (
          <div
            key={n}
            className={`text-center py-2 border rounded text-sm select-none ${
              win === n ? 'bg-indigo-600 text-white font-semibold' : 'bg-gray-50'
            }`}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SingleBoards({
  openingDigit,
  closingDigit,
}: {
  openingDigit?: number | null;
  closingDigit?: number | null;
}) {
  return (
    <div className="p-4 border rounded bg-white space-y-3">
      <p className="font-medium">Single Boards</p>
      <Row label="Opening" win={openingDigit} />
      <Row label="Closing" win={closingDigit} />
    </div>
  );
}
