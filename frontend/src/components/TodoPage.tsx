import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // To track the task being edited
  const [updatedTaskName, setUpdatedTaskName] = useState<string>(''); // To store the updated name

  // Fetch tasks from the API
  const handleFetchTasks = async () => {
    const fetchedTasks = await api.get('/tasks');
    setTasks(fetchedTasks);
  };

  // Delete a task by its ID
  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    await handleFetchTasks(); // Refresh the tasks after deletion
  };

  // Add a new task
  const handleSave = async () => {
    if (newTaskName) {
      await api.post('/tasks', { name: newTaskName });
      setNewTaskName('');
      await handleFetchTasks(); // Refresh the tasks after adding
    }
  };

  // Update an existing task
  const handleUpdate = async (id: number) => {
    if (updatedTaskName) {
      await api.patch(`/tasks/${id}`, { name: updatedTaskName });
      setEditingTaskId(null); // Exit editing mode
      setUpdatedTaskName(''); // Clear the updated name input
      await handleFetchTasks(); // Refresh the tasks after updating
    }
  };

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id); // Track the task being edited
    setUpdatedTaskName(task.name); // Pre-fill the input with the current task name
  };

  useEffect(() => {
    handleFetchTasks(); // Fetch tasks on page load
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      {/* Display tasks */}
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        {tasks.map((task) => (
          <Box display="flex" alignItems="center" mt={2} key={task.id}>
            {/* If the task is being edited, show an input field */}
            {editingTaskId === task.id ? (
              <TextField
                size="small"
                value={updatedTaskName}
                onChange={(e) => setUpdatedTaskName(e.target.value)} // Update the task name in local state
              />
            ) : (
              <TextField size="small" value={task.name} readOnly />
            )}
            {editingTaskId === task.id ? (
              <Button
                onClick={() => handleUpdate(task.id)}
                style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
              >
                Save
              </Button>
            ) : (
              <Button onClick={() => startEditing(task)}
                style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }}
              >
                Edit
              </Button>
            )}

            <Button
              onClick={() => handleDelete(task.id)}
              style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>

      {/* Add new task */}
      <Box mt={5} display="flex" justifyContent="center">
        <TextField
          size="small"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Add new task"
        />
        <Button 
          onClick={handleSave} 
          disabled={!newTaskName}
          style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
        >
          Add Task
        </Button>
      </Box>
    </Container>
  );
};

export default TodoPage;
