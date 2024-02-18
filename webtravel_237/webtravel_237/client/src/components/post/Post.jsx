import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
    const publicFolder = "http://localhost:5000/images/";

    return (
        <div className="post">
            {post.photo && <img src={publicFolder + post.photo} alt="" className="postImg" />}
            <div className="postInfo">
                <div className="postCategories">
                    { 
                        post.categories.map((cat)=>(
                            <span className="postCategory">{cat.name}</span>
                        ))
                    }
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>                
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                    {post.description}
            </p>
        </div>
    )
}
