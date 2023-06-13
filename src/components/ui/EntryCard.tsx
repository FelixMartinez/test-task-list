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
          <Typography sx={{ whiteSpace: "pre-line", fontWeight: "bold", fontSize: "16px" }}>
            {entry.description.slice(0, 80) + (entry.description.length > 80 ? '...' : '')}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px", color: "#444", display: "flex", alignItems: "center", marginTop: "6px"}}>
            <Typography sx={{fontWeight: "bold", fontSize: "13px"}}>Resp: &nbsp;</Typography> {entry.responsibleIs || 'Sin asignar'}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px", color: "#444", display: "flex", alignItems: "center"}}>
            <Typography sx={{fontWeight: "bold", fontSize: "13px"}}>Infor: &nbsp;</Typography> {entry.informerIs}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography sx={{fontSize: "12px", color: "#888"}}>{`Creada ${dateFunctions.getFormatDistanceToNow(
                convertDateStringToTimeInMilliseconds(entry.createdAt!)
              )}`}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
