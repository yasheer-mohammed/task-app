import React from 'react';
export default function FilterBar({ filter, setFilter }) {
  const items = ['all','pending','completed'];
  return (
    <div className="flex gap-2">
      {items.map(i => (
        <button key={i} onClick={()=>setFilter(i)} className={`px-3 py-1 rounded ${filter===i ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>
          {i[0].toUpperCase()+i.slice(1)}
        </button>
      ))}
    </div>
  );
}
