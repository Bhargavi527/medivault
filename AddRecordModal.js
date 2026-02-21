import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { patientsAPI, recordsAPI, qrAPI } from '../api';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '🏠' },
  { id: 'patients', label: 'My Patients', icon: '👥' },
  { id: 'records', label: 'Added Records', icon: '📋' },
  { id: 'qr-scan', label: 'Scan QR Code', icon: '📱' },
  { id: 'profile', label: 'Profile', icon: '👨‍⚕️' }
];

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qrScanResult, setQrScanResult] = useState(null);
  const [scanToken, setScanToken] = useState('');

  useEffect(() => {
    fetchPatients();
    fetchRecords();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await patientsAPI.getAll();
      setPatients(data.patients || []);
    } catch (err) {}
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data } = await recordsAPI.getAll();
      setRecords(data.records || []);
    } catch (err) {}
    finally { setLoading(false); }
  };

  const handleQRScan = async () => {
    if (!scanToken.trim()) return toast.error('Enter a QR token');
    try {
      // Try to parse JSON from QR code
      let token = scanToken.trim();
      try {
        const parsed = JSON.parse(token);
        token = parsed.qrToken || token;
      } catch(e) {}

      const { data } = await qrAPI.scan(token);
      setQrScanResult(data);
      toast.success('Patient found!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid QR token');
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🏥 MediVault</h2>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Doctor Portal</p>
        </div>

        <div className="sidebar-user">
          <div className="name">Dr. {user?.name}</div>
          <div className="role-badge">Doctor</div>
          {user?.specialization && <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>🩺 {user.specialization}</div>}
          {!user?.isVerified && <div style={{ fontSize: '0.7rem', color: '#fbbf24', marginTop: 4 }}>⚠️ Pending Verification</div>}
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={handleLogout} style={{ color: '#fca5a5' }}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </div>

      <div className="main-content">
        {activeTab === 'overview' && (
          <div className="fade-in">
            <div className="page-header">
              <h2>👨‍⚕️ Welcome, Dr. {user?.name?.split(' ')[0]}!</h2>
              <p>{user?.specialization} • {user?.hospital || 'Independent Practice'}</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">👥</div>
                <div className="stat-info"><h4>{patients.length}</h4><p>Total Patients</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">📋</div>
                <div className="stat-info"><h4>{records.length}</h4><p>Records Added</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon yellow">🩺</div>
                <div className="stat-info"><h4>{user?.experience || 0}+</h4><p>Years Experience</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple">🏥</div>
                <div className="stat-info"><h4>{user?.isVerified ? '✅' : '⏳'}</h4><p>{user?.isVerified ? 'Verified' : 'Pending'}</p></div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Recent Patient Records</h3></div>
              {records.slice(0, 5).map(record => (
                <div key={record._id} className="record-card">
                  <div className="record-icon">📋</div>
                  <div className="record-body">
                    <div className="record-title">{record.title}</div>
                    <div className="record-meta">
                      {record.patient?.name && `Patient: ${record.patient.name} • `}
                      {new Date(record.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {records.length === 0 && <div className="empty-state"><div>📋</div><h4>No records added yet</h4></div>}
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="fade-in">
            <div className="page-header"><h2>👥 Patients</h2><p>Registered patients on MediVault</p></div>
            <div className="card">
              <div className="card-header"><h3>All Patients ({patients.length})</h3></div>
              {patients.map(patient => (
                <div key={patient._id} className="record-card">
                  <div className="record-icon" style={{ background: '#d1fae5', color: '#10b981' }}>👤</div>
                  <div className="record-body">
                    <div className="record-title">{patient.name}</div>
                    <div className="record-meta">
                      {patient.email}
                      {patient.bloodGroup && ` • 🩸 ${patient.bloodGroup}`}
                      {patient.phone && ` • 📞 ${patient.phone}`}
                    </div>
                  </div>
                </div>
              ))}
              {patients.length === 0 && <div className="empty-state"><div>👥</div><h4>No patients found</h4></div>}
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="fade-in">
            <div className="page-header"><h2>📋 Added Records</h2></div>
            <div className="card">
              {records.map(record => (
                <div key={record._id} className="record-card">
                  <div className="record-icon">📋</div>
                  <div className="record-body">
                    <div className="record-title">{record.title}</div>
                    <div className="record-meta">
                      {record.patient?.name && `${record.patient.name} • `}
                      {new Date(record.createdAt).toLocaleDateString()}
                    </div>
                    {record.diagnosis && <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 4 }}>Diagnosis: {record.diagnosis}</div>}
                  </div>
                </div>
              ))}
              {!loading && records.length === 0 && <div className="empty-state"><div>📋</div><h4>No records added</h4></div>}
            </div>
          </div>
        )}

        {activeTab === 'qr-scan' && (
          <div className="fade-in">
            <div className="page-header"><h2>📱 QR Code Scanner</h2><p>Enter QR token to access patient records</p></div>
            <div className="card" style={{ maxWidth: 500 }}>
              <h3 style={{ marginBottom: 16 }}>Enter Patient QR Token</h3>
              <div style={{ display: 'flex', gap: 10 }}>
                <input 
                  value={scanToken} 
                  onChange={e => setScanToken(e.target.value)}
                  placeholder="Paste QR token or QR JSON data..."
                  onKeyDown={e => e.key === 'Enter' && handleQRScan()}
                />
                <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 20px' }} onClick={handleQRScan}>
                  Scan
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 8 }}>
                Use a QR scanner app to get the token, then paste it above.
              </p>
            </div>

            {qrScanResult && (
              <div className="card fade-in" style={{ maxWidth: 500 }}>
                <h3 style={{ marginBottom: 16 }}>✅ Patient Found</h3>
                {[
                  { label: 'Name', value: qrScanResult.patient?.name },
                  { label: 'Blood Group', value: qrScanResult.patient?.bloodGroup },
                  { label: 'Phone', value: qrScanResult.patient?.phone },
                  { label: 'Email', value: qrScanResult.patient?.email }
                ].map(item => item.value && (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                    <span style={{ color: '#64748b' }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
                <h4 style={{ marginTop: 16, marginBottom: 12 }}>Recent Records ({qrScanResult.records?.length || 0})</h4>
                {qrScanResult.records?.slice(0, 5).map(r => (
                  <div key={r._id} className="record-card">
                    <div className="record-icon">📋</div>
                    <div className="record-body">
                      <div className="record-title">{r.title}</div>
                      <div className="record-meta">{new Date(r.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="fade-in">
            <div className="page-header"><h2>👨‍⚕️ Doctor Profile</h2></div>
            <div className="card" style={{ maxWidth: 500 }}>
              {[
                { label: 'Full Name', value: `Dr. ${user?.name}` },
                { label: 'Email', value: user?.email },
                { label: 'Specialization', value: user?.specialization },
                { label: 'License Number', value: user?.licenseNumber },
                { label: 'Hospital/Clinic', value: user?.hospital || 'Not provided' },
                { label: 'Experience', value: user?.experience ? `${user.experience} years` : 'Not provided' },
                { label: 'Verification', value: user?.isVerified ? '✅ Verified' : '⏳ Pending Verification' }
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
