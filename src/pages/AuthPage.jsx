import { useState } from "react";
import Background from "../components/Background/Background";
import AuthTabs from "../components/AuthTabs/AuthTabs";
import AuthForm from "../components/AuthForm/AuthForm";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import styles from "./AuthPage.module.css";

function AuthPage() {
  const [activeForm, setActiveForm] = useState("register");

  return (
    <Background>
      <main className={styles.authPage}>
        <div className={styles.authCard}>
          <section className={styles.formSide}>
            <AuthTabs activeForm={activeForm} onChangeForm={setActiveForm} />
            <AuthForm activeForm={activeForm} onChangeForm={setActiveForm} />
          </section>

          <InfoPanel />
        </div>
      </main>
    </Background>
  );
}

export default AuthPage;