import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Article } from 'src/app/model/model';

const GET_ARTICLE = gql`
  query Query($articleId: ID!) {
  article(id: $articleId) {
    _id
    author
    title
    description
  }
}
`
const POST_UPDATE_ARTICLE = gql`
mutation UpdateArticle($input: updateArticleInput!) {
  updateArticle(input: $input) {
    _id
    author
    title
    description
  }
}
`

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  updateArticle = new Article()
  valueChange: boolean = false

  title: string = ''
  sendNewTitleValue(event: any) {
    this.valueChange = true
    this.updateArticle.title = event.target.value;
    if (this.updateArticle.title == this.article.title) {
      this.valueChange = false
    }
  }

  description: string = ''
  sendNewDescriptionValue(event: any) {
    this.valueChange = true
    this.updateArticle.description = event.target.value;
    if (this.updateArticle.description == this.article.description) {
      this.valueChange = false
    }
  }

  articleId: string | null = ''
  article: Article = {_id:'', author: '', title: '', description: '' }

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!localStorage.getItem("userId")) {
      window.location.href = '/login'
    }

    this.route.paramMap.subscribe((obs) => {
      this.articleId = obs.get('id')
    });

    this.apollo.watchQuery<any>({
      query: GET_ARTICLE,
      variables: {
        articleId: this.articleId
      }
    }).valueChanges.subscribe(({ data }) => {
      //console.log(data.article);
      this.article = data.article
      this.updateArticle._id = data.article._id
      this.updateArticle.title = data.article.title
      this.updateArticle.description = data.article.description
    },
      errors => console.log(errors)
    )
  }

  submitUpdateArticle(event: SubmitEvent) {
    event.preventDefault()
    // console.log(this.updateArticle);

    if (this.updateArticle.title == "") {
      alert("Title cannot be blank")
      return
    } else {
      this.valueChange = true
    }

    if (this.updateArticle.description == "") {
      alert("Description cannot be blank")
      return
    } else {
      this.valueChange = true
    }

    //console.log(this.updateArticle);
    this.apollo.mutate({
      mutation: POST_UPDATE_ARTICLE,
      variables: {
        input: {
          id: this.updateArticle._id,
          newTitle: this.updateArticle.title,
          newDescription: this.updateArticle.description
        }
      }
    }).subscribe(({data}: any) => {
      // console.log(data.updateArticle);
      window.location.href = '/my-articles'
    },
    errors => console.log(errors)  
    )

  }
}
