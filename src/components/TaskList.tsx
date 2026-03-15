import TaskCard from "./TaskCard";

export default function TaskList({ tasks, refresh }: any) {

  if (tasks.length === 0) {
    return (
      <p className="text-gray-400 text-center py-6">
        No tasks yet
      </p>
    );
  }

  return (

    <div className="space-y-4">

      {tasks.map((task: any) => (
        <TaskCard
          key={task.id}
          task={task}
          refresh={refresh}
        />
      ))}

    </div>

  );
}