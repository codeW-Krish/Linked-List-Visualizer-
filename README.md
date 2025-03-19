# Linked List Visualizer

An interactive visualization tool for understanding linked list data structures and operations. Currently supports both singly linked lists and circular linked lists.

## Features

- Visualize both singly and circular linked lists with interactive node representation
- Perform common linked list operations:
  - Insert at head, end, or any index
  - Delete from head, end, or any index
- Animated step-by-step visualization of each operation
- Information panel with operation details and time complexity
- Adjustable animation speed
- Dark mode support

## Data Structures Included

### Singly Linked List
- Linear data structure where each node points to the next node
- Last node points to NULL
- Operations: insert/delete at head, tail, or any index

### Circular Linked List
- Variation of linked list where the last node points back to the first node
- No NULL pointers
- Forms a complete circle of nodes
- Operations: insert/delete at head, tail, or any index

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/linked-list-visualizer.git
cd linked-list-visualizer
```

2. Install dependencies
```bash
npm install
```

### Running the application

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173/ (or another port if 5173 is in use).

### Build for production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Usage Instructions

1. **Choose a Data Structure**:
   - Use the navigation bar to switch between Singly Linked List and Circular Linked List

2. **Insert Operations**:
   - Enter a value in the value field
   - Click on "Head" to insert at the beginning
   - Click on "Tail" to insert at the end
   - Enter an index and click "At Index" to insert at that position

3. **Delete Operations**:
   - Click "Head" to delete the first node
   - Click "Tail" to delete the last node
   - Enter an index and click "At Index" to delete the node at that position

4. **Settings**:
   - Click the Settings button to adjust animation speed
   - Use "Clear Linked List" to remove all nodes
   - Use "Clear Operation Steps" to clear the steps display

5. **Information**:
   - Click the Information button to view details about the data structure
   - Learn about time complexity and operations

## Technologies Used

- React.js
- Vite
- CSS (for styling)
- Lucide React (for icons)

## License

This project is licensed under the MIT License.

## Troubleshooting

If you encounter issues with running the application, try the following:

1. Make sure Node.js is installed correctly
2. Delete the `node_modules` folder and run `npm install` again
3. Check for any error messages in the console

For PowerShell users who encounter execution policy issues, you may need to run:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
