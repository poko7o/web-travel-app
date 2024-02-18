import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [post, setPost] = useState({ comments: [] });
  const publicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  //  states for updating a post
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setPost(res.data);
      setTitle(res.data.title); // setting values so i use them in editing
      setDescription(res.data.description);
      // console.log(res.data)
    };
    getPost();
  }, [postId]); // whenever this path changes, this useEffect is invoked

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description,
      });
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [comment, setComment] = useState("");

  const handleComment = async (e) => {
    try {
      await axios.post(`/posts/${post._id}/comment`, {
        username: user.username,
        comment: comment,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //dalje
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComms = async () => {
      const coms = await axios.get("/comments");
      setComments(coms.data);
    };
    getComms();
  }, [postId]);

  //comments.map(c=>console.log(c));
  //

  //delete comment
  //const [commentId, setCommentId] = useState("");
  //console.log(commentId);
  async function deleteComment(id) {
    try {
      //let id = commentId.toString();
      //console.log(id.toString());
      await axios.delete("/comments/" + id.toString());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            src={publicFolder + post.photo}
            alt=""
            className="singlePostImg"
          />
        )}
        {updateMode ? (
          <h1 className="singlePostTitle">
            Title:{" "}
            <input
              type="text"
              className="singlePostTitle singlePostTitleInput"
              autoFocus
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </h1>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {user &&
              user.userRole === "ADMIN" && ( //user?.username - if there is no user, its not going to look for this username
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon"
                    onClick={() => setUpdateMode(true)}
                  >
                    <AiOutlineEdit />
                  </i>
                  <i className="singlePostIcon" onClick={handleDelete}>
                    <RiDeleteBin6Line />
                  </i>
                </div>
              )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{" " + post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <div>
            <h1 className="singlePostTitle singlePostTitleUpdate">
              Description:{" "}
            </h1>
            <div className="writeFormGroupUpdate">
              <textarea
                value={description}
                type="text"
                className="writeInput writeText"
                placeholder="Update Your story..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        ) : (
          <p className="singlePostDesc">{description}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>

      <form method="POST" onSubmit={handleComment}>
        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="d-flex flex-column col-md-8 w-100">
              <div className="coment-bottom bg-white p-2 px-4">
                {user && user.userStatus === "ACTIVATED" ? (
                  <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                    <img
                      className="img-fluid img-responsive rounded-circle mr-2"
                      src={publicFolder + user.profilePic}
                      alt=""
                      width="38"
                    />
                    <input
                      type="text"
                      className="form-control mr-3"
                      placeholder="Add comment..."
                      name="comment"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                      Comment
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <span className="commentAlert">
                      {user
                        ? "You can't comment until your profile has been activated"
                        : "You need to register to comment"}
                    </span>
                  </div>
                )}
                {comments.map(
                  (c) =>
                    c.blog === post._id && (
                      <div className="commented-section mt-2">
                        <div className="d-flex flex-row align-items-center justify-content-between commented-user">
                          <h5 className="mr-2 fw-bold">{c.username}</h5>
                          <span className="mb-1 ml-2 time">
                            {new Date(c.createdAt).toString().slice(3, 21)}
                          </span>
                          {user && user.userRole === "ADMIN" && (
                            <i
                              className="singlePostIcon delCommentIcon mb-2"
                              onClick={(e) => deleteComment(c._id)}
                            >
                              <RiDeleteBin6Line />
                            </i>
                          )}
                        </div>
                        <div className="comment-text-sm">
                          <span>{c.comment}</span>
                        </div>
                        <br></br>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
