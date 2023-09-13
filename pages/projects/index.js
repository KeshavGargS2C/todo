import React from 'react';
import LeftPanel from '../../components/leftPanel/LeftPanel';
import RightPanel from '../../components/rightPanel/RightPanel';
import styles from './projects.module.scss';

function Projects() {
  return (
    <div className={styles["wrapper-container"]}>
      <div>
        <LeftPanel />
      </div>
      <div>
        <RightPanel />
      </div>
    </div>
  )
}

export default Projects
