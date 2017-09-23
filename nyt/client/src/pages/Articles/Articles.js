import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem";
import Input from "../../components/Form/Input";
import FormBtn from "../../components/Form/FormBtn";

class Articles extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    topic: "",
    start_year: "",
    end_year: ""  };

  // When the component mounts, load all articles and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
  }

  // Loads all articles  and sets them to this.state.articles
  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", start_year: "", end_year: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a article from the database with a given id, then reloads articles from the db
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveArticle method to save the book data
  // Then reload articles from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.start_year && this.state.end_year) {
      API.saveArticle({
        topic: this.state.topic,
        start_year: this.state.start_year,
        end_year: this.state.end_year
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Scrubber</h1>

            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="topic (required)"
              />
              <Input
                value={this.state.start_year}
                onChange={this.handleInputChange}
                name="start_year"
                placeholder="start_year (required)"
              />
              <Input
                value={this.state.end_year}
                onChange={this.handleInputChange}
                name="end_year"
                placeholder="end_year (required)"
              />
              <FormBtn
                disabled={!(this.state.start_year && this.state.end_year && this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <a href={"/articles/" + article._id}>
                        <strong>
                          {article.topic} from {article.start_year} to {article.end_year}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
