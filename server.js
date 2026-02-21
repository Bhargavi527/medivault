import React, { useState } from 'react';
import { recordsAPI } from '../api';
import { toast } from 'react-toastify';

const RECORD_TYPES = [
  { value: 'prescription', label: '💊 Prescription' },
  { value: 'lab_report', label: '🧪 Lab Report' },
  { value: 'xray', label: '🩻 X-Ray' },
  { value: 'scan', label: '🔬 Scan' },
  { value: 'discharge_summary', label: '🏥 Discharge Summary' },
  { value: 'vaccination', label: '💉 Vaccination' },
  { value: 'other', label: '📄 Other' }
];

export default function AddRecordModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', type: 'other', description: '', diagnosis: '', tags: ''
  });
  const [file, setFile] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title) return toast.error('Record title is required');

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) formData.append(k, v); });
      if (file) formData.append('file', file);

      await recordsAPI.add(formData);
      toast.success('Medical record added successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>➕ Add Medical Record</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Blood Test Results - Jan 2024" required />
          </div>

          <div className="form-group">
            <label>Record Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              {RECORD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Diagnosis / Condition</label>
            <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="e.g. Hypertension, Diabetes Type 2" />
          </div>

          <div className="form-group">
            <label>Description / Notes</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Additional details about this record..."
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="blood test, cholesterol, annual checkup" />
          </div>

          <div className="form-group">
            <label>Attach File (PDF, Image, Doc - max 10MB)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={e => setFile(e.target.files[0])}
              style={{ border: '2px dashed #cbd5e1', padding: '12px' }}
            />
            {file && <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: 4 }}>✅ {file.name}</p>}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Uploading...' : 'Save Record'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
