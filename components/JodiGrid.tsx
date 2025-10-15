'use client';

export default function JodiGrid({ highlight }: { highlight?: string | null }) {
  const cells = Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="p-4 border rounded bg-white">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">Jodi (00–99)</p>
        <p className="text-sm text-gray-500">
          Winner: <span className="font-semibold">{highlight ?? '—'}</span>
        </p>
      </div>

      <div className="grid grid-cols-10 gap-1">
        {cells.map((code) => {
          const isWin = highlight === code;
          return (
            <div
              key={code}
              className={`text-center py-2 border rounded text-sm select-none ${
                isWin ? 'bg-emerald-600 text-white font-semibold' : 'bg-gray-50'
              }`}
            >
              {code}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        The 00–99 grid is static; only the winning Jodi is highlighted each session.
      </p>
    </div>
  );
}
