import React, { useState } from 'react';
import { Flag, Shield, Terminal, Trophy, CheckCircle2 } from 'lucide-react';

const INITIAL_CHALLENGES = [
  { id: 1, title: 'JWT None Algorithm', category: 'Web', difficulty: 'Easy', points: 100, solves: 24, desc: 'Analysez le token JWT de session et forgez un accès administrateur.', demoFlag: 'ESI{jwt_n0n3_byp4ss}' },
  { id: 2, title: 'SQLi Blind Search', category: 'Web', difficulty: 'Medium', points: 250, solves: 11, desc: 'Extrayez la table secrète via une injection booléenne sur le endpoint /api/search.', demoFlag: 'ESI{bl1nd_sql_m4st3r}' },
  { id: 3, title: 'RSA Small Exponent', category: 'Crypto', difficulty: 'Easy', points: 150, solves: 19, desc: 'Déchiffrez le message chiffré avec e=3 sans padding.', demoFlag: 'ESI{cub3_r00t_rs4}' },
  { id: 4, title: 'Heap Overflow Intro', category: 'Pwn', difficulty: 'Hard', points: 450, solves: 4, desc: 'Exploitez un dépassement de tas pour rediriger le pointeur de fonction.', demoFlag: 'ESI{h34p_pwn_2026}' },
];

export default function App() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(INITIAL_CHALLENGES[0]);
  const [flagInput, setFlagInput] = useState('');
  const [solvedIds, setSolvedIds] = useState([]);
  const [status, setStatus] = useState(null);

  const filtered = category === 'All' ? INITIAL_CHALLENGES : INITIAL_CHALLENGES.filter(c => c.category === category);
  const score = INITIAL_CHALLENGES.filter(c => solvedIds.includes(c.id)).reduce((acc, c) => acc + c.points, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flagInput.trim() === selected.demoFlag) {
      if (!solvedIds.includes(selected.id)) setSolvedIds([...solvedIds, selected.id]);
      setStatus({ ok: true, msg: `Flag validé ! +${selected.points} pts` });
      setFlagInput('');
    } else {
      setStatus({ ok: false, msg: `Flag incorrect. Indice démo : ${selected.demoFlag}` });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-7 h-7 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">FlagForge CTF</h1>
              <p className="text-sm text-slate-400">React + Laravel API · Plateforme de challenges & write-ups</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-semibold text-emerald-300">{score} pts</span>
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {['All', 'Web', 'Crypto', 'Pwn'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                category === cat ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
            {filtered.map(ch => {
              const solved = solvedIds.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => { setSelected(ch); setStatus(null); }}
                  className={`text-left p-4 rounded-xl border transition ${
                    selected.id === ch.id
                      ? 'bg-slate-900 border-emerald-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300">{ch.category}</span>
                    <span className="text-xs font-mono text-slate-400">{ch.points} pts</span>
                  </div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {ch.title}
                    {solved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{ch.difficulty} · {ch.solves} solves</p>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-mono uppercase">{selected.category} · {selected.points} pts</span>
            </div>
            <h2 className="text-xl font-bold">{selected.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{selected.desc}</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={flagInput}
                onChange={e => setFlagInput(e.target.value)}
                placeholder="ESI{...}"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 font-mono text-sm focus:outline-none focus:border-emerald-400"
              />
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 rounded-lg transition">
                <Flag className="w-4 h-4" /> Soumettre le flag
              </button>
            </form>
            {status && (
              <p className={`text-xs font-mono p-2.5 rounded-lg ${status.ok ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                {status.msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
