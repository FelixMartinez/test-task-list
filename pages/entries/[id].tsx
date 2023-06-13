/* eslint-disable react/display-name */
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Autocomplete,
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
import React, { useContext, useEffect, useState } from "react";

import { TaskLayout } from "@/src/components/layout/TaskLayout";
import { Loading } from "@/src/components/ui/Loading";
import { EntriesContext } from "@/src/contexts/entries";
import { ENTRY_QUERY } from "@/src/graphql/entries.graphql";
import { useQueries } from "@/src/hooks/useQueries";
import { Entry, EntryStatus } from "@/src/interfaces";
import { createApolloClient } from "@/src/shared/apollo";
import { dateFunctions } from "@/src/shared/utils";
import { convertDateStringToTimeInMilliseconds } from "@/src/shared/utils/dateFunctions";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LIST_USERS_QUERY } from "@/src/graphql/users.graphql";
import MyDialog from "@/src/components/ui/Dialog";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];
type FormData = {
  description: string;
  status: EntryStatus;
  responsibleIs: string;
};

/**
 * Component that displays the detail page of an entry.
 *
 * This component shows the form to edit the details of an entry.
 * Allows the user to modify the description, status and person responsible for the entry.
 * It also allows you to save the changes made and delete the entry.
 *
 * @param {Object} props - Component properties.
 * @returns {ReactElement} The EntryPage component.
 */

const EntryPage = React.memo((props: any) => {
  let dart: Entry;
  const [entry, setEntry] = useState(dart!);
  const [users, seUsers] = useState([]);
  const [open, seOpen] = useState(false);
  const { updateEntry } = useContext(EntriesContext);
  const id = props.computedMatch.params.id.toString();
  const data = useQueries(ENTRY_QUERY, { id });
  const userList = useQueries(LIST_USERS_QUERY);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      description: "",
      status: "pending",
      responsibleIs: "",
    },
  });

  /**
   * Handles the save event of the form.
   *
   * @param {FormData} formData - The form data.
   */
  const onSave = ({ description, status, responsibleIs }: FormData) => {
    if (description.trim().length === 0) return;
    if (responsibleIs.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description,
      responsibleIs,
    };

    updateEntry(updatedEntry, true);
    history.goBack();
  };

  /**
   * Handles the entry deletion event.
   */
  const onDelete = () => {
    const updatedEntry: Entry = {
      ...entry,
      status: 'deleted'
    };

    updateEntry(updatedEntry, true);
    history.goBack();
  }

  useEffect(() => {
    if (data) {
      setEntry(data.entry);
      setValue("description", data.entry.description);
      setValue("status", data.entry.status);
      setValue("responsibleIs", data.entry.responsibleIs || "");
    }
    if (userList) {
      seUsers(
        userList.usersList.items.map(
          (user: any) => user.firstName + " " + user.lastName
        )
      );
    }
  }, [data]);

  if (!entry || !userList) {
    return <Loading />;
  }

  return (
    <TaskLayout
      pageDescription="See task detail"
      title={entry.description.substring(0, 20) + "..."}
    >
      <MyDialog
        open={open}
        setOpen={seOpen}
        handleClick={onDelete}
        title="Do you want to delete the entry?"
        description="By deleting the entry you will no longer be able to recover it, are you sure to delete it?"
      />
      <form onSubmit={handleSubmit(onSave)} noValidate>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ background: "#eee", padding: "10px" }}>
              <CardHeader
                title={`Task:`}
                subheader={`Created ${dateFunctions.getFormatDistanceToNow(
                  convertDateStringToTimeInMilliseconds(entry.createdAt!)
                )}`}
              />

              <CardContent>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      sx={{ marginTop: 2, marginBottom: 4 }}
                      fullWidth
                      placeholder="Description"
                      autoFocus
                      multiline
                      label="Description"
                      {...field}
                    />
                  )}
                />

                <FormControl>
                  <FormLabel>Estatus:</FormLabel>

                  <Controller
                    rules={{ required: true }}
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field} sx={{ marginBottom: 4 }}>
                        {validStatus.map((option) => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={capitalize(option)}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </FormControl>

                <Controller
                  name="responsibleIs"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, onChange, ...field } }) => (
                    <Autocomplete
                      id="responsible-select-demo"
                      options={users}
                      fullWidth
                      sx={{ marginBottom: 6 }}
                      defaultValue={field.value}
                      onChange={(_, data) => onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...field}
                          label="Select responsible"
                          variant="outlined"
                          fullWidth
                          inputRef={ref}
                        />
                      )}
                    />
                  )}
                />
              </CardContent>

              <CardActions>
                <Button
                  type="submit"
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                  color="primary"
                  sx={{ marginBottom: 2 }}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
      <IconButton
        onClick={() => seOpen(true)}
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
  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
