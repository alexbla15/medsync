'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChartPie, faPlusCircle, faHome, faUsers, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { DarkModeToggle } from "./DarkModeToggle";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/", icon: faHome },
        { name: "Dashboard", href: "/dashboard", icon: faChartPie },
        { name: "Staff", href: "/staff", icon: faUsers },
        { name: "New Appointments", href: "/add-appointment", icon: faPlusCircle },
    ];

    return (
        <nav className={`${styles.navContainer} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.navInner}>

                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    MedSync<span>.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopLinks}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
                        >
                            <FontAwesomeIcon icon={link.icon} className={styles.linkIcon} />
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className={styles.navActions}>
                    <DarkModeToggle />
                    <div className={styles.userProfile}>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span className={styles.userName}>Dr. Admin</span>
                    </div>

                    <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.menuOpen : ""}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`${styles.mobileLink} ${pathname === link.href ? styles.activeMobile : ""}`}
                    >
                        <FontAwesomeIcon icon={link.icon} />
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
