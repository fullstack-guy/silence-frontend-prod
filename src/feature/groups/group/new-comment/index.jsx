import { Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { useUser } from "feature/auth/context";

import { useCreateComment } from "../hooks/use-comment";
import { useResponsive } from "hooks/useResponsive";
import config from "@config/index";
import CommentInput from "components/comment-input";
import { useDispatch } from "react-redux";
import { changeState } from "store/slices/commentSlice";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { useSnackbar } from "notistack";
import * as notificationApi from '@api/notification';
import * as postApi from "@api/post";
import * as fileApi from "@api/file";
import generateUniqueTimeString from "constants/random";

const NewComment = ({ postId, parentCommentId, placeholder, sx }) => {
  const user = useUser();

  const dispatch = useDispatch();
  const { mobile } = useResponsive();
  // const commentMutation = useCreateComment(postId);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (editorState, files, editor) => {
    try {
      const mentions = editorState?.toJSON()?.root?.children[0]?.children?.filter((item) => item.type === "mention")
      
      const media = [];
      if (files && files.length > 0) {
        for (let i = 0; i < files?.length; i++) {
          const file = files[i];
          const fileName = generateUniqueTimeString(16);
          const { data: response, err } = await fileApi.uploadCommentImage(user.id, postId, file, fileName);
          if (err) throw err;
          media.push(`${response.path}`);
        }
      }
      const result = await postApi.addComment({ userId: user.id, postId: postId, parentCommentId: parentCommentId, content: JSON.stringify(editorState.toJSON()), media });
      const addedCommentId = result.data[0].id
  
      if (mentions.length > 0) {
        const mentionIds = mentions.map((mention) => mention.mention.id);
        
        await notificationApi.sendCommentNotification(user, mentionIds, postId, addedCommentId);
      }
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      dispatch(changeState());
    } catch (error) {
      enqueueSnackbar("An error occured! Please try again!", { variant: "error" });
    }

    // commentMutation.mutate(
    //   { userId: user.id, parentCommentId: parentCommentId, postId: postId, content: JSON.stringify(editorState.toJSON()), media: files },
    //   {
    //     onSuccess: async () => {
    //       if (mentions.length > 0) {
    //         const mentionIds = mentions.map((mention) => mention.id);
    //         const notifierNames = mentions.map((mention) => mention.name)
    //         await notificationApi.sendCommentNotification(user.id, mentionIds, notifierNames);
    //       }
    //       editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    //       dispatch(changeState());
    //     },
    //     onError: () => {
    //       enqueueSnackbar("An error occured! Please try again!", { variant: "error" });
    //     }
    //   }
    // );
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={sx}>
      {!mobile && (
        <CustomAvatar
          sx={{ height: 32, width: 32 }}
          name={user.firstName}
          src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
          alt="avatar"
        />
      )}
      <CommentInput onSubmit={handleSubmit} placeholder={placeholder} />
    </Stack>
  );
};

export default NewComment;
