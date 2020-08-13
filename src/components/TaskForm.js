import React from 'react';
import {
  Box,
  TextField
} from '@material-ui/core';

function TaskForm({ data, onChange }) {
  const { description, title, bgColor, textColor } = data;

  return (
    <form autoComplete="off">
      <Box component="div" m={1}>
        <TextField
          error={!title.length}
          helperText={title.length ? "" : "This field is mandatory."}
          label="title"
          name="title"
          onChange={onChange}
          required
          variant="outlined"
          value={title}
        />
      </Box>
      <Box component="div" m={1}>
        <TextField
          label="description"
          name="description"
          multiline
          onChange={onChange}
          rows={4}
          value={description}
          variant="outlined"
        />
      </Box>
      <Box component="div" m={1}>
        Background color: <input type="color" name="bgColor" value={bgColor} onChange={onChange} />
      </Box>
      <Box component="div" m={1}>
        Text color: <input type="color" name="textColor" value={textColor} onChange={onChange} />
      </Box>
    </form>
  );
}

export default TaskForm;
