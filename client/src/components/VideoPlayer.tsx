import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoPlayerProps {
  videoUrl: string;
  isLocked: boolean;
  onUnlock?: () => void;
}

const buildYouTubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0&controls=1&fs=0&playsinline=1&disablekb=1&iv_load_policy=3&cc_load_policy=0&showinfo=0`;

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return "";

  const trimmed = url.trim();

  // Support just the YouTube ID
  const idOnly = /^[a-zA-Z0-9_-]{11}$/.test(trimmed);
  if (idOnly) return buildYouTubeEmbed(trimmed);

  // Support full YouTube URLs
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) return buildYouTubeEmbed(match[2]);

  return "";
};

export const VideoPlayer = ({
  videoUrl,
  isLocked,
  onUnlock,
}: VideoPlayerProps) => {
  if (isLocked) {
    return (
      <Card className="wellness-card mb-6">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div className="rounded-full bg-muted/30 p-4 mb-2">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">
            Complete the previous steps to unlock this video
          </h3>
          {onUnlock && (
            <button
              onClick={onUnlock}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
            >
              Mark lesson complete and unlock
            </button>
          )}
        </CardContent>
      </Card>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <Card className="wellness-card mb-6">
      <CardContent className="p-0">
        <div className="aspect-video rounded-lg overflow-hidden bg-black relative">
          {embedUrl ? (
            <>
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                style={{ 
                  border: "none",
                  pointerEvents: "auto"
                }}
                title="Lesson Video"
              />
              {/* Overlay to prevent clicking on YouTube logo */}
              <div 
                className="absolute top-0 left-0 w-full h-16 pointer-events-none"
                style={{ zIndex: 10 }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              Video link missing or invalid
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
