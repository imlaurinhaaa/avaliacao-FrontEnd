"use client";

import React, { useState, useEffect } from "react";
import styles from "./Tarefas.module.css";
import { Pagination } from "antd";
import axios from "axios";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function tarefasScreen() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [tarefas, setTarefas] = useState([]);
    const [selectedTarefa, setSelectedTarefa] = useState("");
    const [allTarefas, setAllTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalInfo, setModalInfo] = useState({ visible: false, tarefa: null, loading: false });

    const fetchTarefas = async () => {
        setLoading(true);
        try {
            const url = "https://localhost:3000/api/tarefas";
            const response = await axios.get(url);
            setTarefas(response.data);
            if (response.data.length > 0) {
                setAllTarefas(response.data);
            }
        } catch (error) {
            console.error("Error fetching tarefas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const openModal = async (tarefa) => {
        setModalInfo({ visible: true, tarefa, loading: true });
        try {
            const url = `http://localhost:3000/api/tarefas/${tarefa.id}`;
            const response = await axios.get(url);
            setSelectedTarefa(response.data);
        } catch (error) {
            console.error("Error fetching tarefa details:", error);
        } finally {
            setModalInfo((prev) => ({ ...prev, loading: false }));
        }
    };

    if (loading) {
        return <Loader />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTarefas = tarefas.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.container}>
            <Header />
            <Pagination
                current={currentPage}
                total={tarefas.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                style={{ marginTop: "20px" }}
            />

            <div className={styles.cardContainer}>
                {loading ? (
                    <Loader />
                ) : (
                    currentTarefas.map((tarefa, index) => (
                        <Card
                            key={index}
                            tarefa={tarefa}
                            onClick={() => setSelectedTarefa(tarefa)}
                            onCardClick={handleCardClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
}