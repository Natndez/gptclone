import { Heading } from "@/components/heading"
import { MessageCircle } from "lucide-react";

const ChatPage = () => {
    return (
        <div>
            {/* Assigning Props to conform to our HeadingProps interface */}
            <Heading
                title="Chat"
                description="Ask Genie anything"
                icon={MessageCircle}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10" 
            />
            <div className="px-4 lg:px-8">

            </div>
        </div>
    );
}

export default ChatPage;