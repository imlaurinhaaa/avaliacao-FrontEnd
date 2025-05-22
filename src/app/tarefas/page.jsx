"use client";

import React, { useState, useEffect } from "react";
import styles from "./Tarefas.module.css";
import { Pagination, Card, Modal, Skeleton } from "antd";
import axios from "axios";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Image from "next/image";


const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Tarefas() {
    const [data, setData] = useState({
        tarefas: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        tarefa: null,
        projeto: null,
        loading: false,
    });

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const { data: tarefas } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/tarefas`,
                    { headers: HEADERS }
                );
                setData({ tarefas, loading: false, current: 1, pageSize: 5 });
            } catch {
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchTarefas();
    }, []);


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
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "100"]}
                className={styles.pagination}
            />
            {data.loading ? (
                <div className={`${styles.loading} ${data.loading ? "" : styles.hidden}`}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedTarefas().map((tarefa) => (
                        <Card
                            key={tarefa.id}
                            className={styles.card}
                            hoverable
                            cover={
                                <Image
                                    alt={tarefa.name}
                                    src={tarefa.photo?.startsWith("http") || tarefa.photo?.startsWith("/images") ? tarefa.photo : "/images/220.svg"}
                                    width={220}
                                    height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={tarefa.name}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={modalInfo.tarefa?.name}
                open={modalInfo.visible}
                onCancel={() => setModalInfo({
                    visible: false,
                    tarefa: null,
                    projeto: null,
                    loading: false,
                })
            }
            onOk={() => 
                setModalInfo({
                    visible: false,
                    tarefa: null,
                    projeto: null,
                    loading: false,
                })
            }
            > 
            </Modal>
        </div>
    );
}
