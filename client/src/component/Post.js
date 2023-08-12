import React from "react";
import "../App.css";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Link } from "react-router-dom";
TimeAgo.addDefaultLocale(en);

const Post = ({ _id,title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <div className="image">
          <img src={cover} className="w-[300px] object-cotain h-[400px]" />
        </div>
      </Link>

      <div className="texts">
        <Link  to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <span className="author">{author} </span>

          <ReactTimeAgo date={createdAt} locale="en-US" />
        </p>

        <p className="summary">{summary.substr(0,200)}</p>
      </div>
    </div>
  );
};

export default Post;
