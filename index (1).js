import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { qrAPI } from '../api';

export default function QRPage() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await qrAPI.scan(token);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid QR code');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f4ff' }}>
      <div className="spinner" style={{ border: '4px solid #e0e7ff', borderTopColor: '#4f46e5' }}></div>
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: 40, borderRadius: 16, textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: 48 }}>❌</div>
        <h2 style={{ marginTop: 16, color: '#ef4444' }}>Invalid QR Code</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>{error}</p>
      </div>
    </div>
  );

  const { patient, records } = data;

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh', padding: 20 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🏥 MediVault
          </h1>
          <p style={{ color: '#64748b' }}>Patient Medical Profile</p>
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: 16 }}>
          <h2 style={{ marginBottom: 16 }}>👤 {patient.name}</h2>
          {[
            { label: '🩸 Blood Group', value: patient.bloodGroup },
            { label: '📞 Phone', value: patient.phone },
            { label: '📧 Email', value: patient.email },
            { label: '📍 Address', value: patient.address }
          ].filter(i => i.value).map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b' }}>{item.label}</span>
              <span style={{ fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: 16 }}>📋 Medical Records ({records?.length || 0})</h3>
          {records?.length === 0 && <p style={{ color: '#94a3b8', textAlign: 'center' }}>No records available</p>}
          {records?.map(record => (
            <div key={record._id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 24 }}>📄</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{record.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {record.type.replace('_', ' ')} • {new Date(record.createdAt).toLocaleDateString()}
                </div>
                {record.diagnosis && <div style={{ fontSize: '0.8rem', color: '#4f46e5' }}>Diagnosis: {record.diagnosis}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
