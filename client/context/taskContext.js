import React,{createContext} from "react";
const TasksContext = createContext();

export const TasksProvider = ({children})=>{
    const [tasks, setTasks] = React.useState([
        {id:1, tittle:"Task1", description:"Description 1", status:"pending"},
        {id:1, tittle:"Task1", description:"Description 1", status:"pending"},
        {id:1, tittle:"Task1", description:"Description 1", status:"pending"}
    ]);
    return(
        <TasksContext.Provider value={{
            tasks,
        }}>
            {children}
        </TasksContext.Provider>
    );
};
export const useTasks = ()=>{
    return React.useContext(TasksContext);  
};