import './scrollList.scss';
import { Link } from '@chakra-ui/react';
const Card = () => {
  return (

      <div className="container">
        <div className="item"><Link href='/wordle'>WORDLE</Link> </div>
        <div className="item">Content</div>
        <div className="item">Content</div>
        <div className="item">Content</div>
        <div className="item">Content</div>
      </div>

  );
};

export default Card;