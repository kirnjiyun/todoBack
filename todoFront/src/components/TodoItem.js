import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, toggleComplete }) => {
    const itemStyle = {
        backgroundColor: item.isComplete ? "gainsboro" : "white",
        color: item.isComplete ? "white" : "lightblue",
    };

    return (
        <Row>
            <Col xs={12}>
                <div className="todo-item" style={itemStyle}>
                    <div className="todo-content">{item.task}</div>
                    <div>
                        <button
                            className="button-delete"
                            onClick={() => deleteTask(item._id)}
                        >
                            삭제
                        </button>
                        <button
                            className="button-delete"
                            onClick={() =>
                                toggleComplete(item._id, item.isComplete)
                            }
                        >
                            끝남
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TodoItem;
