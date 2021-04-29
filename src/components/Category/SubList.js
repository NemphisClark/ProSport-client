import React, { useState, useEffect } from 'react';
import { getParentSubs } from '../../functions/subParent';
import SubChildList from './SubChildList';

const SubList = ({ parentId }) => {
  const [parentSubs, setParentSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getParentSubs().then((res) => {
      setParentSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showParentSubs = () =>
    parentSubs.map((s) => (
      <React.Fragment key={s._id}>
        {parentId === s.parent ? (
          <div>
            <a
              className="parent-subs-wrapper__main"
              href={`/parent-sub/${s.slug}`}
            >
              {s.name}
            </a>
            <SubChildList parentId={s._id} />
          </div>
        ) : null}
      </React.Fragment>
    ));

  return (
    <div className="parent-subs-wrapper">
      {loading ? <h4>Загрузка категорий...</h4> : showParentSubs()}
    </div>
  );
};

export default SubList;
