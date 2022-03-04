import CommentCard from "../Comments/CommentCard";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import GenericDeleteAlert from "../Utilities/GenericDeleteAlert";

function ClipCommentCard({comment}) {
    const dispatch = useDispatch();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dismissAlert = () => setIsAlertOpen(false);

    function displayDeleteConfirmation(commentId) {
        setIsAlertOpen(true);
    }

    function handleDeleteComment(commentId) {
        console.log(commentId)
        dispatch({
            type: 'DELETE_CLIP_COMMENT',
            payload: {
                commentId
            }
        })
    }

    return (
        <>
        <CommentCard deleteFunction={displayDeleteConfirmation} comment={comment} />
        <GenericDeleteAlert 
            isOpen={isAlertOpen} 
            onClose={dismissAlert} 
            header={'Delete Comment?'} 
            body={"Are you sure? You can't undo this action afterwards."} 
            deleteFunction={() => handleDeleteComment(comment.id)} />
        </>
    )
}

export default ClipCommentCard;