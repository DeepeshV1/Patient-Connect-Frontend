// src/pages/Patient/Blogs.js
import React, { useState } from "react";
import { Rss } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const posts = [
  { id: "b1", title: "Morning Yoga Routines", excerpt: "Start your day with energy...", content: "Full yoga post..." },
  { id: "b2", title: "Superfoods for Heart Health", excerpt: "Foods that support heart...", content: "Full blog..." },
];

export default function Blogs() {
  const [active, setActive] = useState(null);
  const { accentColor } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold" style={{ color: accentColor }}><Rss className="inline mr-2" /> Blogs</h1>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {posts.map(p => (
              <article key={p.id} className="rounded-lg border p-4 bg-white dark:bg-slate-900">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.excerpt}</p>
                <button onClick={() => setActive(p.id)} className="text-teal-600 text-sm mt-2">Read more</button>
              </article>
            ))}
          </div>
          <aside className="space-y-4">
            {active ? (
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-900">
                <h4 className="font-semibold">{posts.find(x=>x.id===active).title}</h4>
                <p className="text-sm">{posts.find(x=>x.id===active).content}</p>
                <button onClick={() => setActive(null)} className="mt-2 text-sm">Close</button>
              </div>
            ) : (
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-900">
                <p className="text-sm text-gray-600">Select a blog to read details.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
