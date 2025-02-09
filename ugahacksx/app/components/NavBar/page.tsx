"use client";
import React from "react";
import styles from "./navBar.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const NavBar = () => {
    const router = useRouter();
    const { user } = useUser(); // Get user data from Auth0

    return (
        <div className={styles.navContainer}>
            <div className={styles.navBar}>
                <h1 onClick={() => router.push("/")} className={styles.navTitle}>
                    Sound Genie
                </h1>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}>
                        <button
                            onClick={() => router.push("/khoaTest")}
                            className={styles.navButton}
                        >
                            Khoa Test
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        {user && (
                            <button
                                onClick={() => router.push("/pages/workspace")}
                                className={styles.navButton}
                            >
                                Go to Workspace
                            </button>
                        )}
                    </li>
                    <li className={styles.navItem}>
                        <button
                            onClick={() => router.push("/pages/songPosts")}
                            className={styles.navButton}
                        >
                            Public Songs
                        </button>
                    </li>
                    {/* Auth0 Login/Logout as Styled Links */}
                    <li className={styles.navItem}>
                        {!user ? (
                            <a href="/api/auth/login" className={styles.navLink}>
                                Login
                            </a>
                        ) : (
                            <a href="/api/auth/logout" className={styles.navLink}>
                                Logout
                            </a>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;