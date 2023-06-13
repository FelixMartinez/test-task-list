import { DragEvent, FC, useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { UIContext } from "@/src/contexts/ui/UIContext";
import { dateFunctions } from "@/src/shared/utils";
import { convertDateStringToTimeInMilliseconds } from "@/src/shared/utils/dateFunctions";
import { Entry } from "@/src/interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const history = useHistory()

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry.id);

    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const onClick = () => {
    history.push(`/entries/${ entry.id }`);
  }

  return (
    <Card
      onClick={ onClick }
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">{`Creada ${dateFunctions.getFormatDistanceToNow(
                convertDateStringToTimeInMilliseconds(entry.createdAt!)
              )}`}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
