import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ArticleData } from 'src/app/model/model';

const GET_ARTICLES = gql`
query Query {
  articles {
    author{
      username
      name
    }
    title
    description
    _id
  }
}
`

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: ArticleData[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(){
    this.apollo.watchQuery<any>({
      query: GET_ARTICLES
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
      this.articles = data.articles
    },
    errors => console.log(errors)  
    )

  }
}
