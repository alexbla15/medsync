'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faHeartPulse, faShieldVirus } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/shared/PageShell.module.css';

export default function AboutPage() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.sectionHeader}>
                <div>
                    <h1 className={styles.pageTitle}>About Us</h1>
                    <p className={styles.pageIntro}>
                        MedSync is built to help modern clinics coordinate appointments, staff workflows, and patient engagement from one clean dashboard.
                    </p>
                </div>
                <div className={styles.linkRow}>
                    <Link href="/">Back to home</Link>
                </div>
            </div>

            <div className={styles.cardGrid}>
                <div className={`card ${styles.infoCard}`}>
                    <div className={styles.infoCardHeader}>
                        <div className={styles.infoCardIcon}><FontAwesomeIcon icon={faLightbulb} /></div>
                        <h2 className={styles.infoCardTitle}>Our Mission</h2>
                    </div>
                    <p className={styles.cardMeta}>
                        We provide healthcare teams with data-driven operations, smarter appointment planning, and better patient visibility.
                    </p>
                </div>

                <div className={`card ${styles.infoCard}`}>
                    <div className={styles.infoCardHeader}>
                        <div className={styles.infoCardIcon}><FontAwesomeIcon icon={faShieldVirus} /></div>
                        <h2 className={styles.infoCardTitle}>Our Values</h2>
                    </div>
                    <p className={styles.cardMeta}>
                        Reliability, patient safety, and efficient clinic workflows guide every product decision we make.
                    </p>
                </div>

                <div className={`card ${styles.infoCard}`}>
                    <div className={styles.infoCardHeader}>
                        <div className={styles.infoCardIcon}><FontAwesomeIcon icon={faHeartPulse} /></div>
                        <h2 className={styles.infoCardTitle}>Built For Clinics</h2>
                    </div>
                    <p className={styles.cardMeta}>
                        MedSync helps practitioners and administrators work faster, stay organized, and keep patient appointments on track.
                    </p>
                </div>
            </div>
        </div>
    );
}
