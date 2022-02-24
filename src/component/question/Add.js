import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Answer from "../answer/Answer";
function Add() {
  const initialState = {
    Title: "",

    descrition: "",
  };
  const [questionState, setQuestionState] = useState(initialState);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getQuestionId(id);
    }
  }, [id]);
  const getQuestionId = async (id) => {
    await axios
      .patch(`http://localhost:7000/Question/update/${id}`)
      .then((response) => {
        setQuestionState(...response.data);
      });
  };
  const history = useHistory();
  const addQuestion = async (data) => {
    await axios
      .post("http://localhost:7000/Question/add", data)
      .then((response) => {
        setQuestionState(response.data);
      });
  };

  const handlerInputChange = (e) => {
    console.log(e.target.name);
    const datetime = format(new Date(), "dd/MM/yyy");
    setQuestionState({
      ...questionState,
      datetime,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion(questionState);
    // if (!Title) {
    // alert("aaa");
    // } else {
    setTimeout(() => history.push("/"), 500);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="Title"
          name="Title"
          placeholder="enter Title..."
          onChange={handlerInputChange}
        />
        <textarea
          type="text"
          id="descrition"
          name="descrition"
          placeholder="enter descrition..."
          onChange={handlerInputChange}
        />
        <Answer />

        <input type="submit" value="add" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Add;
