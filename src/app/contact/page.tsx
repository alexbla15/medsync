'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/shared/PageShell.module.css';

export default function ContactPage() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.sectionHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Contact</h1>
                    <p className={styles.pageIntro}>
                        Reach out to the MedSync team for support, onboarding, or questions about your clinic workflow.
                    </p>
                </div>
                <div className={styles.linkRow}>
                    <Link href="/">Back to home</Link>
                </div>
            </div>

            <div className={styles.cardGrid}>
                <div className={`card ${styles.infoCard}`}>
                    <div className={styles.infoCardHeader}>
                        <div className={styles.infoCardIcon}><FontAwesomeIcon icon={faEnvelope} /></div>
                        <h2 className={styles.infoCardTitle}>Support</h2>
                    </div>
                    <p className={styles.cardMeta}>
                        Email <a href="mailto:support@medsync.com">support@medsync.com</a> for help with appointment sync, staff management, or data access.
                    </p>
                </div>

                <div className={`card ${styles.infoCard}`}>
                    <div className={styles.infoCardHeader}>
                        <div className={styles.infoCardIcon}><FontAwesomeIcon icon={faPhone} /></div>
                        <h2 className={styles.infoCardTitle}>Sales</h2>
                    </div>
                    <p className={styles.cardMeta}>
                        Contact us at <a href="mailto:sales@medsync.com">sales@medsync.com</a> to learn how MedSync can support your practice.
                    </p>
                </div>

                <div className={`card ${styles.infoCard}`}>
                    <div className={styles.infoCardHeader}>
                        <div className={styles.infoCardIcon}><FontAwesomeIcon icon={faLocationDot} /></div>
                        <h2 className={styles.infoCardTitle}>Visit</h2>
                    </div>
                    <p className={styles.cardMeta}>
                        123 Health Street, Suite 500<br />Clinic City, CA 90210
                    </p>
                </div>
            </div>
        </div>
    );
}
