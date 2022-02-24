import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Question() {
  const [questionList, setQuestionList] = useState([]);
  const [search, setSearch] = useState([]);

  const getData = useEffect(() => {
    axios.get("http://localhost:7000/Question/list").then((response) => {
      setQuestionList(response.data);
    });
  }, []);

  return (
    <div>
      <td>
        <Link to={`/add`}>
          add
          <button />
        </Link>
      </td>
      <td>
        <Link to={`/CreateTest`}>
          test
          <button />
        </Link>
      </td>
      <input
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>NO.</th>
            <th>title</th>
            <th>descrition</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {questionList
            .filter((item) => {
              if (search == "") {
                return item;
              } else if (
                item.Title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.Title}</td>
                  <td>{item.descrition}</td>
                  <td>{item.datetime}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      Edit
                      <button />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/view/${item.id}`}>
                      view
                      <button />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Question;
