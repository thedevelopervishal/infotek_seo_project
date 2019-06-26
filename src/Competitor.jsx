import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./extraCSS.css"
class Competitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      category: "",
      result: {},
      resposne: false,
      error1: {},
      errCome: false,
      errEmpty: false,
      errIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(e.target.value);
  }
  handleChange1(e) {
    this.setState({ category: e.target.value });
    console.log(e.target.value);
  }
  foo = () => {
    console.log("running competitor ka foo");
    var list = [];
    for (var i = 0; i < this.state.result.urls.length; i++) {
      list.push(<Card.Text>{this.state.result.urls[i]}</Card.Text>);
    }
    return list;
  };
  foo1 = () => {
    console.log("Running foo1");
    var list1 = [];
    for (var i = 0; i < this.state.result.keywords.length; i++) {
      list1.push(this.state.result.keywords[i]+", ");
    }
    return list1;
  };
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errEmpty: false });
    this.setState({resposne:false})
    if (
      this.state.value === "" ||
      this.state.category === "" ||
      this.state.value === undefined ||
      this.state.category === undefined
    ) {
      this.setState({ errEmpty: true });
    } else {
      var myurl =this.state.value
      if(myurl.substring(0,8)!=="https://" && myurl.substring(0,7)!=="http://"){
        myurl="http://"+myurl;
      }
      console.log("Input Url: ",myurl);
      this.setState({errEmpty:false})
      let params = {
        site: myurl,
        category: this.state.category
      };
      let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
      let url = "http://543f4e56.ngrok.io/competitors?" + query;
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
          this.setState({ resposne: true });
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
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter your website URL here</Form.Label>
            <Form.Control
              placeholder="URL format - http://www.site.com"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <div>
              <Form.Label>Select your category below</Form.Label>
            </div>
            <select value={this.state.category} onChange={this.handleChange1}>
              <option value="select">Select</option>
              <option value="University">University</option>
              <option value="Corporate">Corporate</option>
              <option value="Medical">Medical</option>
              <option value="Telecom">Telecom</option>
              <option value="Service">Service</option>
              <option value="Food">Food</option>
              <option value="Social Media">Social Media</option>
            </select>
            <Form.Text className="text-muted">
              One platform for all your SEO solutions
            </Form.Text>
          </Form.Group>
          <Button variant="danger" type="submit" value="service2" className="marginbottom">
            GO
          </Button>
        </Form>
        {this.state.resposne && (
          <div>
            <h3>Results :</h3>
            <Card bg="info" text="white" style={{ width: "50rem" }}>
              {/* <Card.Header>Broken Link Stats</Card.Header> */}
              <Card.Body>
                {this.foo()}
                Suggested Keywords: <Card.Text>{this.foo1()}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        {this.state.errCome && (
          <div>
            <h3>Sorry We have encountered an error</h3>
            <Card bg="danger" text="white" style={{ width: "50rem" }}>
              <Card.Body>
                <Card.Text>{this.state.response.error}</Card.Text>
                <Card.Text>
                  This could be a service issue. Please try again...
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        <div>
          {this.state.errEmpty && (
            <div style={{ "margin-bottom":"10px" }}>
              <Card bg="danger" text="white" style={{ width: "50rem","margin-bottom":"10px" }}>
                {/* <Card.Header>Broken Link Stats</Card.Header> */}
                <Card.Body style={{ "margin-bottom":"10px" }}>
                  <Card.Text>
                    Make sure that you have filled in the details correctly!
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
                {/* <Card.Header>Broken Link Stats</Card.Header> */}
                <Card.Body>
                  <Card.Text>
                    Make sure that you have filled in the details correctly.
                    Also, this could be a network issue. Please try again...
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
export default Competitor;
