import React from 'react';

function CertificateList({ certificates, onEdit, onDelete }) {
  if (!certificates || certificates.length === 0) {
    return <div className="empty">No certificates found.</div>;
  }

  return (
    <div className="cards">
      {certificates.map((c) => (
        <div className="card" key={c.id}>
          <div className="card-header">
            <h3>{c.name}</h3>
            <small>Issuer: {c.issuer}</small>
          </div>

          <div className="card-body">
            <p><b>Issue:</b> {c.issueDate}</p>
            <p><b>Expiry:</b> {c.expiryDate}</p>
            <p><b>ID:</b> {c.id}</p>
          </div>

          <div className="card-actions">
            <button className="edit" onClick={() => onEdit(c)}>Edit</button>
            <button className="delete" onClick={() => onDelete(c.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CertificateList;
