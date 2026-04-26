'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faPlusCircle, faHospitalUser } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Manage Your Clinic <span>Better.</span></h1>
        <p className={styles.subtitle}>
          The next generation medical operating system. Real-time analytics, 
          seamless scheduling, and patient-first care.
        </p>

        <div className={styles.navCards}>
          <Link href="/dashboard" className={styles.card}>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faChartPie} />
            </div>
            <h3>Clinic Dashboard</h3>
            <p>Monitor live appointments, staff availability and clinic performance.</p>
          </Link>

          <Link href="/add-appointment" className={styles.card}>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <h3>New Appointment</h3>
            <p>Schedule a patient session with our smart booking assistant.</p>
          </Link>

          <Link href="/staff" className={styles.card}>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faHospitalUser} />
            </div>
            <h3>Staff Directory</h3>
            <p>View providers, appointments today, and performance cards.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
