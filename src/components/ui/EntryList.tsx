import { FC, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";

import { EntryStatus } from "../../interfaces";

import styles from "./EntryList.module.css";
import { EntriesContext } from "@/src/contexts/entries";
import { UIContext } from "@/src/contexts/ui/UIContext";
import { EntryCard } from "./EntryCard";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () =>
      entries && entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((e) => e._id === id)!;
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
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
