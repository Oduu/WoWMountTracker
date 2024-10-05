import './_mountCard.scss';

interface MountCardProps {
    mount: string;
    image: string;
    source: string;
    sourceType: string;
    link?: string; // (use ? for optional)
    checked: boolean; 
    onClick: (value: string) => void;
  }

  const MountCard: React.FC<MountCardProps> = ({mount, image, source, sourceType, link, checked, onClick}) => {

  return (
    <div
        key={mount} 
        className={`tracked-mounts__mount ` + `${checked ? "tracked-mounts__mount--selected" : "tracked-mounts__mount--unselected"}`}
        onClick={() => onClick(mount)}
    >

        <a target="_blank" className="tracked-mounts__mount-link" href={link}>{mount}</a>
        <img src={image} />
        <h5>{sourceType} - {source}</h5>

    </div>
  );
};

export default MountCard;
