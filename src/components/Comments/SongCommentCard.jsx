import CommentCard from "./CommentCard";

function SongCommentCard({comment}) {

    function handleDeleteComment(commentId) {
        console.log(commentId)
        dispatch({
            type: 'DELETE_SONG_COMMENT',
            payload: {
                commentId
            }
        })
    }

    return (
        <CommentCard deleteFunction={handleDeleteComment} comment={comment} />
    )
}

export default SongCommentCard;