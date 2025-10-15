import React, { useState } from 'react';
export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title: title.trim(), description: desc.trim() });
    setTitle(''); setDesc('');
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      <div className="flex gap-2">
        <input className="flex-1 p-2 border rounded" placeholder="New task title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button className="px-4 py-2 bg-emerald-500 text-white rounded">Add</button>
      </div>
      <input className="p-2 border rounded" placeholder="Description (optional)" value={desc} onChange={e=>setDesc(e.target.value)} />
    </form>
  );
}
