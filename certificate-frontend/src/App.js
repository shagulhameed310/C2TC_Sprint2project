import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CertificateForm from './components/CertificateForm';
import CertificateList from './components/CertificateList';

const API = 'http://127.0.0.1:8080/certificate'; // update if backend runs on different port

function App() {
  const [certificates, setCertificates] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API);
      setCertificates(res.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Cannot fetch certificates. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  const addCertificate = async (data) => {
    setError(null);
    try {
      // If backend doesn't auto-generate id, ensure an id is provided
      if (data.id === undefined || data.id === null || data.id === '') {
        data.id = Date.now();
      }
      await axios.post(API, data);
      fetchCertificates();
    } catch (err) {
      console.error('Add error:', err);
      setError('Failed to add certificate');
    }
  };

  const updateCertificate = async (data) => {
    setError(null);
    try {
      await axios.put(`${API}/${data.id}`, data);
      setEditing(null);
      fetchCertificates();
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update certificate');
    }
  };

  const deleteCertificate = async (id) => {
    setError(null);
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchCertificates();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete certificate');
    }
  };

  return (
    <div className="app-wrap">
      <header>
        <h1>Certificate Management System</h1>
      </header>

      <main className="main">
        <section className="left">
          <CertificateForm
            onAdd={addCertificate}
            onUpdate={updateCertificate}
            editing={editing}
            cancelEdit={() => setEditing(null)}
          />
        </section>

        <section className="right">
          <div className="toolbar">
            <button onClick={fetchCertificates} className="primary">Refresh</button>
            {loading && <span className="info">Loading...</span>}
            {error && <span className="error">{error}</span>}
          </div>

          <CertificateList
            certificates={certificates}
            onEdit={(c) => setEditing(c)}
            onDelete={deleteCertificate}
          />
        </section>
      </main>

      <footer>
        <small>Frontend: <code>http://localhost:3000</code> — Backend must be at <code>http://127.0.0.1:8080</code></small>
      </footer>
    </div>
  );
}

export default App;
