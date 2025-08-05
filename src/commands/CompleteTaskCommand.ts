import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class CompleteTaskCommand extends AbstractCommand {
  private previousState: boolean | undefined;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private completed: boolean = true
  ) {
    super();
  }

  execute(): void {
    const task = this.taskList
      .getAllTasks()
      .find((task) => task.id === this.taskId);
    if (task) {
      this.previousState = task.completed;
      this.taskList.completeTask(this.taskId, this.completed);
    }
  }

  undo(): void {
    if (this.previousState !== undefined) {
      this.taskList.completeTask(this.taskId, this.previousState);
    }
  }
}
