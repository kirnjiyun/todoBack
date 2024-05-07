import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const getTasks = async () => {
        const response = await api.get("/tasks");
        setTodoList(response.data.data);
    };

    const addTask = async () => {
        try {
            const response = await api.post("/tasks", {
                task: inputValue,
                isComplete: false,
            });
            if (response.status === 200) {
                console.log("Task added successfully");
                setInputValue("");
                getTasks();
            } else {
                throw new Error("Task cannot be added");
            }
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTask();
            setInputValue("");
        }
    };
    const deleteTask = async (id) => {
        try {
            const response = await api.delete(`/tasks/${id}`);
            if (response.status === 200) {
                setTodoList(todoList.filter((task) => task._id !== id));
            } else {
                throw new Error("Failed to delete the task");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };
    const toggleComplete = async (id, isComplete) => {
        try {
            const response = await api.put(`/tasks/${id}`, {
                isComplete: !isComplete,
            });
            if (response.status === 200) {
                getTasks();
            } else {
                throw new Error("Failed to toggle the task completion");
            }
        } catch (err) {
            console.error("Toggle complete error:", err);
        }
    };
    const updateTask = async (id, newTask) => {
        try {
            const response = await api.put(`/tasks/${id}`, {
                task: newTask,
            });
            if (response.status === 200) {
                console.log("Task updated successfully");
                getTasks();
            } else {
                throw new Error("Failed to update the task");
            }
        } catch (err) {
            console.error("Update task error:", err);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할 일을 입력하세요"
                        className="input-box"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={addTask}>
                        추가
                    </button>
                </Col>
            </Row>

            <TodoBoard
                todoList={todoList}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                updateTask={updateTask}
            />
        </Container>
    );
}

export default App;
