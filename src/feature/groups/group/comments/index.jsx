import React, { useState } from "react";
import { Stack } from "@mui/material";
import map from "lodash/map";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "components/Button";
import { useComments } from "../hooks/use-comments";
import Comment from "./Comment";

export const Comments = ({ postId, commentCount }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComment = () => setShowComments(!showComments);
  const comments = useComments(postId, showComments);

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        onClick={toggleComment}
        endIcon={showComments ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        Comments {commentCount ? `(${commentCount})` : ""}
      </Button>
      {showComments && (
        <Stack spacing={1} sx={{ mt: 3 }}>
          {comments.data?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              user={comment.user}
              postId={postId}
              text={comment.text}
              createdAt={comment.createdAt}
              content={comment.content}
              replies={comment.replies}
              level={1}
            />
          ))}
        </Stack>
      )}
    </div>
  );
};
export default Comments;
