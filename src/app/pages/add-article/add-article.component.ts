import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { Article } from 'src/app/model/model';

const POSR_ARTICLE = gql`
  mutation Mutation($input: createArticleInput!) {
  createArticle(input: $input)
}
`

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  addArticle = new Article()

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem("userId")) {
      window.location.href = '/login'
    }
  }

  submitAddArticle(event: SubmitEvent){
    event.preventDefault()

    if (this.addArticle.title == "" && this.addArticle.description == "") {
      alert("Please enter Title and Description")
      return
    }
    
    if (this.addArticle.title == "") {
      alert("Please enter Title")
      return
    }
    
    if (this.addArticle.description == "") {
      alert("Please enter Description")
      return
    }

    console.log(this.addArticle);
    this.apollo.mutate({
      mutation: POSR_ARTICLE,
      variables: {
        input: {
          author: this.addArticle.author,
          title: this.addArticle.title,
          description: this.addArticle.description 
        }
      }
    }).subscribe(({ data }: any) => {
      console.log(data?.createArticle);
      window.location.href = '/my-articles'
    },
      errors => {
        alert(errors?.message)
        console.log(errors?.message)
      }
    )

  }
}