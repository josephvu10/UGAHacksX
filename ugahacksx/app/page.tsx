import React from "react";

export default function SunoAIHomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#1f2937', padding: '24px', textAlign: 'center' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Insert Title</h1>
        <nav>
          <button style={{ marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Home</button>
          <button style={{ marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Create</button>
          <button style={{ marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Library</button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Explore</button>
        </nav>
      </header>
      <main style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Create AI Music with Ease</h2>
        <button style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Generate Song</button>
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Recent Creations</h3>
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
              <span>"Dreamy Horizon" - Ambient, Soft</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>▶</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
              <span>"Lone Cowboy" - Country, Melodic</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>▶</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}