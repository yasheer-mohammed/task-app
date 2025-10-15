// import React, { useState } from 'react';
// export default function AuthForm({ onLogin, onRegister }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   return (
//     <div className="grid gap-3 max-w-md">
//       <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded" />
//       <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border rounded" />
//       <div className="flex gap-3">
//         <button onClick={() => onLogin(email, password)} className="px-4 py-2 bg-slate-800 text-white rounded">Login</button>
//         <button onClick={() => onRegister(email, password)} className="px-4 py-2 border rounded">Register</button>
//       </div>
//       <div className="text-xs text-slate-500">Demo: register any email + password. Passwords are stored hashed in DB.</div>
//     </div>
//   );
// }
