import { Skeleton } from '@mui/material';
import Link from 'next/link';
import "./Cms.css"
const Cms = ({data}) => {
    return (

        
        <div className="dashboard__cms--container">
        {data && data.items ? (
          data.items.map((item, index) => (
            <Link key={index} href={""} className="cms__link">
              <div className="cms__post">
                <img
                  className="cms__image"
                  alt="post image"
                  loading="lazy"
                  src={item.fields.image.fields.file.url}
                />
                <div className="cms__text--container">
                  <h1 className="cms__title">{item.fields.title}</h1>
                  <p className="cms__para">{item.fields.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="cms__post">
            <Skeleton
              className="skeleton__container"
              animation="wave"
              variant="rounded"
              width={320}
              height={118.25}
            />

            <Skeleton
              width={320}
              height={25}
              className="skeleton__text--title"
              variant="text"
            />
            <Skeleton
              width={160}
              height={25}
              className="skeleton__text--para"
              variant="text"
            />
          </div>
        )}
      </div>
    );
}

export default Cms;
