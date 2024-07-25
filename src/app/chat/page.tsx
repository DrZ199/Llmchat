"use client";
import { ChatInput } from "@/components/chat-input";
import { MainLayout } from "@/components/layout/main-layout";
import { ChatMessages } from "@/components/messages/chat-messages";
import { Spinner } from "@/components/ui";
import {
  AssistantsProvider,
  ChatProvider,
  CommandsProvider,
  PromptsProvider,
  useSessions,
} from "@/context";

const ChatSessionPage = () => {
  const { isAllSessionLoading, activeSessionId } = useSessions();

  const renderLoader = () => {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  };

  const isLoading = isAllSessionLoading || !activeSessionId;

  if (isLoading) return renderLoader();

  return (
    <ChatProvider sessionId={activeSessionId}>
      <CommandsProvider>
        <AssistantsProvider>
          <PromptsProvider>
            <MainLayout>
              <div className="relative flex h-[100%] w-full flex-row overflow-hidden bg-white dark:bg-zinc-800">
                <ChatMessages />
                <ChatInput />
              </div>
            </MainLayout>
          </PromptsProvider>
        </AssistantsProvider>
      </CommandsProvider>
    </ChatProvider>
  );
};

export default ChatSessionPage;