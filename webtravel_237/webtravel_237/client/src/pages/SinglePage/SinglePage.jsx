import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./singlePage.css";

export default function SinglePage() {
    return (
        <div className="singlePage">
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}
