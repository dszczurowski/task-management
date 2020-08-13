import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  List
} from '@material-ui/core';
import {
  AddBox
} from '@material-ui/icons';
import { uniqueId } from 'lodash';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

import './TaskManagement.css';

const initialFormState = {
  title: '',
  description: '',
  bgColor: '#ffffff',
  textColor: '#000000'
};

const ACTION_TYPE = {
  ADD: 'add',
  EDIT: 'edit'
}

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [mode, setMode] = useState(ACTION_TYPE.ADD);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {description, title, bgColor, textColor} = formState;

  const clearState = () => {
    setFormState(initialFormState)
    setCurrentTaskId(null);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    clearState();
    setIsModalOpen(false);
  }

  const handleTaskAmend = () => {
    if (title.length) {
      switch(mode) {
        case ACTION_TYPE.ADD:
          setTasks([...tasks, { id: uniqueId(), description, title, bgColor, textColor }]);
          break;
        case ACTION_TYPE.EDIT:
          const newTasks = tasks.map(task => 
            currentTaskId === task.id
              ? { id: task.id, description, title, bgColor, textColor }
              : task
          )
          setTasks(newTasks)
          break;
        default:
          console.error(`${mode} not found`);
      }
      closeModal()
    }
  };

  const openAddMode = () => {
    openModal();
    setMode(ACTION_TYPE.ADD);
    clearState();
  }

  const openEditMode = (id) => {
    openModal();
    setMode(ACTION_TYPE.EDIT);
    setCurrentTaskId(id);
    const editedTask = tasks.find(task => task.id === id);
    setFormState(editedTask);
  };

  const handleDeleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks);
  };

  const handleOnChange = (evt) => {
    setFormState({ ...formState, [evt.target.name]: evt.target.value });
  }

  const SortableTask = SortableElement(props => <TaskItem {...props}/>);

  const SortableTaskList = SortableContainer(({tasks}) => {
    return (
      <List style={{width: '80vw', margin: '10px auto'}}>
        {tasks.map((task, index) => (
          <SortableTask
            key={`item-${task.id}`}
            index={index}
            data={task}
            handleDeleteClick={() => handleDeleteTask(task.id)}
            handleEditClick={() => openEditMode(task.id)}
          />
        ))}
      </List>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  return (
    <main>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
      >
        <div className="modal">
          <TaskForm data={formState} onChange={handleOnChange}/>
          <Box component="div" m={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddBox/>}
              onClick={handleTaskAmend}
            >
              {mode.toUpperCase()}
            </Button>
          </Box>      
        </div>
      </Modal>
      <Box component="div" m={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBox/>}
          onClick={openAddMode}
        >
          Add new
        </Button>
      </Box>
      <SortableTaskList tasks={tasks} onSortEnd={onSortEnd} useDragHandle/>
    </main>
  );
}

export default TaskManagement;
