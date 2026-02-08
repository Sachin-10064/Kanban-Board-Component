
import type { IColumn, TKanbanData } from "./types";

export const COLUMNS: IColumn[] = [
    { id: 'todo', title: 'Todo', color: 'blue-500' },
    { id: 'in-progress', title: 'In Progress', color: 'orange-500' },
    { id: 'done', title: 'Done', color: 'emerald-500' },
];

export const INITIAL_KANBAN_DATA: TKanbanData = {
    todo: [
        { id: '1', title: 'Create initial project plan', columnId: 'todo' },
        { id: '2', title: 'Design landing page', columnId: 'todo' },
        { id: '3', title: 'Review codebase structure', columnId: 'todo' },
    ],
    'in-progress': [
        { id: '4', title: 'Implement authentication', columnId: 'in-progress' },
        { id: '5', title: 'Set up database schema', columnId: 'in-progress' },
        { id: '6', title: 'Fix navbar bugs', columnId: 'in-progress' },
    ],
    done: [
        { id: '7', title: 'Organize project repository', columnId: 'done' },
        { id: '8', title: 'Write API documentation', columnId: 'done' },
    ],
};
