import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UpdateUser, User } from 'src/app/model/model';

const GET_USER = gql`
  query User($userId: ID!) {
  user(id: $userId) {
    _id
    email
    username
    name
  }
}
`

const POST_UPDATE_USER = gql`
  mutation Mutation($input: updateUserInput!) {
  updateUser(input: $input) {
    _id
    email
    username
    name
  }
}
`

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateUser = new UpdateUser()
  valueChange: boolean = false

  password: string = ''
  passwordChange: boolean = false
  sendNewPasswordValue(event: any) {
    this.valueChange = true
    this.passwordChange = true
    this.updateUser.newPassword = event.target.value;
    if (this.updateUser.newPassword == "") {
      this.valueChange = false
    }
  }
  
  username: string = ''
  sendNewUserameValue(event: any) {
    this.valueChange = true
    this.updateUser.newUsername = event.target.value;
    if(this.updateUser.newUsername == this.user.username){
      this.valueChange = false
    }
  }
  
  name: string = ''
  sendNewNameValue(event: any) {
    this.valueChange = true
    this.updateUser.newName = event.target.value;
    if(this.updateUser.newName == this.user.name){
      this.valueChange = false
    }
  }

  user: User = { _id: '', name: "", username: '', email: '', nationality: '' }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    if(!localStorage.getItem("useId")){
      window.location.href = '/login'
    }

    this.apollo.watchQuery<any>({
      query: GET_USER,
      variables: {
        userId: localStorage.getItem("userId")
      }
    }).valueChanges.subscribe(({ data }) => {
      //console.log(data.user);
      this.user = data.user
      this.updateUser.newName = this.user.name
      this.updateUser.newUsername = this.user.username
    },
      errors => console.log(errors)
    )
  }

  submitUpdateUser(event: SubmitEvent) {
    event.preventDefault()

    if (this.updateUser.newName == "") {
      alert("Name cannot be blank")
      return
    }else{
      this.valueChange = true
    }

    if (this.updateUser.newUsername == "") {
      alert("Username cannot be blank")
      return
    }else{
      this.valueChange = true
    }

    if (this.passwordChange == true) {
      if (this.updateUser.newPassword == "") {
        alert("Password cannot be blank")
        return
      } else {
        if (this.updateUser.newPassword.length < 6) {
          alert("Password should be more than 6 words")
          this.valueChange = false
          this.password = ''
          return
        }
      }
    }

    // console.log(this.updateUser);

    this.apollo.mutate({
      mutation: POST_UPDATE_USER,
      variables: {
        input: {
          id: localStorage.getItem("userId"),
          newUsername: this.updateUser.newUsername,
          newName: this.updateUser.newName,
          newPassword: this.updateUser.newPassword
        }
      }
    }).subscribe(({data}: any) => {
      // console.log(data.updateUser);
      this.user = data.updateUser
      this.valueChange = false
      alert("User Updated")
    },
    errors => console.log(errors)  
    )

  }

}
