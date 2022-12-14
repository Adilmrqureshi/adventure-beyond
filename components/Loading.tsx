import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const Loading = (props: any) => {
  return (
    <Stack {...props}>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default Loading;
