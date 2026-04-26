'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faUserMd, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/shared/PageShell.module.css';

export default function StaffPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load staff details at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const staffMembers = useMemo(() => {
    const today = new Date().toLocaleDateString('en-CA');
    const map = new Map<string, any>();

    appointments.forEach((appointment: any) => {
      const name = appointment.staffName || 'Unknown Provider';
      const current = map.get(name) || {
        staffName: name,
        profession: appointment.profession || 'Provider',
        department: appointment.department || 'General',
        totalAppointments: 0,
        todayAppointments: 0,
        patients: new Set<string>(),
      };

      current.totalAppointments += 1;
      if (String(appointment.date) === today) {
        current.todayAppointments += 1;
      }
      if (appointment.patient) current.patients.add(appointment.patient);

      map.set(name, current);
    });

    return Array.from(map.values()).map((member) => ({
      ...member,
      patientCount: member.patients.size,
    })).sort((a, b) => b.todayAppointments - a.todayAppointments || b.totalAppointments - a.totalAppointments);
  }, [appointments]);

  const filteredStaffMembers = useMemo(() => {
    return staffMembers.filter((member) =>
      member.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staffMembers, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.pageTitle}>Staff Directory</h1>
          <p className={styles.pageIntro}>
            Each provider card shows total appointments, today's schedule, department and patient coverage.
          </p>
        </div>
        <div className={styles.linkRow}>
          <Link href="/dashboard" className={styles.smallButton}>
            <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
          </Link>
        </div>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search staff or department..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.card}>Loading staff details…</div>
      ) : error ? (
        <div className={styles.card}>{error}</div>
      ) : (
        <div className={styles.staffGrid}>
          {filteredStaffMembers.length > 0 ? filteredStaffMembers.map((member) => (
            <div key={member.staffName} className={`card ${styles.staffCard}`}>
              <div className={styles.staffCardHeader}>
                <div className={styles.staffIcon}>
                  <FontAwesomeIcon icon={faUserMd} />
                </div>
                <div>
                  <h2 className={styles.staffName}>{member.staffName}</h2>
                  <p className={styles.cardMeta}>{member.profession} · {member.department}</p>
                </div>
              </div>

              <div className={styles.staffCounters}>
                <div className={`${styles.counterChip} ${styles.counterPrimary}`}>
                  <strong>{member.todayAppointments}</strong>
                  <span>today</span>
                </div>
                <div className={`${styles.counterChip} ${styles.counterAccent}`}>
                  <strong>{member.totalAppointments}</strong>
                  <span>total</span>
                </div>
                <div className={`${styles.counterChip} ${styles.counterSuccess}`}>
                  <strong>{member.patientCount}</strong>
                  <span>patients</span>
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.card}>No staff appointments found.</div>
          )}
        </div>
      )}
    </div>
  );
}
