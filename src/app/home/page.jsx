import React from 'react';
import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <Image src="/image/laura.png" alt="foto de Laura" width={200} height={200} className={styles.img} />
            <h1 className={styles.title}>Laura Ferreira Violla | 2TDS1</h1>
            <h4 className={styles.subtitle}>Instrutores: Thiago Ferreira e Marcelo Carboni</h4>
            <h4 className={styles.subtitle}>Avaliação de FrontEnd</h4>
            <p className={styles.description}>A API sobre Tarefas e Projetos tem como propósito de alertar os alunos
                quando se há uma tarefa que deve ser feita, suas entidades são: Tarefas e Projetos. Cada tarefa tem um
                projeto associado, e cada projeto pode ter várias tarefas. As tarefas podem ser de diferentes tipos, como
                tarefas de casa, projetos de grupo, ou atividades individuais. A API permite que os alunos visualizem os status
                e tipo de suas tarefas e filtrem tarefas por tipo de projeto (por matéria).
            </p>
            <Link href="/tarefas" prefetch>
                    <button className={styles.button}>Ver Tarefas</button>
            </Link>
        </div>
    );
}
