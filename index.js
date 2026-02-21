import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const SPECIALIZATIONS = [
  'General Medicine', 'Cardiology', 'Dermatology', 'Endocrinology',
  'Gastroenterology', 'Neurology', 'Oncology', 'Orthopedics',
  'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Urology', 'Other'
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Register() {
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    // Doctor
    specialization: '', licenseNumber: '', hospital: '', experience: '',
    // Patient
    dateOfBirth: '', bloodGroup: '', address: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return toast.error('Name, email and password are required');
    }
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (role === 'doctor' && (!form.specialization || !form.licenseNumber)) {
      return toast.error('Specialization and license number are required for doctors');
    }

    setLoading(true);
    try {
      const payload = { ...form, role };
      const { data } = await authAPI.register(payload);
      login(data.user, data.token);
      toast.success(data.message);
      navigate(role === 'doctor' ? '/doctor' : '/patient');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 560 }}>
        <div className="auth-logo">
          <h1>🏥 MediVault</h1>
          <p>Create your account</p>
        </div>

        <div className="role-tabs">
          <div
            className={`role-tab ${role === 'patient' ? 'active' : ''}`}
            onClick={() => setRole('patient')}
          >
            <h3>🧑‍⚕️ Patient</h3>
            <p>Manage your health records</p>
          </div>
          <div
            className={`role-tab ${role === 'doctor' ? 'active' : ''}`}
            onClick={() => setRole('doctor')}
          >
            <h3>👨‍⚕️ Doctor</h3>
            <p>Manage patient records</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" required />
          </div>

          <div className="form-group">
            <label>Password * (min 6 characters)</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create password" required />
          </div>

          {role === 'doctor' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Specialization *</label>
                  <select name="specialization" value={form.specialization} onChange={handleChange} required>
                    <option value="">Select...</option>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>License Number *</label>
                  <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="MCI/1234567" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Hospital/Clinic</label>
                  <input name="hospital" value={form.hospital} onChange={handleChange} placeholder="Apollo Hospital" />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="5" min="0" />
                </div>
              </div>
            </>
          )}

          {role === 'patient' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
                    <option value="">Select...</option>
                    {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Your address" />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Creating Account...' : `Register as ${role === 'doctor' ? 'Doctor' : 'Patient'}`}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
