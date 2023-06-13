import { ChangeEvent, useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { UIContext } from "@/src/contexts/ui/UIContext";
import { EntriesContext } from "@/src/contexts/entries";

/**
 * Component to add a new entry.
 *
 * Allows the user to add a new task entry.
 *
 * @returns {ReactElement} The NewEntry component.
 */
export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  /**
   * Handle change in text field.
   *
   * @param {ChangeEvent<HTMLInputElement>} event The change event.
   */
  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Save the new entry.
   * Add the input to the list and reset the form values.
   */
  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 0, padding: 2, backgroundColor: '#ddd' }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            id="addNewEntry"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            {/* Cancel button */}
            <Button variant="text" sx={{color: '#444'}} onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            {/* Save button */}
            <Button
              id="saveEntry"
              variant="outlined"
              sx={{color: '#444', borderColor: '#444'}}
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        // Button to display the add input form
        <Button
          startIcon={<AddIcon />}
          fullWidth
          sx={{color: '#444', borderColor: '#444'}}
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
