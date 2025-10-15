'use client';

import useSWR from 'swr';
const fetcher = (u:string)=>fetch(u).then(r=>r.json());

function defaultCells(){ return Array.from({length:100},(_,i)=>String(i).padStart(2,'0')); }

export default function JodiMatrix({ winner }: { winner?: string | null }) {
  const { data } = useSWR<{ sequence:string[] }>('/api/jodi-chart', fetcher);
  const CELLS = data?.sequence ?? defaultCells();

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="text-center mb-2">
        <a href="#bottom" className="inline-block bg-orange-200 text-orange-900 border-2 border-orange-600 px-3 py-1 rounded font-bold">
          Go to Bottom
        </a>
      </div>

      <div className="border-[6px] border-purple-700 rounded p-1 bg-white">
        <div className="grid grid-cols-10 gap-0.5">
          {CELLS.map(code => {
            const isWin = winner === code;
            return (
              <div
                key={code}
                className={[
                  'h-10 w-10 flex items-center justify-center select-none',
                  'text-[13px] font-semibold border border-gray-400 rounded-sm',
                  isWin ? 'bg-red-600 text-white border-red-700 shadow-inner' : 'bg-white text-black'
                ].join(' ')}
              >
                {code}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
