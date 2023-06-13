import { FC, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "@/src/contexts/entries";
import { UIContext } from "@/src/contexts/ui/UIContext";
import { EntryStatus } from "@/src/interfaces";
import { EntryCard } from "./EntryCard";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

/**
 * Input list component.
 *
 * Displays a list of entries based on their status.
 * Allows you to drag and drop the entries to change their status.
 *
 * @param {Object} props - Component properties.
 * @param {EntryStatus} props.status - The status of the entries shown in the list.
 * @returns {ReactElement} The EntryList component.
 */
export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  /**
   * Filter entries by status using useMemo to optimize performance.
   */
  const entriesByStatus = useMemo(
    () =>
      entries && entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  /**
   * Allows you to drop dragged items in the list.
   *
   * @param {DragEvent<HTMLDivElement>} event - The drop event.
   */
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  /**
   * Handles the event of dropping an entry in the list.
   *
   * @param {DragEvent<HTMLDivElement>} event - The drop event.
   */
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    let entry = entries.find((e) => e.id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "3px 5px",
        }}
        className={styles.contenedor}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, paddingBottom: '50px', transition: "all .3s" }}>
          {entriesByStatus && entriesByStatus.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
