import styles from "./MedSyncFooter.module.css";

export default function MedSuncFooter() {
    return (<footer className={styles.footer}>
        <div className={styles.footerInner}>
            <div className={styles.brandColumn}>
                <h3>MedSync<span className={styles.dot}>.</span></h3>
                <p>Intelligence-driven clinic management for the modern healthcare era. Empowering doctors, protecting patients.</p>
            </div>

            <div className={styles.footerColumn}>
                <h4>Platform</h4>
                <ul className={styles.footerLinks}>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/add-appointment">Schedules</a></li>
                    <li><a href="#">Patient CRM</a></li>
                </ul>
            </div>

            <div className={styles.footerColumn}>
                <h4>Company</h4>
                <ul className={styles.footerLinks}>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Security</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

            <div className={styles.footerColumn + " " + styles.newsletter}>
                <h4>Stay Updated</h4>
                <p>Get the latest clinical insights.</p>
                <div className={styles.subscribeBox}>
                    <input type="email" placeholder="Email address" className={styles.subscribeInput} />
                    <button className={styles.subscribeBtn}>Join</button>
                </div>
            </div>
        </div>

        <div className={styles.footerBottom}>
            <div className={styles.copyright}>
                © 2026 MedSync Systems Inc. All rights reserved to Alex Blahman.
            </div>
        </div>
    </footer>);
}