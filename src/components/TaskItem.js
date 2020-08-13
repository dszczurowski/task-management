import React from 'react';
import {
  Button,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { 
  TreeView,
  TreeItem
} from '@material-ui/lab';
import {
  ChevronRight,
  Delete as DeleteIcon,
  DragIndicator,
  Edit,
  ExpandMore
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SortableHandle } from 'react-sortable-hoc';

const useStyles = makeStyles({
  listItem: {
    backgroundColor: props => props.bgColor,
    color: props => props.textColor,
    margin: '5px',
    boxShadow: '0 0 5px'
  },
  container: {
    listStyle: 'none'
  },
  btn: {
    backgroundColor: 'white',
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: 'white',
    }
  },
  dragHandle: {
    cursor: 'move',
    width: '10vw'
  }
});

function TaskItem({ id, data, handleDeleteClick, handleEditClick }) {
  const { description, title, bgColor, textColor } = data;
  const classes = useStyles({ bgColor, textColor });

  const DragHandle = SortableHandle(() => <DragIndicator className={classes.dragHandle}/>);

  return (
    <ListItem 
      key={id} 
      ContainerProps={{className: classes.container}}
      className={classes.listItem}
    >
      <DragHandle/>
      <ListItemText>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
          <TreeItem nodeId="1" label={title}>
            {description && <TreeItem nodeId="2" label={description} />}
          </TreeItem>
        </TreeView>
      </ListItemText>
      <Button
        className={classes.btn}
        variant="outlined"
        color="primary"
        aria-label="edit"
        onClick={handleEditClick}
      >
        <Edit/>
      </Button>
      <Button
        className={classes.btn}
        variant="outlined"
        color="secondary"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon/>
      </Button>
    </ListItem>
  );
}

export default TaskItem;
