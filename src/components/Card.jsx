import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card({ tarefa, onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <Image
                src={tarefa.photo}
                alt={tarefa.name}
                width={100}
                height={100}
                className={styles.image} />
            <div className={styles.content}>
                <h2 className={styles.title}>{tarefa.projeto_id}</h2>
                <p className={styles.description}>{tarefa.name}</p>
                <p className={styles.status}>Status: {tarefa.status_tarefa}</p>
                <p className={styles.status}>{tarefa.description}</p>
            </div>
        </div>
    );
}