import React from "react";
import Sidebar from "../Sidebar/Sidebar";
//import "./CreateTest.css";
//import "./fun.css";
import Dialog from "../Helper/Helper";
import axios from "axios";
import Toast from "../Toast/Toast";

export default class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "Math",
        "Science",
        "Technology",
        "Sports",
        "History",
        "Misc",
      ],
      categoryVal: "Math",
      mustBeSignedIn: false,
      questions: [],
      name: "",
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
      showToast: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("JWT_PAYLOAD")) {
      this.props.history.push("/");
    }
  }

  selectPrivate = (e) => {
    if (e.target.checked === true) {
      this.setState({
        mustBeSignedIn: e.target.checked,
      });
    } else {
      this.setState({ mustBeSignedIn: false });
    }
  };

  addAnswer = () => {
    this.setState({
      answers: this.state.answers.concat(""),
    });
  };

  updateAnswer = (e, i) => {
    let newArr = Object.assign([], this.state.answers);
    newArr[i] = e.target.value;
    this.setState({
      answers: newArr,
    });
  };

  saveQuestion = () => {
    let question = {
      answers: this.state.answers,
      correctAnswer: this.state.correctAnswer,
      questionName: this.state.questionName,
    };
    this.setState({
      questions: this.state.questions.concat(question),
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
    });
  };

  removeQuestion = (question) => {
    this.setState({
      questions: this.state.questions.filter(
        (ques) => ques.questionName !== question.questionName
      ),
    });
  };

  saveTest = () => {
    let test = {
      mustBeSignedIn: this.state.mustBeSignedIn,
      name: this.state.name,
      questions: this.state.questions,
      category: this.state.categoryVal,
    };
    axios
      .post("/api/test/create", {
        test,
        createdBy: localStorage.getItem("_ID"),
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            questions: [],
            answers: [],
            categoryVal: "Math",
            showToast: true,
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        console.error(er);
      });
  };

  render() {
    return (
      <div className="create-test-wrapper">
        <Toast model={this.state.showToast} message="Test Created" />
        <div>
          <Sidebar />
        </div>

        <div className="main">
          <div className="header">Create Test</div>
          <div className="form card">
            <input
              className="input"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
              placeholder="Test Name"
            />
            <br></br>
            <select
              value={this.state.categoryVal}
              onChange={(e) => this.setState({ categoryVal: e.target.value })}
              className="input select"
              placeholder="Category"
            >
              {this.state.categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="checkbox">
              <span>Multiple Choice</span>
              <input
                checked={this.state.mustBeSignedIn}
                onChange={this.selectPrivate}
                type="checkbox"
                placeholder="Multiple Choice"
              />
            </div>

            {this.state.questions.map((ques, idx) => (
              <div className="question" key={idx}>
                <div>{ques.questionName}</div>
                <div>Correct Answer: {ques.correctAnswer}</div>
                <div>Num of answers: {ques.answers.length}</div>
                <div
                  className="login-box"
                  onClick={() => this.removeQuestion(ques)}
                >
                  <form>
                    <a href>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      DELETE
                    </a>
                  </form>
                </div>
              </div>
            ))}

            <div className="login-box" onClick={() => this.saveTest()}>
              <form>
                <a href>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  SAVE TEST
                </a>
              </form>
            </div>

            <Dialog model={this.state.addQuestion}>
              <div className="new-test-form">
                <input
                  className="input"
                  placeholder="Question"
                  value={this.state.questionName}
                  onChange={(e) =>
                    this.setState({ questionName: e.target.value })
                  }
                />
                <div>Answers</div>
                {this.state.answers.map((ans, idx) => (
                  <div className="answer-form" key={idx}>
                    <input
                      type="radio"
                      value={this.state.ans}
                      onChange={(e) => this.setState({ correctAnswer: ans })}
                      name="answer"
                    />{" "}
                    <input
                      className="input"
                      type="text"
                      placeholder="Answer"
                      value={this.state.answers[idx]}
                      onChange={(e) => this.updateAnswer(e, idx)}
                    />
                  </div>
                ))}
                <div className="add-answer" onClick={this.addAnswer}>
                  Add Answer
                </div>
                <div className="btn-wrapper">
                  <div
                    className="btn"
                    onClick={() => this.setState({ addQuestion: false })}
                  >
                    Close
                  </div>
                  <div className="btn" onClick={this.saveQuestion}>
                    Save
                  </div>
                </div>
              </div>
            </Dialog>
            <div
              onClick={() => this.setState({ addQuestion: true })}
              class="login-box"
            >
              <form>
                <a href>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  NEW TEST
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
