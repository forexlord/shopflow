import { Outlet } from "react-router-dom";
import { AppFooter } from "../AppFooter/AppFooter";
import { AppHeader } from "../AppHeader/AppHeader";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.body}>
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
}
