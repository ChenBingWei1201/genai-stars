type FolderProps = {
  imgUrl: string;
  imgAlt: string;
  title: string;
};

function Folder({ imgUrl, imgAlt, title }: FolderProps) {
  return (
    <div className="w-60 rounded-lg shadow-xl flex flex-col m-2 bg-white">
      <img src={imgUrl} alt={imgAlt} className="w-full rounded-t-lg" />
      <h1 className="my-2 mx-5 text-black text-xl font-bold">{title}</h1>
    </div>
  );
}

export default Folder;
