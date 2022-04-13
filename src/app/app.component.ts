import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });
    this.load();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos',data);
    this.mode = 'list';
  }

  add(){
    const value = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    const todo = new Todo(id, value, false);
    this.todos.push(todo);
    this.save();
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index != -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  toggleDone(todo: Todo){
    todo.done = !todo.done;
    this.save();
  }

  load(){
    const data = localStorage.getItem('todos');
    if(data != null){
      this.todos = JSON.parse(data);
    }
  }

  toggleMode(){
    if(this.mode == 'list'){
      this.mode = 'add';
    }else{
      this.mode = 'list';
    }
  }
}
