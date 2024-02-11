import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ArticleData } from 'src/app/model/model';

const GET_USER_ARTICLES = gql`
query UserArticle($userArticleId: ID!) {
  userArticle(id: $userArticleId) {
    _id
    author {
      username
      name
      _id
    }
    title
    description
  }
}
`

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  articles: ArticleData[] | [] = []

  constructor(private apollo: Apollo) {}

  ngOnInit(){
    this.apollo.watchQuery<any>({
      query: GET_USER_ARTICLES,
      variables:{
        userArticleId: localStorage.getItem("userId")
      }
    }).valueChanges.subscribe(({data}) => {
      //console.log(data);
      this.articles = data.userArticle
    },
    errors => console.log(errors)  
    )
  }
}
