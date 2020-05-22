import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Student } from "../../interfaces/student";
import { useParams } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

export default function StudentView({ findStudent }: { findStudent: (id: string) => Student | null }) {
  const { id } = useParams();
  const classes = useStyles();
  const student = findStudent(id);
  if (!student) return <div>No student found with id: {id}</div>;
  const rows: Array<[string, keyof Student]> = [
    ["First name", 'firstName'],
    ["Last name", 'lastName'],
    ["Phone number", 'phoneNumber'],
    ["GPA", 'gpa'],
  ]

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List>
                {rows.map((row, index) =>
                  <ListItem key={index}>
                    <ListItemText
                      primary={row[0]}
                    />
                  </ListItem>
                )}
              </List>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List>
                {rows.map((row, index) =>
                  <ListItem key={index}>
                    <ListItemText
                      primary={student[row[1]]}
                    />
                  </ListItem>
                )}
              </List>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}