import dayjs from "dayjs";

export const groupTasksByStatus = (tasks) => {
  const today = dayjs().startOf("day");

  const grouped = {
    overdue: [],
    today: [],
    upcoming: [],
    completed: [],
  };

  tasks.forEach((task) => {
    if (task.completed) {
      grouped.completed.push(task);
    } else if (!task.dueDate) {
      grouped.upcoming.push(task); //fallback
    } else {
      const due = dayjs(task.dueDate).startOf("day");
      if (due.isBefore(today)) {
        grouped.overdue.push(task);
      } else if (due.isSame(today)) {
        grouped.today.push(task);
      } else {
        grouped.upcoming.push(task);
      }
    }
  });

  return grouped;
};
