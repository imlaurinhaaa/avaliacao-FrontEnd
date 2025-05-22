import styles from "./Tarefas.module.css";
import Header from "../../components/Header";

export default function tarefasScreen() {
    return (
        <div className={styles.container}>
            <Header />
        </div>
    );
}
