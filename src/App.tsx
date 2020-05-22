import React from 'react';
import ListStudents from './students/component';
import StudentView from './student/view/component';
import StudentCreate from './student/create/component';
import { observer, useLocalStore } from 'mobx-react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Student } from './interfaces/student';

export default observer(() => {

  const store = useLocalStore(() => ({
    _students: {
      'd25c7a7b-bd77-44be-adb3-9ddda3c918e0': { id: 'd25c7a7b-bd77-44be-adb3-9ddda3c918e0', firstName: "Raghu", lastName: "Ch", phoneNumber: "11", gpa: "4" }
    } as Record<string, Student>,
    get students() {
      return Object.values(store._students);
    },
    findStudent(id: string): Student | null {
      return store._students[id];
    },
    addStudent: (student: Student) => {
      store._students[student.id] = student;
    },
    deleteStudent: (id: string) => {
      delete store._students[id];
    }
  }))
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/create">
            <StudentCreate onSave={(state: any) => {
              store.addStudent({
                id: uuidv4(),
                firstName: state.firstName.val,
                lastName: state.lastName.val,
                phoneNumber: state.phoneNumber.val,
                gpa: state.gpa.val,
              })
            }} />
          </Route>

          <Route path="/:id" children={
            <StudentView
              findStudent={(id: string) => store.findStudent(id)}
            />
          } />

          <Route path="/">
            <h3>List of students</h3>
            <ListStudents
              students={store.students}
              onDelete={(id) => store.deleteStudent(id)}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
});