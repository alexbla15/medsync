'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faUser, faStethoscope, faBriefcaseMedical, faCalendarDay, faClock, faMapMarkerAlt, faClipboardList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/shared/PageShell.module.css';

const initialFormState = {
  patient: '',
  staffName: '',
  profession: '',
  date: '',
  time: '',
  location: '',
  department: '',
  subcategory: '',
};

export default function AddAppointmentPage() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) throw new Error('Failed to load appointment data');
        const data = await response.json();
        setAppointments(data);
      } catch (fetchError) {
        console.error(fetchError);
      }
    };

    fetchAppointments();
  }, []);

  const departmentOptions = useMemo(() => {
    return Array.from(new Set(appointments.map((item) => item.department).filter(Boolean))).sort();
  }, [appointments]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(appointments.map((item) => item.location).filter(Boolean))).sort();
  }, [appointments]);

  const staffByDepartment = useMemo(() => {
    const map = new Map<string, { name: string; profession: string }[]>();

    appointments.forEach((item) => {
      if (!item.department || !item.staffName) return;
      const department = item.department;
      const existing = map.get(department) || [];
      if (!existing.some((member) => member.name === item.staffName)) {
        existing.push({ name: item.staffName, profession: item.profession || '' });
      }
      map.set(department, existing);
    });

    return map;
  }, [appointments]);

  const staffOptions = useMemo(() => {
    if (!form.department) return [];
    return staffByDepartment.get(form.department) || [];
  }, [form.department, staffByDepartment]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const department = event.target.value;
    setForm((prev) => ({ ...prev, department, staffName: '', profession: '' }));
  };

  const handleStaffChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const staffName = event.target.value;
    const selected = staffOptions.find((member) => member.name === staffName);
    setForm((prev) => ({
      ...prev,
      staffName,
      profession: selected?.profession || '',
    }));
  };

  const clearDepartment = () => {
    setForm((prev) => ({ ...prev, department: '', staffName: '', profession: '' }));
  };

  const clearStaff = () => {
    setForm((prev) => ({ ...prev, staffName: '', profession: '' }));
  };

  const clearLocation = () => {
    setForm((prev) => ({ ...prev, location: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setStatus('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Unable to save appointment');
      }

      const data = await response.json();
      setStatus(`Appointment created for ${data.patient} with ${data.staffName}.`);
      setForm(initialFormState);
    } catch (submissionError) {
      console.error(submissionError);
      setError('There was a problem saving the appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.pageTitle}>Add Appointment</h1>
          <p className={styles.pageIntro}>
            Create a new appointment with the same details used by the appointment dashboard.
          </p>
        </div>
        <div className={styles.linkRow}>
          <Link href="/dashboard" className={styles.smallButton}>
            <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
          </Link>
        </div>
      </div>

      <form className={styles.formGrid} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="patient">
            <FontAwesomeIcon icon={faUser} /> Patient Name
          </label>
          <input className={styles.input} id="patient" name="patient" value={form.patient} onChange={handleChange} required />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="department">
            <FontAwesomeIcon icon={faBriefcaseMedical} /> Department
          </label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} id="department" name="department" value={form.department} onChange={handleDepartmentChange} required>
              <option value="" disabled hidden>Choose department</option>
              {departmentOptions.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
            {form.department ? (
              <button type="button" className={styles.clearSelectButton} onClick={clearDepartment}>Clear</button>
            ) : null}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="staffName">
            <FontAwesomeIcon icon={faStethoscope} /> Practitioner
          </label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} id="staffName" name="staffName" value={form.staffName} onChange={handleStaffChange} required>
              <option value="" disabled hidden>Choose staff member</option>
              {staffOptions.map((staff) => (
                <option key={staff.name} value={staff.name}>{staff.name}</option>
              ))}
            </select>
            {form.staffName ? (
              <button type="button" className={styles.clearSelectButton} onClick={clearStaff}>Clear</button>
            ) : null}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="profession">
            <FontAwesomeIcon icon={faHeartbeat} /> Profession
          </label>
          <input className={styles.input} id="profession" name="profession" value={form.profession} readOnly />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="date">
            <FontAwesomeIcon icon={faCalendarDay} /> Date
          </label>
          <input className={styles.input} id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="time">
            <FontAwesomeIcon icon={faClock} /> Time
          </label>
          <input className={styles.input} id="time" name="time" type="time" value={form.time} onChange={handleChange} required />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="location">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
          </label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} id="location" name="location" value={form.location} onChange={handleChange} required>
              <option value="" disabled hidden>Choose location</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            {form.location ? (
              <button type="button" className={styles.clearSelectButton} onClick={clearLocation}>Clear</button>
            ) : null}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="subcategory">
            <FontAwesomeIcon icon={faClipboardList} /> Description
          </label>
          <textarea className={styles.textarea} id="subcategory" name="subcategory" value={form.subcategory} onChange={handleChange} required />
        </div>

        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Appointment'}
        </button>

        {status ? <div className={styles.statusMessage}>{status}</div> : null}
        {error ? <div className={styles.statusMessage} style={{ background: 'rgba(220, 38, 38, 0.08)', borderColor: 'rgba(220, 38, 38, 0.16)', color: 'var(--error)' }}>{error}</div> : null}
      </form>
    </div>
  );
}
