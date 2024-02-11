import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Login, LoginData, User } from 'src/app/model/model';


const GET_USERS = gql`
  query Users {
  users {
    _id
    email
    username
    password
    age
    nationality
  }
}
`

const POST_LOGIN_DATA = gql`
  mutation LoginUser($input: loginUserInput!) {
    loginUser(input: $input) {
      token
      userId
    }
}
`

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser = new Login()

  users: User[] = []
  login: LoginData = {token: '', userId: ''}

  constructor(private apollo: Apollo, private router: Router) { }

  submitLogin(event: SubmitEvent) {
    event.preventDefault()
    //console.log(this.loginUser);

    if(this.loginUser.email == "" && this.loginUser.password == ""){
      alert("Please enter Email and Password")
      return
    }
    if(this.loginUser.email == ""){
      alert("Please enter Email")
      return
    }
    
    if(this.loginUser.password == ""){
      alert("Please enter Password")
      return
    }

    this.apollo.mutate({
      mutation: POST_LOGIN_DATA,
      // errorPolicy:"all",
      variables: {
        input: {
          email: this.loginUser.email,
          password: this.loginUser.password
        }
      }
    }).subscribe(({data}: any) => {
      //console.log(data);
      this.login = {token: data?.loginUser?.token, userId: data?.loginUser?.userId}
      localStorage.setItem("token", data?.loginUser?.token)
      localStorage.setItem("userId", data?.loginUser?.userId)
      //this.router.navigate(['/home'])
      window.location.href = '/home'
    },
    errors => {
      alert(errors?.message)
      console.log(errors?.message)
    }
    )
  }

  getUsers() {
    this.apollo.watchQuery<any>({
      query: GET_USERS
    }).valueChanges.subscribe(({ data }) => {
      console.log(data);
      this.users = data.users
    },
    errors => console.log(errors)
    )
  }



}
