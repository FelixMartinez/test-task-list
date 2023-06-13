/* eslint-disable react/display-name */
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";
import { GetServerSideProps } from "next";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { TaskLayout } from "@/src/components/layout/TaskLayout";
import { EntriesContext } from "@/src/contexts/entries";
import { ENTRY_QUERY } from "@/src/graphql/entries.graphql";
import { useQueries } from "@/src/hooks/useQueries";
import { Entry, EntryStatus } from "@/src/interfaces";
import { createApolloClient } from "@/src/shared/apollo";
import { dateFunctions } from "@/src/shared/utils";
import { Loading } from "@/src/components/ui/Loading";
import { useHistory } from "react-router-dom";
import { convertDateStringToTimeInMilliseconds } from "@/src/shared/utils/dateFunctions";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

const EntryPage = React.memo((props: any) => {
  const { updateEntry } = useContext(EntriesContext);
  const id = props.computedMatch.params.id.toString();
  let data = useQueries(ENTRY_QUERY, { id });

  let dart: Entry;
  const [entry, setEntry] = useState(dart!);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false);
  const history = useHistory();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
    history.goBack();
  };

  useEffect(() => {
    if (data) {
      setEntry(data.entry);
      setInputValue(data.entry.description);
      setStatus(data.entry.status);
      console.log('datadata: ', data)
    }

  }, [data]);

  if (!entry) {
    return <Loading />
  }

  return (
    <TaskLayout
      pageDescription="See task detail"
      title={inputValue.substring(0, 20) + "..."}
    >
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ background: "#eee", padding: "10px" }}>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                convertDateStringToTimeInMilliseconds(entry.createdAt!)
              )}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
                color="primary"
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </TaskLayout>
  );
});

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const client = createApolloClient();

  const { data } = await client.query({
    query: ENTRY_QUERY,
    variables: { id },
  });

  if (!data.entry) {
    return {
      redirect: {
        destination: "/task/list",
        permanent: false,
      },
    };
  }

  const entry = JSON.parse(JSON.stringify(data.entry));
  console.log("data22222----->: ", entry);
  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
