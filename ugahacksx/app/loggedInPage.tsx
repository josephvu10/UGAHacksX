import React from "react";

export default function SunoAIWorkspace() {
    const songs = [
      { title: "Shattered Dreams", duration: "3:51", mood: "Reflective, Sad" },
      { title: "Lonesome Cowboy", duration: "3:19", mood: "Melodic, Country" },
    ];
  
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#1f2937', padding: '24px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #ddd' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>SUNO AI</h1>
          <nav>
            <button style={{ marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Home</button>
            <button style={{ marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Create</button>
            <button style={{ marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Library</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Explore</button>
          </nav>
        </header>
        <main style={{ maxWidth: '900px', margin: '40px auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>My Workspace</h2>
          <button style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>+ Create</button>
          <div style={{ marginTop: '40px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Your Songs</h3>
            <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
              {songs.map((song, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600' }}>{song.title}</h4>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{song.mood}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '14px' }}>{song.duration}</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>▶</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
  