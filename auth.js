import React, { useState } from 'react';
import { qrAPI } from '../api';
import { toast } from 'react-toastify';

export default function QRCodeDisplay({ user }) {
  const [qrCode, setQrCode] = useState(user?.qrCode || null);
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    try {
      const { data } = await qrAPI.generate();
      setQrCode(data.qrCode);
      toast.success('QR Code generated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate QR code. Please try again.');
      console.error('QR Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.download = `medivault-qr-${user?.name?.replace(/\s+/g, '-')}.png`;
    link.href = qrCode;
    link.click();
    toast.success('QR Code downloaded!');
  };

  return (
    <div className="qr-wrapper">
      {qrCode ? (
        <>
          <img src={qrCode} alt="Patient QR Code" style={{ width: 200, height: 200 }} />
          <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
            Doctors can scan this QR to view your medical profile
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={downloadQR} style={{ fontSize: '0.85rem' }}>
              ⬇ Download QR
            </button>
            <button className="btn btn-secondary" onClick={generateQR} disabled={loading} style={{ fontSize: '0.85rem' }}>
              🔄 Regenerate
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ 
            width: 200, height: 200, background: '#f1f5f9', 
            borderRadius: 12, display: 'flex', alignItems: 'center', 
            justifyContent: 'center', flexDirection: 'column', gap: 8,
            border: '2px dashed #cbd5e1'
          }}>
            <span style={{ fontSize: 40 }}>📱</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No QR yet</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
            Generate your personal QR code for easy record sharing
          </p>
          <button className="btn btn-primary" onClick={generateQR} disabled={loading} style={{ width: 'auto' }}>
            {loading ? '⏳ Generating...' : '📱 Generate QR Code'}
          </button>
        </>
      )}
    </div>
  );
}
