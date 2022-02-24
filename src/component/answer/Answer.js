import React, { useState } from "react";
import axios from "axios";
function Answer() {
  const initialState = {
    context: "",
    status: false,
  };

  const [answerState, setAnswerState] = useState(initialState);
  const [State, setState] = useState(initialState);

  const addAnswer = async (data) => {
    await axios
      .post("http://localhost:7000/answer/add", data)
      .then((response) => {
        setAnswerState(response.data);
        set
      });
  };
  const handlerInputChange = (e) => {
    console.log(e.target.name);
    setAnswerState({ ...answerState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnswer(answerState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="State"
            value={true}
            onChange={(e) => setState(e.target.value)}
          />

          <input
            type="text"
            id="context"
            name="context"
            placeholder="enter context..."
            onChange={handlerInputChange}
          />
        </label>

        <input type="submit" value="add" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Answer;
