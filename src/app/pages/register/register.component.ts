import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Register } from 'src/app/model/model';

const POST_REGISTER_DATA = gql`
  mutation CreateUser($input: createUserInput!) {
    createUser(input: $input)
  }
`

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUser = new Register()

  constructor(private apollo: Apollo, private router: Router) { }

  submitRegister(event: SubmitEvent) {
    event.preventDefault()
    //console.log(this.registerUser);

    if (this.registerUser.email == "" && this.registerUser.username == "" && this.registerUser.password == "" && this.registerUser.name == '') {
      alert("Please enter all fields")
      return
    }

    if (this.registerUser.name == "") {
      alert("Please enter Name")
      return
    }

    if (this.registerUser.email == "") {
      alert("Please enter Email")
      return
    }

    if (this.registerUser.username == "") {
      alert("Please enter Username")
      return
    }

    if (this.registerUser.password == "") {
      alert("Please enter Password")
      return
    } else {
      if (this.registerUser.password.length < 6) {
        alert("Password should be more than 6 letters")
        return
      }
    }


    console.log(this.registerUser);
    this.apollo.mutate({
      mutation: POST_REGISTER_DATA,
      variables: {
        input: {
          email: this.registerUser.email,
          password: this.registerUser.password,
          username: this.registerUser.username,
          nationality: "India",
          name: this.registerUser.name
        }
      }
    }).subscribe(({ data }: any) => {
      //console.log(data?.createUser);
      this.router.navigate(['/login'])
    },
      errors => {
        alert(errors?.message)
        console.log(errors?.message)
      }
    )
  }
}
