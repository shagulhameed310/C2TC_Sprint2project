import React, { useEffect, useState } from 'react';

function CertificateForm({ onAdd, onUpdate, editing, cancelEdit }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: ''
  });

  useEffect(() => {
    if (editing) {
      setForm({
        id: editing.id ?? '',
        name: editing.name ?? '',
        issuer: editing.issuer ?? '',
        issueDate: editing.issueDate ?? '',
        expiryDate: editing.expiryDate ?? ''
      });
    } else {
      setForm({ id: '', name: '', issuer: '', issueDate: '', expiryDate: '' });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.issuer || !form.issueDate || !form.expiryDate) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      id: form.id ? Number(form.id) : undefined,
      name: form.name,
      issuer: form.issuer,
      issueDate: form.issueDate,
      expiryDate: form.expiryDate
    };

    if (editing) onUpdate(payload);
    else onAdd(payload);

    if (!editing) setForm({ id: '', name: '', issuer: '', issueDate: '', expiryDate: '' });
  };

  return (
    <div className="form-card">
      <h2>{editing ? 'Update Certificate' : 'Add Certificate'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          ID
          <input
            type="number"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="(optional) numeric id"
          />
        </label>

        <label>
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Issuer
          <input type="text" name="issuer" value={form.issuer} onChange={handleChange} />
        </label>

        <label>
          Issue Date
          <input type="date" name="issueDate" value={form.issueDate} onChange={handleChange} />
        </label>

        <label>
          Expiry Date
          <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default CertificateForm;
