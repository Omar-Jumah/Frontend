import { useState } from "react";
import Background from "../Background/Background";
import AuthTabs from "../AuthTabs/AuthTabs";
import AuthForm from "../AuthForm/AuthForm";
import InfoPanel from "../InfoPanel/InfoPanel";
import styles from "./LoginPage.module.css";

function LoginPage() {
    const [activeForm, setActiveForm] = useState("register");

    return (
        <Background>
            <main className={styles.loginPage}>
                <div className={styles.loginCard}>
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

export default LoginPage;