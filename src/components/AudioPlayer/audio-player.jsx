import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = ({ src }) => {
  return (
    <div className="w-fit">
      <div className="">
        <span className="ml-4">Audio promocional</span>
        <div className="bg-blue-500 w-fit rounded-full p-0.5">
          <ReactAudioPlayer className="h-8" src={src} controls />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
