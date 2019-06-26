import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./extraCSS.css";
import Container from "./Container";
import Bar from "./Bar";
import { NProgress } from "@tanem/react-nprogress";

class BrokenLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      go: false,
      value: "",
      result: {},
      response: false,
      error1: {},
      errIn: false,
      errCome: false,
      errEmpty: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(e.target.value);
  }
  foo = () => {
    console.log("running foo");
    var list = [];
    for (var i = 0; i < this.state.result.num_broken_links; i++) {
      list.push(<Card.Text>{this.state.result.broken_links[i]}</Card.Text>);
    }

    return list;
  };
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ response: false, errEmpty: false, go: true });
    if (this.state.value === "" || this.state.value === undefined) {
      this.setState({ errEmpty: true });
    } else {
      var myurl = this.state.value;
      if (
        myurl.substring(0, 8) !== "https://" &&
        myurl.substring(0, 7) !== "http://"
      ) {
        myurl = "http://" + myurl;
      }
      console.log(myurl);
      let params = {
        site: myurl
      };
      let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
      let url = "http://543f4e56.ngrok.io/brokenlinks?" + query;
      console.log(url);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          this.setState({ result: data });
          if (this.state.result.error !== undefined) {
            this.setState({ errCome: true });
          }
          this.setState({ response: true });
          console.log(this.state.result);
        })
        .catch(err => {
          this.setState({ error1: err });
          this.setState({ errIn: true });
        });
      console.log("Form submitted");
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter your website URL here</Form.Label>
            <Form.Control
              placeholder="Enter complete URL"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <Form.Text className="text-muted">
              One platform for all your SEO solutions
            </Form.Text>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            value="service2"
            className="marginbottom"
          >
            GO
          </Button>
        </Form>
        {this.state.go && (
          <NProgress
            animationDuration={800}
            incrementDuration={800}
            isAnimating={!this.state.response&&!this.state.errEmpty && this.state}
            minimum={0.1}
          >
            {({ animationDuration, isFinished, progress }) => (
              <Container
                animationDuration={animationDuration}
                isFinished={isFinished}
              >
                <Bar
                  animationDuration={animationDuration}
                  progress={progress}
                />
              </Container>
            )}
          </NProgress>
        )}
        {this.state.response && (
          <div>
            <h3>Your results below</h3>
            <Card bg="info" text="white" style={{ width: "50rem" }}>
              {/* <Card.Header>Broken Link Stats</Card.Header> */}
              <Card.Body>
                {this.state.response && <Card.Text>Broken Links:</Card.Text>}
                {this.state.response && this.foo()}
                <Card.Text>
                  No. of active links: {this.state.result.num_active_links}
                </Card.Text>
                <Card.Text>
                  No. of broken links: {this.state.result.num_broken_links}
                </Card.Text>
                <Card.Text>
                  No. of redirect links: {this.state.result.num_redirect_links}
                </Card.Text>
                <Card.Text>
                  Total number of links: {this.state.result.num_total_links}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        <div>
          {this.state.errCome && (
            <div>
              <h3>Sorry We have encountered an error</h3>
              <Card bg="danger" text="white" style={{ width: "50rem" }}>
                <Card.Body>
                  <Card.Text>{this.state.response.error}</Card.Text>
                  <Card.Text>
                    This could be a service issue. Please try again
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
        <div>
          {this.state.errEmpty && (
            <div>
              <Card bg="danger" text="white" style={{ width: "50rem" }}>
                <Card.Body>
                  <Card.Text>
                    Make sure that you have filled in the details correctly
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
        <div>
          {this.state.errIn && (
            <div>
              <h3>Sorry We have encountered an error</h3>
              <Card bg="danger" text="white" style={{ width: "50rem" }}>
                <Card.Body>
                  <Card.Text>
                    This could be a network issue. Please try again...
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default BrokenLinks;
