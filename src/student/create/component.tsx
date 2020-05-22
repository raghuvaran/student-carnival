/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Student } from "../../interfaces/student";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {
  Link
} from "react-router-dom";

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

const rows: Array<[string, keyof Student]> = [
  ["First name", 'firstName'],
  ["Last name", 'lastName'],
  ["Phone number", 'phoneNumber'],
  ["GPA", 'gpa'],
]

export default function StudentCreate({ onSave }: { onSave: (state: any) => void }) {
  const classes = useStyles();

  const state: any = {};
  for (const row of rows) {
    const action = React.useState("");
    state[row[1]] = {
      val: action[0],
      fn(e: React.ChangeEvent<HTMLInputElement>) { return action[1](e.target.value) }
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List>
                {rows.map((row, index) =>
                  <ListItem key={index}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="component-outlined">{row[0]}</InputLabel>
                      <OutlinedInput id="component-outlined" value={state[row[1]].val} onChange={state[row[1]].fn} label="Name" />
                    </FormControl>
                  </ListItem>
                )}
                <ListItem key="save">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSave(state)}
                    component={Link}
                    to="/"
                  >Save</Button>
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}