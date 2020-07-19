import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
declare const $: any;
import { ToastrService } from 'ngx-toastr';
import * as content from './data.json';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  data: any = [];
  file:any;
  formError = false;
  users = [{
          "name": "Natasha",
          "id": 1
      },
      {
          "name": "Emma",
          "id": 2
      },
      {
          "name": "Olivia",
          "id": 3
      },
      {
          "name": "Charlotte",
          "id": 4
      },
      {
          "name": "Amelia",
          "id": 5
      }
  ];
  priority = [{
          "name": "High",
          "id": 3
      },
      {
          "name": "Medium",
          "id": 2
      },
      {
          "name": "Low",
          "id": 1
      },
  ]
  inputData = {
      "heading": "",
      "image": "",
      "date": "",
      "files": [],
      "users": [1],
      "priority": 1,
      "comments": []
  }

  constructor(public toast: ToastrService) {}

  ngOnInit(): void {
      if (localStorage.getItem("todoData")) {
          this.data = JSON.parse(localStorage.getItem("todoData"));
      } else {
          this.data = content.data;
      }
      this.initiate();
  }

  encodeImageFileAsURL(element) {
      let that = this;
      let file = element.files[0];
      let reader = new FileReader();
      reader.onloadend = function() {
        //   console.log('RESULT', reader.result)
          that.inputData.image = "" + reader.result;
      }
      reader.readAsDataURL(file);
  }

  drop(event: CdkDragDrop < string[] >) {
      this.data[this.getIndexFromId(event.container.id)].details = event.container.data;
      this.data[this.getIndexFromId(event.previousContainer.id)].details = event.previousContainer.data;
      setTimeout(() => {
          localStorage.setItem("todoData", JSON.stringify(this.data));
      }, 0);
      if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
          transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
      }
  }

  checkEvent() {
      if (this.inputData.heading && this.inputData.users.length > 0 && this.inputData.date && this.inputData.priority) {
          return true;
      }
      return false;
  }

  initiate(){
    let that = this;
    $(".custom-file-input").on("change", function() {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        that.encodeImageFileAsURL(this)
    });
  }

  createToDo() {
      if (this.checkEvent()) {
          this.addNewToDo(this.inputData)
      } else {
          this.formError = true;
      }
  }

  getIndexFromId(id: String) {
      let id1 = id.split("-");
      return +id1[id1.length - 1]
  }

  addNewToDo(data: Object) {
      this.data.forEach(element => {
          if (element.name.toLowerCase() == "todo") {
              element.details.push(data)
              setTimeout(() => {
                  try{
                      localStorage.setItem("todoData", JSON.stringify(this.data));
                      this.toast.success("To do item created!");
                  }catch(e){
                      this.toast.warning("Maximum storage capacity reached!")
                  }
                  this.data = JSON.parse(localStorage.getItem("todoData"));
                  $('#exampleModal').modal('hide');
                  $("#customFile").val("");
                  this.inputData = {
                      "heading": "",
                      "image": "",
                      "date": "",
                      "files": [],
                      "users": [1],
                      "priority": 1,
                      "comments": []
                  }
                  this.formError = false;
              }, 0);
          }
      });
  }

  delete(x:any, i:any) {
      this.data[x].details.splice(i, 1);
      setTimeout(() => {
          localStorage.setItem("todoData", JSON.stringify(this.data));
          this.data = JSON.parse(localStorage.getItem("todoData"));
      }, 0);
  }
}