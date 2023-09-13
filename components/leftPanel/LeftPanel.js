import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from './LeftPanel.module.scss';

function LeftPanel() {
    const router = useRouter()

    const panelOptions = [
        {
            uuid: 1,
            title: "Overview",
            img: "/leftPanel/overview.svg",
        }, {
            uuid: 1,
            title: "Stats",
            img: "/leftPanel/stats.svg",
        }, {
            uuid: 1,
            title: "Projects",
            img: "/leftPanel/projects.svg",
        }, {
            uuid: 1,
            title: "Chat",
            img: "/leftPanel/chat.svg",
        }, {
            uuid: 1,
            title: "Calendar",
            img: "/leftPanel/calendar.svg",
        },
    ]

    const onLogOutHandler = () => {
        router.push(`/`);
    }

    return (
        <div className={styles["wrapper-container"]}>
            <div className={styles["image-container"]}>
                <Image src="/logo.svg" alt="company logo image" width={120} height={30} />
                <span>.taskez</span>
            </div>
            <div className={styles["options-container"]}>
                {panelOptions.map((option) => (
                    <div className={styles["logo-name-container"]}>
                        <Image src={option?.img} alt={`${option.title} logo image`} width={22} height={22} />
                        <span>{option?.title}</span>
                    </div>
                ))}
            </div>
            <div className={styles["settings-container"]}>
                <Image src="/leftPanel/settings.svg" alt={`Settings logo image`} width={22} height={22} />
                <span>Settings</span>
            </div>
            <div className={styles["logout-container"]} onClick={() => {onLogOutHandler()}}>
                <Image src="/leftPanel/logout.svg" alt={`Log out logo image`} width={22} height={22} />
                <span>Log Out</span>
            </div>
        </div>
    )
}

export default LeftPanel;
