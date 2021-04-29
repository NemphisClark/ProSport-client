import React, { useState, useEffect } from 'react';
import { getSubs } from '../../functions/sub';

const SubChildList = ({ parentId }) => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <React.Fragment key={s._id}>
        {s.parent === parentId ? <a href={`/sub/${s.slug}`}>{s.name}</a> : null}
      </React.Fragment>
    ));

  return (
    <div className="subs-wrapper">
      {loading ? (
        <h4 className="text-center">Загрузка подкатегорий...</h4>
      ) : (
        showSubs()
      )}
    </div>
  );
};

export default SubChildList;
