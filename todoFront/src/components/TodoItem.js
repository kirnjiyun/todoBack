import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, toggleComplete, updateTask }) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.task);

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        updateTask(item._id, editValue);
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    const itemStyle = {
        backgroundColor: item.isComplete ? "gainsboro" : "white",
        color: item.isComplete ? "darkgray" : "lightblue",
    };

    return (
        <Row>
            <Col xs={12}>
                <div className="todo-item" style={itemStyle}>
                    {editing ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={handleEditChange}
                            onKeyDown={handleKeyDown} // Add onKeyDown event handler
                            style={{ marginLeft: "10px" }}
                        />
                    ) : (
                        <div className="todo-content">{item.task}</div>
                    )}
                    <div>
                        {editing ? (
                            <button
                                className="button-delete"
                                onClick={handleSave}
                            >
                                완료
                            </button>
                        ) : (
                            <>
                                <button
                                    className="button-delete"
                                    onClick={handleEdit}
                                >
                                    수정
                                </button>
                                <button
                                    className="button-delete"
                                    onClick={() =>
                                        toggleComplete(
                                            item._id,
                                            item.isComplete
                                        )
                                    }
                                >
                                    끝남
                                </button>
                                <button
                                    className="button-delete"
                                    onClick={() => deleteTask(item._id)}
                                >
                                    삭제
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TodoItem;
