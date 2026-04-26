'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCheck, faUserMd, faUsers,
    faMapMarkerAlt, faEllipsisH, faPlus,
    faSort, faSortUp, faSortDown,
    faChevronLeft, faChevronRight,
    faSearch
} from '@fortawesome/free-solid-svg-icons';

interface tableColumn {
    key: string;
    label: string;
}

const columns: tableColumn[] = [
    { key: 'time', label: 'Time Slot' },
    { key: 'staffName', label: 'Practitioner' },
    { key: 'department', label: 'Department' },
    { key: 'subcategory', label: 'Description' },
    { key: 'location', label: 'Location' },
];

export default function MedSyncDashboard() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({ key: '', direction: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const rowsPerPage = 10;

    // Fetch appointments from MongoDB API
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/appointments');
                if (!response.ok) throw new Error('Failed to fetch appointments');
                const data = await response.json();
                setAppointments(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError('Failed to load appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const stats = useMemo(() => {
        const today = new Date().toLocaleDateString('en-CA');
        const staffNames = new Set<string>();
        const patients = new Set<string>();
        let todayCount = 0;

        appointments.forEach((item: any) => {
            if (item.staffName) staffNames.add(item.staffName);
            if (item.patient) patients.add(item.patient);
            if (String(item.date) === today) todayCount += 1;
        });

        return {
            appointmentsToday: todayCount,
            activeStaff: staffNames.size,
            distinctPatients: patients.size,
        };
    }, [appointments]);

    const filteredData = useMemo(() => {
        return appointments.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, appointments]);

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig.direction !== null) {
            sortableItems.sort((a: any, b: any) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    const totalRows = sortedData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startRow = (currentPage - 1) * rowsPerPage + 1;
    const endRow = Math.min(currentPage * rowsPerPage, totalRows);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const currentTableData = useMemo(() => {
        return sortedData.slice(startRow - 1, endRow);
    }, [currentPage, sortedData]);

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' | null = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: string) => {
        if (sortConfig.key !== key) return faSort;
        return sortConfig.direction === 'asc' ? faSortUp : faSortDown;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.title}>
                    <h1>MedSync Clinic</h1>
                    <p>Intelligence for modern clinics</p>
                </div>

                <div className={styles.searchContainer}>
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={styles.searchInput}
                    />
                </div>
                <Link href="/add-appointment" className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> New Appointments
                </Link>

            </header>

            <div className={styles.statsGrid}>
                <StatCard label="Appointments Today" val={String(stats.appointmentsToday)} icon={faCalendarCheck} bg="#eef2ff" color="#4f46e5" />
                <StatCard label="Active Staff" val={String(stats.activeStaff)} icon={faUserMd} bg="#fdf2f8" color="#db2777" />
                <StatCard label="Patients" val={String(stats.distinctPatients)} icon={faUsers} bg="#f0fdf4" color="#16a34a" />
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading appointments...</div>
                ) : error ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
                ) : (
                    <table className={styles.customTable}>
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() => requestSort(col.key)}
                                        className={styles.sortableHeader}
                                    >
                                        {col.label} <FontAwesomeIcon icon={getSortIcon(col.key)} className={styles.sortIcon} />
                                    </th>
                                ))}
                                {/* ONE EXTRA SPACE FOR EXTRA DETAILS */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((row, i) => (
                                <tr key={i} className={styles.tableRow}>
                                    <td>
                                        <div className={styles.time}>{row.time}</div>
                                        <div className={styles.date}>{row.date}</div>
                                    </td>
                                    <td>
                                        <div className={styles.nameBadge}>{row.staffName}</div>
                                        <div className={styles.profession}>{row.profession}</div>
                                    </td>
                                    <td><span className={styles.departmentTag}>{row.department}</span></td>
                                    <td><span className={styles.descriptionTag}>{row.subcategory}</span></td>
                                    <td>
                                        <div className={styles.location}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.locationIcon} />
                                            {row.location}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <FontAwesomeIcon icon={faEllipsisH} className={styles.moreDetails} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className={styles.pagination}>
                    <div className={styles.rowInfo}>
                        Showing <span>{startRow}-{endRow}</span> from <span>{totalRows}</span>
                    </div>

                    <div className={styles.pageButtons}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={styles.pageBtn}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <span className={styles.pageIndicator}>{currentPage} / {totalPages}</span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={styles.pageBtn}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, val, icon, bg, color }: any) {
    return (
        <div className="card">
            <div className={styles.iconWrapper} style={{ backgroundColor: bg, color: color }}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div>
                <div className={styles.statCardTitle}>{label}</div>
                <div className={styles.statCardValue}>{val}</div>
            </div>
        </div>
    );
}
