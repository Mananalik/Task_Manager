import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title"],  // Fixed typo
            trim: true,  // Ensures no spaces-only titles
            unique: false,  // Remove `unique: true` if not needed
        },
        description: {
            type: String,
            default: "No description",
            trim: true,
        },
        dueDate: {
            type: Date,
            default: Date.now,  // Fix: Use `Date.now` without parentheses
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
