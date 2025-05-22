"use client";

import React, { useState, useEffect } from "react";
import styles from "./Tarefas.module.css";
import { Pagination, Card, Modal, Skeleton } from "antd";
import axios from "axios";
import Header from "../../components/Header";
import Image from "next/image";


const HEADERS = {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
}

export default function Tarefas() {
    const [data, setData] = useState({
        tarefas: [],
        loading: true,
        current: 1,
        pageSize: 5,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        tarefa: null,
    });

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const { data: tarefas } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/tarefas`,
                    { headers: HEADERS }
                );
                setData((prev) => ({ ...prev, tarefas, loading: false }));
            } catch (error) {
                setData((prev) => ({ ...prev, loading: false }));
            }
        };

        fetchTarefas();
    }, []);

    const openModal = (tarefa) => {
        setModalInfo({
            visible: true,
            tarefa,
        });
    };

    const closeModal = () => {
        setModalInfo({
            visible: false,
            tarefa: null,
        });
    };

    const paginatedTarefas = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.tarefas.slice(start, start + data.pageSize)
    };


    return (
        <div className={styles.container}>
            <Header />
            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.tarefas.length}
                onChange={(page, size) =>
                    setData((prev) => ({ ...prev, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "100"]}
                className={styles.pagination}
            />

            {data.loading ? (
                <Image
                    src="/image/loading.gif"
                    alt="Loading"
                    width={300}
                    height={200}
                    className={styles.loading}
                />
            ) : (
                <div className={styles.cardContainer}>
                    {paginatedTarefas().map((tarefa) => (
                        <Card
                            key={tarefa.id}
                            className={styles.card}
                            hoverable
                            onClick={() => {
                                openModal(tarefa);
                            }}
                            style={{ width: 220, margin: "10px" }}
                            cover={
                                <Image
                                    alt={tarefa.name}
                                    src={
                                        tarefa.photo ? tarefa.photo : "/img/220.svg"
                                    }
                                    width={220}
                                    height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={tarefa.name}
                                description={
                                    <p>
                                        <strong>Categoria:</strong> {tarefa.category_name || "N/A"}
                                    </p>
                                }
                            />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={`Detalhes da Tarefa`}
                open={modalInfo.visible}
                onCancel={closeModal}
                onOk={closeModal}
                width={600}
            >
                {modalInfo.tarefa ? (
                    <div className={styles.categorysInfo}>
                        <p>
                            <span className={styles.label}>Nome:</span> {modalInfo.tarefa.name}
                        </p>
                        <p>
                            <span className={styles.label}>Projeto</span>{modalInfo.tarefa.projeto_id}
                        </p>
                        <p>
                            <span className={styles.label}>Status da Tarefa</span>{modalInfo.tarefa.status_tarefa}
                        </p>
                        <p>
                            <span className={styles.label}>Descrição</span>{modalInfo.tarefa.description}
                        </p>
                    </div>
                ) : (
                    <Skeleton active />
                )}
            </Modal>
        </div>
    );
}
