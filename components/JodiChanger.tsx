'use client';

import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
const fetcher = (u: string) => fetch(u).then(r => r.json());

function defaultSeq() {
  return Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));
}

export default function AdminJodiChartPage() {
  const { data, mutate } = useSWR<{ sequence: string[] }>('/api/jodi-chart', fetcher);
  const [seq, setSeq] = useState<string[]>(defaultSeq());
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');

  useEffect(() => { if (data?.sequence) setSeq(data.sequence); }, [data]);

  const invalid = useMemo(() => {
    const s = new Set(seq);
    const two = (x:string)=>/^\d{2}$/.test(x);
    return !(seq.length === 100 && seq.every(two) && s.size === 100);
  }, [seq]);

  function onDragStart(i:number){ setDragIdx(i); }
  function onDragOver(e:React.DragEvent){ e.preventDefault(); }
  function onDrop(i:number){
    if (dragIdx === null || dragIdx === i) return;
    setSeq(prev => { const a = prev.slice(); [a[dragIdx], a[i]] = [a[i], a[dragIdx]]; return a; });
    setDragIdx(null);
  }

  async function save(){
    setSaving(true); setMsg(null);
    try{
      const r = await fetch('/api/jodi-chart/save', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ sequence: seq })
      });
      const j = await r.json();
      if(!r.ok) throw new Error(j.error || 'Save failed');
      setMsg('✅ Saved successfully!');
      setMsgType('success');
      mutate();
    }catch(e:any){ 
      setMsg('⚠️ ' + e.message); 
      setMsgType('error');
    }
    finally{ setSaving(false); }
  }

  function reset(){ setSeq(defaultSeq()); setMsg('🔄 Reset to default order'); setMsgType('success'); }
  function shuffle(){
    setSeq(prev => {
      const a = prev.slice();
      for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
      return a;
    });
    setMsg('🎲 Shuffled successfully!');
    setMsgType('success');
  }
  function importText(t:string){
    const items = t.split(/[\s,;]+/).map(s=>s.trim()).filter(Boolean);
    if(items.length!==100){ setMsg('⚠️ Paste exactly 100 items'); setMsgType('error'); return; }
    setSeq(items.map(s=>s.padStart(2,'0')));
    setMsg('📥 Import successful!');
    setMsgType('success');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] py-6 border-b-4 border-yellow-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/admin/dashboard"
              className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition-all text-yellow-200 font-semibold flex items-center gap-2"
            >
              ← Back
            </a>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              JODI CHART EDITOR
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 mt-6">
        {/* Status Messages */}
        {msg && (
          <div className={`rounded-lg p-4 border-2 ${
            msgType === 'success' 
              ? 'bg-green-500/10 border-green-500 text-green-200' 
              : 'bg-red-500/10 border-red-500 text-red-200'
          }`}>
            {msg}
          </div>
        )}

        {invalid && (
          <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-4 text-yellow-200">
            ⚠️ Sequence invalid (100 unique 2-digit codes required)
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-lg">
          <div className="flex flex-wrap gap-3 items-center">
            <button 
              onClick={reset} 
              className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 transition-all text-blue-200 font-semibold"
            >
              🔄 Reset
            </button>
            <button 
              onClick={shuffle} 
              className="px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 transition-all text-purple-200 font-semibold"
            >
              🎲 Shuffle
            </button>
            <button
              onClick={save}
              disabled={saving || invalid}
              className={`ml-auto px-6 py-2 rounded-lg font-bold transition-all transform ${
                saving || invalid 
                  ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-[1.02]'
              } text-white shadow-lg`}
            >
              {saving ? '⏳ Saving…' : '💾 Save Changes'}
            </button>
          </div>
        </div>

        {/* Jodi Grid */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-yellow-400">📊 Drag to Reorder</h2>
            <span className="text-sm text-gray-400">
              {seq.filter((v, i, a) => a.indexOf(v) === i).length}/100 unique
            </span>
          </div>
          <div className="grid grid-cols-10 gap-2 p-4 rounded-lg bg-black/30">
            {seq.map((code, i) => (
              <div
                key={i}
                draggable
                onDragStart={()=>onDragStart(i)}
                onDragOver={onDragOver}
                onDrop={()=>onDrop(i)}
                className={`
                  h-12 w-full flex items-center justify-center select-none cursor-move
                  text-base font-bold border-2 rounded-lg transition-all
                  ${dragIdx===i 
                    ? 'bg-yellow-400 text-black border-yellow-600 scale-110 shadow-lg' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 text-yellow-300 border-gray-600 hover:border-yellow-500 hover:scale-105'
                  }
                `}
                title="Drag to swap positions"
              >
                {code}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            💡 Tip: Click and drag any number to swap positions
          </p>
        </div>

        {/* Import/Export Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Import */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
              📥 Import Sequence
            </h3>
            <textarea 
              className="w-full h-40 p-3 bg-black/50 border-2 border-gray-600 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="00,01,02,03,04,05,..." 
              onBlur={(e)=>importText(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-2">
              💡 Paste comma/space separated values and click outside to apply
            </p>
          </div>

          {/* Export */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
              📤 Export Sequence
            </h3>
            <textarea 
              className="w-full h-40 p-3 bg-black/50 border-2 border-gray-600 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-green-500 outline-none" 
              readOnly 
              value={seq.join(',')} 
              onFocus={(e)=>e.currentTarget.select()}
            />
            <p className="text-xs text-gray-400 mt-2">
              💡 Click inside to auto-select all and copy
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border-2 border-blue-600/30 shadow-lg">
          <h3 className="text-lg font-bold text-blue-300 mb-3">ℹ️ How to Use</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong>Drag & Drop:</strong> Click and drag any number to swap positions</li>
            <li>• <strong>Reset:</strong> Restore default order (00-99)</li>
            <li>• <strong>Shuffle:</strong> Randomize all positions</li>
            <li>• <strong>Import:</strong> Paste 100 comma-separated values</li>
            <li>• <strong>Export:</strong> Copy current sequence to clipboard</li>
            <li>• <strong>Save:</strong> Apply changes to the live chart</li>
          </ul>
        </div>
      </div>
    </main>
  );
}