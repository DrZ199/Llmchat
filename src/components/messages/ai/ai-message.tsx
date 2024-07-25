import { useRef } from "react";

import { Mdx } from "@/components/mdx";
import { Flex, Tooltip } from "@/components/ui";
import { useChatContext } from "@/context";
import { useAssistantUtils } from "@/hooks";
import { TChatMessage } from "@/types";
import { AIMessageActions } from "./ai-message-actions";
import { AIMessageError } from "./ai-message-error";
import { AISelectionProvider } from "./ai-selection-provider";
import { AIToolMessage } from "./ai-tool-message";

export type TAIMessage = {
  message: TChatMessage;
  isLast: boolean;
};

export const AIMessage = ({ message, isLast }: TAIMessage) => {
  const { id, rawAI, isLoading, stopReason, tools, runConfig, stop } = message;

  const { store } = useChatContext();
  const editor = store((state) => state.editor);
  const setContextValue = store((state) => state.setContext);
  const messageRef = useRef<HTMLDivElement>(null);
  const { getAssistantIcon } = useAssistantUtils();

  const handleSelection = (value: string) => {
    setContextValue(value);
    editor?.commands.clearContent();
    editor?.commands.focus("end");
  };

  return (
    <div className="flex flex-row w-full mt-6">
      <div className="p-2 md:px-3 md:py-2">
        <Tooltip content={runConfig.assistant.name}>
          {getAssistantIcon(runConfig.assistant.key, "sm")}
        </Tooltip>
      </div>
      <Flex
        ref={messageRef}
        direction="col"
        gap="none"
        items="start"
        className="flex-1 w-full p-2 overflow-hidden"
      >
        {tools?.map((tool) => (
          <AIToolMessage tool={tool} key={tool.toolName} />
        ))}

        <AISelectionProvider onSelect={handleSelection}>
          <Mdx message={rawAI} animate={!!isLoading} messageId={id} />
        </AISelectionProvider>
        {stop && <AIMessageError stopReason={stopReason} message={message} />}
        <AIMessageActions message={message} canRegenerate={message && isLast} />
      </Flex>
    </div>
  );
};
