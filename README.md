# Todo Kanban Board

A modern, interactive Kanban board application built with React, TypeScript, and Tailwind CSS. This application allows users to manage tasks across different stages using a smooth drag-and-drop interface.

## Features

- **Drag and Drop Interface**: powered by `@dnd-kit`, allowing intuitive task management.
- **Task Management**:
  - **Create**: Add new cards to any column.
  - **Edit**: Inline editing of card titles.
  - **Delete**: Remove cards from the board.
- **Columns**: Default columns for "Todo", "In Progress", and "Done".
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on different screen sizes.
- **Icons**: Uses `lucide-react` for a clean UI.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop**: [@dnd-kit](https://docs.dndkit.com/)

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd todo
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Usage

- **Moving Cards**: Click and hold a card to drag it between columns or reorder within the same column.
- **Adding a Card**: Click the "+" button in any column header or the "Add Card" button at the bottom of the column header.
- **Editing a Card**: Click the pencil icon on a card to enter edit mode. Press `Enter` to save or `Escape` to cancel.
- **Deleting a Card**: Click the trash icon on a card to delete it.

## Project Structure

```
src/
├── components/
│   ├── Card.tsx            # Individual task card component
│   ├── KanbanBoard.tsx     # Main Kanban board container with DnD context
│   ├── KanbanColumns.tsx   # Column component (Droppable area)
│   └── index.ts            # Component exports
├── constants.ts            # Initial data and column definitions
├── types.ts                # TypeScript interfaces and types
├── App.tsx                 # Main application entry point
└── index.css               # Global styles and Tailwind imports
```
