import React, { useEffect, useState } from 'react';

function CertificateForm({ onAdd, onUpdate, editing, cancelEdit }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    description: '',
    certificateUrl: ''
  });

  useEffect(() => {
    if (editing) {
      setForm({
        id: editing.id ?? '',
        name: editing.name ?? '',
        issuer: editing.issuer ?? '',
        issueDate: editing.issueDate ?? '',
        expiryDate: editing.expiryDate ?? '',
        description: editing.description ?? '',
        certificateUrl: editing.certificateUrl ?? ''
      });
    } else {
      setForm({
        id: '',
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        description: '',
        certificateUrl: ''
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.issuer || !form.issueDate || !form.expiryDate) {
      alert('Please fill all required fields');
      return;
    }

    const payload = {
      id: form.id ? Number(form.id) : undefined,
      name: form.name,
      issuer: form.issuer,
      issueDate: form.issueDate,
      expiryDate: form.expiryDate,
      description: form.description,
      certificateUrl: form.certificateUrl
    };

    if (editing) onUpdate(payload);
    else onAdd(payload);

    if (!editing) {
      setForm({
        id: '',
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        description: '',
        certificateUrl: ''
      });
    }
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

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </label>

        <label>
          Certificate URL
          <input
            type="text"
            name="certificateUrl"
            value={form.certificateUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
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
