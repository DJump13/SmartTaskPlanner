import dayjs from "dayjs";

export const groupTasksByStatus = (tasks) => {
  const today = dayjs().startOf("day");

  const grouped = {
    Overdue: [],
    "Due Today": [],
    Upcoming: [],
    Completed: [],
  };

  tasks.forEach((task) => {
    if (task.completed) {
      grouped["Completed"].push(task);
    } else if (!task.dueDate) {
      grouped["Upcoming"].push(task); //fallback
    } else {
      const due = dayjs(task.dueDate).startOf("day");
      if (due.isBefore(today)) {
        grouped["Overdue"].push(task);
      } else if (due.isSame(today)) {
        grouped["Due Today"].push(task);
      } else {
        grouped["Upcoming"].push(task);
      }
    }
  });

  return grouped;
};
