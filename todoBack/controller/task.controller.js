const taskController = {};
const Task = require("../model/Task");

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const { userId } = req;
        const newTask = new Task({ task, isComplete, author: userId });
        await newTask.save();
        res.status(200).json({ status: "ok", data: newTask });
    } catch (err) {
        console.error(err); // 서버 로그에 에러를 출력
        res.status(400).json({
            status: "fail",
            error: { message: err.message },
        }); // 클라이언트에는 에러 메시지만 전달
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v").populate("author");
        res.status(200).json({ status: "ok", data: taskList });
    } catch (err) {
        console.error(err); // 서버 로그에 에러를 출력
        res.status(400).json({
            status: "fail",
            error: { message: err.message },
        }); // 클라이언트에는 에러 메시지만 전달
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
            new: true,
        });

        if (!updatedTask) {
            return res
                .status(404)
                .json({ status: "fail", error: "No task found with that ID" });
        }

        res.status(200).json({ status: "ok", data: updatedTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err.message });
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res
                .status(404)
                .json({ status: "fail", error: "No task found with that ID" });
        }
        res.status(200).json({
            status: "ok",
            data: "Task deleted successfully",
        });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err.message });
    }
};

module.exports = taskController;
