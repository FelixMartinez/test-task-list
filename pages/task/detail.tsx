import React from "react";
import { NextPage } from "next";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { TaskLayout } from "@/src/components/layout/TaskLayout";
import { Grid, Card, CardHeader } from "@mui/material";
import { EntryList } from "@/src/components/ui/EntryList";
import { NewEntry } from "@/src/components/ui/NewEntry";

const DetailPage: NextPage = (props: any) => {
  console.log("props: ", props);
  return (
    <TaskLayout
      pageDescription="In this section you can edit, delete, assign and end task"
      title="Task Detail"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="Pendientes" sx={{background: '#eee'}}/>

            {/* Agregar una nueva entrada */}
            {/* Listado de las entradas */}
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="En Progreso" sx={{background: '#eee'}} />
            <EntryList status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="Completadas" sx={{background: '#eee'}} />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </TaskLayout>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx): Promise<{ props: { foot: string } }> {
    // access the user session if needed
    // const session = await getSession(ctx.req, ctx.res);
    return {
      props: {
        foot: "bar",
      },
    };
  },
});

export default DetailPage;
