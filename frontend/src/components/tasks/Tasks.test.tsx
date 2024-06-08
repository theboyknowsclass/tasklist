import { fireEvent, render, screen } from "@testing-library/react";
import { Tasks } from "./Tasks";
import { useGetTasksMock } from "../../hooks/useGetTasks.mock";
import { useUpdateTasksMock } from "../../hooks/useUpdateTasks.mock";
import { useAuthMock } from "../../hooks/useAuth.mock";
import { MockWrapper } from "../../mocks/MockWrapper";
import { Task } from "../../domain/task";

const useMockDependencies = (overrides = {}) => {
  return {
    useGetTasks: useGetTasksMock(overrides),
    useUpdateTasks: useUpdateTasksMock(overrides),
    useAuth: useAuthMock(overrides),
  };
};

describe("Tasks", () => {
  it("can add to task list only when text is entered", () => {
    const mockTasks: Task[] = [
      { id: "1", name: "Task 1", sortorder: 1 },
      { id: "2", name: "Task 2", sortorder: 2 },
    ];

    const {
      useUpdateTasks: { mutate },
    } = useMockDependencies({ data: mockTasks });

    render(
      <MockWrapper>
        <Tasks />
      </MockWrapper>
    );

    expect(mutate).not.toHaveBeenCalled();

    // check add button is disabled initially
    const addButton = screen.getByTestId("add-task-button");
    expect(addButton.hasAttribute("disabled")).toBe(true);

    const textField = screen
      .queryByTestId("task-name-input")
      ?.querySelector("input");

    expect(textField).not.toBeNull();

    fireEvent.change(textField as Element, {
      target: { value: "some special new task" },
    });

    // check button is enabled after text is entered
    expect(addButton.hasAttribute("disabled")).toBe(false);

    // add task
    fireEvent.click(addButton);

    // check task is added to list
    const newTask = screen.getByText("some special new task");
    expect(newTask).not.toBeNull();
  });

  it("sends updates when component is unmounted", () => {
    const mockTasks: Task[] = [
      { id: "1", name: "Task 1", sortorder: 1 },
      { id: "2", name: "Task 2", sortorder: 2 },
    ];

    const {
      useUpdateTasks: { mutate },
    } = useMockDependencies({ data: mockTasks });

    const { unmount } = render(
      <MockWrapper>
        <Tasks />
      </MockWrapper>
    );

    unmount();

    // check update is sent
    expect(mutate).toHaveBeenCalledWith([
      { id: "1", name: "Task 1", sortorder: 1 },
      { id: "2", name: "Task 2", sortorder: 2 },
    ]);
  });
});
